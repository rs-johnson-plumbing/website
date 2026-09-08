import Link from "next/link";
import type { Service } from "@/lib/content";
import { IconTile } from "@/components/ui/Icon";
import { TextLink } from "@/components/ui/TextLink";

/**
 * Homepage / hub service card: icon tile, name, one muted line, Learn more.
 * The whole card is a link target via the Learn more link; the border turns
 * blue on hover.
 */
export function ServiceCard({ service, learnMoreLabel = "Learn more" }: { service: Service; learnMoreLabel?: string }) {
  const href = `/plumbing/${service.slug}`;
  return (
    <div className="flex flex-col items-start gap-3 rounded-card border border-hairline bg-transparent p-6 transition-colors hover:border-blue">
      <IconTile name={service.icon} />
      <Link href={href} className="text-[18px] font-medium text-charcoal hover:no-underline">
        {service.name}
      </Link>
      <div className="text-[15px] text-slate">{service.short}</div>
      <TextLink href={href}>{learnMoreLabel}</TextLink>
    </div>
  );
}
