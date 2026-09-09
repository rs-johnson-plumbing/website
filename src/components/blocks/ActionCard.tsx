import Link from "next/link";
import { site, servicesHub, link } from "@/lib/content";
import { ActionBlockPair } from "./ActionBlock";
import { Icon } from "@/components/ui/Icon";

/**
 * White card with the two homeowner action blocks (Call Now filled, Book
 * Online outlined), a message link, and three small trust items. Used in the
 * hub hero, sticky on service pages, and on city pages.
 */
export function ActionCard({ sticky = false, trackPrefix = "card" }: { sticky?: boolean; trackPrefix?: string }) {
  const c = servicesHub.actionCard;
  return (
    <aside aria-label="Get service" className={`flex flex-col gap-4 rounded-card border border-hairline bg-white p-5 lg:p-6 ${sticky ? "lg:sticky lg:top-[calc(80px+24px)]" : ""}`}>
      <ActionBlockPair
        blocks={[
          { label: c.emergency.label, helper: c.emergency.helper, buttonLabel: c.emergency.button, href: site.phone.tel, variant: "filled", track: `call-${trackPrefix}` },
          { label: c.scheduled.label, helper: c.scheduled.helper, buttonLabel: c.scheduled.button, href: link("book"), variant: "outlined", track: `book-${trackPrefix}` },
        ]}
      />
      <Link href={link("message")} className="text-link text-[15px]" data-track={`message-${trackPrefix}`}>
        {c.messageLine}
      </Link>
      <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-hairline pt-4 text-[13px] text-slate">
        {c.trust.map((t) => (
          <span key={t} className="inline-flex items-center gap-1.5">
            <Icon name="check" size={14} strokeWidth={2} className="text-teal" />
            {t}
          </span>
        ))}
      </div>
    </aside>
  );
}
