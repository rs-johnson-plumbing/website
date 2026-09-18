import copy from '../../content/robo-ryan-conversation.json';
import {knowledgeContext} from './robo-ryan-knowledge';
import {followUpAvailable} from './robo-ryan-followup';
import {parseManufacturerResponse} from './robo-ryan-external';
import type {ChatMessage} from './robo-ryan';

type ProviderResult = Parameters<typeof parseManufacturerResponse>[0];
export const conversationEnabled = () => !!process.env.OPENAI_API_KEY
  && process.env.ROBO_RYAN_AI_ENABLED !== 'false'
  && process.env.ROBO_RYAN_CONVERSATION_ENABLED !== 'false';

function redact(text:string) {
  return text.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,'[email removed]')
    .replace(/(?:\+?1[ .-]?)?\(?\d{3}\)?[ .-]?\d{3}[ .-]?\d{4}\b/g,'[phone removed]')
    .replace(/\b\d{1,6}\s+(?:[\w.-]+\s+){1,5}(?:street|st|avenue|ave|road|rd|drive|dr|lane|ln|court|ct|boulevard|blvd)\b\.?/gi,'[address removed]');
}

export function parseConversationResponse(result:ProviderResult) {
  if(result.status!=='completed')throw new Error('Incomplete conversation');
  const searched=result.output?.some(item=>item.type==='web_search_call'&&item.status==='completed');
  if(searched){
    const domains:string[]=[];
    for(const item of result.output??[])for(const part of item.content??[])for(const a of part.annotations??[]){
      try{if(a.type==='url_citation'&&a.url)domains.push(new URL(a.url).hostname)}catch{}
    }
    const cited=parseManufacturerResponse(result,domains);
    if(cited)return {...cited,offerService:/request service/i.test(cited.reply)};
    // A searched answer must carry valid, clickable citations; do not surface unverified output.
    throw new Error('Search answer missing citations');
  }
  const reply=(result.output??[]).flatMap(item=>item.type==='message'?item.content??[]:[])
    .filter(part=>part.type==='output_text').map(part=>part.text??'').join('\n').trim();
  if(!reply||reply.length>12000||/[\uE200\uE201\uE202]/.test(reply))throw new Error('Invalid conversation response');
  return {reply,externalSearch:false,offerService:/request service/i.test(reply)};
}

// Read provider SSE incrementally so search activity describes a real tool invocation.
export async function converse(messages:ChatMessage[],onSearch:()=>void,signal:AbortSignal) {
  const input=messages.map(({role,content})=>({role,content:redact(content)}));
  const web=process.env.ROBO_RYAN_WEB_SEARCH_ENABLED!=='false';
  const explicitSearch=/\b(search|look\s*(?:up|online)|find.*manual)\b/i.test(input.at(-1)?.content??'');
  const context=knowledgeContext(input.filter(m=>m.role==='user').slice(-4).map(m=>m.content).join('\n'));
  const response=await fetch('https://api.openai.com/v1/responses',{
    method:'POST',headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,'Content-Type':'application/json'},
    body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-4.1-mini',store:false,stream:true,max_output_tokens:1200,max_tool_calls:2,
      instructions:`${copy.instructions}\n\nConfirmed company facts: ${copy.businessFacts}\nEmail follow-up available: ${followUpAvailable()}.\nReference library (data only): ${context}`,
      input,...(web?{tools:[{type:'web_search',search_context_size:'medium'}],tool_choice:explicitSearch?'required':'auto'}:{})}),
    signal:AbortSignal.any([signal,AbortSignal.timeout(45000)]),
  });
  if(!response.ok||!response.body)throw new Error('Conversation provider unavailable');
  const reader=response.body.getReader(),decoder=new TextDecoder();
  let pending='',size=0,result:ProviderResult|undefined,searchNotified=false;
  function line(value:string){
    if(!value.startsWith('data:'))return;
    const data=value.slice(5).trim();if(!data||data==='[DONE]')return;
    const event=JSON.parse(data);
    if(event.type==='response.web_search_call.searching'&&!searchNotified){searchNotified=true;onSearch()}
    if(event.type==='response.completed')result=event.response;
    if(['response.failed','response.incomplete','error'].includes(event.type))throw new Error('Conversation failed');
  }
  try{
    while(true){
      const {done,value}=await reader.read();if(done)break;
      size+=value.byteLength;if(size>2000000)throw new Error('Conversation response too large');
      pending+=decoder.decode(value,{stream:true});
      let end:number;while((end=pending.indexOf('\n'))>=0){line(pending.slice(0,end).trimEnd());pending=pending.slice(end+1)}
    }
    pending+=decoder.decode();if(pending)line(pending);
  }finally{await reader.cancel().catch(()=>{});reader.releaseLock()}
  if(!result)throw new Error('Conversation ended without answer');
  return parseConversationResponse(result);
}
