import { Fragment } from 'react';
import type { ChatMessage } from '@/lib/robo-ryan';

export function CitedAnswer({message}:{message:ChatMessage}) {
  let cursor=0;
  const parts=(message.citations??[]).map((citation,index)=>{
    if(citation.start<cursor||citation.end>message.content.length||!citation.url.startsWith('https://'))return null;
    const text=message.content.slice(cursor,citation.start);cursor=citation.end;
    return <Fragment key={index}>{text}<a className="rr-citation" href={citation.url} target="_blank" rel="noopener noreferrer" aria-label={citation.title} title={citation.title}>{message.content.slice(citation.start,citation.end)}</a></Fragment>;
  });
  return <>{parts}{message.content.slice(cursor)}</>;
}
