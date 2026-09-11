import type { FaqItem } from "@/lib/content";
import { C2Icon, type C2IconName } from "../ui/C2Icon";

const icons: Record<string, C2IconName> = {
  map: "map-pin", bolt: "phone", shield: "shield-check", tag: "tag",
  phone: "users", "water-heater": "wrench", calendar: "calendar",
};

/** Plain disclosure list. No accordion library, no motion. */
export function C2Faq({ heading, items, illustrated = false }: { heading: string; items: FaqItem[]; illustrated?: boolean }) {
  return (
    <section className="c2-section c2-section--paper" aria-labelledby="c2-faq-heading">
      <div className="c2-wrap c2-faq">
        <h2 id="c2-faq-heading" className="c2-h2">
          {heading}
        </h2>
        <div className="c2-faq-list">
          {items.map((item) => (
            <details key={item.q}>
              <summary>
                {illustrated && <span className="c2-faq-icon"><C2Icon name={icons[item.icon ?? ""] ?? "message"} size={24} /></span>}
                <span>{item.q}</span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
