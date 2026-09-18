import {test,expect} from '@playwright/test';
import {NextRequest} from 'next/server';
import {POST} from '../src/app/api/robo-ryan/route';
import {photoResult,validPhotos,readProductLabel} from '../src/lib/robo-ryan-photos';

const jpeg={dataUrl:'data:image/jpeg;base64,/9j/2Q=='};
const fixture={name:'label.svg',mimeType:'image/svg+xml',buffer:Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400"><rect width="800" height="400" fill="white"/><text x="40" y="120" font-size="50">Example Fixture</text><text x="40" y="230" font-size="40">MODEL TEST-123</text></svg>')};
test('photo payload rejects URL fetches, unsupported formats, malformed bytes and excess count',()=>{
 expect(validPhotos([jpeg])).toBe(true);
 expect(validPhotos([{dataUrl:'https://example.com/image.jpg'}])).toBe(false);
 expect(validPhotos([{dataUrl:'data:image/jpeg;base64,aGVsbG8='}])).toBe(false);
 expect(validPhotos([{dataUrl:'data:image/svg+xml;base64,PHN2Zy8+'}])).toBe(false);
 expect(validPhotos([jpeg,jpeg,jpeg])).toBe(false);
 expect(validPhotos([{dataUrl:'data:image/jpeg;base64,'+'A'.repeat(1000001)}])).toBe(false);
});
test('uncertain photo readings never offer a model confirmation',()=>{
 expect(photoResult({readable:false,brand:'Rinnai',model:'RU199iN'})).not.toHaveProperty('productSuggestion');
 expect(photoResult({readable:true,brand:'',model:'RU199iN'})).not.toHaveProperty('productSuggestion');
 expect(photoResult({readable:true,brand:'Rinnai',model:'RU199iN'})).toMatchObject({productSuggestion:{brand:'Rinnai',model:'RU199iN'}});
});
test('photo reading uses image inputs and asks confirmation without invoking web search',async()=>{
 const originalFetch=global.fetch;let sent:Record<string,unknown>={};
 global.fetch=async(_url,init)=>{sent=JSON.parse(String(init?.body));return new Response(JSON.stringify({status:'completed',output:[{content:[{type:'output_text',text:JSON.stringify({readable:true,brand:'Rinnai',model:'RU199iN'})}]}]}))};
 try{
   const result=await readProductLabel([jpeg]);
   expect(result.reply).toContain('Please check');expect(sent.store).toBe(false);expect(sent.tools).toBeUndefined();
   expect(JSON.stringify(sent.input)).toContain('input_image');expect(JSON.stringify(sent.input)).toContain(jpeg.dataUrl);
 }finally{global.fetch=originalFetch}
});
test('disabled photo analysis is honest and invalid or oversized payloads fail',async()=>{
 const old=process.env.ROBO_RYAN_VISION_ENABLED;process.env.ROBO_RYAN_VISION_ENABLED='false';
 const request=(photos:unknown,content='Please read this label')=>new NextRequest('https://example.com/api/robo-ryan',{method:'POST',body:JSON.stringify({messages:[{role:'user',content}],photos})});
 try{
   expect((await(await POST(request([jpeg]))).json()).reply).toContain('not enabled yet');
   expect((await POST(request([{dataUrl:'https://example.com/private.jpg'}]))).status).toBe(400);
   const huge=new NextRequest('https://example.com/api/robo-ryan',{method:'POST',body:'a'.repeat(2200001)});
   expect((await POST(huge)).status).toBe(413);
   expect((await(await POST(request([jpeg],'I smell gas'))).json()).reply).not.toContain('not enabled yet');
 }finally{if(old===undefined)delete process.env.ROBO_RYAN_VISION_ENABLED;else process.env.ROBO_RYAN_VISION_ENABLED=old}
});
for(const width of [390,1440])test(`photo attach, remove, send and confirm at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:844});
 const requests:{photos:{dataUrl:string}[];messages:{content:string}[]}[]=[];
 await page.route('**/api/robo-ryan',async route=>{
   const body=route.request().postDataJSON();requests.push(body);
   await route.fulfill({json:body.photos?.length?photoResult({readable:true,brand:'Rinnai',model:'RU199iN'}):{reply:'The confirmed details are ready for lookup.'}});
 });
 await page.goto('/');await page.getByRole('button',{name:'Open Ryan Rabato chat',exact:true}).click();
 const chat=page.getByRole('dialog',{name:'Chat with Ryan Rabato'});
 await chat.getByRole('button',{name:'Add Photos',exact:true}).click();
 await expect(chat.getByRole('button',{name:'Take Photo',exact:true})).toBeVisible();
 await expect(chat.locator('input[capture]')).toHaveAttribute('capture','environment');
 await chat.getByLabel('Choose Photos',{exact:true}).setInputFiles(fixture);
 await expect(chat.locator('.rr-photo-previews img')).toHaveCount(1);
 expect(requests).toHaveLength(0);
 await chat.getByRole('button',{name:'Remove Photo 1',exact:true}).click();
 await expect(chat.locator('.rr-photo-previews img')).toHaveCount(0);
 await expect(chat.getByRole('button',{name:'Send Message',exact:true})).toBeDisabled();
 await chat.getByLabel('Choose Photos',{exact:true}).setInputFiles([fixture,fixture,fixture]);
 await expect(chat.getByRole('status')).toContainText('up to two');
 await chat.getByLabel('Choose Photos',{exact:true}).setInputFiles(fixture);
 await expect(chat.getByRole('button',{name:'Send Message',exact:true})).toBeEnabled();
 await chat.getByRole('button',{name:'Send Message',exact:true}).click();
 await expect(chat.locator('.rr-message-photos img')).toHaveCount(1);
 await expect(chat.getByRole('button',{name:'Use These Details',exact:true})).toBeVisible();
 expect(requests[0].photos[0].dataUrl).toMatch(/^data:image\/jpeg;base64,/);
 expect(requests[0].messages.at(-1)?.content).toContain('label');
 await chat.getByRole('button',{name:'Use These Details',exact:true}).click();
 await expect(chat).toContainText('confirmed details are ready');
 expect(requests[1].photos).toEqual([]);expect(requests[1].messages.at(-1)?.content).toBe('Rinnai model RU199iN');
 expect(requests[1].messages.every(m=>!('photos' in m))).toBe(true);
});
