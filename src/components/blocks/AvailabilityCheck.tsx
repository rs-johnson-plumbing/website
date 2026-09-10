"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { home, type IconName } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { BackLink, Chip, IntakeDialog, Row, intakeBtn as btn, intakeHeading as h2, intakeInput as input } from "./IntakeDialog";
import { ReadyIllustration } from "./ReadyIllustration";

type Stage = "idle" | "address" | "category" | "issue" | "note" | "phone" | "done";
type Issue = { id: string; label: string; icon: IconName; illustration?: string };
type Category = { id: string; label: string; icon: IconName; illustration?: string; issues: Issue[] };

/**
 * Quick-capture flow in the homeowner hero, one modal from the first tap:
 *
 *   Submit Service Request -> address -> "Good news. We service your area."
 *   category -> issue (or Something Else) -> optional note -> phone -> done.
 *
 * The address posts on its own first so it is captured even if they
 * abandon; the rest posts with the phone number. Copy and the category
 * tree live in home.json under availability.
 */
export function AvailabilityCheck({ className, openSignal = 0, hideTrigger = false }: { className?: string; /** Bump to open the flow from another control (the sticky bar chooser). */ openSignal?: number; /** Render the dialog only, no button of its own. */ hideTrigger?: boolean }) {
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
  const open = stage !== "idle";

  useEffect(() => {
    if (openSignal > 0) setStage("address");
  }, [openSignal]);

  useEffect(() => {
    if (stage === "address") addressRef.current?.focus();
    if (stage === "note") noteRef.current?.focus();
    if (stage === "phone") phoneRef.current?.focus();
  }, [stage]);

  const reset = useCallback(() => {
    setStage("idle");
    setAddress("");
    setCategory(null);
    setIssueLabel("");
    setNote("");
    setPhone("");
    setError(false);
  }, []);

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

  const summary = [category?.label, issueLabel].filter(Boolean).join(" · ");

  return (
    <>
      {!hideTrigger && (
      <button
        type="button"
        onClick={() => setStage("address")}
        data-track="availability-open"
        className={cn("inline-flex h-[52px] items-center justify-center gap-2 whitespace-nowrap rounded-btn bg-blue px-6 text-[16px] font-bold text-white builders:bg-charcoal transition-opacity hover:opacity-[0.88]", className)}
      >
        {a.button}
        <Icon name="arrow-right" size={20} strokeWidth={1.8} className="shrink-0" />
      </button>
      )}

      <IntakeDialog open={open} onClose={reset} titleId={titleId} closeLabel={a.close} showClose={stage !== "done"}>
        {stage === "address" && (
          <form onSubmit={submitAddress}>
            <h2 id={titleId} className={h2}>
              {a.addressHeading}
            </h2>
            <input
              ref={addressRef}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              minLength={5}
              placeholder={a.addressPlaceholder}
              aria-label={a.addressLabel}
              autoComplete="street-address"
              className={cn(input, "mt-4")}
            />
            {error && <p className="mt-2 text-[14px] font-semibold">{a.error}</p>}
            <div className="mt-4 flex justify-end">
              <button type="submit" disabled={busy} data-track="availability-check" className={cn(btn, "bg-blue text-white builders:bg-charcoal")}>
                {a.check}
                <Icon name="arrow-right" size={18} strokeWidth={1.8} />
              </button>
            </div>
          </form>
        )}

        {stage === "category" && (
          <>
            <h2 id={titleId} className={cn(h2, "whitespace-nowrap text-[17px] lg:text-[21px]")}>
              {a.inArea}
            </h2>
            <p className="mt-3 text-[15px] font-semibold text-slate">{a.ask}</p>
            <div className="mt-3 flex flex-col gap-2.5">
              {categories.map((c) => (
                <Chip key={c.id} icon={c.icon} illustration={c.illustration} label={c.label} onClick={() => pickCategory(c)} track={`availability-cat-${c.id}`} />
              ))}
            </div>
          </>
        )}

        {stage === "issue" && category && (
          <>
            <h2 id={titleId} className={h2}>
              {category.label}
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-2.5 lg:grid-cols-2">
              {category.issues.map((i) => (
                <Chip key={i.id} icon={i.icon} illustration={i.illustration} label={i.label} onClick={() => pickIssue(i)} track={`availability-issue-${category.id}-${i.id}`} />
              ))}
              <Chip icon={a.otherIcon as IconName} illustration={a.otherIllustration} label={a.other} onClick={() => pickIssue(null)} track={`availability-issue-${category.id}-other`} dashed />
            </div>
            <div className="mt-4">
              <BackLink onClick={() => setStage("category")} label={a.back} />
            </div>
          </>
        )}

        {stage === "note" && category && (
          <>
            <h2 id={titleId} className={h2}>
              {a.noteHeading} <span className="font-semibold text-slate">{a.noteLine}</span>
            </h2>
            <p className="mt-1 text-[14px] text-slate">{issueLabel}</p>
            <textarea ref={noteRef} value={note} onChange={(e) => setNote(e.target.value)} rows={3} maxLength={500} placeholder={a.notePlaceholder} aria-label={a.noteHeading} className={cn(input, "mt-4 h-auto py-3")} />
            <div className="mt-4 flex items-center justify-between gap-3">
              <BackLink onClick={() => setStage("issue")} label={a.back} />
              <button type="button" onClick={() => setStage("phone")} data-track="availability-note-next" className={cn(btn, "bg-blue text-white builders:bg-charcoal")}>
                {a.next}
                <Icon name="arrow-right" size={18} strokeWidth={1.8} />
              </button>
            </div>
          </>
        )}

        {stage === "phone" && (
          <form onSubmit={submitPhone}>
            <h2 id={titleId} className={h2}>
              {a.phoneHeading}
            </h2>
            <p className="mt-1 text-[14px] text-slate">{a.phoneLine}</p>
            <dl className="mt-3 divide-y divide-hairline rounded-btn border border-blue/20 bg-blue-tint px-3.5">
              <Row label={a.labels.address}>{address}</Row>
              <Row label={a.labels.reason}>{summary}</Row>
              {note && <Row label={a.labels.details}>{note}</Row>}
            </dl>
            <div className="relative mt-4">
              <span className="pointer-events-none absolute left-3.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-blue-tint text-blue">
                <Icon name="phone" size={15} />
              </span>
              <input ref={phoneRef} name="phone" type="tel" required placeholder={a.phonePlaceholder} aria-label={a.phoneHeading} autoComplete="tel" className={cn(input, "pl-14")} />
            </div>
            {error && <p className="mt-2 text-[14px] font-semibold">{a.error}</p>}
            <div className="mt-4 flex items-center justify-between gap-3">
              <BackLink onClick={() => setStage("note")} label={a.back} />
              <button type="submit" disabled={busy} data-track="availability-send" className={cn(btn, "bg-blue text-white builders:bg-charcoal")}>
                {a.send}
                <Icon name="arrow-right" size={18} strokeWidth={1.8} />
              </button>
            </div>
          </form>
        )}

        {stage === "done" && (
          <>
            <ReadyIllustration className="mx-auto -mt-1 h-auto w-[220px] lg:w-[240px]" />
            <h2 id={titleId} className={cn(h2, "mt-2 pr-0 text-center text-[20px] lg:text-[24px]")}>
              {a.done}
            </h2>
            <dl className="mt-4 divide-y divide-hairline rounded-btn border border-hairline bg-offwhite px-4">
              <Row label={a.labels.address}>{address}</Row>
              <Row label={a.labels.reason}>{summary}</Row>
              {note && <Row label={a.labels.details}>{note}</Row>}
              <Row label={a.labels.phone}>{phone}</Row>
            </dl>
            <button type="button" onClick={reset} className={cn(btn, "mt-5 h-[52px] w-full border-[1.5px] border-charcoal bg-white text-charcoal")}>
              {a.close}
            </button>
          </>
        )}
      </IntakeDialog>
    </>
  );
}
