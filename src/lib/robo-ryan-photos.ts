import copy from '../../content/robo-ryan-photos.json';
import type {ChatPhoto} from './robo-ryan';

export function validPhotos(value:unknown):value is ChatPhoto[]{
  return Array.isArray(value)&&value.length<=2&&value.every(photo=>{
    if(!photo||typeof photo.dataUrl!=='string'||photo.dataUrl.length>1000000||!/^data:image\/jpeg;base64,[A-Za-z0-9+/]+={0,2}$/.test(photo.dataUrl))return false;
    const bytes=Buffer.from(photo.dataUrl.split(',')[1],'base64');
    return bytes.length>=4&&bytes[0]===255&&bytes[1]===216&&bytes[2]===255&&bytes.at(-2)===255&&bytes.at(-1)===217;
  });
}

export function photoResult(value:unknown){
  const result=value as {brand?:unknown;model?:unknown;readable?:unknown};
  const valid=(v:unknown)=>typeof v==='string'&&v.length>0&&v.length<=80&&!/[\r\n<>]/.test(v);
  if(!result||result.readable!==true||!valid(result.brand)||!valid(result.model))return {reply:copy.unreadable};
  const productSuggestion={brand:(result.brand as string).trim(),model:(result.model as string).trim()};
  if(!productSuggestion.brand||!productSuggestion.model)return {reply:copy.unreadable};
  return {reply:copy.confirmation.replace('{brand}',productSuggestion.brand).replace('{model}',productSuggestion.model),productSuggestion};
}

export async function readProductLabel(photos:ChatPhoto[]){
  const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,'Content-Type':'application/json'},
    body:JSON.stringify({model:process.env.OPENAI_VISION_MODEL||process.env.OPENAI_MODEL,instructions:copy.instructions,store:false,max_output_tokens:1000,
      input:[{role:'user',content:[{type:'input_text',text:copy.sendPhoto},...photos.map(photo=>({type:'input_image',image_url:photo.dataUrl,detail:'high'}))]}],
      text:{format:{type:'json_schema',name:'plumbing_label',strict:true,schema:{type:'object',properties:{brand:{type:'string'},model:{type:'string'},readable:{type:'boolean'}},required:['brand','model','readable'],additionalProperties:false}}}}),signal:AbortSignal.timeout(40000)});
  if(!response.ok)throw new Error('Photo provider unavailable');
  const result=await response.json();if(result.status!=='completed')throw new Error('Incomplete photo response');
  const text=(result.output??[]).flatMap((o:{content?:{type:string;text?:string}[]})=>o.content??[]).filter((c:{type:string})=>c.type==='output_text').map((c:{text:string})=>c.text).join('');
  return photoResult(JSON.parse(text));
}
