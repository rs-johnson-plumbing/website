import { builderServices } from "@/lib/content";
import { ServiceIllustration } from "./ServiceIllustration";

/**
 * The six builder stages as illustrated cards: two across on phone, three on
 * desktop. Cards stay white on the dark builders ground on purpose, so the
 * illustrations read the same everywhere. Shared by the homepage builders
 * door and the For Builders page.
 */
export function BuilderServiceGrid({ slugs }: { slugs?: string[] }) {
  const list = slugs ? slugs.map((slug) => builderServices.find((s) => s.slug === slug)).filter((s): s is NonNullable<typeof s> => Boolean(s)) : builderServices;
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-5">
      {list.map((s) => (
        <div key={s.slug} className="flex flex-col items-center rounded-card border border-hairline bg-white p-3 text-center text-charcoal lg:p-5">
          <ServiceIllustration slug={s.illustration} className="h-[110px] w-[110px] lg:h-[140px] lg:w-[140px]" />
          <div className="mt-2 text-[17px] font-bold leading-tight lg:text-[20px]">{s.name}</div>
          <div className="mt-1 text-[13px] leading-snug text-slate lg:text-[14px]">{s.short}</div>
        </div>
      ))}
    </div>
  );
}
