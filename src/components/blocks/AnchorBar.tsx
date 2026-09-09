"use client";

import { useEffect, useRef, useState } from "react";
import type { IconName } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export type Anchor = { id: string; label: string; icon: IconName };

/**
 * Sticky in-page navigation under the header. Scrolls horizontally on
 * phones with chevrons on either end that page the strip; spreads edge to
 * edge on desktop. Underlines the section currently in view.
 */
export function AnchorBar({ anchors, spread = true }: { anchors: Anchor[]; /** Spread items edge to edge on desktop. Off for a short list, which then sits together at the left. */ spread?: boolean }) {
  const [active, setActive] = useState<string>(anchors[0]?.id ?? "");
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const strip = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = anchors.map((a) => document.getElementById(a.id)).filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [anchors]);

  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    const update = () => {
      setCanLeft(el.scrollLeft > 4);
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    ro?.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro?.disconnect();
    };
  }, []);

  // Keep the active item in view on phones, but never while the reader is
  // dragging the strip themselves, and never by scrolling the page.
  const touching = useRef(false);
  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    const start = () => (touching.current = true);
    let release: ReturnType<typeof setTimeout>;
    const end = () => {
      clearTimeout(release);
      release = setTimeout(() => (touching.current = false), 600);
    };
    el.addEventListener("touchstart", start, { passive: true });
    el.addEventListener("pointerdown", start);
    el.addEventListener("touchend", end, { passive: true });
    el.addEventListener("pointerup", end);
    return () => {
      el.removeEventListener("touchstart", start);
      el.removeEventListener("pointerdown", start);
      el.removeEventListener("touchend", end);
      el.removeEventListener("pointerup", end);
      clearTimeout(release);
    };
  }, []);

  useEffect(() => {
    const el = strip.current;
    const item = el?.querySelector<HTMLElement>(`[data-anchor="${active}"]`);
    if (!el || !item || touching.current) return;
    if (el.scrollWidth <= el.clientWidth) return;
    const left = item.offsetLeft - (el.clientWidth - item.offsetWidth) / 2;
    el.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [active]);

  // Page the strip by whole items: scroll so the first partly hidden item
  // on that side becomes fully visible at the edge.
  const page = (dir: 1 | -1) => {
    const el = strip.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-anchor]"));
    const viewL = el.scrollLeft;
    const viewR = viewL + el.clientWidth;
    if (dir === 1) {
      const next = items.find((i) => i.offsetLeft + i.offsetWidth > viewR + 2);
      if (next) el.scrollTo({ left: next.offsetLeft - 36, behavior: "smooth" });
    } else {
      const prev = [...items].reverse().find((i) => i.offsetLeft < viewL - 2);
      if (prev) el.scrollTo({ left: Math.max(0, prev.offsetLeft + prev.offsetWidth - el.clientWidth + 36), behavior: "smooth" });
    }
  };

  return (
    <nav aria-label="On this page" className="sticky top-header-m z-[15] border-y border-hairline bg-offwhite builders:border-darkborder builders:bg-teal lg:top-header">
      <div className="relative">
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => page(-1)}
          className={cn(
            "absolute inset-y-0 left-0 z-10 flex w-9 items-center justify-center bg-gradient-to-r from-offwhite via-offwhite to-transparent text-charcoal transition-opacity builders:from-charcoal builders:via-charcoal builders:text-offwhite lg:hidden",
            canLeft ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <Icon name="chevron-down" size={18} strokeWidth={2} className="rotate-90" />
        </button>
        <div ref={strip} className={cn("site-width gutter flex gap-4 overflow-x-auto scroll-px-9 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", spread ? "lg:justify-between lg:gap-3" : "lg:justify-start lg:gap-10")}>
          {anchors.map((a) => {
            const isActive = a.id === active;
            return (
              <a
                key={a.id}
                href={`#${a.id}`}
                data-anchor={a.id}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-mb-px inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-[3px] py-3 text-[15px] font-medium transition-colors hover:border-ondark-muted hover:text-charcoal hover:no-underline builders:hover:text-offwhite lg:py-3.5",
                  isActive ? "border-teal font-bold text-teal hover:text-teal builders:border-offwhite builders:text-offwhite builders:hover:text-offwhite" : "border-transparent text-slate builders:text-ondark-muted",
                )}
              >
                <Icon name={a.icon} size={16} />
                <span>{a.label}</span>
              </a>
            );
          })}
        </div>
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => page(1)}
          className={cn(
            "absolute inset-y-0 right-0 z-10 flex w-9 items-center justify-center bg-gradient-to-l from-offwhite via-offwhite to-transparent text-charcoal transition-opacity builders:from-charcoal builders:via-charcoal builders:text-offwhite lg:hidden",
            canRight ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <Icon name="chevron-down" size={18} strokeWidth={2} className="-rotate-90" />
        </button>
      </div>
    </nav>
  );
}
