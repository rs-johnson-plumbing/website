'use client';
/* eslint-disable @next/next/no-img-element -- Local re-encoded photo previews must not go through an image proxy. */
import {useRef,useState} from 'react';
import copy from '../../../content/robo-ryan-photos.json';
import type {ChatPhoto} from '@/lib/robo-ryan';

export async function preparePhoto(file:File):Promise<ChatPhoto> {
  if(file.size>20*1024*1024)throw new Error(copy.tooLarge);
  if(!file.type.startsWith('image/'))throw new Error(copy.unsupported);
  const url=URL.createObjectURL(file);
  try{
    const image=new Image();image.src=url;await image.decode();
    if(!image.naturalWidth||!image.naturalHeight||image.naturalWidth*image.naturalHeight>40000000)throw new Error(copy.tooLarge);
    const scale=Math.min(1,1600/Math.max(image.naturalWidth,image.naturalHeight));
    const canvas=document.createElement('canvas');canvas.width=Math.round(image.naturalWidth*scale);canvas.height=Math.round(image.naturalHeight*scale);
    const context=canvas.getContext('2d');if(!context)throw new Error(copy.unsupported);
    context.fillStyle='#fff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(image,0,0,canvas.width,canvas.height);
    for(const quality of [.86,.72,.56]){const dataUrl=canvas.toDataURL('image/jpeg',quality);if(dataUrl.length<=1000000)return {dataUrl}}
    throw new Error(copy.tooLarge);
  }finally{URL.revokeObjectURL(url)}
}

export function PhotoAttachments({photos,onChange,disabled,onPreparing}:{photos:ChatPhoto[];onChange:(photos:ChatPhoto[])=>void;disabled:boolean;onPreparing:(preparing:boolean)=>void}){
  const [expanded,setExpanded]=useState(false),[error,setError]=useState(''),[preparing,setPreparing]=useState(false);
  const camera=useRef<HTMLInputElement>(null),library=useRef<HTMLInputElement>(null);
  async function choose(files:FileList|null){
    if(!files?.length)return;setError('');
    if(files.length+photos.length>2){setError(copy.limit);return}
    setPreparing(true);onPreparing(true);
    try{const added=[];for(const file of Array.from(files))added.push(await preparePhoto(file));onChange([...photos,...added]);setExpanded(false)}
    catch(error){setError(error instanceof Error&&[copy.tooLarge,copy.unsupported].includes(error.message)?error.message:copy.unsupported)}
    finally{setPreparing(false);onPreparing(false)}
  }
  return <div className={`rr-photos${expanded||photos.length||error||preparing?' rr-photos-expanded':''}`}>
    <button type="button" className="rr-photo-toggle" aria-expanded={expanded} onClick={()=>setExpanded(!expanded)} disabled={disabled||preparing}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M3 7h4l2-3h6l2 3h4v14H3Z"/><circle cx="12" cy="13" r="4"/></svg>{copy.add}
    </button>
    <input ref={camera} hidden type="file" accept="image/*" capture="environment" aria-label={copy.take} disabled={disabled||preparing} onChange={e=>{void choose(e.currentTarget.files);e.currentTarget.value=''}}/>
    <input ref={library} hidden type="file" accept="image/*" multiple aria-label={copy.choose} disabled={disabled||preparing} onChange={e=>{void choose(e.currentTarget.files);e.currentTarget.value=''}}/>
    {expanded&&<div className="rr-photo-options"><p>{copy.hint}</p><button type="button" disabled={disabled||preparing} onClick={()=>camera.current?.click()}>{copy.take}</button><button type="button" disabled={disabled||preparing} onClick={()=>library.current?.click()}>{copy.choose}</button></div>}
    {!!photos.length&&<><div className="rr-photo-previews">{photos.map((photo,i)=><div key={i}>{/* Re-encoded local preview; no public upload URL. */}<img src={photo.dataUrl} alt={`${copy.alt} ${i+1}`}/><button type="button" disabled={disabled||preparing} aria-label={`${copy.remove} ${i+1}`} onClick={()=>onChange(photos.filter((_,index)=>index!==i))}>×</button></div>)}</div><p className="rr-photo-disclosure">{copy.sharing}</p></>}
    {(error||preparing)&&<p role="status" className="rr-photo-error">{preparing?copy.preparing:error}</p>}
  </div>
}
