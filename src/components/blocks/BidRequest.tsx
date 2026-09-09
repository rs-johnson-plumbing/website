"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { home, type IconName } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { BackLink, Chip, IntakeDialog, Row, intakeBtn as btn, intakeHeading as h2, intakeInput as input } from "./IntakeDialog";
import { ReadyIllustration } from "./ReadyIllustration";

type Stage = "idle" | "contractor" | "type" | "plans" | "phone" | "done";
type ProjectType = { id: string; label: string; icon: IconName; illustration?: string };

const MAX_PLANS_BYTES = 4 * 1024 * 1024;

/**
 * Quick-capture bid request in the builders hero:
 *
 *   Submit Bid Request -> dialog: contractor name -> project type
 *   (New Construction / Renovation) -> plans upload (optional) -> phone ->
 *   done. Posts once, as multipart, to /api/bid. Copy lives in home.json
 *   under bid.
 */
export function BidRequest({ className, variant = "filled" }: { className?: string; /** "outlined" is a charcoal outline, "outlined-dark" a white outline on a dark ground, for when it sits beside a filled button. "link" is teal text with the arrow, for a one-line row. */ variant?: "filled" | "outlined" | "outlined-dark" | "link" }) {
  const b = home.bid;
  const types = b.types as ProjectType[];
  const [stage, setStage] = useState<Stage>("idle");
  const [contractor, setContractor] = useState("");
  const [type, setType] = useState<ProjectType | null>(null);
  const [plans, setPlans] = useState<File | null>(null);
  const [plansError, setPlansError] = useState(false);
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const contractorRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const open = stage !== "idle";

  useEffect(() => {
    if (stage === "contractor") contractorRef.current?.focus();
    if (stage === "phone") phoneRef.current?.focus();
  }, [stage]);

  const reset = useCallback(() => {
    setStage("idle");
    setContractor("");
    setType(null);
    setPlans(null);
    setPlansError(false);
    setPhone("");
    setError(false);
  }, []);

  function submitContractor(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStage("type");
  }

  function pickType(t: ProjectType) {
    setType(t);
    setStage("plans");
  }

  function pickPlans(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (f && f.size > MAX_PLANS_BYTES) {
      setPlans(null);
      setPlansError(true);
      e.target.value = "";
      return;
    }
    setPlansError(false);
    setPlans(f);
  }

  async function submitPhone(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const entered = String(new FormData(e.currentTarget).get("phone") ?? "");
    setBusy(true);
    setError(false);
    try {
      const fd = new FormData();
      fd.set("contractor", contractor);
      fd.set("projectType", type?.label ?? "");
      fd.set("phone", entered);
      if (plans) fd.set("plans", plans, plans.name);
      const res = await fetch("/api/bid", { method: "POST", body: fd });
      if (!res.ok) throw new Error("bad response");
      setPhone(entered);
      setStage("done");
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setStage("contractor")}
        data-track="bid-open"
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-opacity hover:opacity-[0.88]",
          variant === "link" ? "text-[15px] text-teal" : "h-[52px] rounded-btn px-6 text-[16px]",
          variant === "filled" && "bg-teal text-white builders:bg-charcoal",
          variant === "outlined" && "border-[1.5px] border-charcoal bg-transparent text-charcoal",
          variant === "outlined-dark" && "border-[1.5px] border-offwhite bg-transparent text-offwhite",
          className,
        )}
      >
        {b.button}
        <Icon name="arrow-right" size={20} strokeWidth={1.8} className="shrink-0" />
      </button>

      <IntakeDialog open={open} onClose={reset} titleId={titleId} closeLabel={b.close} showClose={stage !== "done"}>
        {stage === "contractor" && (
          <form onSubmit={submitContractor}>
            <h2 id={titleId} className={h2}>
              {b.contractorHeading}
            </h2>
            <input
              ref={contractorRef}
              value={contractor}
              onChange={(e) => setContractor(e.target.value)}
              required
              minLength={2}
              maxLength={80}
              placeholder={b.contractorPlaceholder}
              aria-label={b.contractorLabel}
              autoComplete="organization"
              className={cn(input, "mt-4")}
            />
            <div className="mt-4 flex justify-end">
              <button type="submit" data-track="bid-contractor-next" className={cn(btn, "bg-teal text-white builders:bg-charcoal")}>
                {b.next}
                <Icon name="arrow-right" size={18} strokeWidth={1.8} />
              </button>
            </div>
          </form>
        )}

        {stage === "type" && (
          <>
            <h2 id={titleId} className={h2}>
              {b.typeHeading}
            </h2>
            <div className="mt-4 flex flex-col gap-2.5">
              {types.map((t) => (
                <Chip key={t.id} icon={t.icon} illustration={t.illustration} label={t.label} onClick={() => pickType(t)} track={`bid-type-${t.id}`} />
              ))}
            </div>
            <div className="mt-4">
              <BackLink onClick={() => setStage("contractor")} label={b.back} />
            </div>
          </>
        )}

        {stage === "plans" && (
          <>
            <h2 id={titleId} className={h2}>
              {b.plansHeading}
            </h2>
            <label className="mt-4 flex min-h-[54px] w-full cursor-pointer items-center gap-3 rounded-btn border border-dashed border-hairline-strong bg-white px-3 py-2 text-left text-[15px] font-bold leading-tight text-charcoal transition-colors hover:border-teal hover:bg-teal-tint">
              <input type="file" accept=".pdf,image/*" onChange={pickPlans} className="sr-only" data-track="bid-plans-pick" />
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-tile bg-teal-tint text-teal">
                <Icon name="upload" size={20} />
              </span>
              <span>{plans ? plans.name : b.plansButton}</span>
            </label>
            {plansError && <p className="mt-2 text-[14px] font-semibold">{b.plansTooBig}</p>}
            <div className="mt-4 flex items-center justify-between gap-3">
              <BackLink onClick={() => setStage("type")} label={b.back} />
              <button type="button" onClick={() => setStage("phone")} data-track="bid-plans-next" className={cn(btn, "bg-teal text-white builders:bg-charcoal")}>
                {plans ? b.next : b.plansSkip}
                <Icon name="arrow-right" size={18} strokeWidth={1.8} />
              </button>
            </div>
          </>
        )}

        {stage === "phone" && (
          <form onSubmit={submitPhone}>
            <h2 id={titleId} className={h2}>
              {b.phoneHeading}
            </h2>
            <dl className="mt-3 divide-y divide-hairline rounded-btn border border-teal/20 bg-teal-tint px-3.5">
              <Row label={b.labels.contractor}>{contractor}</Row>
              <Row label={b.labels.type}>{type?.label}</Row>
              <Row label={b.labels.plans}>{plans ? plans.name : b.noPlans}</Row>
            </dl>
            <div className="relative mt-4">
              <span className="pointer-events-none absolute left-3.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-teal-tint text-teal">
                <Icon name="phone" size={15} />
              </span>
              <input ref={phoneRef} name="phone" type="tel" required placeholder={b.phonePlaceholder} aria-label={b.phoneHeading} autoComplete="tel" className={cn(input, "pl-14")} />
            </div>
            {error && <p className="mt-2 text-[14px] font-semibold">{b.error}</p>}
            <div className="mt-4 flex items-center justify-between gap-3">
              <BackLink onClick={() => setStage("plans")} label={b.back} />
              <button type="submit" disabled={busy} data-track="bid-send" className={cn(btn, "bg-teal text-white builders:bg-charcoal")}>
                {b.send}
                <Icon name="arrow-right" size={18} strokeWidth={1.8} />
              </button>
            </div>
          </form>
        )}

        {stage === "done" && (
          <>
            <ReadyIllustration className="mx-auto -mt-1 h-auto w-[220px] lg:w-[240px]" />
            <h2 id={titleId} className={cn(h2, "mt-2 pr-0 text-center text-[20px] lg:text-[24px]")}>
              {b.done}
            </h2>
            <dl className="mt-4 divide-y divide-hairline rounded-btn border border-hairline bg-offwhite px-4">
              <Row label={b.labels.contractor}>{contractor}</Row>
              <Row label={b.labels.type}>{type?.label}</Row>
              <Row label={b.labels.plans}>{plans ? plans.name : b.noPlans}</Row>
              <Row label={b.labels.phone}>{phone}</Row>
            </dl>
            <button type="button" onClick={reset} className={cn(btn, "mt-5 h-[52px] w-full border-[1.5px] border-charcoal bg-white text-charcoal")}>
              {b.close}
            </button>
          </>
        )}
      </IntakeDialog>
    </>
  );
}
