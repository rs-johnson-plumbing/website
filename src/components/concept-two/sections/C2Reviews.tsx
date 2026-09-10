"use client";

import { useState } from "react";
import { conceptTwo as copy, reviews } from "@/lib/content";
import { C2Icon } from "../ui/C2Icon";

const items = reviews.items.filter((review) => review.audience === "homeowner" && !review.placeholder);

/** One compact strip, not a wall of cards. */
export function C2Reviews({ heading, showProof = true }: { heading: string; showProof?: boolean }) {
  const [index, setIndex] = useState(0);
  const review = items[index];
  const step = (delta: number) => setIndex((current) => (current + delta + items.length) % items.length);

  return (
    <section className="c2-section c2-section--tight c2-section--paper" aria-labelledby="c2-reviews-heading">
      <div className="c2-wrap c2-reviews">
        <div className="c2-reviews-head">
          <h2 id="c2-reviews-heading">{heading}</h2>
          {showProof && (
            <p className="c2-reviews-proof">
              <strong>{copy.home.reviews.proof}</strong>
              {copy.home.reviews.proofLine}
            </p>
          )}
        </div>
        <div className="c2-reviews-body">
          <blockquote className="c2-quote">&ldquo;{review.quote}&rdquo;</blockquote>
          <p className="c2-quote-by">
            {review.author}, {review.city} &middot; {review.source}
          </p>
        </div>
        <div className="c2-reviews-nav">
          <button type="button" className="c2-round" onClick={() => step(-1)} aria-label={copy.ui.previous}>
            <C2Icon name="arrow-left" size={18} />
          </button>
          <button type="button" className="c2-round" onClick={() => step(1)} aria-label={copy.ui.next}>
            <C2Icon name="arrow-right" size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
