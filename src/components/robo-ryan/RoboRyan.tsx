
'use client';
/* eslint-disable @next/next/no-img-element -- Chat photos stay as local data URLs, without an image proxy or public storage. */
import copy from '../../../content/robo-ryan-ui.json';
import photoCopy from '../../../content/robo-ryan-photos.json';
import {FollowUp} from './FollowUp';
import {PhotoAttachments} from './PhotoAttachments';
import { useEffect, useRef, useState } from 'react';
import { greeting, requestsService, urgentReply, type ChatMessage, type ChatPhoto } from '@/lib/robo-ryan';
import './robo-ryan.css';
import { useChatVoice } from './useChatVoice';
import { CitedAnswer } from './CitedAnswer';
import { openHousecallBooking } from '@/lib/service-request';
import {readChatResponse,recentChatHistory} from '@/lib/robo-ryan-response';

export function RoboRyan({ studio=false, offline=false }: { studio?:boolean; offline?:boolean; live?:boolean }) {
  const [open,setOpen]=useState(false),[variant,setVariant]=useState('personal');
  const [messages,setMessages]=useState<ChatMessage[]>([{role:'assistant',content:greeting}]);
  const [showWelcome,setShowWelcome]=useState(true);
  const [draft,setDraft]=useState('');
  const [busy,setBusy]=useState(false);
  const [searchingWeb,setSearchingWeb]=useState(false);
  const [photos,setPhotos]=useState<ChatPhoto[]>([]),[preparingPhoto,setPreparingPhoto]=useState(false);
  const [bookingOffered,setBookingOffered]=useState(false);
  const nearBottom=useRef(true);
  const [showLatest,setShowLatest]=useState(false);
  const voice=useChatVoice(setDraft);
  const messageCount=useRef(messages.length);
  const {speakReply}=voice;
  useEffect(()=>{const added=messages.length>messageCount.current;messageCount.current=messages.length;const last=messages.at(-1);if(open&&added&&last?.role==='assistant')speakReply(last.content)},[messages,open,speakReply]);
  
  const selectedConcept=copy.launcherConcepts.find(concept=>concept.id===variant)??copy.launcherConcepts[0];
  const log=useRef<HTMLDivElement>(null),input=useRef<HTMLTextAreaElement>(null),launch=useRef<HTMLButtonElement>(null);

  useEffect(()=>{if(nearBottom.current)log.current?.scrollTo({top:log.current.scrollHeight,behavior:'auto'})},[messages,busy,open]);
  useEffect(()=>{const field=input.current;if(field){field.style.height='auto';field.style.height=Math.min(field.scrollHeight,140)+'px'}},[draft,open]);
  function latest(){nearBottom.current=true;setShowLatest(false);log.current?.scrollTo({top:log.current.scrollHeight,behavior:'auto'})}
  function trackScroll(){const el=log.current;if(el){nearBottom.current=el.scrollHeight-el.scrollTop-el.clientHeight<64;setShowLatest(!nearBottom.current)}}
  function close(){voice.stopAll();setOpen(false);try{sessionStorage.setItem('robo-ryan-seen','yes')}catch{};requestAnimationFrame(()=>launch.current?.focus())}
  function reset(){if(busy||preparingPhoto)return;nearBottom.current=true;setShowLatest(false);setPhotos([]);voice.stopAll();setMessages([{role:'assistant',content:greeting}]);setShowWelcome(true);setDraft('');setBookingOffered(false);setOpen(true)}
  async function send(text:string){
    if(busy||preparingPhoto||(!text.trim()&&!photos.length)||voice.listening)return;
    nearBottom.current=true;setShowLatest(false);text=text.trim()||photoCopy.sendPhoto;
    const attached=photos;setPhotos([]);voice.stopAll();setDraft('');
    const history=[...messages,{role:'user' as const,content:text,...(attached.length?{photos:attached}:{})}];
    setMessages(history);setShowWelcome(false);setBookingOffered(false);
    // Safety advice stays visible instead of being hidden by the booking modal.
    const urgent=urgentReply(text);
    if(urgent){setMessages([...history,{role:'assistant',content:urgent}]);setBookingOffered(true);return}
    if(requestsService(text,showWelcome)){requestService();return}
    if(offline){setMessages([...history,{role:'assistant',content:attached.length?photoCopy.preview:copy.text_100}]);return}
    setSearchingWeb(false);setBusy(true);
    try{
      const response=await fetch('/api/robo-ryan',{method:copy.text_101,headers:{'Content-Type':'application/json','Accept':'application/x-ndjson'},body:JSON.stringify({messages:recentChatHistory(history),photos:attached}),signal:AbortSignal.timeout(55000)});
      const result=await readChatResponse(response,()=>setSearchingWeb(true));
      setBookingOffered(!!result.offerService);
      setMessages([...history,{role:'assistant',content:result.reply,sources:result.sources,citations:result.citations,productSuggestion:result.productSuggestion,followUp:result.followUp,emailAvailable:result.emailAvailable}]);
    }catch{setMessages([...history,{role:'assistant',content:copy.text_102,followUp:true}])}
    finally{setSearchingWeb(false);setBusy(false)}
  }
  function askQuestion(){setShowWelcome(false);setMessages(m=>[...m,{role:'assistant',content:copy.questionPrompt}]);input.current?.focus()}
  function requestService(){voice.stopAll();setOpen(false);openHousecallBooking()}
  return <div className={`rr-root rr-theme-${variant}`}>
    {studio&&<section className="rr-studio"><div><span>{copy.text_8}</span><h1>{copy.text_9}<br/>{copy.text_10}</h1><p>{copy.text_11}</p></div><div className="rr-studies">{copy.launcherConcepts.map(concept=><button key={concept.id} aria-pressed={variant===concept.id} onClick={()=>{voice.stopAll();setVariant(concept.id);setOpen(false)}}><span className="rr-study-meta"><small>{concept.number}</small><span>{concept.tag}</span></span><strong>{concept.title}</strong><p>{concept.description}</p><span className="rr-concept-scene"><span className="rr-scene-brand">{copy.sceneBrand}</span><span className="rr-scene-title">{copy.sceneTitle}</span><span className="rr-scene-detail">{copy.sceneDetail}</span><span className={`rr-sample rr-sample-${concept.id}`}>{concept.id==='personal'?<span className="rr-personal-badge">{copy.text_28}</span>:concept.id==='copper'?<MicIcon/>:<ChatIcon/>}<span>{concept.label}{concept.detail&&<small>{concept.detail}</small>}</span></span></span></button>)}</div><div className="rr-studio-actions"><button onClick={reset}>{copy.text_23}</button><a href="https://gojohnsonplumbing.com">{copy.text_24}</a><span>{copy.text_25}</span></div></section>}
    <button ref={launch} className={`rr-launch rr-launch-${variant}`} aria-label={open?copy.text_26:copy.text_27} aria-expanded={open} aria-controls="rr-panel" onClick={()=>{if(open)close();else{setOpen(true);setTimeout(()=>input.current?.focus(),100)}}}><span className="rr-launch-icon">{variant==='personal'?copy.text_28:variant==='copper'?<MicIcon/>:<ChatIcon/>}</span><span>{selectedConcept.label}{selectedConcept.detail&&<small>{selectedConcept.detail}</small>}</span></button>
    {open&&<section id="rr-panel" className="rr-panel" role="dialog" aria-label={copy.text_32} onKeyDown={e=>{if(e.key==="Escape")close()}}>
      <header className="rr-head"><span className="rr-avatar">{copy.text_34}</span><div><strong>{copy.text_35}</strong><small>{copy.assistantLabel}</small></div><div className="rr-head-actions"><button type="button" aria-label={voice.readReplies?copy.voice.mute:copy.voice.read} title={voice.readReplies?copy.voice.mute:copy.voice.read} aria-pressed={voice.readReplies} onClick={voice.toggleReadReplies}><SpeakerIcon muted={!voice.readReplies}/></button><a href="tel:3142201827" aria-label={copy.voice.call} title={copy.voice.call} onClick={voice.stopAll}><PhoneIcon/></a><button aria-label={copy.text_37} onClick={close}>{copy.text_38}</button></div></header>
      <div ref={log} className="rr-log" onScroll={trackScroll} role="log" aria-live="polite">{messages.map((m,i)=><div className={`rr-message rr-${m.role}`} key={i}>{!!m.photos?.length&&<div className="rr-message-photos">{m.photos.map((photo,index)=><img key={index} src={photo.dataUrl} alt={`${photoCopy.alt} ${index+1}`}/>)}</div>}<CitedAnswer message={m}/>{m.followUp&&<FollowUp messages={messages.slice(0,i+1)} emailAvailable={m.emailAvailable} requestService={requestService}/>}{m.productSuggestion&&<div className="rr-choices rr-confirm-product"><button disabled={busy||preparingPhoto||!!photos.length} onClick={()=>send(`${m.productSuggestion!.brand} model ${m.productSuggestion!.model}`)}>{photoCopy.confirm}</button></div>}{!!m.sources?.length&&<nav className="rr-sources" aria-label={copy.sourcesLabel}>{m.sources.map(source=><a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.title} ↗</a>)}</nav>}{m.role==='assistant'&&<div className="rr-message-actions"><button type="button" aria-label={copy.voice.replay} title={copy.voice.replay} onClick={()=>voice.readAnswer(m.content)}><SpeakerIcon/></button></div>}</div>)}
        {showWelcome&&<div className="rr-choices"><button onClick={requestService}>{copy.text_48}</button><button onClick={askQuestion}>{copy.askQuestion}</button></div>}
        {bookingOffered&&<div className="rr-choices"><button onClick={requestService}>{copy.text_48}</button></div>}
        {busy&&<div className="rr-typing" role="status">{searchingWeb?copy.searchingWeb:copy.text_46}</div>}

      </div>
      {showLatest&&<button className="rr-latest" type="button" onClick={latest}>{copy.latestMessage} <span aria-hidden="true">↓</span></button>}
      <form className="rr-compose" onSubmit={e=>{e.preventDefault();void send(draft)}}>
        <label className="rr-sr" htmlFor="rr-input">{copy.text_57}</label>
        <textarea ref={input} id="rr-input" rows={1} value={draft} onChange={e=>setDraft(e.target.value)} placeholder={copy.text_58} maxLength={1500} disabled={busy||voice.listening} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.nativeEvent.isComposing&&!window.matchMedia('(pointer: coarse)').matches){e.preventDefault();void send(draft)}}}/>
        <PhotoAttachments photos={photos} onChange={setPhotos} disabled={busy||voice.listening} onPreparing={setPreparingPhoto}/>
        <div className="rr-compose-actions"><button className="rr-mic" type="button" disabled={busy} aria-label={voice.listening?copy.voice.stop:copy.voice.start} title={voice.listening?copy.voice.stop:copy.voice.start} aria-pressed={voice.listening} onClick={()=>voice.startListening(draft)}><MicIcon active={voice.listening}/></button><button className="rr-send" type="submit" disabled={busy||preparingPhoto||voice.listening||(!draft.trim()&&!photos.length)} aria-label={copy.text_59}><SendIcon/></button></div>
        {(voice.help||voice.speaking)&&<div className="rr-voice-status"><p role="status">{voice.listening?copy.voice.listening:voice.help}</p>{voice.speaking&&<button type="button" onClick={voice.stopSpeaking}>{copy.voice.stopPlayback}</button>}</div>}
      </form>
    </section>}
  </div>
}
function ChatIcon(){return <svg viewBox={"0 0 24 24"} fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d={"M21 11a9 9 0 0 1-9 9H4l-2 2V11a9.5 9.5 0 0 1 19 0Z"}/><path d={"M7 9h10M7 13h7"}/></svg>}


function SendIcon(){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>}

function MicIcon({active=false}:{active?:boolean}){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">{active?<rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor"/>:<><rect x="9" y="2" width="6" height="13" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8"/></>}</svg>}
function SpeakerIcon({muted=false}:{muted?:boolean}){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 4 5 9H2v6h3l6 5Z"/>{muted?<path d="m16 9 6 6m0-6-6 6"/>:<><path d="M15 8a6 6 0 0 1 0 8M18 4a11 11 0 0 1 0 16"/></>}</svg>}
function PhoneIcon(){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 3 4 4-2 3a15 15 0 0 0 7 7l3-2 4 4-2 3C9 22 2 15 2 5Z"/></svg>}
