"use client";

import { useId, useState } from "react";
import { home } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Chip, IntakeDialog, intakeHeading as h2 } from "./IntakeDialog";
import { AvailabilityCheck } from "./AvailabilityCheck";
import { BidRequest } from "./BidRequest";

/**
 * One filled "Submit Request" button that asks which door first: a service
 * request (homeowners) or a bid request (builders), then hands off to that
 * flow. Used in the sticky phone bar, where there is room for one button.
 * Copy lives in home.json under chooser.
 */
export function RequestChooser({ className }: { className?: string }) {
  const c = home.chooser;
  const [open, setOpen] = useState(false);
  const [service, setService] = useState(0);
  const [bid, setBid] = useState(0);
  const titleId = useId();
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} data-track="request-open" className={cn("flex items-center justify-center rounded-btn bg-teal py-3 text-[14px] font-bold text-white hover:opacity-[0.88]", className)}>
        {c.button}
      </button>
      <IntakeDialog open={open} onClose={() => setOpen(false)} titleId={titleId} closeLabel={c.close}>
        <h2 id={titleId} className={h2}>
          {c.heading}
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-2.5">
          <Chip icon="house" illustration={c.serviceIllustration} label={c.service} track="request-service" onClick={() => { setOpen(false); setService((n) => n + 1); }} />
          <Chip icon="hammer" illustration={c.bidIllustration} label={c.bid} track="request-bid" onClick={() => { setOpen(false); setBid((n) => n + 1); }} />
        </div>
      </IntakeDialog>
      <AvailabilityCheck hideTrigger openSignal={service} />
      <BidRequest hideTrigger openSignal={bid} />
    </>
  );
}
