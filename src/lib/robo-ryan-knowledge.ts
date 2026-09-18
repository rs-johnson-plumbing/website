import library from '../../content/robo-ryan-knowledge.json';

const stop = new Set('a an the and or of to in at for by with is it this that my your me i we you do does can could would should what why how when are be have has need about on from get please help tell know want some all only'.split(' '));
const normalize = (text:string) => text.toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const tokens = (text:string) => [...new Set(normalize(text).split(' ').filter(t=>t.length>1&&!stop.has(t)).map(t=>t.length>4?t.replace(/s$/,''):t))];
const documents = library.articles.map(article=>({article,terms:article.terms.map(tokens),words:tokens([article.title,...article.questions,...article.terms].join(' '))}));
const weight = (word:string) => 1+Math.log(1+documents.length/(1+documents.filter(d=>d.words.includes(word)).length));
export type KnowledgeSource = {title:string;url:string};

export function searchKnowledge(question:string) {
  const query=tokens(question);
  if(!query.length)return [];
  // Short noun phrases are useful; generic single words are not enough to diagnose a topic.
  const total=query.reduce((n,t)=>n+weight(t),0);
  return documents.map(({article,terms,words})=>{
    const matched=query.filter(t=>words.includes(t));
    const coverage=matched.reduce((n,t)=>n+weight(t),0)/total;
    const exactTerms=terms.filter(ts=>ts.length&&ts.every(t=>query.includes(t)));
    const phrase=Math.max(0,...exactTerms.map(ts=>ts.reduce((n,t)=>n+weight(t),0)));
    const exactQuestion=article.questions.some(q=>normalize(q)===normalize(question));
    const eligible=exactQuestion || (phrase>=3 && coverage>=0.32) || (matched.length>=2 && coverage>=0.65);
    return {article,score:eligible?coverage*5+phrase+matched.length+(exactQuestion?20:0):0};
  }).filter(r=>r.score>0).sort((a,b)=>b.score-a.score).slice(0,3).map(r=>r.article);
}

export function knowledgeAnswer(question:string) {
  // Unknown commercial terms must not be inferred from a technical FAQ match.
  const policy=/\b(price|pricing|cost|charge|fee|quote|warrant(?:y|ies)|financ\w*|discount|callback|insurance|24\s*\/\s*7|same.day)\b|how soon|how much (?:does|will|would|is|are|do you|to)\b|(?:business|opening|office|your|after)[- ]hours|(?:when|what time|are you).*open|return.*text|text.*back|arriv|available (?:today|tonight|now)|come (?:today|tonight|now)/i.test(question);
  const candidates=searchKnowledge(question);
  const article=policy?library.articles.find(a=>a.id==='business-policy'):candidates[0];
  if(!article)return {reply:library.fallback,sources:[] as KnowledgeSource[],knowledge:true,matched:false,version:library.version};
  const sources=article.sourceIds.map(id=>library.sources.find(s=>s.id===id)).filter(s=>s!==undefined).map(s=>({title:s.title,url:s.url}));
  return {reply:`${library.answerLead}\n\n${article.answer}${article.followUp?'\n\n'+article.followUp:''}`,sources,knowledge:true,matched:true,articleId:article.id,version:library.version};
}

export function knowledgeContext(question:string) {
  return JSON.stringify({version:library.version,unconfirmedBusinessFacts:library.pendingConfirmation,referenceData:searchKnowledge(question).map(a=>({title:a.title,kind:a.kind,answer:a.answer,sourceIds:a.sourceIds}))});
}
