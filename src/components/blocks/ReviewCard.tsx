import type { Review } from "@/lib/content";

/** Quote card: quote, then author and city in muted bold. */
export function ReviewCard({ review, showSource = false }: { review: Review; showSource?: boolean }) {
  const attribution = [review.author, review.company, review.city].filter(Boolean).join(", ");
  return (
    <figure className="m-0 flex h-full flex-col rounded-card border border-hairline bg-white p-6 text-charcoal">
      <blockquote className="m-0 mb-4 flex-1 text-[16px] leading-relaxed">{review.quote}</blockquote>
      <figcaption className="text-[14px] font-bold text-slate">
        {attribution}
        {showSource && (
          <span className="font-medium">
            {" "}
            · {review.source} · {review.date}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

/** Summary tile: "Nextdoor · Neighborhood Favorite 2023 · 24 recommendations". */
export function ReviewSummaryTile({ source, line1, line2 }: { source: string; line1: string; line2: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-card border border-hairline bg-white px-5 py-4 text-charcoal">
      <div className="text-[13px] font-bold uppercase tracking-[0.04em] text-slate">{source}</div>
      <div className="text-[16px] font-semibold">{line1}</div>
      <div className="text-[14px] text-slate">{line2}</div>
    </div>
  );
}
