import {test,expect} from '@playwright/test';
import {NextRequest} from 'next/server';
import {POST} from '../src/app/api/robo-ryan/route';
import {parseConversationResponse} from '../src/lib/robo-ryan-conversation';
import {readChatResponse} from '../src/lib/robo-ryan-response';
import copy from '../content/robo-ryan-conversation.json';

const completed=(text:string)=>({status:'completed',output:[{type:'message',content:[{type:'output_text',text}]}]});
const stream=(events:unknown[])=>new Response(new ReadableStream({start(controller){
  const bytes=new TextEncoder().encode(events.map(event=>`data: ${JSON.stringify(event)}\r\n\r\n`).join(''));
  for(let i=0;i<bytes.length;i+=7)controller.enqueue(bytes.slice(i,i+7));controller.close();
}}),{headers:{'Content-Type':'text/event-stream'}});
const request=(messages:{role:string;content:string}[],ndjson=false)=>new NextRequest('https://example.com/api/robo-ryan',{
  method:'POST',headers:{origin:'https://example.com',Accept:ndjson?'application/x-ndjson':'application/json'},body:JSON.stringify({messages}),
});
const keys=['OPENAI_API_KEY','OPENAI_MODEL','ROBO_RYAN_AI_ENABLED','ROBO_RYAN_CONVERSATION_ENABLED','ROBO_RYAN_WEB_SEARCH_ENABLED'];
async function configured(run:()=>Promise<void>){
  const originals=Object.fromEntries(keys.map(k=>[k,process.env[k]])),originalFetch=global.fetch;
  for(const key of keys)delete process.env[key];process.env.OPENAI_API_KEY='test-only';
  try{await run()}finally{global.fetch=originalFetch;for(const k of keys){if(originals[k]===undefined)delete process.env[k];else process.env[k]=originals[k]}}
}

test('a key activates contextual conversation with redaction, company constraints, and emergency handling',async()=>configured(async()=>{
  const requests:Record<string,unknown>[]=[];
  global.fetch=async(_url,init)=>{requests.push(JSON.parse(String(init?.body)));return stream([{type:'response.completed',response:completed('Where is the water leaking—under a sink, near a toilet, or somewhere else?')}])};
  const first=await(await POST(request([{role:'user',content:'Need a water leak fixed'}]))).json();
  expect(first.reply).toContain('Where is the water leaking');expect(first.followUp).toBeUndefined();
  expect(requests[0].model).toBe('gpt-5.4-mini');expect(requests[0].store).toBe(false);expect(requests[0].tools).toBeTruthy();
  expect(requests[0].instructions).toContain('Do not invent or infer prices');
  const history=[{role:'user',content:'Need a water leak fixed'},{role:'assistant',content:first.reply},{role:'user',content:'Under the kitchen sink. Call 3145551212, me@example.com, 123 Main Street.'}];
  let searches=0;const answer=await readChatResponse(await POST(request(history,true)),()=>searches++);
  expect(answer.reply).toContain('Where is');expect(searches).toBe(0);expect(requests[1].input).toHaveLength(3);
  expect(JSON.stringify(requests[1].input)).toContain('Under the kitchen sink');
  expect(JSON.stringify(requests[1].input)).not.toMatch(/3145551212|me@example.com|123 Main Street/);
  await POST(request([{role:'user',content:'I smell gas near my water heater'}]));expect(requests).toHaveLength(2);
  process.env.ROBO_RYAN_WEB_SEARCH_ENABLED='false';await POST(request([{role:'user',content:'Help'}]));expect(requests[2].tools).toBeUndefined();
  global.fetch=async()=>Response.json({error:'secret provider details'},{status:429});
  expect((await(await POST(request([{role:'user',content:'Need a water leak fixed'}]))).json()).reply).toBe(copy.unavailable);
  process.env.ROBO_RYAN_CONVERSATION_ENABLED='false';
  global.fetch=async()=>{throw new Error('Must not call provider')};
  expect((await(await POST(request([{role:'user',content:'Unmatched zqxv question'}]))).json()).followUp).toBe(true);
}));

test('actual search events drive progress and searched answers retain citations',async()=>configured(async()=>{
  const result={status:'completed',output:[{type:'web_search_call',status:'completed'},{type:'message',content:[{type:'output_text',text:'Read the manual. SOURCE',annotations:[{type:'url_citation',start_index:17,end_index:23,title:'Rinnai Manual',url:'https://www.rinnai.us/document-library'}]}]}]};
  let body:Record<string,unknown>={};
  global.fetch=async(_url,init)=>{body=JSON.parse(String(init?.body));return stream([{type:'response.web_search_call.searching'},{type:'response.completed',response:result}])};
  let searching=0;const answer=await readChatResponse(await POST(request([{role:'user',content:'Search for the Rinnai RU199iN manual'}],true)),()=>searching++);
  expect(searching).toBe(1);expect(body.tool_choice).toBe('required');expect(answer.reply).toBe('Read the manual. [1]');
  expect(answer.citations?.[0].url).toBe('https://www.rinnai.us/document-library');
  expect(()=>parseConversationResponse({...result,status:'incomplete'})).toThrow();
  expect(()=>parseConversationResponse({status:'completed',output:[{type:'web_search_call',status:'completed'},...completed('Unsupported claim').output]})).toThrow();
}));

for(const width of [390,1440])test(`plumbing questions goes to contextual chat at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:900});await page.addInitScript(()=>sessionStorage.setItem('robo-ryan-seen','yes'));
  let received:{role:string;content:string}[]=[];
  await page.route('**/api/robo-ryan',route=>{
    received=route.request().postDataJSON().messages;
    return route.fulfill({contentType:'application/x-ndjson',body:JSON.stringify({type:'answer',reply:'Is it leaking from a pipe connection or the drain under the sink?'})+'\n'});
  });
  await page.goto('/');await page.getByRole('button',{name:'Open Ryan Rabato chat',exact:true}).click();
  const chat=page.getByRole('dialog',{name:'Chat with Ryan Rabato'});
  await chat.getByRole('button',{name:'Ask a Question',exact:true}).click();
  await chat.getByLabel('Message Ryan Rabato').fill('Why is water leaking under my sink?');await chat.getByRole('button',{name:'Send Message',exact:true}).click();
  await expect(chat.locator('.rr-assistant').last()).toContainText('pipe connection');
  expect(received.some(message=>message.content.includes('What can I help you understand'))).toBe(true);expect(received.at(-1)?.content).toBe('Why is water leaking under my sink?');
  await chat.getByLabel('Message Ryan Rabato').fill('Only when I use the faucet');await chat.getByRole('button',{name:'Send Message',exact:true}).click();
  await expect.poll(()=>received.at(-1)?.content).toBe('Only when I use the faucet');
  expect(received.some(message=>message.content.includes('pipe connection'))).toBe(true);expect(await chat.evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true);
});
