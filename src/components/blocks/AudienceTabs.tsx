import Link from "next/link";
import type { IconName } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export type AudienceTab = { href: string; label: string; icon: IconName };

/**
 * Sticky strip under the header that flips between two pages (the homeowner
 * and builder services). Tan on the homeowner page, charcoal on the builder
 * page through the builders variants. The current tab is underlined.
 */
export function AudienceTabs({ tabs, current }: { tabs: AudienceTab[]; current: string }) {
  return (
    <nav aria-label="Audience" className="sticky top-header-m z-[15] border-y border-hairline bg-offwhite builders:border-darkborder builders:bg-blue lg:top-header">
      <div className="site-width gutter flex gap-8 lg:gap-10">
        {tabs.map((t) => {
          const active = t.href === current;
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "-mb-px inline-flex items-center gap-1.5 whitespace-nowrap border-b-[3px] py-3 text-[15px] font-medium transition-colors hover:text-charcoal hover:no-underline builders:hover:text-offwhite lg:py-3.5",
                active ? "border-blue font-bold text-blue hover:text-blue builders:border-offwhite builders:text-offwhite builders:hover:text-offwhite" : "border-transparent text-slate builders:text-ondark-muted",
              )}
            >
              <Icon name={t.icon} size={16} />
              <span>{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
