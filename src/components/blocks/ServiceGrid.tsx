import Link from "next/link";
import { services, builderServices } from "@/lib/content";
import { ServiceIllustration } from "./ServiceIllustration";
import { cn } from "@/lib/cn";

type Card = { key: string; illustration: string; name: string; short: string; href: string };

/**
 * The illustrated service cards, two across on phone and four on desktop.
 * The whole card is the link. On the services hub each card jumps to its
 * section on the page; elsewhere it points at the hub. `builderSlugs` adds
 * builder stages after the homeowner services. `phoneList` swaps the phone
 * layout for a single-column list, illustration at left, which the
 * homepage uses so the section stays under two screens.
 */
export function ServiceGrid({ hrefFor, slugs, builderSlugs, builderHrefFor = hrefFor, phoneList = false }: { hrefFor: (slug: string) => string; slugs?: string[]; builderSlugs?: string[]; builderHrefFor?: (slug: string) => string; phoneList?: boolean }) {
  const list = slugs ? slugs.map((slug) => services.find((s) => s.slug === slug)).filter((s): s is NonNullable<typeof s> => Boolean(s)) : services;
  const cards: Card[] = list.map((s) => ({ key: s.slug, illustration: s.slug, name: s.name, short: s.hubShort, href: hrefFor(s.slug) }));
  for (const slug of builderSlugs ?? []) {
    const b = builderServices.find((s) => s.slug === slug);
    if (b) cards.push({ key: b.slug, illustration: b.illustration, name: b.name, short: b.short, href: builderHrefFor(b.slug) });
  }
  return (
    // Pick a desktop column count the tiles fill: eight go four across, six go three across.
    <div className={cn("grid gap-3 lg:gap-5", cards.length % 4 === 0 ? "lg:grid-cols-4" : "lg:grid-cols-3", phoneList ? "grid-cols-1" : "grid-cols-2")}>
      {cards.map((c) => (
        <Link
          key={c.key}
          href={c.href}
          className={cn(
            "flex rounded-card border border-hairline bg-white text-charcoal transition-colors hover:border-blue hover:no-underline lg:flex-col lg:items-center lg:gap-2 lg:p-6 lg:text-center",
            phoneList ? "items-center gap-4 p-3 text-left" : "flex-col items-center gap-2 p-4 text-center",
          )}
        >
          <ServiceIllustration slug={c.illustration} className={cn("shrink-0 lg:h-[132px] lg:w-[132px]", phoneList ? "h-16 w-16" : "h-[104px] w-[104px]")} />
          <span className={cn("flex flex-col gap-0.5 lg:items-center lg:gap-1", !phoneList && "items-center")}>
            <span className="text-[17px] font-bold leading-tight lg:text-[19px]">{c.name}</span>
            <span className="text-[14px] leading-snug text-slate lg:text-[15px]">{c.short}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

/** Hero-style centered heading used at the top of the hub and audience pages. */
export function PageHeading({ id, title, line, align = "center", className, dark = false }: { id: string; title: string; line?: string; align?: "center" | "left"; className?: string; /** On a charcoal section. */ dark?: boolean }) {
  return (
    <div className={cn("mb-8 flex flex-col gap-3 lg:mb-10", align === "center" ? "items-center text-center" : "items-start text-left")}>
      <h2 id={id} className={cn(className ?? "text-[clamp(26px,8vw,32px)] font-bold leading-[1.1] tracking-[-0.01em] lg:text-h1 lg:font-bold", dark && "text-offwhite")}>
        {title}
      </h2>
      {line && <p className={cn("max-w-[560px] text-[16px] leading-[1.5] lg:text-body", dark ? "text-ondark-muted" : "text-slate")}>{line}</p>}
    </div>
  );
}
