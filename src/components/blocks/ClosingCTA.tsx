import { site, link } from "@/lib/content";
import { Button } from "@/components/ui/Button";

type Props = {
  heading?: string;
  /** Override the secondary button, e.g. Request a Bid on builder pages. */
  secondary?: { label: string; href: string };
};

/** Charcoal strip at the bottom of every page: heading, call, book, hours line. */
export function ClosingCTA({ heading = site.closingCta.heading, secondary }: Props) {
  const second = secondary ?? { label: site.closingCta.secondary, href: link("book") };
  return (
    <section className="bg-charcoal text-offwhite">
      <div className="site-width gutter flex flex-col items-center gap-5 py-14 text-center lg:py-16">
        <h2 className="text-h2-m text-offwhite lg:text-h2">{heading}</h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href={site.phone.tel} variant="filled" track="call-closing">
            {site.closingCta.primary}
          </Button>
          <Button href={second.href} variant="outlined-dark" track="book-closing">
            {second.label}
          </Button>
        </div>
        <p className="text-[15px] text-ondark-muted">
          {site.hours} · {site.emergencyLine}
        </p>
      </div>
    </section>
  );
}
