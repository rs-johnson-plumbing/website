"use client";

import { useEffect, useRef } from "react";
import { site, type Service, type BuilderService } from "@/lib/content";
import Image from "next/image";
import { drawingFor, c2Label } from "./drawingFor";
import { C2Button } from "./C2Button";
import { C2Icon } from "./C2Icon";

export type ServiceDetailsContent = Pick<Service, "slug" | "name" | "short" | "problems"> & { hub: Pick<Service["hub"], "whatWeDo"> };

type Props = { service: ServiceDetailsContent | BuilderService; onClose: () => void; onRequest: () => void };

export function C2ServiceDetails({ service, onClose, onRequest }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const homeowner = "problems" in service;
  const bullets = service.slug === "water-heaters" ? ["Diagnose and repair tank water heaters", "Replace tanks and install tankless systems", "Flush tanks and inspect anodes"] : service.hub.whatWeDo.filter(line => !line.includes("["));
  if (service.slug === "gas-lines" && !bullets.length) {
    bullets.push("New gas line installation", "Gas line repairs", "Appliance hookups");
  }
  const problems = service.slug === "water-heaters" ? ["No hot water", "Hot water runs out", "Rumbling or popping", "Moisture at the base"] : homeowner ? service.problems.filter(line => !line.includes("[")) : [];

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const x = window.scrollX, y = window.scrollY;
    const body = document.body;
    const previous = { position: body.style.position, top: body.style.top, left: body.style.left, width: body.style.width, overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    const padding = parseFloat(getComputedStyle(body).paddingRight) || 0;
    Object.assign(body.style, { position: "fixed", top: `-${y}px`, left: `-${x}px`, width: "100%", overflow: "hidden", paddingRight: `${padding + gutter}px` });
    element.showModal();
    closeButton.current?.focus({ preventScroll: true });
    return () => {
      element.close();
      Object.assign(body.style, previous);
      window.scrollTo({ left: x, top: y, behavior: "instant" });
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  return <dialog ref={dialog} className="c2-service-modal" aria-labelledby="service-modal-title"
    onCancel={event => { event.preventDefault(); onClose(); }}
    onKeyDown={event => {
      if (event.key !== "Tab") return;
      const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]')).filter(el => el.getClientRects().length > 0);
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}
    onClick={event => {
      if (event.target !== event.currentTarget) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
    }}>
    <style>{`
      .c2 .c2-service-modal{position:fixed;inset:0;margin:auto;padding:0;width:min(920px,calc(100vw - 48px));max-width:none;max-height:calc(100dvh - 48px);border:1px solid #dce4eb;border-radius:6px;background:#fff;color:#182b50;box-shadow:0 24px 80px #071b354d;overflow:hidden;font-family:var(--font-figtree),Arial,sans-serif}
      .c2 .c2-service-modal[open]{display:flex;flex-direction:column}
      .c2-service-modal::backdrop{background:rgba(11,30,56,.65)}
      .c2-service-modal .sd-top{display:flex;align-items:center;justify-content:space-between;padding:18px 28px 0;gap:16px;flex:none}
      .c2-service-modal .sd-label{font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#1670cf}
      .c2-service-modal .sd-close{display:grid;place-items:center;width:40px;height:40px;background:#fff;border:1px solid #c7d4e2;border-radius:3px;color:#182b50;cursor:pointer;flex:none}
      .c2-service-modal .sd-scroll{overflow:auto;overscroll-behavior:contain;padding:0 28px 24px;min-height:0;display:grid;grid-template-columns:30% minmax(0,1fr);column-gap:30px}
      .c2-service-modal .sd-heading{grid-column:1/-1;padding:0 0 24px;margin-bottom:22px;border-bottom:1px solid #dce4eb}
      .c2-service-modal h2#service-modal-title{font-size:44px;font-weight:800;line-height:1.08;letter-spacing:-.03em;margin:0 0 10px;text-transform:none}
      .c2-service-modal .sd-heading p{font-size:18px;line-height:1.5;color:#536a81;margin:0}
      .c2-service-modal .sd-art{background:#eaf3fb;border-radius:6px;display:flex;align-items:center;justify-content:center;min-height:340px;padding:12px;overflow:hidden}
      .c2-service-modal .sd-art img{width:100%;height:100%;max-height:430px;object-fit:contain;mix-blend-mode:multiply}
      .c2-service-modal .sd-art-heater img{transform:scale(1.35)}
      .c2-service-modal .sd-columns{min-width:0}
      .c2-service-modal h3{font-size:28px;line-height:1.2;font-weight:750;letter-spacing:-.02em;margin:10px 0 20px}
      .c2-service-modal ul{list-style:none;padding:0;margin:0}
      .c2-service-modal li{position:relative;font-size:16px;line-height:1.55;padding-left:26px;margin:0 0 12px;color:#435873}
      .c2-service-modal li::before{content:"";position:absolute;left:0;top:.48em;width:10px;height:10px;border-radius:50%;background:#3375cf}
      .c2-service-modal .sd-problems{border-top:1px solid #dce4eb;margin-top:26px;padding-top:14px}
      .c2-service-modal .sd-problems ul{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:20px}
      .c2-service-modal .sd-assurance{display:flex;align-items:center;gap:14px;margin-top:22px;background:#f8f5ef;border-radius:6px;padding:18px;font-size:15px;line-height:1.45}
      .c2-service-modal .sd-assurance svg{flex:none}
      .c2-service-modal .sd-footer{flex:none;display:flex;justify-content:space-between;align-items:center;gap:16px;background:#fff;border-top:1px solid #dce4eb;padding:18px 24px}
      .c2-service-modal .sd-return{border:0;background:transparent;color:#1670cf;font-size:14px;font-weight:600;cursor:pointer;min-height:44px}
      .c2-service-modal .sd-actions{display:flex;gap:12px}
      .c2-service-modal .sd-actions .c2-btn{border-radius:3px;min-height:48px;padding:12px 18px;font-size:16px}
      @media(max-width:600px){
        .c2 .c2-service-modal{width:calc(100vw - 16px);max-height:calc(100dvh - 16px);border-radius:12px}
        .c2-service-modal .sd-top{padding:12px 18px}
        .c2-service-modal .sd-close{width:44px;height:44px}
        .c2-service-modal .sd-label{font-size:11px}
        .c2-service-modal .sd-scroll{padding:0 18px 18px;grid-template-columns:minmax(0,1fr) 38%;gap:18px}
        .c2-service-modal .sd-heading{grid-column:1;margin:0;padding:0;border:0}
        .c2-service-modal h2#service-modal-title{font-size:32px}
        .c2-service-modal .sd-heading p{font-size:15px}
        .c2-service-modal .sd-art{grid-column:2;min-height:0;align-self:start;padding:6px}
        .c2-service-modal .sd-art img{height:180px}
        .c2-service-modal .sd-art-heater img{transform:scale(1.15)}
        .c2-service-modal .sd-columns{grid-column:1/-1;border-top:1px solid #dce4eb;padding-top:8px}
        .c2-service-modal h3{font-size:23px;margin:10px 0 16px}
        .c2-service-modal li{font-size:14px;padding-left:22px}
        .c2-service-modal li::before{width:9px;height:9px}
        .c2-service-modal .sd-problems ul{column-gap:12px}
        .c2-service-modal .sd-problems li{font-size:12px}
        .c2-service-modal .sd-assurance{font-size:13px;padding:14px}
        .c2-service-modal .sd-footer{display:block;padding:12px 18px}
        .c2-service-modal .sd-return{display:none}
        .c2-service-modal .sd-actions{display:grid;grid-template-columns:1fr;gap:8px}
        .c2-service-modal .sd-actions .c2-btn{padding:10px;font-size:15px;min-height:44px}
      }
    `}</style>
    <header className="sd-top"><span className="sd-label">{homeowner ? "Homeowner Services" : "Builder Services"}</span><button ref={closeButton} type="button" className="sd-close" aria-label="Close service details" onClick={onClose}><C2Icon name="close" size={22}/></button></header>
    <div className="sd-scroll">
      <div className="sd-heading"><h2 id="service-modal-title">{c2Label(service.slug,service.name)}</h2><p>{service.slug === "water-heaters" ? "Repair, replacement, tank and tankless installation." : service.short}</p></div>
      <div className={`sd-art ${service.slug === "water-heaters" ? "sd-art-heater" : ""}`}><Image src={`/images/service-sketches/${drawingFor(service.slug)}.webp`} alt="" width={560} height={665} sizes="(max-width:600px) 130px, 260px" loading="eager" unoptimized /></div>
      <div className={`sd-columns ${problems.length ? "" : "sd-single"}`}>
        <div><h3>What We Do</h3><ul>{bullets.map(line=><li key={line}>{line}</li>)}</ul></div>
        {problems.length > 0 && <aside className="sd-problems"><h3>Common Problems</h3><ul>{problems.map(line=><li key={line}>{line}</li>)}</ul></aside>}
        <div className="sd-assurance"><C2Icon name="shield" size={28}/><span>We explain your options before work begins.</span></div>
      </div>
    </div>
    <footer className="sd-footer"><button type="button" className="sd-return" onClick={onClose}>← Back to services</button><div className="sd-actions">
      {homeowner ? <C2Button onClick={onRequest}>Request Service</C2Button> : <C2Button href="/for-builders#request-a-bid">Request a Bid</C2Button>}
      <C2Button href={site.phone.tel} variant="outline" icon="phone" trailingIcon={null}>Call</C2Button>
    </div></footer>
  </dialog>;
}
