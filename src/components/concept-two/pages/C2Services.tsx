"use client";
import { services, builderServices } from "@/lib/content";
import { C2Drawing } from "@/components/concept-two/ui/C2Drawing";
import { drawingFor, c2Label } from "@/components/concept-two/ui/drawingFor";
import { C2FinalCta } from "@/components/concept-two/sections/C2FinalCta";
import { C2Button } from "@/components/concept-two/ui/C2Button";
import { useRequestService } from "@/components/concept-two/ui/C2Request";

export function C2Services() {
 const request = useRequestService();
 return <div className="directory-preview">
 <style>{`
 .directory-preview {color:#182b50;background:#fbf9f7;font-family:var(--font-figtree),Arial,sans-serif}
 .directory-preview .dp-wrap{max-width:1200px;margin:auto;padding:28px 20px}
 .directory-preview .dp-note{font-size:12px;color:#526477;margin:0 0 16px}
 .directory-preview h1{font-size:40px;line-height:1.05;font-weight:800;letter-spacing:-.04em;margin:0 0 12px}
 .directory-preview h2{font-size:27px;line-height:1.15;font-weight:700;margin:0 0 8px}
 .directory-preview .dp-intro{font-size:17px;line-height:1.45;margin:0 0 20px;max-width:36em}
 .directory-preview .dp-jumps{display:flex;gap:22px;flex-wrap:wrap}
 .directory-preview .dp-jumps a{color:#087bcc;font-weight:700;font-size:15px;padding:8px 0;text-decoration:underline;text-underline-offset:5px}
 .directory-preview .dp-home{background:#f3f0e9}
 .directory-preview .dp-builders{background:#102b4e;color:white}
 .directory-preview section{scroll-margin-top:90px}
 .directory-preview .dp-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:22px;align-items:start}
 .directory-preview details{background:#fff;color:#182b50;border:1px solid #e5e1da;border-radius:6px;overflow:hidden}
 .directory-preview summary{list-style:none;cursor:pointer;min-height:208px;padding:16px 12px;display:flex;flex-direction:column;align-items:flex-start}
 .directory-preview summary::-webkit-details-marker{display:none}
 .directory-preview summary svg{width:58px;height:58px;margin-bottom:12px;flex:none}
 .directory-preview .dp-title{font-size:17px;font-weight:700;line-height:1.2}
 .directory-preview .dp-short{font-size:13px;line-height:1.4;color:#657080;margin:8px 0 12px}
 .directory-preview .dp-more{font-size:13px;color:#087bcc;font-weight:700;margin-top:auto}
 .directory-preview details[open]{grid-column:1/-1}
 .directory-preview details[open] summary{min-height:0;border-bottom:1px solid #e5e1da}
 .directory-preview details[open] .dp-more{font-size:0}
 .directory-preview details[open] .dp-more:after{content:"Close details −";font-size:13px}
 .directory-preview .dp-detail{padding:18px;font-size:15px;line-height:1.5}
 .directory-preview .dp-detail ul{padding-left:20px;margin:12px 0 18px}
 .directory-preview .dp-detail li{margin:6px 0}
 .directory-preview .dp-detail a{color:#087bcc;font-weight:700}
 .directory-preview .dp-detail h3{font-size:17px;font-weight:700}
 .directory-preview .dp-builders .dp-grid{grid-template-columns:1fr}
 .directory-preview .dp-builders summary{min-height:0;display:grid;grid-template-columns:62px 1fr;column-gap:14px;padding:18px}
 .directory-preview .dp-builders summary svg{grid-row:1/5;margin:0}
 .directory-preview .dp-step{font-size:12px;color:#087bcc;font-weight:700;margin-bottom:4px}
 .directory-preview .dp-builders details[open]{grid-column:auto}
 .directory-preview .dp-builders .dp-short{margin:6px 0 8px}
 .directory-preview .dp-bid{margin-top:24px}
 .directory-preview summary:focus-visible,.directory-preview a:focus-visible{outline:3px solid #087bcc;outline-offset:3px}
 @media(min-width:768px){.directory-preview .dp-wrap{padding:44px 32px}.directory-preview .dp-grid{grid-template-columns:repeat(4,minmax(0,1fr))}.directory-preview .dp-builders .dp-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.directory-preview h1{font-size:48px}}
 `}</style>
 <div className="dp-wrap"><h1>Our Services</h1><p className="dp-intro">Find the right help for your home or next build.</p><nav className="dp-jumps" aria-label="Service audiences"><a href="#homeowner-services">Homeowner Services ↓</a><a href="#builder-services">Builder Services ↓</a></nav></div>
 <section className="dp-home" id="homeowner-services"><div className="dp-wrap"><h2>Homeowner Services</h2><p>Repairs, replacements, and new installations.</p><div className="dp-grid">{services.map(s=><details key={s.slug}><summary><C2Drawing id={drawingFor(s.slug)}/><span className="dp-title">{c2Label(s.slug,s.name)}</span><span className="dp-short">{s.short}</span><span className="dp-more">View details →</span></summary><div className="dp-detail"><h3>What we do</h3><ul>{s.hub.whatWeDo.filter(x=>!x.includes("[")).map(x=><li key={x}>{x}</li>)}</ul>{s.slug==="gas-lines"&&<p>New gas runs, repairs, and appliance hookups.</p>}<p><a href={`/services/${s.slug}`}>Full service details →</a></p><C2Button onClick={request}>Request Service</C2Button></div></details>)}</div></div></section>
 <section className="dp-builders" id="builder-services"><div className="dp-wrap"><h2>Builder Services</h2><p>Plumbing through every phase of your build.</p><div className="dp-grid">{builderServices.map((s,i)=><details key={s.slug}><summary><C2Drawing id={drawingFor(s.slug)}/><span className="dp-step">PHASE {String(i+1).padStart(2,"0")}</span><span className="dp-title">{c2Label(s.slug,s.name)}</span><span className="dp-short">{s.short}</span><span className="dp-more">View details →</span></summary><div className="dp-detail"><h3>What we do</h3><ul>{s.hub.whatWeDo.map(x=><li key={x}>{x}</li>)}</ul><a href="/for-builders#request-a-bid">Discuss your project →</a></div></details>)}</div><div className="dp-bid"><C2Button href="/for-builders#request-a-bid" variant="on-dark">Request a Bid</C2Button></div></div></section>
 <C2FinalCta/>
 </div>;
}
