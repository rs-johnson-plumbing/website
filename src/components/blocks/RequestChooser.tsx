"use client";

import { useId, useState } from "react";
import { home } from "@/lib/content";
import { cn } from "@/lib/cn";
import { BackLink, Chip, IntakeDialog, intakeHeading as h2 } from "./IntakeDialog";
import { AvailabilityCheck } from "./AvailabilityCheck";
import { BidRequest } from "./BidRequest";

type Step = "closed" | "who" | "homeowner" | "builder";

/**
 * One filled "Submit Request" button that asks two questions before the
 * intake: are you a homeowner or a builder, then the matching request
 * (service request for homeowners, bid request for builders). Picking the
 * request hands off to that flow. Used in the sticky phone bar and the
 * closing banner on pages that serve both audiences. Copy lives in
 * home.json under chooser.
 */
export function RequestChooser({ className, size = "bar" }: { className?: string; /** "bar" is the sticky bar's short button; "full" matches the intake buttons elsewhere. */ size?: "bar" | "full" }) {
  const c = home.chooser;
  const [step, setStep] = useState<Step>("closed");
  const [service, setService] = useState(0);
  const [bid, setBid] = useState(0);
  const titleId = useId();
  const close = () => setStep("closed");
  return (
    <>
      <button
        type="button"
        onClick={() => setStep("who")}
        data-track="request-open"
        className={cn(
          "flex items-center justify-center rounded-btn bg-teal font-bold text-white hover:opacity-[0.88] builders:bg-charcoal",
          size === "bar" ? "py-3 text-[14px]" : "h-[52px] px-6 text-[16px]",
          className,
        )}
      >
        {c.button}
      </button>
      <IntakeDialog open={step !== "closed"} onClose={close} titleId={titleId} closeLabel={c.close}>
        {step === "who" && (
          <>
            <h2 id={titleId} className={h2}>
              {c.heading}
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-2.5">
              <Chip icon="house" illustration={c.homeownerIllustration} label={c.homeowner} track="request-homeowner" onClick={() => setStep("homeowner")} />
              <Chip icon="hammer" illustration={c.builderIllustration} label={c.builder} track="request-builder" onClick={() => setStep("builder")} />
            </div>
          </>
        )}
        {step === "homeowner" && (
          <>
            <h2 id={titleId} className={h2}>
              {c.next}
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-2.5">
              <Chip icon="wrench" illustration={c.serviceIllustration} label={c.service} track="request-service" onClick={() => { close(); setService((n) => n + 1); }} />
            </div>
            <BackLink onClick={() => setStep("who")} label={c.back} />
          </>
        )}
        {step === "builder" && (
          <>
            <h2 id={titleId} className={h2}>
              {c.next}
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-2.5">
              <Chip icon="building" illustration={c.bidIllustration} label={c.bid} track="request-bid" onClick={() => { close(); setBid((n) => n + 1); }} />
            </div>
            <BackLink onClick={() => setStep("who")} label={c.back} />
          </>
        )}
      </IntakeDialog>
      <AvailabilityCheck hideTrigger openSignal={service} />
      <BidRequest hideTrigger openSignal={bid} />
    </>
  );
}
