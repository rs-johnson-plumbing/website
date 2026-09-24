
import copy from '../../content/robo-ryan-flow.json';
export type ChatPhoto = {dataUrl:string};
export type ChatMessage = { role: 'user' | 'assistant'; content: string; followUp?:boolean; emailAvailable?:boolean; sources?: {title:string;url:string}[]; citations?: {start:number;end:number;title:string;url:string}[]; photos?:ChatPhoto[]; productSuggestion?:{brand:string;model:string} };
export const greeting = copy.text_0;

// Explicit booking intent hands off without collecting fields already in Housecall.
// Bare symptoms count only at the welcome screen; diagnostic conversations stay in chat.
export function requestsService(text:string, newInquiry=false):boolean {
  const value=text.trim().toLowerCase().replace(/[.!?]+$/, '');
  if(/\b(?:not|don['’]?t|do not|no need|just wondering|just asking)\b/.test(value))return false;
  if(/^(?:how|why|what|where|do i|do we|should i|should we|would i|would we)\b/.test(value))return false;
  if(/^(?:please )?(?:request service|book(?: a visit| service| an appointment)?|schedule(?: service| a repair| an appointment)?|repair|install)$/.test(value))return true;
  if(/\b(?:need|want|would like|looking for)\b.{0,60}\b(?:a plumber|service|an appointment|a visit|fixed|repaired|replaced|installed)\b/.test(value))return true;
  if(/\b(?:can|could|will) you (?:send|come|book|schedule|fix|repair|replace|install)\b/.test(value))return true;
  if(/\b(?:book|schedule|request)\b.{0,35}\b(?:visit|appointment|service|repair|installation)\b/.test(value)&&!/^(?:how|what|when|where|why)\b/.test(value))return true;
  if(!newInquiry||text.includes('?')||/\b(?:how|why|what|can|could|should|help|explain|diagnose|troubleshoot)\b/.test(value))return false;
  return /^(?:my|our|the|i have|there is|there['’]s)\b/.test(value)&&/\b(?:leak(?:ing|s)?|clogged|blocked|broken|no hot water|not working|won['’]?t flush|running toilet)\b/.test(value);
}

export function urgentReply(text:string):string|null {
  if(/gas (?:leak|smell)|smell.*gas|hiss.*gas|gas.*hiss|carbon monoxide|co (?:alarm|detector)|rotten egg/i.test(text)) return copy.text_36;
  if(/(?:water|flood).*(?:electri|outlet|socket)|(?:electri|outlet|socket).*(?:water|flood)|sparking/i.test(text)) return copy.text_37;
  if(/(?:sewage|sewer).*(?:back|floor|flood|overflow)|(?:back|flood|overflow).*sewage/i.test(text)) return copy.sewageSafety;
  if(/burst pipe|pipe.*burst|water.*pour|flooding|ceiling.*(?:water|leak)|water.*ceiling/i.test(text)) return copy.floodSafety;
  return null;
}
