"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { IconName } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { ServiceIllustration, hasServiceIllustration } from "./ServiceIllustration";
import { cn } from "@/lib/cn";

/**
 * Shared shell and parts for the quick-capture flows (Request Service,
 * Request a Bid): centered white dialog, Escape and backdrop
 * close, body scroll lock, plus the heading style, the icon chip, and the
 * back link. The flows own their stages and copy.
 */
export const intakeHeading = "pr-7 text-[18px] font-bold leading-tight tracking-[-0.01em] text-charcoal lg:text-[21px]";
export const intakeInput = "h-[52px] w-full min-w-0 rounded-btn border-[1.5px] border-hairline-strong bg-white px-3.5 text-[16px] text-charcoal placeholder:text-slate focus:border-blue focus:outline-none";
export const intakeBtn = "inline-flex h-[48px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-btn px-5 text-[16px] font-bold transition-opacity hover:opacity-[0.88] disabled:opacity-60";

/** An option button: icon in a tinted tile, label to its right. */
export function Chip({ icon, illustration, label, onClick, track, dashed = false }: { icon: IconName; /** A ServiceIllustration key; drawn instead of the icon tile when given. */ illustration?: string; label: string; onClick: () => void; track: string; dashed?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-track={track}
      className={cn(
        "flex min-h-[54px] w-full items-center gap-3 rounded-btn border border-hairline-strong bg-white px-3 py-2 text-left text-[15px] font-bold leading-tight text-charcoal shadow-[0_1px_2px_rgba(43,43,43,0.08)] transition-colors hover:border-blue hover:bg-blue-tint",
        dashed && "border-dashed shadow-none",
      )}
    >
      {illustration && hasServiceIllustration(illustration) ? (
        <ServiceIllustration slug={illustration} className="h-11 w-11 shrink-0" />
      ) : (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-tile bg-sand text-charcoal">
          <Icon name={icon} size={20} />
        </span>
      )}
      <span>{label}</span>
    </button>
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

  if (!open || typeof document === "undefined") return null;
  // Portal to the body: a fixed overlay inside the sticky bar would be
  // positioned by the bar's transform, not the screen.
  return createPortal(
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-charcoal/60 p-3 lg:p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[540px] rounded-card border border-hairline bg-white p-5 text-left text-charcoal shadow-xl lg:p-7"
      >
        {showClose && (
          <button type="button" onClick={onClose} aria-label={closeLabel} className="absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full text-[22px] leading-none text-slate hover:bg-sand hover:text-charcoal">
            ×
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
}
