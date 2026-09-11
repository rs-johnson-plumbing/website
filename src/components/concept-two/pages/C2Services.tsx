"use client";
import { services, builderServices } from "@/lib/content";
import { ServiceSketch, PipeBanner } from "@/components/concept-two/ui/ServiceSketch";
import { drawingFor, c2Label } from "@/components/concept-two/ui/drawingFor";
import { C2FinalCta } from "@/components/concept-two/sections/C2FinalCta";
import { C2Button } from "@/components/concept-two/ui/C2Button";
import { useRequestService } from "@/components/concept-two/ui/C2Request";

export function C2Services() {
 const request = useRequestService();
 return <div className="directory-preview c2-services">
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
 .directory-preview summary svg{width:76px;height:76px;margin-bottom:12px;flex:none}
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
 .directory-preview .dp-builders summary{min-height:0;display:grid;grid-template-columns:76px 1fr;column-gap:14px;padding:18px}
 .directory-preview .dp-builders summary svg{grid-row:1/5;margin:0}
 .directory-preview .dp-step{font-size:12px;color:#087bcc;font-weight:700;margin-bottom:4px}
 .directory-preview .dp-builders details[open]{grid-column:auto}
 .directory-preview .dp-builders .dp-short{margin:6px 0 8px}
 .directory-preview .dp-bid{margin-top:24px}
 .directory-preview summary:focus-visible,.directory-preview a:focus-visible{outline:3px solid #087bcc;outline-offset:3px}
 @media(min-width:768px){.directory-preview .dp-wrap{padding:44px 32px}.directory-preview .dp-grid{grid-template-columns:repeat(4,minmax(0,1fr))}.directory-preview .dp-builders .dp-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.directory-preview h1{font-size:48px}}

 /* Illustrated directory authority. */
 .directory-preview .dp-wrap{max-width:1440px}
 .directory-preview .dp-header{position:relative;isolation:isolate;overflow:hidden}
 .directory-preview .dp-header-art{position:absolute;right:0;top:0;width:62%;height:100%;z-index:-1;color:#153e65;mask-image:linear-gradient(90deg,transparent,#000 12%)}
 .directory-preview .dp-header-art svg{width:100%;height:100%}
 .directory-preview .dp-header h1,.directory-preview .dp-header .dp-intro,.directory-preview .dp-jumps{position:relative;max-width:48%}
 .directory-preview .dp-home h2{display:flex;align-items:center;gap:20px}
 .directory-preview .dp-home h2:after{content:"";height:1px;background:#a5b7c6;flex:1}
 .directory-preview .dp-grid{align-items:stretch;gap:16px}
 .directory-preview summary,.directory-preview .dp-builders summary{display:grid;grid-template-columns:minmax(90px,40%) minmax(0,1fr);grid-template-rows:auto 1fr auto;gap:0 12px;min-height:204px;padding:20px 14px;align-items:start}
 .directory-preview summary svg,.directory-preview .dp-builders summary svg{width:100%;height:162px;margin:0;grid-column:1;grid-row:1/4;align-self:center;color:#153e65}
 .directory-preview .dp-title,.directory-preview .dp-short,.directory-preview .dp-more{grid-column:2}
 .directory-preview .dp-title{font-size:16px;line-height:1.3;margin-top:5px}
 .directory-preview .dp-short{font-size:14px;line-height:1.45;margin:8px 0 14px}
 .directory-preview .dp-more{font-size:14px;align-self:end;padding-block:6px}
 .directory-preview details[open] summary{max-width:460px;border-bottom:0}
 .directory-preview details[open]{display:grid;grid-template-columns: minmax(270px,36%) 1fr}
 .directory-preview .dp-detail{border-left:1px solid #dce4eb;margin:20px 0;padding:4px 26px}
 .directory-preview .dp-builders{background:radial-gradient(ellipse at 80% 0%,#224b70,transparent 65%),#102b4e}
 .directory-preview .dp-builders h2{color:#fff}
 .directory-preview .dp-builder-heading{display:flex;justify-content:space-between;align-items:center;position:relative;min-height:146px}
 .directory-preview .dp-builder-heading>div:first-child{position:relative;z-index:1}
 .directory-preview .dp-house{width:330px;height:190px;color:#bed3e5;opacity:.8;margin-top:-32px;margin-bottom:-10px}
 .directory-preview .dp-house svg{width:100%;height:100%;transform:scaleX(1.35);transform-origin:right center}
 .directory-preview .dp-builders .dp-grid{gap:26px 28px;position:relative}
 .directory-preview .dp-builders details{position:relative;overflow:visible;isolation:isolate}
 .directory-preview .dp-builders .dp-step{position:absolute;top:-15px;left:-11px;background:#087bcc;border:3px solid #fff;border-radius:50%;width:38px;height:38px;display:grid;place-items:center;color:#fff;font-size:16px;z-index:2}
 .directory-preview .dp-builders details:after{content:"";position:absolute;left:100%;top:50%;width:29px;height:1px;background:#b6cce0;z-index:-1}
 .directory-preview .dp-builders details:nth-child(3n):after{display:none}
 .directory-preview .dp-builders details[open]{display:block}
 .directory-preview .dp-builders .dp-detail{margin:0;border-left:0;border-top:1px solid #dce4eb;padding:18px}
 .directory-preview .dp-bid{text-align:center;margin-top:30px}
 .directory-preview .dp-bid .c2-btn{background:#fff;color:#102b4e;border-color:#fff;min-width:240px}
 .directory-preview .dp-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
 .c2 .c2-services .c2-final{background:#eaf3fa;color:#102b4e}
 .c2 .c2-services .c2-final h2{color:#102b4e}
 .c2 .c2-services .c2-final .c2-eyebrow{color:#426080}
 .c2 .c2-services .c2-final-mark{opacity:.14}
 .c2 .c2-services .c2-final-mark path{stroke:#2868a8}
 .c2 .c2-services .c2-final-actions .c2-btn{background:#fff;color:#102b4e;border-color:#789bb8}
 .c2 .c2-services .c2-final-actions .c2-btn:last-child{background:#087bcc;color:#fff;border-color:#087bcc}
 @media(min-width:768px) and (max-width:1199px){.directory-preview .dp-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.directory-preview .dp-builders .dp-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.directory-preview .dp-builders details:after{display:none}}
 @media(max-width:767px){
 .directory-preview .dp-header{padding-top:30px;padding-bottom:26px}
 .directory-preview .dp-header-art{width:75%;height:110px;top:0;opacity:.15}
 .directory-preview .dp-header h1,.directory-preview .dp-header .dp-intro,.directory-preview .dp-jumps{max-width:100%}
 .directory-preview .dp-grid{grid-template-columns:1fr;gap:12px}
 .directory-preview summary,.directory-preview .dp-builders summary{grid-template-columns:108px minmax(0,1fr);min-height:170px;padding:14px;gap:0 16px}
 .directory-preview summary svg,.directory-preview .dp-builders summary svg{height:142px}
 .directory-preview .dp-title{font-size:18px}
 .directory-preview .dp-short{font-size:14px}
 .directory-preview details[open]{display:block}
 .directory-preview .dp-detail{border-left:0;border-top:1px solid #dce4eb;margin:0;padding:18px}
 .directory-preview .dp-builder-heading{min-height:142px;align-items:flex-start;padding:5px 0 22px}
 .directory-preview .dp-builder-heading>div:first-child{max-width:78%}
 .directory-preview .dp-house{position:absolute;right:-12px;top:0;width:150px;height:150px;opacity:.2;margin:0;overflow:hidden}
 .directory-preview .dp-builders .dp-grid{gap:25px}
 .directory-preview .dp-builders details:after{display:block!important;left:50%;top:100%;height:26px;width:1px}
 .directory-preview .dp-builders details:last-child:after{display:none!important}
 }
 `}</style>
 <div className="dp-wrap dp-header"><div className="dp-header-art"><PipeBanner/></div><h1>Our Services</h1><p className="dp-intro">Find the right help for your home or next build.</p><nav className="dp-jumps" aria-label="Service audiences"><a href="#homeowner-services">Homeowner Services ↓</a><a href="#builder-services">Builder Services ↓</a></nav></div>
 <section className="dp-home" id="homeowner-services"><div className="dp-wrap"><h2>Homeowner Services</h2><p>Repairs, replacements, and new installations.</p><div className="dp-grid">{services.map(s=><details key={s.slug}><summary><ServiceSketch id={drawingFor(s.slug)}/><span className="dp-title">{c2Label(s.slug,s.name)}</span><span className="dp-short">{s.short}</span><span className="dp-more">View details →</span></summary><div className="dp-detail"><h3>What we do</h3><ul>{s.hub.whatWeDo.filter(x=>!x.includes("[")).map(x=><li key={x}>{x}</li>)}</ul>{s.slug==="gas-lines"&&<p>New gas runs, repairs, and appliance hookups.</p>}<p><a href={`/services/${s.slug}`}>Full service details →</a></p><C2Button onClick={request}>Request Service</C2Button></div></details>)}</div></div></section>
 <section className="dp-builders" id="builder-services"><div className="dp-wrap"><div className="dp-builder-heading"><div><h2>Builder Services</h2><p>Plumbing through every phase of your build.</p></div><div className="dp-house"><ServiceSketch id="house"/></div></div><div className="dp-grid">{builderServices.map((s,i)=><details key={s.slug}><summary><ServiceSketch id={drawingFor(s.slug)}/><span className="dp-step"><span className="dp-sr-only">Phase </span>{String(i+1).padStart(2,"0")}</span><span className="dp-title">{c2Label(s.slug,s.name)}</span><span className="dp-short">{s.short}</span><span className="dp-more">View details →</span></summary><div className="dp-detail"><h3>What we do</h3><ul>{s.hub.whatWeDo.map(x=><li key={x}>{x}</li>)}</ul><a href="/for-builders#request-a-bid">Discuss your project →</a></div></details>)}</div><div className="dp-bid"><C2Button href="/for-builders#request-a-bid" variant="on-dark">Request a Bid</C2Button></div></div></section>
 <C2FinalCta/>
 </div>;
}
