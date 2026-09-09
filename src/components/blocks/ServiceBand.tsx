import { servicesHub, type Service, type BuilderService } from "@/lib/content";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { ServiceIllustration } from "./ServiceIllustration";
import { BandIllustration, hasBandIllustration } from "./BandIllustration";
import { cn } from "@/lib/cn";

type BandProps = {
  id: string;
  illustration: string;
  heading: string;
  paragraph: string;
  whatWeDo: string[];
  callout?: { lead: string; text: string };
  photo?: { src?: string; alt: string; caption: string };
  photoLeft: boolean;
};

/**
 * One two-column band: big scene on one side, text on the other, alternating
 * by index. Text column holds the icon-plus-H2 row, the paragraph, an
 * optional "What we do" list, and an optional callout. Off-white on the
 * homeowner page, charcoal on the builder page through the builders
 * variants. The scene comes from BandIllustration when one exists for the
 * slug, else the photo placeholder.
 */
export function Band({ id, illustration, heading, paragraph, whatWeDo, callout, photo, photoLeft }: BandProps) {
  const side = cn("order-first", photoLeft ? "lg:order-first" : "lg:order-last");
  const scene = photo
    ? hasBandIllustration(id)
      ? <BandIllustration slug={id} title={photo.alt} className={side} />
      : photo.src
        ? <PhotoPlaceholder photo={{ src: photo.src, alt: photo.alt, caption: photo.caption }} aspect="4/3" className={side} />
        : null
    : null;
  return (
    <section id={id} className="scroll-mt-[140px] bg-offwhite builders:bg-teal">
      <div className={cn("site-width gutter grid grid-cols-1 items-start gap-6 py-10 lg:gap-16 lg:py-[60px]", scene ? "lg:grid-cols-2" : "lg:max-w-[760px] lg:mr-auto")}>
        {scene}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-3 lg:gap-4">
            <ServiceIllustration slug={illustration} className="h-14 w-14 shrink-0 lg:h-[72px] lg:w-[72px]" />
            <h2 className="text-h2-m lg:text-h2">{heading}</h2>
          </div>
          <p className="text-[16px] leading-[1.7] lg:text-body">{paragraph}</p>
          {whatWeDo.length > 0 && (
            <>
              <div className="text-[16px] font-bold">{servicesHub.whatWeDoLabel}</div>
              <ul className="flex list-disc flex-col gap-1.5 pl-5 text-[16px] leading-[1.7] lg:text-body">
                {whatWeDo.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </>
          )}
          {callout && (
            <div role="note" className="rounded-card border border-hairline border-l-[3px] border-l-charcoal bg-offwhite px-4 py-3.5 text-[16px] leading-[1.7] text-charcoal">
              <strong>{callout.lead}</strong> {callout.text}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** A homeowner service band. */
export function ServiceBand({ service, photoLeft }: { service: Service; photoLeft: boolean }) {
  const h = service.hub;
  return <Band id={service.slug} illustration={service.slug} heading={h.heading} paragraph={h.paragraph} whatWeDo={h.whatWeDo} callout={h.callout} photo={h.photo} photoLeft={photoLeft} />;
}

/** A builder stage band, same layout on the dark ground. */
export function BuilderBand({ stage, photoLeft }: { stage: BuilderService; photoLeft: boolean }) {
  const h = stage.hub;
  return <Band id={stage.slug} illustration={stage.illustration} heading={h.heading} paragraph={h.paragraph} whatWeDo={h.whatWeDo} photo={h.photo} photoLeft={photoLeft} />;
}
