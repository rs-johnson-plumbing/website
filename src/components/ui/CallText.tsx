import { site, smsLink } from "@/lib/content";
import { Button, type ButtonVariant } from "./Button";
import { cn } from "@/lib/cn";

/**
 * The phone pair. Below the desktop breakpoint: two half-width buttons,
 * Call (tel:) and Text (sms:), because one link cannot do both. At desktop
 * a tap-to-text link is unreliable, so it collapses to one button that
 * shows the number: "Call or Text 314-220-1827". Pass desktop={false} to
 * drop that button where the number is already on screen (the homepage
 * hero, under the header callout).
 */
export function CallText({ variant = "outlined", track, className, buttonClassName, desktop = true }: { variant?: ButtonVariant; track: string; className?: string; buttonClassName?: string; /** Render the desktop "Call or Text" button. Off where the header callout already shows the number. */ desktop?: boolean }) {
  return (
    <>
      <div className={cn("flex w-full gap-2.5 lg:hidden", className)}>
        <Button href={site.phone.tel} variant={variant} track={`call-${track}`} icon="phone" className={cn("h-[52px] flex-1", buttonClassName)}>
          {site.cta.call}
        </Button>
        <Button href={smsLink()} variant={variant} track={`text-${track}`} icon="message" className={cn("h-[52px] flex-1", buttonClassName)}>
          {site.cta.text}
        </Button>
      </div>
      {desktop && (
        <Button href={site.phone.tel} variant={variant} track={`call-${track}`} className={cn("hidden h-[52px] lg:inline-flex", buttonClassName)}>
          {site.cta.callOrText}
        </Button>
      )}
    </>
  );
}
