"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * A looping row that rolls on its own and follows a finger or a mouse.
 *
 * The children render twice so the loop is seamless; the row sits at some
 * offset inside one copy's width and wraps when it runs past. Each frame it
 * advances at the base speed (one full loop per `seconds`). A drag moves it
 * with the pointer instead, and on release the fling carries on with
 * friction until it slows back to the base speed. A mouse resting on it
 * pauses it; a tap still reaches the card underneath, a drag does not.
 * Readers who turned motion off get a still row they can still swipe.
 * The ref exposes `step(n)`, which eases the row by n items (negative for
 * the other way) for arrow buttons.
 */
export type MarqueeRailHandle = { step: (n: number) => void };

export const MarqueeRail = forwardRef<MarqueeRailHandle, { children: ReactNode; /** Seconds for one full loop at the base speed. */ seconds?: number; /** Roll left to right instead of right to left. */ reverse?: boolean; className?: string }>(function MarqueeRail({ children, seconds = 60, reverse = false, className }, ref) {
  const track = useRef<HTMLDivElement>(null);
  const state = useRef({ x: 0, v: 0, drag: false, dragged: false, hover: false, lastX: 0, lastT: 0, still: false, nudge: 0 });

  useImperativeHandle(ref, () => ({
    step(n) {
      const el = track.current;
      if (!el) return;
      const first = el.children[0] as HTMLElement | undefined;
      if (!first) return;
      const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
      const item = first.getBoundingClientRect().width + gap;
      // Moving the content left brings the next item in from the right.
      state.current.nudge += -n * item;
      state.current.v = 0;
    },
  }));

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const s = state.current;
    s.still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let prev = performance.now();
    const dir = reverse ? 1 : -1;

    const frame = (now: number) => {
      const dt = Math.min(now - prev, 50);
      prev = now;
      const loop = el.scrollWidth / 2;
      if (loop > 0) {
        const base = s.still ? 0 : (loop / (seconds * 1000)) * dir;
        if (!s.drag) {
          if (Math.abs(s.nudge) > 0.5) {
            // An arrow press: ease the remaining distance out over a few frames.
            const move = s.nudge * (1 - Math.exp(-dt / 90));
            s.x += move;
            s.nudge -= move;
          } else if (Math.abs(s.v) > Math.abs(base)) {
            // A fling: ease the velocity back toward the base speed.
            s.v *= Math.pow(0.94, dt / 16);
            if (Math.abs(s.v) < Math.abs(base)) s.v = base;
          } else if (!s.hover) {
            s.v = base;
          } else {
            s.v = 0;
          }
          if (Math.abs(s.nudge) <= 0.5) s.x += s.v * dt;
        }
        // Keep the offset inside one copy so the row never runs out.
        s.x = ((s.x % loop) + loop) % loop - loop;
        el.style.transform = `translate3d(${s.x}px,0,0)`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [seconds, reverse]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = state.current;
    s.drag = true;
    s.dragged = false;
    s.lastX = e.clientX;
    s.lastT = performance.now();
    s.v = 0;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = state.current;
    if (!s.drag) return;
    const now = performance.now();
    const dx = e.clientX - s.lastX;
    const dt = Math.max(now - s.lastT, 1);
    s.x += dx;
    s.v = dx / dt;
    s.lastX = e.clientX;
    s.lastT = now;
    if (Math.abs(dx) > 0) s.dragged = s.dragged || Math.abs(dx) > 2;
  };

  const endDrag = () => {
    const s = state.current;
    if (!s.drag) return;
    s.drag = false;
    // Cap the fling so one hard swipe does not send the row spinning.
    s.v = Math.max(-3, Math.min(3, s.v));
  };

  return (
    <div
      className={cn("marquee select-none overflow-hidden py-1", className)}
      style={{ touchAction: "pan-y", maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={(e) => {
        endDrag();
        if (e.pointerType === "mouse") state.current.hover = false;
      }}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") state.current.hover = true;
      }}
      onClickCapture={(e) => {
        // A drag that ends over a card is not a tap on it.
        if (state.current.dragged) {
          e.preventDefault();
          e.stopPropagation();
          state.current.dragged = false;
        }
      }}
    >
      <div ref={track} className="flex w-max gap-3 pl-3 will-change-transform lg:gap-4 lg:pl-4">
        {children}
      </div>
    </div>
  );
});
