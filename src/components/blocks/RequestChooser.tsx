"use client";

import { useId, useState } from "react";
import { home } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Chip, IntakeDialog, intakeHeading as h2 } from "./IntakeDialog";
import { AvailabilityCheck } from "./AvailabilityCheck";
import { BidRequest } from "./BidRequest";

/**
 * One filled "Submit Request" button that asks "Are you a homeowner or a
 * builder?" and hands off: Homeowner goes straight into the service
 * request (address, then the kind of work), Builder straight into the bid
 * request. Used on the phone hero, the sticky phone bar, and the closing
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
          "flex items-center justify-center gap-2 whitespace-nowrap rounded-btn bg-blue font-bold text-white hover:opacity-[0.88] builders:shadow-cream-inset",
          size === "bar" ? "py-3 text-[14px]" : "h-[52px] px-6 text-[16px]",
          className,
        )}
      >
        {c.button}
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
