"use client";

import { useEffect, useRef } from "react";
import { site, type Service, type BuilderService } from "@/lib/content";
import Image from "next/image";
import { drawingFor, c2Label } from "./drawingFor";
import { C2Button } from "./C2Button";
import { C2Icon } from "./C2Icon";

type Props = { service: Service | BuilderService; onClose: () => void; onRequest: () => void };

export function C2ServiceDetails({ service, onClose, onRequest }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const homeowner = "problems" in service;
  const bullets = service.hub.whatWeDo.filter(line => !line.includes("["));
  if (service.slug === "gas-lines" && !bullets.length) {
    bullets.push("New gas line installation", "Gas line repairs", "Appliance hookups");
  }
  const problems = homeowner ? service.problems.filter(line => !line.includes("[")) : [];

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
      .c2 .c2-service-modal{position:fixed;inset:0;margin:auto;padding:0;width:min(920px,calc(100vw - 48px));max-width:none;max-height:calc(100dvh - 48px);border:1px solid #dce4eb;border-radius:6px;background:#fbf9f7;color:#182b50;box-shadow:0 24px 80px #071b354d;overflow:hidden;font-family:var(--font-figtree),Arial,sans-serif}
      .c2 .c2-service-modal[open]{display:flex;flex-direction:column}
      .c2-service-modal::backdrop{background:rgba(11,30,56,.65)}
      .c2-service-modal .sd-top{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 24px;border-bottom:1px solid #dce4eb;background:#fff;flex:none}
      .c2-service-modal .sd-label{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#546b84}
      .c2-service-modal .sd-close{display:grid;place-items:center;width:44px;height:44px;background:#fff;border:1px solid #c7d4e2;border-radius:3px;color:#182b50;cursor:pointer;flex:none}
      .c2-service-modal .sd-scroll{overflow:auto;overscroll-behavior:contain;padding:28px;min-height:0}
      .c2-service-modal .sd-heading{display:grid;grid-template-columns:170px 1fr;gap:28px;align-items:center;padding-bottom:24px}
      .c2-service-modal .sd-heading>img{width:170px;height:200px}
      .c2-service-modal h2#service-modal-title{font-size:clamp(28px,3vw,40px);font-weight:800;line-height:1.1;letter-spacing:-.03em;margin:0 0 12px;text-transform:none}
      .c2-service-modal .sd-heading p{font-size:18px;line-height:1.5;color:#536a81;margin:0}
      .c2-service-modal .sd-columns{display:grid;grid-template-columns:1.3fr 1fr;gap:28px;border-top:1px solid #dce4eb;padding-top:24px}
      .c2-service-modal .sd-columns.sd-single{grid-template-columns:1fr}
      .c2-service-modal h3{font-size:21px;font-weight:700;margin:0 0 12px}
      .c2-service-modal ul{list-style:disc;padding-left:22px;margin:0}
      .c2-service-modal li{font-size:16px;line-height:1.55;padding-left:3px;margin:0 0 10px}
      .c2-service-modal li::marker{color:#0876d1}
      .c2-service-modal .sd-problems{background:#eaf3fb;padding:20px;border-radius:4px}
      .c2-service-modal .sd-footer{flex:none;display:flex;justify-content:space-between;align-items:center;gap:16px;background:#fff;border-top:1px solid #dce4eb;padding:18px 24px}
      .c2-service-modal .sd-return{border:0;background:transparent;color:#075fa9;font-size:14px;font-weight:700;text-decoration:underline;text-underline-offset:3px;cursor:pointer;min-height:44px}
      .c2-service-modal .sd-actions{display:flex;gap:12px}
      .c2-service-modal .sd-actions .c2-btn{border-radius:3px;min-height:48px;padding:12px 18px;font-size:16px}
      @media(max-width:600px){
        .c2 .c2-service-modal{width:calc(100vw - 20px);max-height:calc(100dvh - 20px)}
        .c2-service-modal .sd-top{padding:10px 16px}
        .c2-service-modal .sd-scroll{padding:20px}
        .c2-service-modal .sd-heading{grid-template-columns:100px 1fr;gap:16px;padding-bottom:20px}
        .c2-service-modal .sd-heading>img{width:100px;height:130px}
        .c2-service-modal .sd-heading p{font-size:15px}
        .c2-service-modal .sd-columns{grid-template-columns:1fr;gap:20px}
        .c2-service-modal .sd-footer{display:block;padding:12px 16px}
        .c2-service-modal .sd-return{display:none}
        .c2-service-modal .sd-actions{display:grid;grid-template-columns:1fr 1.5fr;gap:10px}
        .c2-service-modal .sd-actions .c2-btn{padding:12px 10px;font-size:14px;gap:6px}
      }
    `}</style>
    <header className="sd-top"><span className="sd-label">{homeowner ? "Homeowner Services" : "Builder Services"}</span><button ref={closeButton} type="button" className="sd-close" aria-label="Close service details" onClick={onClose}><C2Icon name="close" size={22}/></button></header>
    <div className="sd-scroll">
      <div className="sd-heading"><Image src={`/images/service-sketches/${drawingFor(service.slug)}.webp`} alt="" width={560} height={665} sizes="(max-width:600px) 100px, 170px" loading="eager" style={{objectFit:"contain"}}/><div><h2 id="service-modal-title">{c2Label(service.slug,service.name)}</h2><p>{service.short}</p></div></div>
      <div className={`sd-columns ${problems.length ? "" : "sd-single"}`}>
        <div><h3>What We Do</h3><ul>{bullets.map(line=><li key={line}>{line}</li>)}</ul></div>
        {problems.length > 0 && <aside className="sd-problems"><h3>Common Problems</h3><ul>{problems.map(line=><li key={line}>{line}</li>)}</ul></aside>}
      </div>
    </div>
    <footer className="sd-footer"><button type="button" className="sd-return" onClick={onClose}>← Back to services</button><div className="sd-actions">
      <C2Button href={site.phone.tel} variant="outline" icon="phone" trailingIcon={null}>Call</C2Button>
      {homeowner ? <C2Button onClick={onRequest} trailingIcon={null}>Request Service</C2Button> : <C2Button href="/for-builders#request-a-bid" trailingIcon={null}>Request a Bid</C2Button>}
    </div></footer>
  </dialog>;
}
