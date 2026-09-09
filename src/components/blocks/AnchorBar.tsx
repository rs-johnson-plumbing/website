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
export function AnchorBar({ anchors }: { anchors: Anchor[] }) {
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

  // Keep the active item in view on phones.
  useEffect(() => {
    const el = strip.current?.querySelector<HTMLElement>(`[data-anchor="${active}"]`);
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  const page = (dir: 1 | -1) => strip.current?.scrollBy({ left: dir * strip.current.clientWidth * 0.7, behavior: "smooth" });

  return (
    <nav aria-label="On this page" className="sticky top-header-m z-[15] border-y border-hairline bg-offwhite lg:top-header">
      <div className="relative">
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => page(-1)}
          className={cn(
            "absolute inset-y-0 left-0 z-10 flex w-9 items-center justify-center bg-gradient-to-r from-offwhite via-offwhite to-transparent text-charcoal transition-opacity lg:hidden",
            canLeft ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <Icon name="chevron-down" size={18} strokeWidth={2} className="rotate-90" />
        </button>
        <div ref={strip} className="site-width gutter flex gap-4 overflow-x-auto [scrollbar-width:none] lg:justify-between lg:gap-3 [&::-webkit-scrollbar]:hidden">
          {anchors.map((a) => {
            const isActive = a.id === active;
            return (
              <a
                key={a.id}
                href={`#${a.id}`}
                data-anchor={a.id}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-mb-px inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-[3px] py-3 text-[15px] font-medium transition-colors hover:border-ondark-muted hover:text-charcoal hover:no-underline lg:py-3.5",
                  isActive ? "border-blue font-bold text-blue hover:text-blue" : "border-transparent text-slate",
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
            "absolute inset-y-0 right-0 z-10 flex w-9 items-center justify-center bg-gradient-to-l from-offwhite via-offwhite to-transparent text-charcoal transition-opacity lg:hidden",
            canRight ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <Icon name="chevron-down" size={18} strokeWidth={2} className="-rotate-90" />
        </button>
      </div>
    </nav>
  );
}
