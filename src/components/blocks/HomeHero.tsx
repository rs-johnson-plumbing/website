"use client";

import { home, site, link } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useAudience, type Audience } from "./AudienceContext";

/**
 * Two-door homepage hero.
 *
 * Desktop: homeowners door left (55%, off-white) and builders door right
 * (45%, charcoal), side by side with a shared top baseline.
 *
 * Mobile: a segmented For Homeowners / For Builders control under the header
 * flips between the two doors. Each door is centered: headline, one line,
 * two stacked buttons with the phone number visible, and a credentials line.
 */
export function HomeHero() {
  const { audience, setAudience } = useAudience();
  const h = home.hero;

  return (
    <>
      <div role="tablist" aria-label="Choose audience" className="border-b border-hairline bg-offwhite px-gutter-m py-2 lg:hidden">
        <div className="flex gap-1 rounded-btn bg-hairline p-1">
          {(["homeowners", "builders"] as Audience[]).map((a) => (
            <button
              key={a}
              role="tab"
              type="button"
              aria-selected={audience === a}
              onClick={() => setAudience(a)}
              className={cn(
                "flex-1 whitespace-nowrap rounded-[6px] px-3 py-2.5 text-[15px] font-bold transition-colors",
                audience === a ? "bg-white text-charcoal shadow-[0_1px_2px_rgba(0,0,0,0.08)]" : "text-slate",
              )}
            >
              {h.toggle[a]}
            </button>
          ))}
        </div>
      </div>

      <section data-sticky-sentinel className="grid grid-cols-1 lg:grid-cols-[55%_45%] lg:items-start">
        {/* Homeowners door */}
        <div className={cn("bg-offwhite text-charcoal", audience !== "homeowners" && "hidden lg:block")}>
          <div className="flex flex-col items-center gap-4 px-gutter-m py-8 text-center lg:ml-auto lg:max-w-[calc(1440px*0.55)] lg:items-start lg:gap-5 lg:px-gutter lg:py-[64px] lg:text-left">
            <div className="hidden text-[14px] font-bold uppercase tracking-[0.04em] text-slate lg:block">{h.homeowners.eyebrow}</div>
            <h1 className="text-[32px] font-bold leading-[1.1] tracking-[-0.01em] lg:min-h-[106px] lg:text-h1 lg:font-bold">{h.homeowners.heading}</h1>
            {h.homeowners.line && <p className="max-w-[520px] text-[16px] leading-[1.5] lg:min-h-[58px] lg:text-body">{h.homeowners.line}</p>}
            <div className="flex w-full flex-col gap-2.5 lg:w-auto lg:flex-row lg:gap-3 lg:pt-2">
              <Button href={link("book")} variant="filled" track="book-hero" className="h-[52px] w-full lg:w-auto">
                {h.homeowners.primary}
              </Button>
              <Button href={site.phone.tel} variant="outlined" track="call-hero" className="h-[52px] w-full bg-white lg:w-auto">
                {h.homeowners.secondary}
              </Button>
            </div>
            {h.homeowners.credentials.length > 0 && (
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[13px] font-semibold text-slate lg:hidden">
              {(h.homeowners.credentials as string[]).map((c, i) => (
                <span key={c} className="inline-flex gap-3">
                  {i > 0 && <span aria-hidden="true">·</span>}
                  {c}
                </span>
              ))}
            </div>
            )}
          </div>
        </div>

        {/* Builders door */}
        <div id="builders" className={cn("bg-charcoal text-offwhite", audience !== "builders" && "hidden lg:block")}>
          <div className="flex flex-col items-center gap-4 px-gutter-m py-8 text-center lg:mr-auto lg:max-w-[calc(1440px*0.45)] lg:items-start lg:gap-5 lg:px-gutter lg:py-[64px] lg:text-left">
            <div className="hidden text-[14px] font-bold uppercase tracking-[0.04em] text-ondark-muted lg:block">{h.builders.eyebrow}</div>
            <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.01em] text-offwhite lg:min-h-[106px] lg:text-h1 lg:font-bold">{h.builders.heading}</h2>
            <p className="max-w-[520px] text-[16px] leading-[1.5] text-ondark-muted lg:min-h-[58px] lg:text-body">{h.builders.line}</p>
            <div className="flex w-full flex-col gap-2.5 lg:w-auto lg:flex-row lg:gap-3 lg:pt-2">
              <Button href={link("bid")} variant="filled" track="bid-hero" className="h-[52px] w-full lg:hidden">
                {h.builders.primary}
              </Button>
              <Button href={link("bid")} variant="outlined-dark" track="bid-hero" className="hidden h-[52px] lg:inline-flex">
                {h.builders.primary}
              </Button>
              <Button href={site.phone.tel} variant="outlined-dark" track="call-hero-builders" className="h-[52px] w-full lg:hidden">
                {h.builders.secondary}
              </Button>
            </div>
            {h.builders.credentials.length > 0 && (
            <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 text-[13px] font-semibold text-ondark-muted lg:justify-start">
              {(h.builders.credentials as string[]).map((c, i) => (
                <span key={c} className="inline-flex gap-3">
                  {i > 0 && <span aria-hidden="true">·</span>}
                  {c}
                </span>
              ))}
            </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
