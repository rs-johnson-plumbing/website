"use client";

import { useEffect, useId, useRef, useState } from "react";
import { home, site, link } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Stage = "idle" | "address" | "ask" | "phone" | "done" | "declined";

/**
 * Quick-capture flow in the homeowner hero. A third button, Check
 * Availability, flips into an address field. Submitting the address opens
 * a small dialog: "we serve your address" and "can we call or text you
 * shortly?" Yes asks for a phone number and sends it; Not Now points at
 * Schedule Service and the phone number. Copy lives in home.json.
 */
export function AvailabilityCheck({ className }: { className?: string }) {
  const a = home.availability;
  const [stage, setStage] = useState<Stage>("idle");
  const [address, setAddress] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const addressRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const open = stage === "ask" || stage === "phone" || stage === "done" || stage === "declined";

  useEffect(() => {
    if (stage === "address") addressRef.current?.focus();
    if (stage === "phone") phoneRef.current?.focus();
  }, [stage]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setStage("idle");
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

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
      setStage("ask");
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  async function submitPhone(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const phone = String(new FormData(e.currentTarget).get("phone") ?? "");
    setBusy(true);
    setError(false);
    try {
      await post({ address, phone });
      setStage("done");
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  const input = "h-[52px] w-full min-w-0 rounded-btn border-[1.5px] border-charcoal bg-white px-3.5 text-[16px] text-charcoal placeholder:text-slate focus:border-blue focus:outline-none";
  const smallBtn = "inline-flex h-[52px] shrink-0 items-center justify-center whitespace-nowrap rounded-btn px-5 text-[16px] font-bold transition-opacity hover:opacity-[0.88] disabled:opacity-60";

  return (
    <>
      {stage === "idle" || open ? (
        <button
          type="button"
          onClick={() => setStage("address")}
          data-track="availability-open"
          className={cn("inline-flex h-[52px] items-center justify-center whitespace-nowrap rounded-btn border-[1.5px] border-charcoal bg-white px-6 text-[16px] font-bold text-charcoal transition-opacity hover:opacity-[0.88]", className)}
        >
          {a.button}
        </button>
      ) : (
        <form onSubmit={submitAddress} className="flex w-full gap-2 lg:max-w-[560px]">
          <input
            ref={addressRef}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            minLength={5}
            placeholder={a.addressPlaceholder}
            aria-label={a.addressLabel}
            autoComplete="street-address"
            className={input}
          />
          <button type="submit" disabled={busy} data-track="availability-check" className={cn(smallBtn, "bg-blue text-white")}>
            {a.check}
          </button>
          <button type="button" onClick={() => setStage("idle")} aria-label={a.cancel} className={cn(smallBtn, "border-[1.5px] border-hairline-strong bg-white px-4 text-charcoal")}>
            ×
          </button>
        </form>
      )}
      {error && stage === "address" && <p className="w-full text-left text-[14px] font-semibold text-charcoal">{a.error}</p>}

      {open && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-charcoal/60 p-4 lg:items-center" onClick={() => setStage("idle")}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[440px] rounded-card border border-hairline bg-white p-6 text-left text-charcoal shadow-xl"
          >
            {stage === "ask" && (
              <>
                <h2 id={titleId} className="text-[22px] font-bold leading-tight">
                  {a.inArea}
                </h2>
                <p className="mt-1 text-[14px] text-slate">{address}</p>
                <p className="mt-4 text-[17px] font-semibold">{a.inAreaLine}</p>
                <div className="mt-4 flex flex-col gap-2.5">
                  <button type="button" onClick={() => setStage("phone")} data-track="availability-yes" className={cn(smallBtn, "w-full bg-blue text-white")}>
                    {a.yes}
                  </button>
                  <button type="button" onClick={() => setStage("declined")} data-track="availability-no" className={cn(smallBtn, "w-full border-[1.5px] border-charcoal bg-white text-charcoal")}>
                    {a.no}
                  </button>
                </div>
              </>
            )}
            {stage === "phone" && (
              <form onSubmit={submitPhone}>
                <h2 id={titleId} className="text-[22px] font-bold leading-tight">
                  {a.phoneLabel}
                </h2>
                <p className="mt-1 text-[14px] text-slate">{address}</p>
                <input ref={phoneRef} name="phone" type="tel" required placeholder={a.phonePlaceholder} aria-label={a.phoneLabel} autoComplete="tel" className={cn(input, "mt-4")} />
                <p className="mt-2 text-[12px] leading-snug text-slate">{a.consent}</p>
                {error && <p className="mt-2 text-[14px] font-semibold">{a.error}</p>}
                <button type="submit" disabled={busy} data-track="availability-send" className={cn(smallBtn, "mt-4 w-full bg-blue text-white")}>
                  {a.send}
                </button>
              </form>
            )}
            {stage === "done" && (
              <>
                <h2 id={titleId} className="text-[22px] font-bold leading-tight">
                  {a.done}
                </h2>
                <button type="button" onClick={() => setStage("idle")} className={cn(smallBtn, "mt-5 w-full border-[1.5px] border-charcoal bg-white text-charcoal")}>
                  {a.close}
                </button>
              </>
            )}
            {stage === "declined" && (
              <>
                <h2 id={titleId} className="text-[22px] font-bold leading-tight">
                  {a.declined}
                </h2>
                <div className="mt-5 flex flex-col gap-2.5">
                  <Button href={link("book")} variant="filled" track="availability-book" className="h-[52px] w-full">
                    {home.hero.homeowners.primary}
                  </Button>
                  <Button href={site.phone.tel} variant="outlined" track="availability-call" className="h-[52px] w-full">
                    {home.hero.homeowners.secondary}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
