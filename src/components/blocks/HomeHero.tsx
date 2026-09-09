"use client";

import { home } from "@/lib/content";
import { AvailabilityCheck } from "./AvailabilityCheck";
import { BidRequest } from "./BidRequest";
import { CallText } from "@/components/ui/CallText";
import { Icon } from "@/components/ui/Icon";
import { MetroMap } from "./MetroMap";
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
 * Phone: no audience toggle and no builders row. The statement centered, the
 * map card, a full-width Submit Service Request, the talk line, then the
 * Call and Text pair. Builders on a phone get their door from the closing
 * banner and the For Builders page. Desktop has no Call and Text pair; the
 * header callout carries the number, since a desktop cannot dial.
 */
export function HomeHero() {
  const s = home.hero.single;
  const doors = [
    { key: "homeowners", ...s.homeowners, action: <AvailabilityCheck className="self-start" /> },
    { key: "builders", ...s.builders, action: <BidRequest className="self-start" /> },
  ];

  return (
    <>
      <section className="relative hidden overflow-hidden bg-offwhite text-charcoal lg:block">
        {/* The metro map sits behind everything, faded out under the headline. */}
        <MetroMap className="pointer-events-none absolute inset-0 h-full w-full" />
        <div className="site-width gutter relative pb-[64px] pt-[64px]">
          <h1 className="max-w-[760px] text-[52px] font-bold leading-[1.08] tracking-[-0.01em]">{s.heading}</h1>
          <div className="mt-9 flex items-stretch gap-10">
            {doors.map((d, i) => (
              <div key={d.key} className="contents">
                {i > 0 && <div className="w-px bg-hairline" aria-hidden="true" />}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="inline-flex items-center gap-2 text-[20px] font-semibold tracking-[-0.01em]">
                      <Icon name={d.icon as IconName} size={22} strokeWidth={1.8} className="text-teal" />
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

      {/* Phone: statement, the map card, Submit Service Request, the talk line, then Call and Text. */}
      <section data-sticky-sentinel className="bg-offwhite text-charcoal lg:hidden">
        <div className="flex flex-col gap-4 px-gutter-m pb-8 pt-7">
          <p className="text-center text-[32px] font-bold leading-[1.1] tracking-[-0.01em]">{s.heading}</p>
          {/* Where we are and where we go: the metro map in a card, with the words on top. */}
          <div className="relative mt-1 overflow-hidden rounded-card border border-hairline bg-white">
            <MetroMap frame="phone" className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.55]" />
            <div className="relative flex flex-col items-center gap-1 px-4 py-7 text-center [text-shadow:0_0_10px_#fff,0_0_18px_#fff]">
              <span className="text-[12px] font-bold uppercase tracking-[0.06em] text-teal">{s.card.eyebrow}</span>
              <span className="text-[15px] font-semibold text-slate">{s.card.lead}</span>
              <span className="whitespace-nowrap text-[17px] font-bold text-charcoal">{s.card.area}</span>
            </div>
          </div>
          <AvailabilityCheck className="mt-1 w-full" />
          <p className="-mb-1 mt-1 text-center text-[15px] font-semibold text-charcoal">{s.talk}</p>
          <CallText track="hero" desktop={false} or={s.or} />
        </div>
      </section>
    </>
  );
}
