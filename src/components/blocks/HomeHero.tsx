"use client";

import { home } from "@/lib/content";
import { cn } from "@/lib/cn";
import { useAudience, type Audience } from "./AudienceContext";
import { AvailabilityCheck } from "./AvailabilityCheck";
import { BidRequest } from "./BidRequest";
import { CallText } from "@/components/ui/CallText";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/lib/content";

/**
 * Homepage hero.
 *
 * Desktop: one banner. The statement, then two doors side by side under it,
 * each an icon subhead with a one-line helper over its own filled teal
 * button, Submit Service Request and Submit Bid Request, with a hairline
 * between.
 * Two filled buttons in one section is deliberate here: the hero's job is
 * to give each audience its door.
 *
 * Mobile: a segmented For Homeowners / For Builders control under the header
 * flips between the two doors. Each door is centered: headline, a filled
 * intake button (Submit Service Request or Submit Bid Request), the Call and
 * Text pair, and a credentials line. Desktop has no Call and Text pair; the
 * header callout carries the number, since a desktop cannot dial.
 */
export function HomeHero() {
  const { audience, setAudience } = useAudience();
  const h = home.hero;

  const s = h.single;
  const doors = [
    { key: "homeowners", ...s.homeowners, action: <AvailabilityCheck className="self-start !bg-teal" /> },
    { key: "builders", ...s.builders, action: <BidRequest className="self-start !bg-teal" /> },
  ];

  return (
    <>
      <section className="hidden bg-offwhite text-charcoal lg:block">
        <div className="site-width gutter pb-[64px] pt-[64px]">
          <h1 className="max-w-[760px] text-[52px] font-bold leading-[1.08] tracking-[-0.01em]">{s.heading}</h1>
          <div className="mt-9 flex items-stretch gap-10">
            {doors.map((d, i) => (
              <div key={d.key} className="contents">
                {i > 0 && <div className="w-px bg-hairline" aria-hidden="true" />}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="inline-flex items-center gap-2 text-[20px] font-semibold tracking-[-0.01em]">
                      <Icon name={d.icon as IconName} size={22} strokeWidth={1.8} className="text-blue" />
                      {d.label}
                    </span>
                    <span className="text-[14px] text-slate">{d.line}</span>
                  </div>
                  {d.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div role="tablist" aria-label="Choose audience" className="border-b border-hairline bg-offwhite px-gutter-m py-2 builders:border-darkborder builders:bg-charcoal lg:hidden">
        <div className="flex gap-1 rounded-btn bg-hairline p-1 builders:bg-darkcard">
          {(["homeowners", "builders"] as Audience[]).map((a) => (
            <button
              key={a}
              role="tab"
              type="button"
              aria-selected={audience === a}
              onClick={() => setAudience(a)}
              className={cn(
                "flex-1 whitespace-nowrap rounded-[6px] px-3 py-2.5 text-[15px] font-bold transition-colors",
                audience === a ? "bg-white text-charcoal shadow-[0_1px_2px_rgba(0,0,0,0.08)]" : "text-slate builders:text-ondark-muted",
              )}
            >
              {h.toggle[a]}
            </button>
          ))}
        </div>
      </div>

      <section data-sticky-sentinel className="grid grid-cols-1 lg:hidden">
        {/* Homeowners door */}
        <div className={cn("bg-offwhite text-charcoal", audience !== "homeowners" && "hidden")}>
          <div className="flex flex-col items-center gap-4 px-gutter-m py-8 text-center lg:ml-auto lg:max-w-[calc(1440px*0.55)] lg:items-start lg:gap-5 lg:px-gutter lg:py-[64px] lg:text-left">
            <div className="hidden text-[14px] font-bold uppercase tracking-[0.04em] text-slate lg:block">{h.homeowners.eyebrow}</div>
            <p className="flex min-h-[71px] items-center justify-center text-[clamp(26px,8vw,32px)] font-bold leading-[1.1] tracking-[-0.01em] text-charcoal">{h.homeowners.heading}</p>
            {h.homeowners.line && <p className="max-w-[520px] text-[16px] leading-[1.5] lg:min-h-[58px] lg:text-body">{h.homeowners.line}</p>}
            <div className="flex w-full flex-col gap-2.5 lg:w-full lg:max-w-[640px] lg:flex-row lg:flex-wrap lg:gap-3 lg:pt-2">
              {/* Submit Service Request is the primary; it turns into the address field in place. */}
              <AvailabilityCheck className="w-full lg:w-auto" />
              {/* Phone: Call and Text pair. Desktop: none, the header callout carries the number. */}
              <CallText track="hero" desktop={false} />
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
        <div id="builders" className={cn("bg-charcoal text-offwhite", audience !== "builders" && "hidden")}>
          <div className="flex flex-col items-center gap-4 px-gutter-m py-8 text-center lg:mr-auto lg:max-w-[calc(1440px*0.45)] lg:items-start lg:gap-5 lg:px-gutter lg:py-[64px] lg:text-left">
            <div className="hidden text-[14px] font-bold uppercase tracking-[0.04em] text-ondark-muted lg:block">{h.builders.eyebrow}</div>
            <h2 className="flex min-h-[71px] items-center justify-center text-[clamp(26px,8vw,32px)] font-bold leading-[1.1] tracking-[-0.01em] text-offwhite lg:block lg:min-h-[106px] lg:text-h1 lg:font-bold">{h.builders.heading}</h2>
            {h.builders.line && <p className="max-w-[520px] text-[16px] leading-[1.5] text-ondark-muted lg:min-h-[58px] lg:text-body">{h.builders.line}</p>}
            <div className="flex w-full flex-col gap-2.5 lg:w-auto lg:flex-row lg:gap-3 lg:pt-2">
              {/* Submit Bid Request is the primary; it opens the bid intake dialog. */}
              <BidRequest className="w-full lg:w-auto" />
              <div className="w-full lg:hidden">
                <CallText variant="outlined-dark" track="hero-builders" />
              </div>
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
