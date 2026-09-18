
'use client';
import copy from '../../../content/robo-ryan-ui.json';
import { useEffect, useRef, useState } from 'react';
import { greeting, initialChoices, nextIntake, summarize, urgentReply, type Intake, type Step, type ChatMessage } from '@/lib/robo-ryan';
import './robo-ryan.css';
import { openHousecallBooking } from '@/lib/service-request';

export function RoboRyan({ studio=false, offline=false }: { studio?:boolean; offline?:boolean }) {
  const [open,setOpen]=useState(false),[variant,setVariant]=useState('pill');
  const [messages,setMessages]=useState<ChatMessage[]>([{role:'assistant',content:greeting}]);
  const [choices,setChoices]=useState(initialChoices),[step,setStep]=useState<Step>('kind');
  const [intake,setIntake]=useState<Intake>({}),[draft,setDraft]=useState('');
  const [busy,setBusy]=useState(false),[notice,setNotice]=useState('');
  
  const log=useRef<HTMLDivElement>(null),input=useRef<HTMLInputElement>(null),launch=useRef<HTMLButtonElement>(null);

  useEffect(()=>{let seen=false;try{seen=sessionStorage.getItem('robo-ryan-seen')==='yes'}catch{};if(seen&&!studio)return;let autoOpened=false;const timer=setTimeout(()=>{autoOpened=true;setOpen(true)},2500);const cancel=()=>{autoOpened=false;clearTimeout(timer)};const onScroll=()=>{clearTimeout(timer);if(autoOpened){autoOpened=false;setOpen(false)}};document.addEventListener('pointerdown',cancel,{once:true});window.addEventListener('scroll',onScroll,{once:true,passive:true});return()=>{clearTimeout(timer);document.removeEventListener('pointerdown',cancel);window.removeEventListener('scroll',onScroll)}},[studio]);
  useEffect(()=>{log.current?.scrollTo({top:log.current.scrollHeight,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})},[messages,busy,open]);
  function close(){setOpen(false);try{sessionStorage.setItem('robo-ryan-seen','yes')}catch{};launch.current?.focus()}
  function reset(){if(busy)return;setMessages([{role:'assistant',content:greeting}]);setChoices(initialChoices);setStep('kind');setIntake({});setDraft('');setNotice('');setOpen(true)}
  async function send(text:string){
    if(busy||!text.trim())return;if(/^(request service|book|schedule)( now| service)?[.!]?$/i.test(text.trim())){setNotice(copy.text_1);return}setNotice('');setDraft('');const history=[...messages,{role:'user' as const,content:text.trim()}];setMessages(history);setChoices([]);
    const urgent=urgentReply(text);if(urgent){setMessages([...history,{role:'assistant',content:urgent}]);return}
    if(step==='question'||(step==='kind'&&![copy.text_2,copy.text_3,copy.text_4].includes(text))){
      setStep('question');if(offline){setMessages([...history,{role:'assistant',content:copy.text_100}]);return}setBusy(true);
      try{const response=await fetch('/api/robo-ryan',{method:copy.text_101,headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:history.slice(-30)}),signal:AbortSignal.timeout(27000)});const result=await response.json();if(!response.ok)throw new Error(result.error);setMessages([...history,{role:'assistant',content:result.reply}])}catch{setMessages([...history,{role:'assistant',content:copy.text_102}])}finally{setBusy(false)}return;
    }
    const next=nextIntake(step,text,intake);setStep(next.step);setIntake(next.intake);setChoices(next.choices);setMessages([...history,{role:'assistant',content:next.reply}]);
    if(!next.choices.length&&next.step!=='review')input.current?.focus();
  }
  function requestService(){setNotice('');setOpen(false);openHousecallBooking()}
  async function copySummary(){try{await navigator.clipboard.writeText(summarize(intake));setNotice(copy.text_6)}catch{setNotice(copy.text_7)}}
  return <div className="rr-root">
    {studio&&<section className="rr-studio"><div><span>{copy.text_8}</span><h1>{copy.text_9}<br/>{copy.text_10}</h1><p>{copy.text_11}</p></div><div className="rr-studies">{[['pill','01',copy.text_12,copy.text_13],['personal','02',copy.text_14,copy.text_15],['compact','03',copy.text_16,copy.text_17]].map(([id,n,title,desc])=><button key={id} aria-pressed={variant===id} onClick={()=>{setVariant(id);setOpen(false)}}><small>{n} {copy.text_18}{variant===id?copy.text_19:copy.text_20}</small><strong>{title}</strong><p>{desc}</p><span className={`rr-sample rr-sample-${id}`}><ChatIcon/>{id!=='compact'&&(id==='personal'?copy.text_21:copy.text_22)}</span></button>)}</div><div className="rr-studio-actions"><button onClick={reset}>{copy.text_23}</button><a href="https://gojohnsonplumbing.com">{copy.text_24}</a><span>{copy.text_25}</span></div></section>}
    <button ref={launch} className={`rr-launch rr-launch-${variant}`} aria-label={open?copy.text_26:copy.text_27} aria-expanded={open} aria-controls="rr-panel" onClick={()=>{if(open)close();else{setOpen(true);setTimeout(()=>input.current?.focus(),100)}}}><span className="rr-launch-icon">{variant==='personal'?copy.text_28:<ChatIcon/>}</span>{variant!=='compact'&&<span>{variant==='personal'?copy.text_29:copy.text_30}{variant==='personal'&&<small>{copy.text_31}</small>}</span>}<span className="rr-dot"/></button>
    {open&&<section id="rr-panel" className="rr-panel" role="dialog" aria-label={copy.text_32} onKeyDown={e=>{if(e.key==="Escape")close()}}>
      <header className="rr-head"><span className="rr-avatar">{copy.text_34}</span><div><strong>{copy.text_35}</strong><small>{copy.text_36}</small></div><button aria-label={copy.text_37} onClick={close}>{copy.text_38}</button></header>
      <div className="rr-context"><span/> {offline ? copy.text_39 : copy.text_40}</div><button className="rr-service-link" onClick={requestService}>{copy.text_41}<strong>{copy.text_42}</strong></button>
      <div ref={log} className="rr-log" role="log" aria-live="polite"><div className="rr-date">{copy.text_43}</div>{messages.map((m,i)=><div className={`rr-message rr-${m.role}`} key={i}>{m.role==='assistant'&&<small>{copy.text_44}</small>}{m.content}</div>)}
        {!!choices.length&&<div className="rr-choices">{choices.map(c=><button key={c} disabled={busy} onClick={()=>send(c)}>{c}<span>{copy.text_45}</span></button>)}</div>}
        {busy&&<div className="rr-typing" role="status">{copy.text_46}</div>}
        {step==='review'&&<div className="rr-review"><small>{copy.text_47}</small><dl>{Object.entries(intake).map(([key,value])=><div key={key}><dt>{({kind:copy.text_103,fixture:copy.text_104,detail:copy.text_105,city:copy.text_106,timing:copy.text_107} as Record<string,string>)[key]}</dt><dd>{value}</dd></div>)}</dl><button onClick={requestService}>{copy.text_48}</button><button className="rr-text-button" onClick={copySummary}>{copy.text_49}</button><button className="rr-text-button" onClick={()=>{setStep('fixture');setChoices([copy.text_50,copy.text_51,copy.text_52,copy.text_53,copy.text_54]);setMessages(m=>[...m,{role:'assistant',content:copy.text_108}])}}>{copy.text_55}</button></div>}

      </div>
      {notice&&<div className="rr-notice" role="status">{notice}</div>}
      <form className="rr-compose" onSubmit={e=>{e.preventDefault();if(step==='review'){setStep('question');setNotice(copy.text_56);return}void send(draft)}}><label className="rr-sr" htmlFor="rr-input">{copy.text_57}</label><div><input ref={input} id="rr-input" value={draft} onChange={e=>setDraft(e.target.value)} placeholder={copy.text_58} maxLength={1500} disabled={busy||step==='review'}/><button disabled={busy||!draft.trim()||step==='review'} aria-label={copy.text_59}>{copy.text_60}</button></div><footer><button type="button" disabled={busy} onClick={()=>{setStep('question');setChoices([]);setMessages(m=>[...m,{role:'assistant',content:copy.text_109}]);input.current?.focus()}}>{copy.text_61}</button><a href="tel:3142201827">{copy.text_62}</a><button type="button" disabled={busy} onClick={reset}>{copy.text_63}</button></footer></form>
    </section>}
  </div>
}
function ChatIcon(){return <svg viewBox={"0 0 24 24"} fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d={"M21 11a9 9 0 0 1-9 9H4l-2 2V11a9.5 9.5 0 0 1 19 0Z"}/><path d={"M7 9h10M7 13h7"}/></svg>}

