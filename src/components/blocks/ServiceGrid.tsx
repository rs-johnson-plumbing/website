import Link from "next/link";
import { services } from "@/lib/content";
import { ServiceIllustration } from "./ServiceIllustration";
import { cn } from "@/lib/cn";

/**
 * The eight illustrated service cards, two across on phone and four on
 * desktop. The whole card is the link. On the services hub each card jumps
 * to its section on the page; elsewhere it points at the hub.
 */
export function ServiceGrid({ hrefFor, slugs }: { hrefFor: (slug: string) => string; slugs?: string[] }) {
  const list = slugs ? slugs.map((slug) => services.find((s) => s.slug === slug)).filter((s): s is NonNullable<typeof s> => Boolean(s)) : services;
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
      {list.map((s) => (
        <Link
          key={s.slug}
          href={hrefFor(s.slug)}
          className="flex flex-col items-center gap-2 rounded-card border border-hairline bg-white p-4 text-center text-charcoal transition-colors hover:border-blue hover:no-underline lg:p-6"
        >
          <ServiceIllustration slug={s.slug} className="h-[104px] w-[104px] lg:h-[132px] lg:w-[132px]" />
          <span className="text-[17px] font-bold leading-tight lg:text-[19px]">{s.name}</span>
          <span className="text-[14px] leading-snug text-slate lg:text-[15px]">{s.hubShort}</span>
        </Link>
      ))}
    </div>
  );
}

/** Hero-style centered heading used at the top of the hub and audience pages. */
export function PageHeading({ id, title, line, align = "center", className }: { id: string; title: string; line?: string; align?: "center" | "left"; className?: string }) {
  return (
    <div className={cn("mb-8 flex flex-col gap-3 lg:mb-12", align === "center" ? "items-center text-center" : "items-start text-left")}>
      <h2 id={id} className={className ?? "text-[clamp(26px,8vw,32px)] font-bold leading-[1.1] tracking-[-0.01em] lg:text-h1 lg:font-bold"}>
        {title}
      </h2>
      {line && <p className="max-w-[560px] text-[16px] leading-[1.5] text-slate lg:text-body">{line}</p>}
    </div>
  );
}
