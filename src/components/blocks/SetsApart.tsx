"use client";

import { home, type IconName } from "@/lib/content";
import { useAudience } from "./AudienceContext";
import { ValueIllustration } from "./ValueIllustration";

type Item = { icon: IconName; title: string; line: string };

/**
 * "Here's what sets us apart" for homeowners, "Why trust us" for builders.
 * Follows the homepage toggle.
 */
/** `heading` overrides the block heading, e.g. on the For Homeowners and For Builders pages. */
export function SetsApart({ heading, headingClassName }: { heading?: string; headingClassName?: string } = {}) {
  const { audience } = useAudience();
  const block = home.setsApart[audience] as { heading: string; items: Item[] };
  const title = heading ?? block.heading;
  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      <h2 id="apart-h" className={headingClassName ?? "text-center text-h2-m tracking-[-0.01em] lg:text-left lg:text-h2"}>
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-5">
        {block.items.map((item) => (
          <div key={item.title} className="flex items-center gap-4 rounded-card border border-hairline bg-white builders:border-darkborder builders:bg-darkcard p-4 lg:p-5">
            <ValueIllustration icon={item.icon} className="h-16 w-16 shrink-0 lg:h-[72px] lg:w-[72px]" />
            <div>
              <div className="text-[17px] font-bold">{item.title}</div>
              <div className="text-[14px] leading-snug text-slate builders:text-ondark-muted">{item.line}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
