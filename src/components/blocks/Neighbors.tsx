"use client";

import { home, reviews } from "@/lib/content";
import { ReviewCard } from "./ReviewCard";
import { Icon } from "@/components/ui/Icon";
import { useAudience } from "./AudienceContext";

/**
 * "What our neighbors say" for homeowners, "What other contractors say"
 * for builders. Follows the homepage toggle. Lead quote, then two cards.
 */
export function Neighbors({ headingClassName }: { headingClassName?: string } = {}) {
  const { audience } = useAudience();
  const block = home.neighbors[audience];
  const more = block.reviewIds.map((id) => reviews.items.find((r) => r.id === id)).filter((r): r is NonNullable<typeof r> => Boolean(r));
  return (
    <div className="flex flex-col gap-3 lg:gap-5">
      <h2 id="neighbors-h" className={headingClassName ?? "text-center text-h2-m tracking-[-0.01em] lg:text-left lg:text-h2"}>
        {block.heading}
      </h2>
      {block.proofLine && (
        <div className="flex items-center justify-center gap-2 text-[13px] font-semibold text-slate builders:text-ondark-muted lg:justify-start">
          <Icon name="star" size={14} filled className="text-blue" />
          {block.proofLine}
        </div>
      )}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-5">
        <figure className="m-0 rounded-card border border-hairline border-l-4 border-l-blue bg-white p-5 text-charcoal">
          <blockquote className="m-0 text-[20px] font-bold leading-[1.3] tracking-[-0.01em]">“{block.lead.quote}”</blockquote>
          <figcaption className="mt-1.5 text-[13px] text-slate">{block.lead.attribution}</figcaption>
        </figure>
        {more.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
      {/* The See All Reviews link returns when the reviews page ships. */}
    </div>
  );
}
