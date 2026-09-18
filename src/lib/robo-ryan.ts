
import copy from '../../content/robo-ryan-flow.json';
export type ChatMessage = { role: 'user' | 'assistant'; content: string };
export type Intake = { kind?: string; fixture?: string; detail?: string; city?: string; timing?: string };
export type Step = 'kind' | 'fixture' | 'detail' | 'city' | 'timing' | 'review' | 'question';
export const greeting = copy.text_0;
export const initialChoices = [copy.text_1, copy.text_2, copy.text_3];
export function nextIntake(step: Step, text: string, intake: Intake): { step: Step; intake: Intake; reply: string; choices: string[] } {
  const next = { ...intake };
  if (step === 'kind') {
    if (![copy.text_4,copy.text_5].includes(text)) return { step:'question', intake:next, reply:copy.text_100, choices:[] };
    next.kind=text;
    return {step:'fixture',intake:next,reply:text===copy.text_6?copy.text_7:copy.text_8,choices:[copy.text_9,copy.text_10,copy.text_11,copy.text_12,copy.text_13]};
  }
  if (step === 'fixture') {
    if(text===copy.text_14) return {step,intake:next,reply:copy.text_101,choices:[]};
    next.fixture=text;
    return {step:'detail',intake:next,reply:next.kind===copy.text_15?copy.text_16:copy.text_17,choices:next.kind===copy.text_18?[copy.text_19,copy.text_20,copy.text_21]:[copy.text_22,copy.text_23,copy.text_24,copy.text_25]};
  }
  if(step==='detail') {
    if(text===copy.text_26)return {step,intake:next,reply:copy.text_102,choices:[]};
    next.detail=text;return {step:'city',intake:next,reply:copy.text_103,choices:[copy.text_27,copy.text_28,copy.text_29,copy.text_30]};
  }
  if(step==='city') {
    if(text===copy.text_31)return {step,intake:next,reply:copy.text_104,choices:[]};
    next.city=text;return {step:'timing',intake:next,reply:copy.text_105,choices:[copy.text_32,copy.text_33,copy.text_34,copy.text_35]};
  }
  next.timing=text;
  return {step:'review',intake:next,reply:copy.text_106,choices:[]};
}
export function summarize(intake:Intake){return Object.entries(intake).map(([key,value])=>`${({kind:copy.text_107,fixture:copy.text_108,detail:copy.text_109,city:copy.text_110,timing:copy.text_111} as Record<string,string>)[key]}: ${value}`).join('\n');}
export function urgentReply(text:string):string|null {
  if(/gas (?:leak|smell)|smell.*gas|carbon monoxide|co alarm|rotten egg/i.test(text)) return copy.text_36;
  if(/water.*(?:electri|outlet|socket)|sparking/i.test(text)) return copy.text_37;
  return null;
}
