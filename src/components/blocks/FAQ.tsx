import type { FaqItem } from "@/lib/content";
import { Icon, IconTile } from "@/components/ui/Icon";
import { JsonLd } from "./JsonLd";
import { cn } from "@/lib/cn";

type Props = {
  items: FaqItem[];
  /** Index of the item open on load. Defaults to the first. */
  openIndex?: number;
  /** Emit FAQPage structured data. Only one FAQ block per page should do so. */
  withJsonLd?: boolean;
};

/**
 * Accordion list built on native details/summary so it works without JS and
 * stays static. Items with an icon get a tile in front of the question and
 * the answer indents under it. Wherever this renders, FAQPage JSON-LD renders
 * with it.
 */
export function FAQ({ items, openIndex = 0, withJsonLd = true }: Props) {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
  return (
    <div className="divide-y divide-hairline border-y border-hairline">
      {withJsonLd && <JsonLd data={faqLd} />}
      {items.map((item, i) => (
        <details key={item.q} open={i === openIndex} className="group">
          <summary className="flex cursor-pointer list-none items-center gap-4 py-4 text-[17px] font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
            {item.icon && <IconTile name={item.icon} size={40} />}
            <span className="flex-1">{item.q}</span>
            <Icon name="chevron-down" size={18} strokeWidth={2} className="shrink-0 text-slate transition-transform group-open:rotate-180" />
          </summary>
          <p className={cn("pb-5 text-[16px] leading-relaxed text-slate", item.icon && "pl-14")}>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
