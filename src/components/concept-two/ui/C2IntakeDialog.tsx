"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { site } from "@/lib/content";
import { Lockup } from "@/components/ui/Logo";
import { C2Button } from "./C2Button";
import { C2Icon } from "./C2Icon";
import { ServiceSketch } from "./ServiceSketch";

type Kind = "service" | "bid";
type Fields = Record<string, string>;
const categories = [
  { name: "Repair", art: "leaks", question: "What needs to be repaired?", options: ["Clogged Drain", "Water Heater", "Faucet Or Shower", "Toilet", "Pipe Or Leak", "Garbage Disposal", "Other"] },
  { name: "Install", art: "fixtures", question: "What would you like installed?", options: ["Drain Or Drain Piping", "Water Heater", "Faucet Or Shower", "Toilet", "Water Softener", "Gas Appliance Hookup", "Other"] },
  { name: "Flooding", art: "pump", question: "Where is the water coming from?", options: ["Burst Pipe", "Sump Pump", "Basement", "Sewer Backup", "Not Sure"] },
  { name: "Other", art: "service", question: "How can we help?", options: [] },
];
const serviceSteps = ["Area", "Service", "Photos", "Contact", "Arrival", "Submit"];
const bidSteps = ["Contact information", "Project details"];
const times = ["8:00 a.m. - 10:00 a.m.", "10:00 a.m. - 12:00 p.m.", "12:00 p.m. - 2:00 p.m.", "2:00 p.m. - 4:00 p.m."];
const maxFileBytes = 4 * 1024 * 1024;


function photoGuidance(category: string | undefined, issue: string | undefined) {
  if (category === "Install") {
    const subjects: Record<string, string> = {
      "Drain Or Drain Piping": "the existing drain or piping and the area where the new work will go",
      "Water Heater": "the current water heater, its label, and the space around it",
      "Faucet Or Shower": "the existing faucet or shower and its connections",
      "Toilet": "the existing toilet and the space around its base",
      "Water Softener": "the installation area and nearby water connections",
      "Gas Appliance Hookup": "the appliance, its label, and the existing hookup",
    };
    return subjects[issue || ""]
      ? `Take a photo of ${subjects[issue || ""]}.`
      : "Take a photo of the installation area and any existing fixture or equipment.";
  }
  const guidance: Record<string, string> = {
    "Clogged Drain": "Take a photo of the clogged drain and any standing water.",
    "Water Heater": "Take a photo of the water heater, its label, and any visible leak or error message.",
    "Faucet Or Shower": "Take a photo of the faucet or shower and the part that needs attention.",
    "Toilet": "Take a photo of the toilet and the area where you see the problem.",
    "Pipe Or Leak": "Take a photo of where the leak is coming from and the surrounding area.",
    "Garbage Disposal": "Take a photo of the disposal and its connections under the sink.",
    "Burst Pipe": "From a dry, safe spot, take a photo of the burst pipe and the affected area.",
    "Sump Pump": "From a dry, safe spot, take a photo of the sump pump and pit.",
    "Basement": "From a dry, safe spot, take a photo of the affected basement area and where water is entering, if visible.",
    "Sewer Backup": "From a safe distance, take a photo of the backed-up drain and affected area.",
    "Not Sure": "From a dry, safe spot, take a wide photo showing where water is collecting.",
  };
  return guidance[issue || ""] || (category === "Flooding"
    ? "From a dry, safe spot, take a photo of the affected area and where water is entering, if visible."
    : "Take a photo of the fixture or area you need help with, plus a close-up of the problem.");
}

function Field({ name, label, fields, change, required = false, type = "text", autoComplete, pattern }: {
  name: string; label: string; fields: Fields; change: (name: string, value: string) => void; required?: boolean; type?: string; autoComplete?: string; pattern?: string;
}) {
  return <label className={name === "zip" ? "ci-zip" : undefined}><span>{label}{required ? " *" : ""}</span><input name={name} type={type} required={required} autoComplete={autoComplete} pattern={pattern} inputMode={name === "zip" ? "numeric" : undefined} maxLength={name === "zip" ? 6 : 254} value={fields[name] || ""} onChange={event => change(name, event.target.value)} /></label>;
}

export function C2IntakeDialog({ kind, onClose }: { kind: Kind; onClose: () => void }) {
  const isBid = kind === "bid";
  const steps = isBid ? bidSteps : serviceSteps;
  const [step, setStep] = useState(0);
  const [choosingCategory, setChoosingCategory] = useState(true);
  const [choosingIssue, setChoosingIssue] = useState(true);
  const issueSummary = useRef<HTMLButtonElement>(null);
  const detailsLabel = useRef<HTMLLabelElement>(null);
  const [fields, setFields] = useState<Fields>({ state: "MO", country: "United States", projectType: "Single Family" });
  const [files, setFiles] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  useEffect(() => {
    const urls = files.map(file => file.type.startsWith("image/") ? URL.createObjectURL(file) : "");
    setPhotoPreviews(urls);
    return () => urls.forEach(url => { if (url) URL.revokeObjectURL(url); });
  }, [files]);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const dayRail = useRef<HTMLDivElement>(null);
  const upload = useRef<HTMLInputElement>(null);
  const camera = useRef<HTMLInputElement>(null);
  const busy = useRef(false);
  const [days] = useState(() => {
    const centralToday = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
    const start = new Date(centralToday + "T12:00:00Z");
    return Array.from({ length: 14 }, (_, i) => {
      const date = new Date(start);
      date.setUTCDate(start.getUTCDate() + i + 1);
      const day = date.getUTCDate();
      const suffix = day >= 11 && day <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[day % 10] || "th";
      const weekday = date.toLocaleDateString("en-US", { timeZone: "UTC", weekday: "long" });
      const month = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."][date.getUTCMonth()];
      const dateLabel = `${month} ${day}${suffix}`;
      return { value: date.toISOString().slice(0, 10), weekday, dateLabel, label: `${weekday}, ${dateLabel}` };
    });
  });
  const selected = categories.find(category => category.name === fields.category);
  const change = (name: string, value: string) => setFields(old => ({ ...old, [name]: value }));

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!mounted || !dialog.current) return;
    const element = dialog.current;
    const opener = document.activeElement as HTMLElement | null;
    const y = window.scrollY;
    const old = { position: document.body.style.position, top: document.body.style.top, width: document.body.style.width, overflow: document.body.style.overflow, paddingRight: document.body.style.paddingRight };
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    Object.assign(document.body.style, { position: "fixed", top: `-${y}px`, width: "100%", overflow: "hidden", paddingRight: gutter ? `${gutter}px` : old.paddingRight });
    element.showModal();
    element.querySelector<HTMLInputElement>("input:not([type=file])")?.focus({ preventScroll: true });
    return () => {
      element.close();
      Object.assign(document.body.style, old);
      window.scrollTo(0, y);
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [mounted]);
  useEffect(() => {
    if (!mounted) return;
    body.current?.scrollTo(0, 0);
    if (step > 0 || status === "done") body.current?.querySelector<HTMLElement>("h2, h3[tabindex]")?.focus({ preventScroll: true });
  }, [step, mounted, status]);

  useEffect(() => {
    if (step === 1 && fields.issue && !choosingCategory && !choosingIssue) {
      issueSummary.current?.focus({ preventScroll: true });
      detailsLabel.current?.scrollIntoView({ block: "nearest", behavior: "instant" });
    }
  }, [step, fields.issue, choosingCategory, choosingIssue]);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list);
    if (incoming.some(file => file.size > maxFileBytes || !(file.type.startsWith("image/") || (isBid && file.type === "application/pdf")))) {
      setError("Choose an image" + (isBid ? " or PDF" : "") + " no larger than 4 MB."); return;
    }
    if ([...files, ...incoming].reduce((sum, file) => sum + file.size, 0) > maxFileBytes) { setError("Keep the total upload under 4 MB."); return; }
    if (files.length + incoming.length > (isBid ? 1 : 5)) { setError(isBid ? "Please choose one image or plan." : "You can add up to five photos."); return; }
    setFiles(old => [...old, ...incoming]); setError("");
  }
  function advance(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    setError("");
    if (!isBid && step === 1 && (!fields.category || (selected?.options.length && !fields.issue) || (fields.category === "Other" && !fields.details?.trim()))) { setError("Choose a service and tell us what you need help with."); return; }
    if (!isBid && step === 4 && (!fields.day || !fields.time)) { setError("Choose a day and an arrival window."); return; }
    if (step < steps.length - 1) { setStep(value => value + 1); return; }
    void submit();
  }
  async function submit() {
    busy.current = true; setStatus("sending");
    try {
      let response: Response;
      if (isBid) {
        const data = new FormData();
        Object.entries(fields).forEach(([key, value]) => data.append(key, value));
        if (files[0]) data.append("plans", files[0]);
        response = await fetch("/api/bid", { method: "POST", body: data });
      } else {
        const comments = [
          fields.category + (fields.issue ? " — " + fields.issue : ""),
          fields.details || "",
          [fields.address, fields.unit, fields.city, fields.state, fields.zip, fields.country].filter(Boolean).join(", "),
          "Preferred arrival (requires confirmation): " + fields.day + ", " + fields.time,
        ].filter(Boolean).join("\n");
        const data = new FormData();
        data.append("firstName", fields.firstName || "");
        data.append("lastName", fields.lastName || "");
        data.append("phone", fields.phone || "");
        data.append("email", fields.email || "");
        data.append("comments", comments);
        files.forEach(file => data.append("photos", file));
        response = await fetch("/api/message", { method: "POST", body: data });
      }
      if (!response.ok) throw new Error("Unable to send");
      setStatus("done");
    } catch {
      setStatus("error"); setError("We couldn’t send your request. Please try again or call " + site.phone.display + ".");
    } finally { busy.current = false; }
  }
  const photos = <div className="ci-upload">
    <h3>{isBid ? "Add an image or plan" : files.length ? "Add more photos" : "Add photos"} <span>(optional)</span></h3>
    {isBid && <p>An image or PDF, up to 4 MB.</p>}
    <input ref={upload} type="file" hidden accept={isBid ? "application/pdf,image/*" : "image/*"} multiple={!isBid} onChange={event => { addFiles(event.target.files); event.target.value = ""; }} />
    <input ref={camera} type="file" hidden accept="image/*" capture="environment" onChange={event => { addFiles(event.target.files); event.target.value = ""; }} />
    <div className="ci-upload-actions"><C2Button onClick={() => upload.current?.click()} variant="outline" trailingIcon={null}>{isBid ? "Upload Image or Plan" : "Upload photo"}</C2Button><C2Button className="ci-camera" onClick={() => camera.current?.click()} variant="outline" trailingIcon={null}>Take photo</C2Button></div>
    {files.length > 0 && <ul className="ci-files">{files.map((file, i) => <li key={file.name + i}><span>{photoPreviews[i] && <Image src={photoPreviews[i]} alt={`Preview of ${file.name}`} width={80} height={80} unoptimized className="ci-photo-thumb" />}{file.name}</span><button type="button" aria-label={`Remove ${file.name}`} onClick={() => setFiles(old => old.filter((_, index) => index !== i))}>Remove</button></li>)}</ul>}
  </div>;

  if (!mounted) return null;
  return createPortal(<dialog ref={dialog} className={`c2 ci-dialog${isBid ? "" : " ci-service-dialog"}${status === "done" ? " ci-success-dialog" : ""}`} aria-label={isBid ? "Request a Bid" : "Request Service"} onCancel={event => { event.preventDefault(); if (!busy.current) onClose(); }}>
    <header className="ci-header"><Lockup title={site.name} /><button type="button" aria-label={isBid ? "Close bid request" : "Close service request"} onClick={onClose} disabled={status === "sending"}><C2Icon name="close" size={22} /></button></header>
    {status !== "done" && !isBid && <div className="ci-progress"><ol aria-label="Request progress">{steps.map((label, i) => <li key={label} className={i <= step ? "ci-reached" : ""} aria-current={i === step ? "step" : undefined}><span aria-label={label}>{i < step ? "✓" : i + 1}</span><small>{label}</small></li>)}</ol></div>}
    <form ref={form} onSubmit={advance}>
      <div className="ci-body" ref={body}>
        {status === "done" ? <section className="ci-success"><span className="ci-success-mark"><C2Icon name="check" size={32} /></span><h2 tabIndex={-1}>Request Received</h2><p>Thank you for choosing R.S. Johnson Plumbing.</p>{!isBid && <p className="ci-success-note">Your preferred arrival time is pending confirmation.</p>}<C2Button onClick={onClose} trailingIcon={null}>Done</C2Button></section> : <>
          {isBid ? <>
            {step === 0 ? <><h2 tabIndex={-1}>Let’s talk about your next build.</h2><p>Start with the best person to contact.</p><div className="ci-fields"><Field name="contractor" label="Company name" required fields={fields} change={change} autoComplete="organization" /><Field name="contactName" label="Your name" required fields={fields} change={change} autoComplete="name" /><Field name="email" label="Email" type="email" required fields={fields} change={change} autoComplete="email" /><Field name="phone" label="Phone" type="tel" pattern="[+()0-9 .-]{10,}" required fields={fields} change={change} autoComplete="tel" /></div></> :
              <><h2 tabIndex={-1}>Tell us about the project.</h2><div className="ci-fields"><Field name="projectLocation" label="Project location" required fields={fields} change={change} autoComplete="street-address" /><label><span>Project type *</span><select name="projectType" value={fields.projectType} onChange={event => change("projectType", event.target.value)}>{["Single Family", "Multi-Family", "Commercial", "Remodel", "Other"].map(type => <option key={type}>{type}</option>)}</select></label></div><label><span>Project details *</span><textarea name="projectDetails" rows={4} required maxLength={2000} value={fields.projectDetails || ""} onChange={event => change("projectDetails", event.target.value)} placeholder="Scope, timing, and anything we should know." /></label>{photos}</>}
          </> : <>
            {step === 0 && <><h2 tabIndex={-1}><span style={{ textTransform: "none" }}>Where are you located?</span></h2><Field name="zip" label="ZIP code" required pattern="[0-9]{5,6}" fields={fields} change={change} autoComplete="postal-code" /></>}
            {step === 1 && <><h2 tabIndex={-1}><span style={{ textTransform: "none" }}>How can we help?</span></h2>{selected && !choosingCategory ? <div className="ci-selection"><strong>{selected.name}</strong><button type="button" onClick={() => setChoosingCategory(true)}>Change Service</button></div> : <div className="ci-categories" role="group" aria-label="Service type">{categories.map(category => <button type="button" key={category.name} aria-pressed={fields.category === category.name} onClick={() => { setFields(old => old.category === category.name ? old : ({ ...old, category: category.name, issue: "", details: "" })); setChoosingCategory(false); setChoosingIssue(true); }}><ServiceSketch id={category.art} /><span>{category.name}</span></button>)}</div>}
              {selected && !choosingCategory && <div className="ci-followup"><h3>{selected.question}</h3>{selected.options.length > 0 && (fields.issue && !choosingIssue ? <div className="ci-selection"><strong>{fields.issue}</strong><button ref={issueSummary} type="button" onClick={() => setChoosingIssue(true)}>Change Selection</button></div> : <div className="ci-options" role="group" aria-label={selected.question}>{selected.options.map(option => <button type="button" key={option} aria-pressed={fields.issue === option} onClick={() => { change("issue", option); setChoosingIssue(false); }}>{option}</button>)}</div>)}<label ref={detailsLabel}><span>{fields.category === "Other" ? "What do you need? *" : "What’s happening? (optional)"}</span><textarea name="details" rows={3} required={fields.category === "Other"} maxLength={2000} value={fields.details || ""} onChange={event => change("details", event.target.value)} placeholder="Where is the problem? When did it start?" /></label>{fields.category === "Flooding" && <p>Need urgent help? <a href={site.phone.tel}>Call {site.phone.display}</a>.</p>}</div>}</>}
            {step === 2 && <><h2 tabIndex={-1}><span style={{ textTransform: "none" }}>Help us Prepare</span></h2><p>{photoGuidance(fields.category, fields.issue)}</p>{photos}</>}
            {step === 3 && <><h2 tabIndex={-1}>How can we reach you?</h2><div className="ci-fields"><Field name="firstName" label="First name" required fields={fields} change={change} autoComplete="given-name" /><Field name="lastName" label="Last name" required fields={fields} change={change} autoComplete="family-name" /><Field name="email" label="Email" type="email" required fields={fields} change={change} autoComplete="email" /><Field name="phone" label="Phone" type="tel" pattern="[+()0-9 .-]{10,}" required fields={fields} change={change} autoComplete="tel" /><Field name="address" label="Street address" required fields={fields} change={change} autoComplete="address-line1" /><Field name="unit" label="Unit / apartment (optional)" fields={fields} change={change} autoComplete="address-line2" /><Field name="city" label="City" required fields={fields} change={change} autoComplete="address-level2" /><Field name="zip" label="ZIP code" required pattern="[0-9]{5,6}" fields={fields} change={change} autoComplete="postal-code" /><Field name="state" label="State" required fields={fields} change={change} autoComplete="address-level1" /><Field name="country" label="Country" required fields={fields} change={change} autoComplete="country-name" /></div></>}
            {step === 4 && <><h3 tabIndex={-1}>Choose a Day</h3><div className="ci-day-carousel"><button className="ci-day-arrow" type="button" aria-label="Earlier days" onClick={() => dayRail.current?.scrollBy({ left: -300, behavior: "smooth" })}>←</button><div className="ci-days" ref={dayRail} role="group" aria-label="Preferred day">{days.map(day => <button type="button" key={day.value} aria-label={day.label} aria-pressed={fields.day === day.value} onClick={() => change("day", day.value)}><strong>{day.weekday}</strong><span>{day.dateLabel}</span></button>)}</div><button className="ci-day-arrow" type="button" aria-label="Later days" onClick={() => dayRail.current?.scrollBy({ left: 300, behavior: "smooth" })}>→</button></div><h3>Preferred arrival window</h3><div className="ci-times" role="group" aria-label="Preferred arrival window">{times.map(time => <button key={time} type="button" aria-pressed={fields.time === time} onClick={() => change("time", time)}>{time}</button>)}</div></>}
            {step === 5 && <><h2 tabIndex={-1}>Your Service Request</h2><div className="ci-review"><section><h3>Service <button type="button" onClick={() => setStep(1)}>Edit</button></h3><p><strong>Service Requested</strong><br />{fields.category}{fields.issue ? " — " + fields.issue : ""}</p>{fields.details && <p><strong>Details</strong><br />{fields.details}</p>}<p><strong>Photos</strong><br />{files.length} photo{files.length === 1 ? "" : "s"} attached</p>{files.length > 0 && <div className="ci-photo-review">{files.map((file, i) => photoPreviews[i] && <figure key={file.name + i}><Image src={photoPreviews[i]} alt={`Preview of ${file.name}`} width={96} height={96} unoptimized className="ci-photo-thumb" /><figcaption>{file.name}</figcaption></figure>)}</div>}</section><section><h3>Contact and Location <button type="button" onClick={() => setStep(3)}>Edit</button></h3><p>{fields.firstName} {fields.lastName}<br />{fields.phone}<br />{fields.email}</p><p>{fields.address} {fields.unit}<br />{fields.city}, {fields.state} {fields.zip}</p></section><section><h3>Preferred Arrival <button type="button" onClick={() => setStep(4)}>Edit</button></h3><p>{days.find(day => day.value === fields.day)?.label}<br />{fields.time}</p><p>Appointment pending confirmation.</p></section></div></>}
          </>}
          {error && <p className="ci-error" role="alert">{error}</p>}
        </>}
      </div>
      {status !== "done" && <footer className="ci-footer"><div>{step > 0 ? <button type="button" className="ci-back" disabled={status === "sending"} onClick={() => { setStep(value => value - 1); setError(""); }}>← Back</button> : <span />}<C2Button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : step === steps.length - 1 ? isBid ? "Send Bid Request" : "Send Service Request" : "Continue"}</C2Button></div></footer>}
    </form>
  </dialog>, document.body);
}
