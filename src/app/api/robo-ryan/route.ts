import { offerFollowUp } from '@/lib/robo-ryan-followup';
import { NextRequest, NextResponse } from 'next/server';
import { urgentReply } from '@/lib/robo-ryan';
import { knowledgeAnswer } from '@/lib/robo-ryan-knowledge';
import { productLookup, manufacturerFallback, searchManufacturer } from '@/lib/robo-ryan-external';
import photoCopy from '../../../../content/robo-ryan-photos.json';
import {validPhotos,readProductLabel} from '@/lib/robo-ryan-photos';

export const runtime='nodejs';
export const maxDuration=60;
// A per-instance backstop, not a distributed quota. Set provider spend controls before enabling.
let searchWindow=0,searchCount=0;
async function limitedBody(request:NextRequest){
  const reader=request.body?.getReader();if(!reader)return '';
  const decoder=new TextDecoder();let size=0,text='';
  try{while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>2200000){await reader.cancel();return null}text+=decoder.decode(value,{stream:true})}return text+decoder.decode()}
  finally{reader.releaseLock()}
}
// Explicit activation keeps an unconfigured preview from generating paid requests.
export async function POST(request:NextRequest){
  const origin=request.headers.get('origin');
  if(origin && origin!==request.nextUrl.origin)return NextResponse.json({error:'Origin not allowed.'},{status:403});
  const raw=await limitedBody(request);
  if(raw===null)return NextResponse.json({error:'Conversation is too long. Please start a new chat.'},{status:413});
  let data:unknown;try{data=JSON.parse(raw)}catch{return NextResponse.json({error:'Invalid request.'},{status:400})}
  const messages=(data as {messages?:unknown})?.messages;
  if(!Array.isArray(messages)||messages.length<1||messages.length>30||messages.some(m=>!m||!['user','assistant'].includes(m.role)||typeof m.content!=='string'||!m.content.trim()||m.content.length>2000)||messages.at(-1)?.role!=='user')return NextResponse.json({error:'Invalid conversation.'},{status:400});
  if(JSON.stringify(messages).length>24000)return NextResponse.json({error:'Conversation is too long. Please start a new chat.'},{status:413});
  const photos=(data as {photos?:unknown}).photos??[];
  if(!validPhotos(photos))return NextResponse.json({error:photoCopy.unsupported},{status:400});
  const urgent=urgentReply(messages.at(-1).content);
  if(urgent)return NextResponse.json({reply:urgent});
  if(photos.length){
    if(process.env.ROBO_RYAN_AI_ENABLED!=='true'||process.env.ROBO_RYAN_VISION_ENABLED!=='true'||!process.env.OPENAI_API_KEY||!(process.env.OPENAI_VISION_MODEL||process.env.OPENAI_MODEL))
      return NextResponse.json({reply:photoCopy.unavailable},{headers:{'Cache-Control':'no-store'}});
    const now=Date.now();if(now-searchWindow>=60000){searchWindow=now;searchCount=0}
    if(searchCount>=20)return NextResponse.json({reply:photoCopy.busy},{headers:{'Cache-Control':'no-store'}});
    searchCount++;
    try{return NextResponse.json(await readProductLabel(photos),{headers:{'Cache-Control':'no-store'}})}
    catch{return NextResponse.json({reply:photoCopy.failure},{headers:{'Cache-Control':'no-store'}})}
  }
  const reference=knowledgeAnswer(messages.at(-1).content);
  const lookup=productLookup(messages);
  const question=messages.at(-1).content;
  const businessQuestion=/\b(johnson|callback|appointment|dispatch)\b|your (?:hours|price|pricing|rate|warranty|availability|service area)|(?:do|can|will) you (?:charge|come|visit|service|install|repair)|how soon|same.day|24\s*\/\s*7|return.*text|arriv|(?:business|opening|office|after)[- ]hours/i.test(question)
    ||(reference.articleId==='business-policy'&&!(/warrant(?:y|ies)/i.test(question)&&lookup.brands.length));
  if(lookup.requested&&!businessQuestion){
    if(!lookup.brands.length)return NextResponse.json(manufacturerFallback([]));
    if(process.env.ROBO_RYAN_AI_ENABLED!=='true'||process.env.ROBO_RYAN_WEB_SEARCH_ENABLED!=='true'||!process.env.OPENAI_API_KEY||!process.env.OPENAI_MODEL)
      return NextResponse.json(manufacturerFallback(lookup.brands),{headers:{'Cache-Control':'no-store'}});
    const now=Date.now();if(now-searchWindow>=60000){searchWindow=now;searchCount=0}
    if(searchCount>=20)return NextResponse.json(manufacturerFallback(lookup.brands,'busy'),{headers:{'Cache-Control':'no-store'}});
    searchCount++;
    // Flush headers before waiting for the search. Leading whitespace keeps the
    // response valid JSON for existing callers while the chat can show progress.
    const encoder=new TextEncoder();let cancelled=false;
    return new Response(new ReadableStream({
      async start(controller){
        controller.enqueue(encoder.encode(' '));
        let answer;
        try{answer=await searchManufacturer(messages,lookup.brands)}
        catch{answer=manufacturerFallback(lookup.brands)}
        if(!cancelled){controller.enqueue(encoder.encode(JSON.stringify(answer)));controller.close()}
      },
      cancel(){cancelled=true},
    }),{headers:{'Content-Type':'application/json','Cache-Control':'no-store, no-transform','X-Robo-Ryan-Activity':'web-search'}});
  }
  // Unknown questions never fall through to ungrounded model generation.
  const answer = !reference.matched ? {...reference, ...offerFollowUp()}
    : reference.articleId === 'business-policy' ? {...reference, ...offerFollowUp(reference.reply)} : reference;
  return NextResponse.json(answer, {headers: {'Cache-Control': 'no-store'}});
}
