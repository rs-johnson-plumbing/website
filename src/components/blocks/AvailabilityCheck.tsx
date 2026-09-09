"use client";

import { useEffect, useId, useRef, useState } from "react";
import { home } from "@/lib/content";
import { cn } from "@/lib/cn";

type Stage = "idle" | "address" | "category" | "issue" | "note" | "phone" | "done";
type Issue = { id: string; label: string };
type Category = { id: string; label: string; issues: Issue[] };

/**
 * Quick-capture flow in the homeowner hero, four taps and a phone number:
 *
 *   Check Availability -> address field (in place) -> dialog:
 *   "We service your area. What are you inquiring about?" -> category ->
 *   issue (or Something Else) -> optional note -> phone -> done.
 *
 * The address posts on its own first so it is captured even if they
 * abandon; the rest posts with the phone number. Copy and the category
 * tree live in home.json under availability.
 */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-2.5">
      <dt className="text-[11px] font-bold uppercase tracking-[0.06em] text-slate">{label}</dt>
      <dd className="mt-0.5 text-[15px] font-semibold leading-snug text-charcoal">{children}</dd>
    </div>
  );
}

export function AvailabilityCheck({ className }: { className?: string }) {
  const a = home.availability;
  const categories = a.categories as Category[];
  const [stage, setStage] = useState<Stage>("idle");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [issueLabel, setIssueLabel] = useState("");
  const [note, setNote] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const addressRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const open = stage !== "idle" && stage !== "address";

  useEffect(() => {
    if (stage === "address") addressRef.current?.focus();
    if (stage === "note") noteRef.current?.focus();
    if (stage === "phone") phoneRef.current?.focus();
  }, [stage]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") reset();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  function reset() {
    setStage("idle");
    setCategory(null);
    setIssueLabel("");
    setNote("");
    setPhone("");
    setError(false);
  }

  async function post(data: Record<string, string>) {
    const res = await fetch("/api/availability", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (!res.ok) throw new Error("bad response");
  }

  async function submitAddress(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(false);
    try {
      await post({ address });
      setStage("category");
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  function pickCategory(c: Category) {
    setCategory(c);
    setIssueLabel("");
    setStage("issue");
  }

  function pickIssue(i: Issue | null) {
    setIssueLabel(i ? i.label : a.other);
    setStage("note");
  }

  async function submitPhone(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const entered = String(new FormData(e.currentTarget).get("phone") ?? "");
    setBusy(true);
    setError(false);
    try {
      await post({ address, phone: entered, category: category?.label ?? "", issue: issueLabel, note });
      setPhone(entered);
      setStage("done");
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  const input = "h-[52px] w-full min-w-0 rounded-btn border-[1.5px] border-charcoal bg-white px-3.5 text-[16px] text-charcoal placeholder:text-slate focus:border-blue focus:outline-none";
  const btn = "inline-flex h-[52px] shrink-0 items-center justify-center whitespace-nowrap rounded-btn px-5 text-[16px] font-bold transition-opacity hover:opacity-[0.88] disabled:opacity-60";
  const chip = "flex min-h-[52px] items-center justify-center rounded-btn border-[1.5px] border-charcoal bg-white px-3 py-2 text-center text-[15px] font-bold leading-tight text-charcoal transition-colors hover:border-blue hover:text-blue";
  const summary = [category?.label, issueLabel].filter(Boolean).join(" · ");

  return (
    <>
      {stage === "address" ? (
        <form onSubmit={submitAddress} className={cn("flex w-full gap-2", className, "lg:w-full lg:max-w-[560px]")}>
          <input
            ref={addressRef}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            minLength={5}
            placeholder={a.addressPlaceholder}
            aria-label={a.addressLabel}
            autoComplete="street-address"
            className={cn(input, "border-blue")}
          />
          <button type="submit" disabled={busy} data-track="availability-check" className={cn(btn, "bg-blue text-white")}>
            {a.check}
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setStage("address")}
          data-track="availability-open"
          className={cn("inline-flex h-[52px] items-center justify-center whitespace-nowrap rounded-btn bg-blue px-6 text-[16px] font-bold text-white transition-opacity hover:opacity-[0.88]", className)}
        >
          {a.button}
        </button>
      )}
      {error && stage === "address" && <p className="w-full text-left text-[14px] font-semibold text-charcoal">{a.error}</p>}

      {open && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-charcoal/60 p-4" onClick={reset}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[480px] rounded-card border border-hairline bg-white p-6 text-left text-charcoal shadow-xl lg:p-7"
          >
            {stage !== "done" && (
            <button type="button" onClick={reset} aria-label={a.close} className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-[22px] leading-none text-slate hover:bg-sand hover:text-charcoal">
              ×
            </button>
            )}

            {stage === "category" && (
              <>
                <h2 id={titleId} className="pr-8 text-[22px] font-bold leading-tight">
                  {a.inArea}
                </h2>
                <p className="mt-1 text-[14px] text-slate">{address}</p>
                <p className="mt-4 text-[17px] font-semibold">{a.ask}</p>
                <div className="mt-3 flex flex-col gap-2.5">
                  {categories.map((c) => (
                    <button key={c.id} type="button" onClick={() => pickCategory(c)} data-track={`availability-cat-${c.id}`} className={chip}>
                      {c.label}
                    </button>
                  ))}
                </div>
              </>
            )}

            {stage === "issue" && category && (
              <>
                <h2 id={titleId} className="pr-8 text-[22px] font-bold leading-tight">
                  {category.label}
                </h2>
                <p className="mt-1 text-[14px] text-slate">{address}</p>
                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  {category.issues.map((i) => (
                    <button key={i.id} type="button" onClick={() => pickIssue(i)} data-track={`availability-issue-${category.id}-${i.id}`} className={chip}>
                      {i.label}
                    </button>
                  ))}
                  <button type="button" onClick={() => pickIssue(null)} data-track={`availability-issue-${category.id}-other`} className={cn(chip, "border-dashed")}>
                    {a.other}
                  </button>
                </div>
                <button type="button" onClick={() => setStage("category")} className="mt-4 text-[14px] font-semibold text-slate hover:text-charcoal">
                  ← {a.back}
                </button>
              </>
            )}

            {stage === "note" && category && (
              <>
                <h2 id={titleId} className="pr-8 text-[22px] font-bold leading-tight">
                  {issueLabel}
                </h2>
                <p className="mt-1 text-[14px] text-slate">{a.noteLine}</p>
                <textarea ref={noteRef} value={note} onChange={(e) => setNote(e.target.value)} rows={3} maxLength={500} placeholder={a.notePlaceholder} aria-label={a.notePlaceholder} className={cn(input, "mt-4 h-auto py-3")} />
                <div className="mt-4 flex items-center justify-between gap-3">
                  <button type="button" onClick={() => setStage("issue")} className="text-[14px] font-semibold text-slate hover:text-charcoal">
                    ← {a.back}
                  </button>
                  <button type="button" onClick={() => setStage("phone")} data-track="availability-note-next" className={cn(btn, "bg-blue text-white")}>
                    {a.next}
                  </button>
                </div>
              </>
            )}

            {stage === "phone" && (
              <form onSubmit={submitPhone}>
                <h2 id={titleId} className="pr-8 text-[22px] font-bold leading-tight">
                  {a.phoneHeading}
                </h2>
                <p className="mt-1 text-[14px] text-slate">{a.phoneLine}</p>
                <dl className="mt-3 divide-y divide-hairline rounded-btn bg-blue-tint px-3.5">
                  <Row label={a.labels.address}>{address}</Row>
                  <Row label={a.labels.reason}>{summary}</Row>
                  {note && <Row label={a.labels.details}>{note}</Row>}
                </dl>
                <input ref={phoneRef} name="phone" type="tel" required placeholder={a.phonePlaceholder} aria-label={a.phoneHeading} autoComplete="tel" className={cn(input, "mt-4")} />
                <p className="mt-2 text-[12px] leading-snug text-slate">{a.consent}</p>
                {error && <p className="mt-2 text-[14px] font-semibold">{a.error}</p>}
                <div className="mt-4 flex items-center justify-between gap-3">
                  <button type="button" onClick={() => setStage("note")} className="text-[14px] font-semibold text-slate hover:text-charcoal">
                    ← {a.back}
                  </button>
                  <button type="submit" disabled={busy} data-track="availability-send" className={cn(btn, "bg-blue text-white")}>
                    {a.send}
                  </button>
                </div>
              </form>
            )}

            {stage === "done" && (
              <>
                <h2 id={titleId} className="text-[24px] font-bold leading-tight">
                  {a.done}
                </h2>
                <dl className="mt-4 divide-y divide-hairline rounded-btn border border-hairline bg-offwhite px-4">
                  <Row label={a.labels.address}>{address}</Row>
                  <Row label={a.labels.reason}>{summary}</Row>
                  {note && <Row label={a.labels.details}>{note}</Row>}
                  <Row label={a.labels.phone}>{phone}</Row>
                </dl>
                <button type="button" onClick={reset} className={cn(btn, "mt-5 w-full border-[1.5px] border-charcoal bg-white text-charcoal")}>
                  {a.close}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
