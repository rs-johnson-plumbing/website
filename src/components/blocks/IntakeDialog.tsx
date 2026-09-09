"use client";

import { useEffect } from "react";
import { cn } from "@/lib/cn";

/**
 * Shared shell for the quick-capture flows (Check Availability, Submit Bid
 * Request): centered white dialog, Escape and backdrop close, body scroll
 * lock. The flows own their stages and copy; this owns the frame.
 */
export const intakeInput = "h-[52px] w-full min-w-0 rounded-btn border-[1.5px] border-charcoal bg-white px-3.5 text-[16px] text-charcoal placeholder:text-slate focus:border-blue focus:outline-none";
export const intakeBtn = "inline-flex h-[52px] shrink-0 items-center justify-center whitespace-nowrap rounded-btn px-5 text-[16px] font-bold transition-opacity hover:opacity-[0.88] disabled:opacity-60";
export const intakeChip = "flex min-h-[52px] items-center justify-center rounded-btn border-[1.5px] border-charcoal bg-white px-3 py-2 text-center text-[15px] font-bold leading-tight text-charcoal transition-colors hover:border-blue hover:text-blue";

export function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-2.5">
      <dt className="text-[11px] font-bold uppercase tracking-[0.06em] text-slate">{label}</dt>
      <dd className="mt-0.5 text-[15px] font-semibold leading-snug text-charcoal">{children}</dd>
    </div>
  );
}

export function BackLink({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick} className="text-[14px] font-semibold text-slate hover:text-charcoal">
      ← {label}
    </button>
  );
}

type Props = {
  open: boolean;
  onClose: () => void;
  titleId: string;
  closeLabel: string;
  /** Hide the corner × (the done state has its own Close button). */
  showClose?: boolean;
  children: React.ReactNode;
};

export function IntakeDialog({ open, onClose, titleId, closeLabel, showClose = true, children }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-charcoal/60 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[480px] rounded-card border border-hairline bg-white p-6 text-left text-charcoal shadow-xl lg:p-7"
      >
        {showClose && (
          <button type="button" onClick={onClose} aria-label={closeLabel} className={cn("absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-[22px] leading-none text-slate hover:bg-sand hover:text-charcoal")}>
            ×
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
