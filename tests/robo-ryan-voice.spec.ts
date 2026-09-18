import { test, expect, type Page } from '@playwright/test';

async function fakeVoice(page: Page, mode: 'supported' | 'unsupported' | 'denied' = 'supported') {
  await page.addInitScript(({mode}) => {
    const state = {starts:0,aborts:0,spoken:[] as string[],cancels:0};
    Object.assign(window, {voiceTest:state});
    class Recognition {
      onstart: (()=>void)|null=null;
      onend: (()=>void)|null=null;
      onerror: ((event:{error:string})=>void)|null=null;
      onresult: ((event:{results:unknown[]})=>void)|null=null;
      start(){state.starts++;Object.assign(window,{testRecognition:this});if(mode==='denied'){this.onerror?.({error:'not-allowed'});return}this.onstart?.()}
      stop(){this.onend?.()}
      abort(){state.aborts++;this.onend?.()}
    }
    Object.defineProperty(window,'SpeechRecognition',{configurable:true,value:mode==='unsupported'?undefined:Recognition});
    Object.defineProperty(window,'webkitSpeechRecognition',{configurable:true,value:undefined});
    Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{getVoices:()=>[],cancel:()=>{state.cancels++},speak:(u:{text:string})=>{state.spoken.push(u.text)}}});
    Object.defineProperty(window,'SpeechSynthesisUtterance',{configurable:true,value:class{constructor(public text:string){}}});
  },{mode});
}

async function openChat(page:Page){
  await page.goto('/');
  const launch=page.locator('.rr-launch');
  if(await launch.getAttribute('aria-expanded')==='false')await launch.click();
  return page.getByRole('dialog',{name:'Chat with Ryan Rabato'});
}

for(const width of [390,1440])test(`dictation can be reviewed, sent, and heard at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:844});await fakeVoice(page);
  const chat=await openChat(page);
  expect(await page.evaluate(()=>Reflect.get(window,'voiceTest').starts)).toBe(0);
  await chat.getByRole('button',{name:'Use Microphone',exact:true}).click();
  await expect(chat.getByRole('button',{name:'Stop Listening',exact:true})).toBeVisible();
  await page.evaluate(()=>Reflect.get(window,'testRecognition').onresult({results:[{isFinal:true,0:{transcript:'Why does my toilet keep running?'}}]}));
  await expect(chat.getByLabel('Message Ryan Rabato')).toHaveValue('Why does my toilet keep running?');
  await expect(chat.getByRole('button',{name:'Send Message',exact:true})).toBeDisabled();
  await chat.getByRole('button',{name:'Stop Listening',exact:true}).click();
  await expect(chat.locator('.rr-user')).toHaveCount(0);
  await chat.getByRole('button',{name:'Send Message',exact:true}).click();
  await expect(chat).toContainText('A worn tank seal or flapper');
  await expect.poll(()=>page.evaluate(()=>Reflect.get(window,'voiceTest').spoken.join(' '))).toContain('A worn tank seal or flapper');
  await chat.getByRole('button',{name:'Stop Speaking',exact:true}).click();
  await chat.getByRole('button',{name:'Read Answer',exact:true}).last().click();
  expect(await page.evaluate(()=>Reflect.get(window,'voiceTest').spoken.length)).toBe(2);
  await expect(chat.getByRole('link',{name:'Call Plumbing Team'})).toHaveAttribute('href','tel:3142201827');
  await expect(chat).toBeInViewport();
});

for(const mode of ['unsupported','denied'] as const)test(`${mode} speech preserves typing`,async({page})=>{
    await fakeVoice(page,mode);const chat=await openChat(page);
    await chat.getByLabel('Message Ryan Rabato').fill('My faucet leaks');
    await chat.getByRole('button',{name:'Use Microphone',exact:true}).click();
    await expect(chat).toContainText(mode==='denied'?'Microphone access was not allowed':'This browser does not support voice input');
    await expect(chat.getByLabel('Message Ryan Rabato')).toBeEnabled();
    await expect(chat.getByLabel('Message Ryan Rabato')).toHaveValue('My faucet leaks');
});

test('spoken choices ignore casing and closing stops active audio',async({page})=>{
  await fakeVoice(page);const chat=await openChat(page);
  await chat.getByRole('button',{name:'Use Microphone',exact:true}).click();
  await page.evaluate(()=>{const r=Reflect.get(window,'testRecognition');r.onresult({results:[{isFinal:true,0:{transcript:'repair.'}}]});r.onend()});
  await chat.getByRole('button',{name:'Send Message',exact:true}).click();
  await expect(chat).toContainText('What needs repair?');
  await chat.getByRole('button',{name:'Use Microphone',exact:true}).click();
  await chat.getByRole('button',{name:'Minimize Chat',exact:true}).click();
  expect(await page.evaluate(()=>Reflect.get(window,'voiceTest').aborts)).toBe(1);
  expect(await page.evaluate(()=>Reflect.get(window,'voiceTest').cancels)).toBeGreaterThan(0);
  await page.getByRole('button',{name:'Open Ryan Rabato chat',exact:true}).click();
  await expect(chat.getByRole('button',{name:'Use Microphone',exact:true})).toBeVisible();
  await expect(chat).toContainText('Microphone stopped.');
});
