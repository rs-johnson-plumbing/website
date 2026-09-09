import { builderServices, servicesHub } from "@/lib/content";
import { ServiceIllustration } from "./ServiceIllustration";

/**
 * The six builder stages in detail, on the dark builders ground of the
 * services hub: illustration, heading, paragraph, and a What We Do list,
 * two across on desktop. Each row carries the stage slug as its id so the
 * cards above can jump to it.
 */
export function BuilderStageList() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
      {builderServices.map((s) => (
        <article key={s.slug} id={s.slug} className="scroll-mt-[140px] rounded-card border border-darkborder bg-darkcard p-5 text-offwhite lg:p-6">
          <div className="flex items-center gap-3 lg:gap-4">
            <ServiceIllustration slug={s.illustration} className="h-14 w-14 shrink-0 lg:h-[72px] lg:w-[72px]" />
            <h3 className="text-[20px] font-semibold leading-tight text-offwhite lg:text-h3">{s.hub.heading}</h3>
          </div>
          <p className="mt-4 text-[16px] leading-[1.7] text-ondark-muted">{s.hub.paragraph}</p>
          <div className="mt-4 text-[15px] font-bold text-offwhite">{servicesHub.whatWeDoLabel}</div>
          <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 text-[15px] leading-[1.6] text-ondark-muted">
            {s.hub.whatWeDo.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
