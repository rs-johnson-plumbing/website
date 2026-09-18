import config from '../../content/robo-ryan-external.json';
import type { ChatMessage } from './robo-ryan';

export type Citation = { start:number; end:number; title:string; url:string };
type Brand = (typeof config.brands)[number];
const words=(text:string)=>` ${text.toLowerCase().replace(/[^a-z0-9]+/g,' ')} `;
const brandsIn=(text:string)=>config.brands.filter(b=>b.aliases.some(a=>words(text).includes(` ${a} `)));

export function productLookup(messages:ChatMessage[]) {
  const latest=messages.at(-1)?.content??'';
  const explicit=brandsIn(latest);
  const productDetail=/\b(model|manual|manufacturer|cartridge|part number|error(?: code)?|warranty|specification|compatible|compatibility|look.?up|search|look online)\b/i.test(latest);
  // Only user-provided product context can carry forward; assistant text cannot select a brand.
  const recent=messages.filter(m=>m.role==='user').slice(-4,-1).reverse();
  const prior=recent.map(m=>brandsIn(m.content)).find(b=>b.length);
  const followup=/^(?:it|its|that|this|the model|model|error|code|what about (?:its|that|the)|how (?:often|do i)|does it|can it)\b/i.test(latest.trim())
    ||/^[a-z]*\d[a-z\d-]*[.!?]?$/i.test(latest.trim());
  return {brands:explicit.length?explicit:followup?(prior??[]):[],requested:explicit.length>0||productDetail||!!(prior&&followup)};
}

export function manufacturerFallback(brands:Brand[],reason:'unavailable'|'unverified'|'busy'='unavailable') {
  return {reply:brands.length?(reason==='busy'?config.busy:reason==='unverified'?config.noVerifiedAnswer:config.searchUnavailable):config.identifyProduct,
    sources:brands.map(b=>({title:`${b.name} ${config.sourceSuffix}`,url:b.supportUrl})),externalSearch:false};
}

function trustedUrl(value:unknown,domains:string[]) {
  if(typeof value!=='string')return null;
  try{const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password&&domains.some(d=>url.hostname===d||url.hostname.endsWith(`.${d}`))?url.href:null}catch{return null}
}

type Annotation={type?:string;start_index?:number;end_index?:number;title?:string;url?:string};
type Output={type?:string;status?:string;content?:{type?:string;text?:string;annotations?:Annotation[]}[]};
export function parseManufacturerResponse(result:{status?:string;output?:Output[]},domains:string[]) {
  if(result.status!=='completed'||!result.output?.some(o=>o.type==='web_search_call'&&o.status==='completed'))return null;
  let reply='';const citations:Citation[]=[];
  for(const item of result.output??[])for(const part of item.content??[]){
    if(part.type!=='output_text'||!part.text)continue;
    if(reply)reply+='\n';
    let cursor=0;
    const annotations=(part.annotations??[]).filter(a=>a.type==='url_citation').sort((a,b)=>(a.start_index??0)-(b.start_index??0));
    for(const a of annotations){
      const url=trustedUrl(a.url,domains),start=a.start_index,end=a.end_index;
      if(!url||!Number.isInteger(start)||!Number.isInteger(end)||start!<cursor||end!<start!||end!>part.text.length)continue;
      reply+=part.text.slice(cursor,start);const marker=`[${citations.length+1}]`,offset=reply.length;
      // Replace the provider's citation marker with a compact, accessible inline link.
      reply+=marker;citations.push({start:offset,end:reply.length,url,title:a.title?.slice(0,200)||new URL(url).hostname});cursor=end!;
    }
    reply+=part.text.slice(cursor);
  }
  if(!reply.trim()||!citations.length||/[\uE200\uE201\uE202]/.test(reply))return null;
  const sources=[...new Map(citations.map(c=>[c.url,{title:c.title,url:c.url}])).values()];
  return {reply,citations,sources,externalSearch:true};
}

export async function searchManufacturer(messages:ChatMessage[],brands:Brand[]) {
  const domains=[...new Set(brands.flatMap(b=>b.domains))];
  // Redact common contact details before sending recent product context to the provider.
  const context=messages.filter(m=>m.role==='user').slice(-4).map(m=>({role:'user',content:m.content
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,'[email removed]')
    .replace(/(?:\+?1[ .-]?)?\(?\d{3}\)?[ .-]\d{3}[ .-]\d{4}\b/g,'[phone removed]')
    .replace(/\b\d{1,6}\s+(?:[\w.-]+\s+){1,5}(?:street|st|avenue|ave|road|rd|drive|dr|lane|ln|court|ct|boulevard|blvd)\b\.?/gi,'[address removed]')}));
  const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,'Content-Type':'application/json'},
    body:JSON.stringify({model:process.env.OPENAI_MODEL,instructions:config.instructions,input:context,store:false,max_output_tokens:1600,max_tool_calls:2,
      tools:[{type:'web_search',filters:{allowed_domains:domains},search_context_size:'medium'}],tool_choice:'required'}),signal:AbortSignal.timeout(45000)});
  if(!response.ok)throw new Error('Manufacturer search unavailable');
  return parseManufacturerResponse(await response.json(),domains)??manufacturerFallback(brands,'unverified');
}
