import Link from "next/link";
import type { Service } from "@/lib/content";
import { IconTile } from "@/components/ui/Icon";
import { TextLink } from "@/components/ui/TextLink";

/**
 * Homepage / hub service card: icon tile, name, one muted line, Learn more.
 * The whole card is a link target via the Learn more link; the border turns
 * teal on hover.
 */
type Props = {
  service: Service;
  learnMoreLabel?: string;
  /** Override the target, e.g. an in-page anchor on the hub. */
  href?: string;
  /** Override the one-line description. */
  description?: string;
};

export function ServiceCard({ service, learnMoreLabel = "Learn More", href: hrefProp, description }: Props) {
  const href = hrefProp ?? `/services#${service.slug}`;
  return (
    <div className="flex flex-col items-start gap-3 rounded-card border border-hairline bg-transparent p-6 transition-colors hover:border-teal">
      <IconTile name={service.icon} />
      <Link href={href} className="text-[18px] font-medium text-charcoal hover:no-underline">
        {service.name}
      </Link>
      <div className="text-[15px] text-slate">{description ?? service.short}</div>
      <TextLink href={href}>{learnMoreLabel}</TextLink>
    </div>
  );
}
