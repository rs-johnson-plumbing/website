import { site, type IconName } from "@/lib/content";
import { IconCircle } from "@/components/ui/Icon";

/**
 * Credentials strip under the hero. This is the one place credentials appear
 * on a page. Four items spread edge to edge on desktop, 2x2 on mobile.
 */
export function TrustBar() {
  const items = site.trustBar as { icon: IconName; label: string }[];
  return (
    <section aria-label="Credentials" className="border-y border-hairline bg-offwhite">
      <div className="site-width gutter grid grid-cols-2 gap-x-4 gap-y-3 py-5 lg:flex lg:justify-between lg:gap-5">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2.5 text-[14px] font-medium lg:whitespace-nowrap lg:text-[15px]">
            <IconCircle name={item.icon} size={34} />
            {item.label}
          </div>
        ))}
      </div>
    </section>
  );
}
