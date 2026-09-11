import Image from "next/image";
import { C2Drawing } from "@/components/concept-two/ui/C2Drawing";
import { C2Button } from "@/components/concept-two/ui/C2Button";
import { C2FinalCta } from "@/components/concept-two/sections/C2FinalCta";
import type { Metadata } from "next";
export const metadata: Metadata = {title:"About Page Concept",robots:{index:false,follow:false}};
export default async function Page({params}:{params:Promise<{concept:string}>}) {
 const {concept}=await params;
 const owner=concept!=="craft";
 const values=[{id:"plans",title:"Clear communication",line:"Talk through the work, the scope, and what comes next."},{id:"other",title:"Care for your home",line:"Thoughtful repairs and a clean, orderly work area."},{id:"roughin",title:"Work that fits the plan",line:"Coordinate the plumbing with the rest of your project."}];
 return <div className={"ap "+(owner?"ap-owner":"ap-craft")}>
 <style>{`
 .ap{font-family:var(--font-figtree),Arial,sans-serif;color:#182b50;background:#fbf9f7}
 .ap .aw{max-width:1200px;margin:auto;padding:56px 32px}
 .ap h1{font-size:clamp(38px,5vw,64px);line-height:1.04;font-weight:800;letter-spacing:-.04em;margin:12px 0 22px}
 .ap h2{font-size:clamp(28px,3vw,38px);line-height:1.12;font-weight:700;margin:0 0 18px}
 .ap h3{font-size:22px;line-height:1.2;font-weight:700;margin:12px 0}
 .ap p{font-size:18px;line-height:1.55;margin:0 0 18px}
 .ap .eyebrow{font-size:12px;letter-spacing:.13em;font-weight:600;text-transform:uppercase;color:#587087}
 .ap .split{display:grid;grid-template-columns:1fr 1fr;gap:52px;align-items:center}
 .ap .portrait{position:relative;height:440px;background:#eef3f8}
 .ap .portrait img{object-fit:cover;object-position:75% center}
 .ap .caption{font-size:13px;color:#627182;margin:10px 0 0}
 .ap .actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}
 .ap .cream{background:#f1eee7}
 .ap .navy{background:#102b4e;color:#fff}
 .ap .navy .eyebrow{color:#a9c8e4}
 .ap .navy p{color:#dbe5ee}.ap .navy h2,.ap .navy h3{color:#fff}
 .ap .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;margin-top:30px}
 .ap .value svg{width:90px;height:90px}
 .ap .value p{font-size:16px}
 .ap .audiences{display:grid;grid-template-columns:1fr 1fr;gap:24px}
 .ap .audience{background:white;border:1px solid #e4e1da}
 .ap .audience .photo{position:relative;height:220px}
 .ap .photo img{object-fit:cover}
 .ap .audience .copy{padding:26px}
 .ap .textlink{font-size:16px;font-weight:700;color:#087bcc;text-decoration:none}
 .ap .story{max-width:780px}
 .ap .story p{font-size:20px}
 .ap .rule{border-top:1px solid #ddd7cd;padding-top:24px;margin-top:26px;font-size:15px}
 .ap .process{display:grid;grid-template-columns:120px 1fr;gap:26px;padding:26px 0;border-top:1px solid #ffffff30}
 .ap .process svg{width:100px;height:100px;background:#f6f8fa}
 .ap .process p{margin:0;font-size:17px}
 .ap .num{color:#9ecdf5;font-size:13px;font-weight:700}
 .ap .compact-owner{display:grid;grid-template-columns:240px 1fr;gap:36px;align-items:center}
 .ap .compact-owner .portrait{height:260px}
 .ap .craft-opening{padding-bottom:36px}
 @media(max-width:700px){
 .ap .aw{padding:32px 20px}
 .ap .split,.ap .grid,.ap .audiences{grid-template-columns:1fr;gap:24px}
 .ap .portrait{height:280px}
 .ap .split{gap:28px}
 .ap .value{display:grid;grid-template-columns:80px 1fr;gap:16px}
 .ap .value svg{width:75px;height:75px;grid-row:1/3}
 .ap .value h3{margin:0 0 8px;font-size:21px}.ap .value p{margin:0}
 .ap .actions{flex-direction:column}.ap .actions a{justify-content:center}
 .ap .process{grid-template-columns:74px 1fr;gap:18px}.ap .process svg{width:70px;height:70px}
 .ap .compact-owner{grid-template-columns:1fr;gap:24px}
 .ap .story p{font-size:18px}.ap .audience .photo{height:185px}
 }
 `}</style>
 {owner?<><section className="aw split"><div><p className="eyebrow">About R.S. Johnson Plumbing</p><h1>A name behind<br/>the work.</h1><p>Meet Ryan Johnson, owner and Master Plumber. Based in O’Fallon, serving homes and builders across St. Charles and St. Louis.</p><div className="actions"><C2Button href="tel:3142201827" icon="phone" trailingIcon={null}>Talk to Ryan</C2Button><C2Button href="/services" variant="outline" className="c2-btn--quiet">Explore Services</C2Button></div></div><div><div className="portrait"><Image src="/images/concept-two/hero-desktop-authority.webp" alt="Approved illustration of Ryan beside the company van" fill priority sizes="(min-width:701px) 50vw,100vw"/></div><p className="caption">Ryan Johnson · Owner & Master Plumber</p></div></section>
 <section className="cream"><div className="aw"><div className="story"><p className="eyebrow">A local business. A personal approach.</p><h2>Plumbing is personal.</h2><p>It is your home, your project, and your time. Our approach is straightforward: explain the work, respect the space, and keep you informed.</p><p>From homeowner repairs to new construction, R.S. Johnson Plumbing brings practical experience to the job.</p><div className="rule">Locally owned · O’Fallon, Missouri · Licensed & insured</div></div></div></section>
 <section className="aw"><h2>What you can expect</h2><div className="grid">{values.map(v=><div className="value" key={v.id}><C2Drawing id={v.id}/><div><h3>{v.title}</h3><p>{v.line}</p></div></div>)}</div></section></>:
 <><section className="aw craft-opening"><p className="eyebrow">About R.S. Johnson Plumbing</p><h1>Good work.<br/>Clear communication.</h1><p className="story">A local plumbing company for the people who live in homes—and the people who build them.</p><div className="actions"><C2Button href="/services" variant="outline" className="c2-btn--quiet">Explore Our Services</C2Button></div></section>
 <section className="navy"><div className="aw split"><div><p className="eyebrow">Our approach</p><h2>Care in every step.</h2><p>From the first conversation to the finishing details, clear expectations make a better experience.</p></div><div>{[{id:"plans",title:"Understand the job",line:"Start with the problem, the plans, and what you need."},{id:"roughin",title:"Plan the work",line:"Talk through the scope and coordinate the next steps."},{id:"trim",title:"Mind the details",line:"Make the connections, check the work, and explain the result."}].map((v,i)=><div className="process" key={v.id}><C2Drawing id={v.id}/><div><span className="num">0{i+1}</span><h3>{v.title}</h3><p>{v.line}</p></div></div>)}</div></div></section>
 <section className="aw compact-owner"><div className="portrait"><Image src="/images/concept-two/hero-desktop-authority.webp" alt="Approved illustration of Ryan beside the company van" fill sizes="(min-width:701px) 240px,100vw"/></div><div><p className="eyebrow">Meet the owner</p><h2>Ryan Johnson</h2><p>Owner & Master Plumber</p><p>Based in O’Fallon, Ryan works with homeowners and builders across St. Charles and St. Louis.</p><a className="textlink" href="tel:3142201827">Talk to Ryan →</a></div></section></>}
 <section className="cream"><div className="aw"><h2>One company. Two kinds of projects.</h2><div className="audiences">{[{title:"For your home",src:"homeowner-personal-service.webp",line:"Repairs, replacements, and new installations.",href:"/for-homeowners",link:"Homeowner Services"},{title:"For your next build",src:"builders-plans-review.webp",line:"Plumbing for new construction and renovations.",href:"/for-builders",link:"Builder Services"}].map(a=><article className="audience" key={a.title}><div className="photo"><Image src={"/images/concept-two/"+a.src} alt={a.title} fill sizes="(min-width:701px) 50vw,100vw"/></div><div className="copy"><h3>{a.title}</h3><p>{a.line}</p><a className="textlink" href={a.href}>{a.link} →</a></div></article>)}</div></div></section>
 <C2FinalCta/>
 </div>;
}