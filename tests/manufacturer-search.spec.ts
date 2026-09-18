import {test,expect} from '@playwright/test';
import {productLookup,parseManufacturerResponse,searchManufacturer} from '../src/lib/robo-ryan-external';
import {POST} from '../src/app/api/robo-ryan/route';
import {NextRequest} from 'next/server';

const fixture=(url='https://www.rinnai.us/professional/document-library')=>({status:'completed',output:[{type:'web_search_call',status:'completed'},{type:'message',content:[{type:'output_text',text:'Check the model label. SOURCE',annotations:[{type:'url_citation',start_index:23,end_index:29,title:'Rinnai documentation',url}]}]}]});
const request=(content:string)=>new NextRequest('https://example.com/api/robo-ryan',{method:'POST',body:JSON.stringify({messages:[{role:'user',content}]})});

test('product context follows user model replies and switches brands',()=>{
 expect(productLookup([{role:'user',content:'My Rinnai heater has an error'},{role:'assistant',content:'Model?'},{role:'user',content:'RU199iN'}]).brands[0].name).toBe('Rinnai');
 expect(productLookup([{role:'assistant',content:'Rinnai'},{role:'user',content:'RU199iN'}]).brands).toHaveLength(0);
 expect(productLookup([{role:'user',content:'Rinnai heater'},{role:'user',content:'Now a Moen faucet'}]).brands[0].name).toBe('Moen');
 expect(productLookup([{role:'user',content:'Rinnai heater'},{role:'user',content:'Thank you'}]).requested).toBe(false);
 expect(productLookup([{role:'user',content:'Rinnai heater'},{role:'user',content:'Navien manual'}]).brands).toHaveLength(0);
});
test('manufacturer results require completed search and approved citation URLs',()=>{
 const valid=parseManufacturerResponse(fixture(),['rinnai.us']);
 expect(valid?.reply).toBe('Check the model label. [1]');
 expect(valid?.citations[0]).toMatchObject({start:23,end:26});
 expect(parseManufacturerResponse(fixture('https://rinnai.us.evil.example/manual'),['rinnai.us'])).toBeNull();
 expect(parseManufacturerResponse(fixture('javascript:alert(1)'),['rinnai.us'])).toBeNull();
 expect(parseManufacturerResponse({...fixture(),status:'incomplete'},['rinnai.us'])).toBeNull();
 expect(parseManufacturerResponse({...fixture(),output:fixture().output.slice(1)},['rinnai.us'])).toBeNull();
});
test('manufacturer fetch restricts domains and redacts contact data',async()=>{
 const originalFetch=global.fetch;let sent:Record<string,unknown>={};
 global.fetch=async(_url,init)=>{sent=JSON.parse(String(init?.body));return new Response(JSON.stringify(fixture()))};
 try{
   const messages=[{role:'user' as const,content:'Rinnai RU199iN manual. Call 314-555-1212 or me@example.com. 123 Main Street.'}];
   const result=await searchManufacturer(messages,productLookup(messages).brands);
   expect(result.externalSearch).toBe(true);
   expect(sent.tool_choice).toBe('required');expect(sent.store).toBe(false);
   expect(sent.tools).toEqual([{type:'web_search',filters:{allowed_domains:['rinnai.us']},search_context_size:'medium'}]);
   expect(JSON.stringify(sent.input)).not.toContain('me@example.com');
   expect(JSON.stringify(sent.input)).not.toContain('314-555-1212');
   expect(JSON.stringify(sent.input)).not.toContain('123 Main Street');
 }finally{global.fetch=originalFetch}
});
test('route prioritizes product specifics but preserves hazards and business facts',async()=>{
 const keys=['OPENAI_API_KEY','OPENAI_MODEL','ROBO_RYAN_AI_ENABLED','ROBO_RYAN_WEB_SEARCH_ENABLED'];
 const original=Object.fromEntries(keys.map(k=>[k,process.env[k]])),originalFetch=global.fetch;let calls=0;
 for(const k of keys)process.env[k]=k.includes('ENABLED')?'true':'test-fixture';
 global.fetch=async()=>{calls++;return new Response(JSON.stringify(fixture()))};
 try{
   const product=await(await POST(request('Can you find the Rinnai RU199iN water heater manual?'))).json();
   expect(product.externalSearch).toBe(true);expect(calls).toBe(1);
   const policy=await(await POST(request('What are your hours for Rinnai repair?'))).json();
   expect(policy.articleId).toBe('business-policy');expect(calls).toBe(1);
   await POST(request('My Rinnai has a gas smell'));expect(calls).toBe(1);
   const warranty=await(await POST(request('What is the Rinnai product warranty?'))).json();
   expect(warranty.externalSearch).toBe(true);expect(calls).toBe(2);
   process.env.ROBO_RYAN_WEB_SEARCH_ENABLED='false';
   const disabled=await(await POST(request('My Rinnai water heater has no hot water'))).json();
   expect(disabled.externalSearch).toBe(false);expect(disabled.reply).toContain("can't look up");expect(calls).toBe(2);
 }finally{global.fetch=originalFetch;for(const k of keys){if(original[k]===undefined)delete process.env[k];else process.env[k]=original[k]}}
});
test('chat shows clickable inline citations from product answers',async({page})=>{
 await page.route('**/api/robo-ryan',route=>route.fulfill({json:parseManufacturerResponse(fixture(),['rinnai.us'])}));
 await page.goto('/');await page.getByRole('button',{name:'Open Ryan Rabato chat',exact:true}).click();
 const chat=page.getByRole('dialog',{name:'Chat with Ryan Rabato'});
 await chat.getByLabel('Message Ryan Rabato').fill('Rinnai RU199iN manual');await chat.getByRole('button',{name:'Send Message',exact:true}).click();
 await expect(chat.locator('.rr-citation')).toHaveAttribute('href','https://www.rinnai.us/professional/document-library');
 await expect(chat.locator('.rr-citation')).toHaveText('[1]');
});
