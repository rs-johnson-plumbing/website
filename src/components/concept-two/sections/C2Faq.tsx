import type { FaqItem } from "@/lib/content";

/** Plain disclosure list. No accordion library, no motion. */
export function C2Faq({ heading, items }: { heading: string; items: FaqItem[] }) {
  return (
    <section className="c2-section c2-section--paper" aria-labelledby="c2-faq-heading">
      <div className="c2-wrap c2-faq">
        <h2 id="c2-faq-heading" className="c2-h2">
          {heading}
        </h2>
        <div className="c2-faq-list">
          {items.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
