import { plumbing, type Service } from "@/lib/content";
import { IconTile } from "@/components/ui/Icon";
import { TextLink } from "@/components/ui/TextLink";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { cn } from "@/lib/cn";

/**
 * One hub service section: two columns, photo on one side and text on the
 * other, alternating by index. Text column holds the icon-plus-H2 row, the
 * paragraph, an optional "What we do" list, an optional callout box, and a
 * link to the service page.
 */
export function ServiceBand({ service, photoLeft }: { service: Service; photoLeft: boolean }) {
  const h = service.hub;
  const photo = h.photo && <PhotoPlaceholder photo={h.photo} aspect="4/3" className={cn("order-first", photoLeft ? "lg:order-first" : "lg:order-last")} />;
  return (
    <section id={service.slug} className="scroll-mt-[140px] bg-offwhite">
      <div className="site-width gutter grid grid-cols-1 items-start gap-6 py-14 lg:grid-cols-2 lg:gap-16 lg:py-[72px]">
        {photo}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <IconTile name={service.icon} size={40} />
            <h2 className="text-h2-m lg:text-h2">{h.heading}</h2>
          </div>
          <p className="text-[16px] leading-[1.7] lg:text-body">{h.paragraph}</p>
          {h.whatWeDo.length > 0 && (
            <>
              <div className="text-[16px] font-bold">{plumbing.whatWeDoLabel}</div>
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
          <TextLink href={`/plumbing/${service.slug}`}>{h.link}</TextLink>
        </div>
      </div>
    </section>
  );
}
