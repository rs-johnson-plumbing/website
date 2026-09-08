"use client";

import { useEffect, useState } from "react";
import type { IconName } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export type Anchor = { id: string; label: string; icon: IconName };

/**
 * Sticky in-page navigation under a hero. Sits below the header, scrolls
 * horizontally on mobile, and underlines the section currently in view.
 */
export function AnchorBar({ anchors }: { anchors: Anchor[] }) {
  const [active, setActive] = useState<string>(anchors[0]?.id ?? "");

  useEffect(() => {
    const sections = anchors.map((a) => document.getElementById(a.id)).filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the top-most visible section.
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [anchors]);

  return (
    <nav aria-label="On this page" className="sticky top-header-m z-[15] border-y border-hairline bg-offwhite lg:top-header">
      <div className="site-width gutter flex gap-3 overflow-x-auto [scrollbar-width:none] lg:justify-between [&::-webkit-scrollbar]:hidden">
        {anchors.map((a) => {
          const isActive = a.id === active;
          return (
            <a
              key={a.id}
              href={`#${a.id}`}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "-mb-px inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-[3px] py-3 text-[14px] font-medium transition-colors hover:border-ondark-muted hover:text-charcoal hover:no-underline lg:py-3.5 lg:text-[15px]",
                isActive ? "border-blue font-bold text-blue hover:text-blue" : "border-transparent text-slate",
              )}
            >
              <Icon name={a.icon} size={16} />
              <span>{a.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
