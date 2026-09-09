import { site, link } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { CallText } from "@/components/ui/CallText";
import { cn } from "@/lib/cn";

type Props = {
  heading?: string;
  /** Anchor id, e.g. "request-a-bid" so the sticky bar's Request Bid lands here. */
  id?: string;
  /** Replace the filled link with a custom control, e.g. the Submit Bid Request modal button. */
  action?: React.ReactNode;
  /** Override the secondary button, e.g. Request a Bid on builder pages. */
  secondary?: { label: string; href: string };
  /** Builders-mode heading and secondary button (homepage toggle). */
  builders?: { heading: string; secondary: { label: string; href: string } };
};

/** Charcoal strip at the bottom of every page: heading, the Call and Text
 * pair on phone (desktop has the header callout instead), filled Schedule
 * (or Request a Bid in builders mode). Hours line
 * is held back until Ryan confirms hours and the emergency policy. */
export function ClosingCTA({ heading = site.closingCta.heading, id, action, secondary, builders }: Props) {
  const second = secondary ?? { label: site.closingCta.secondary, href: link("book") };
  return (
    <section id={id} className="scroll-mt-[140px] bg-charcoal text-offwhite builders:bg-[#1f1f1f]">
      <div className="site-width gutter flex flex-col items-center gap-5 py-10 text-center lg:py-[60px]">
        <h2 className={cn("text-h2-m text-offwhite lg:text-h2", builders && "builders:hidden")}>{heading}</h2>
        {builders && <h2 className="hidden text-h2-m text-offwhite builders:block lg:text-h2">{builders.heading}</h2>}
        <div className="flex w-full max-w-[440px] flex-col gap-3 lg:w-auto lg:max-w-none lg:flex-row lg:flex-wrap lg:justify-center">
          <CallText variant="outlined-dark" track="closing" desktop={false} />
          {action ?? (
            <Button href={second.href} variant="filled" track="book-closing" icon="arrow-right" className={cn("h-[52px] w-full lg:w-auto", builders && "builders:hidden")}>
              {second.label}
            </Button>
          )}
          {builders && (
            <Button href={builders.secondary.href} variant="filled" track="bid-closing" icon="arrow-right" className="hidden h-[52px] w-full builders:inline-flex lg:w-auto">
              {builders.secondary.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
