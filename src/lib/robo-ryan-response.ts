import type {ChatMessage} from './robo-ryan';
type Answer = Omit<ChatMessage,'role'|'content'> & {reply:string;offerService?:boolean};

export function recentChatHistory(messages:ChatMessage[]) {
  const recent=messages.slice(-30).map(({role,content})=>({role,content:content.slice(0,2000)}));
  while(recent.length>1&&JSON.stringify(recent).length>22000)recent.shift();
  return recent;
}

export async function readChatResponse(response:Response,onSearch:()=>void):Promise<Answer> {
  if(!response.ok)throw new Error('Chat request failed');
  if(response.headers.get('X-Robo-Ryan-Activity')==='web-search')onSearch();
  if(!response.headers.get('Content-Type')?.includes('application/x-ndjson')){
    const answer=await response.json();if(typeof answer.reply!=='string'||!answer.reply.trim())throw new Error('Missing answer');return answer;
  }
  if(!response.body)throw new Error('Missing response');
  const reader=response.body.getReader(),decoder=new TextDecoder();let pending='',answer:Answer|undefined,size=0;
  function line(value:string){
    if(!value.trim())return;
    const event=JSON.parse(value);
    if(event.type==='status'&&event.status==='searching')onSearch();
    if(event.type==='answer'&&typeof event.reply==='string'&&event.reply.trim())answer=event;
  }
  try{while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>100000)throw new Error('Answer too large');pending+=decoder.decode(value,{stream:true});let end:number;while((end=pending.indexOf('\n'))>=0){line(pending.slice(0,end));pending=pending.slice(end+1)}}pending+=decoder.decode();if(pending)line(pending)}
  finally{await reader.cancel().catch(()=>{});reader.releaseLock()}
  if(!answer)throw new Error('Missing answer');return answer;
}
