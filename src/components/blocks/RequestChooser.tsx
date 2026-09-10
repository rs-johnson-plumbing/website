"use client";

import { useId, useState } from "react";
import { home } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Chip, IntakeDialog, intakeHeading as h2 } from "./IntakeDialog";
import { AvailabilityCheck } from "./AvailabilityCheck";
import { BidRequest } from "./BidRequest";

/**
 * One "Request a Visit" button (filled; outlined and labelled "Request" in
 * the sticky bar, where Call is the filled one) that
 * asks "Is this for your home or a job site?" and hands off: My Home goes
 * straight into the service request (address, then the kind of work), A Job
 * Site straight into the bid request. Used on the phone hero, the sticky phone bar, and the closing
 * banner on pages that serve both audiences. Copy lives in home.json under
 * chooser.
 */
export function RequestChooser({ className, size = "bar" }: { className?: string; /** "bar" is the sticky bar's short button; "full" matches the intake buttons elsewhere, arrow included. */ size?: "bar" | "full" }) {
  const c = home.chooser;
  const [open, setOpen] = useState(false);
  const [service, setService] = useState(0);
  const [bid, setBid] = useState(0);
  const titleId = useId();
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-track="request-open"
        className={cn(
          "flex items-center justify-center gap-2 whitespace-nowrap rounded-btn font-bold hover:opacity-[0.88]",
          size === "bar" ? "border-[1.5px] border-blue bg-transparent py-3 text-[14px] text-blue" : "h-[52px] bg-blue px-6 text-[16px] text-white builders:shadow-cream-inset",
          className,
        )}
      >
        {size === "bar" ? c.barButton : c.button}
        {size === "full" && <Icon name="arrow-right" size={20} strokeWidth={1.8} className="shrink-0" />}
      </button>
      <IntakeDialog open={open} onClose={() => setOpen(false)} titleId={titleId} closeLabel={c.close}>
        <h2 id={titleId} className={h2}>
          {c.heading}
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-2.5">
          <Chip icon="house" illustration={c.homeownerIllustration} label={c.homeowner} track="request-homeowner" onClick={() => { setOpen(false); setService((n) => n + 1); }} />
          <Chip icon="hammer" illustration={c.builderIllustration} label={c.builder} track="request-builder" onClick={() => { setOpen(false); setBid((n) => n + 1); }} />
        </div>
      </IntakeDialog>
      <AvailabilityCheck hideTrigger openSignal={service} />
      <BidRequest hideTrigger openSignal={bid} />
    </>
  );
}
