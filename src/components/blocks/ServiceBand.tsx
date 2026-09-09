import { servicesHub, type Service } from "@/lib/content";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { ServiceIllustration } from "./ServiceIllustration";
import { BandIllustration, hasBandIllustration } from "./BandIllustration";
import { cn } from "@/lib/cn";

/**
 * One hub service section: two columns, photo on one side and text on the
 * other, alternating by index. Text column holds the icon-plus-H2 row, the
 * paragraph, an optional "What we do" list, and an optional callout box. The
 * per-service landing pages exist but are not linked for now.
 */
export function ServiceBand({ service, photoLeft }: { service: Service; photoLeft: boolean }) {
  const h = service.hub;
  const side = cn("order-first", photoLeft ? "lg:order-first" : "lg:order-last");
  const photo = h.photo
    ? hasBandIllustration(service.slug)
      ? <BandIllustration slug={service.slug} title={h.photo.alt} className={side} />
      : <PhotoPlaceholder photo={h.photo} aspect="4/3" className={side} />
    : null;
  return (
    <section id={service.slug} className="scroll-mt-[140px] bg-offwhite">
      <div className={cn("site-width gutter grid grid-cols-1 items-start gap-6 py-10 lg:gap-16 lg:py-[60px]", h.photo ? "lg:grid-cols-2" : "lg:max-w-[760px] lg:mr-auto")}>
        {photo}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-3 lg:gap-4">
            <ServiceIllustration slug={service.slug} className="h-14 w-14 shrink-0 lg:h-[72px] lg:w-[72px]" />
            <h2 className="text-h2-m lg:text-h2">{h.heading}</h2>
          </div>
          <p className="text-[16px] leading-[1.7] lg:text-body">{h.paragraph}</p>
          {h.whatWeDo.length > 0 && (
            <>
              <div className="text-[16px] font-bold">{servicesHub.whatWeDoLabel}</div>
              <ul className="flex list-disc flex-col gap-1.5 pl-5 text-[16px] leading-[1.7] lg:text-body">
                {h.whatWeDo.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </>
          )}
          {h.callout && (
            <div role="note" className="rounded-card border border-hairline border-l-[3px] border-l-charcoal bg-offwhite px-4 py-3.5 text-[16px] leading-[1.7]">
              <strong>{h.callout.lead}</strong> {h.callout.text}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
