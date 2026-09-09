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
      {/* Three across on desktop. A six-column grid with two-column cards lets a short last row center itself: two leftovers start at column 2, one at column 3. */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-6 lg:gap-5 lg:[&>*:nth-child(3n+1):nth-last-child(2)]:col-start-2 lg:[&>*:nth-child(3n+1):nth-last-child(1)]:col-start-3">
        {block.items.map((item) => (
          <div key={item.title} className="flex items-start gap-4 rounded-card border border-hairline bg-white p-4 text-charcoal lg:col-span-2 lg:p-5">
            <ValueIllustration icon={item.icon} className="h-16 w-16 shrink-0 lg:h-[72px] lg:w-[72px]" />
            <div>
              <div className="text-[17px] font-bold text-charcoal">{item.title}</div>
              <div className="text-[14px] leading-snug text-slate">{item.line}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
