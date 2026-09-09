"use client";

import { home } from "@/lib/content";
import { AvailabilityCheck } from "./AvailabilityCheck";
import { BidRequest } from "./BidRequest";
import { CallText } from "@/components/ui/CallText";
import { Icon } from "@/components/ui/Icon";
import { MetroMap } from "./MetroMap";
import { RequestChooser } from "./RequestChooser";
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
 * Phone: no audience toggle, no builders row, no map. A one-line serving
 * eyebrow with a pin, the statement centered, then two white boxes stacked
 * full width. The first asks "Do you need to submit a request?" over one
 * full-width Submit Request that asks homeowner or builder and hands off to
 * that flow. The second asks "Do you need to talk to somebody?" over the
 * Call and Text pair side by side. Builders on a phone get their door from
 * the closing banner and the For Builders page. Desktop has no Call and
 * Text pair; the header callout carries the number, since a desktop cannot
 * dial.
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

      {/* Phone: serving eyebrow, statement, then the two stacked boxes. */}
      <section data-sticky-sentinel className="bg-offwhite text-charcoal lg:hidden">
        <div className="flex flex-col gap-3 px-gutter-m pb-8 pt-6">
          <p className="mb-2 inline-flex items-center justify-center gap-1.5 text-[14px] font-bold text-teal">
            <Icon name="map" size={17} strokeWidth={1.8} />
            {s.eyebrow}
          </p>
          <p className="text-center text-[32px] font-bold leading-[1.1] tracking-[-0.01em]">{s.heading}</p>
          <div className="mt-2 flex flex-col gap-3">
            <div className="flex flex-col gap-3 rounded-card border border-hairline bg-white p-4">
              <p className="text-center text-[16px] font-bold text-charcoal">{s.ask}</p>
              <RequestChooser size="full" className="w-full" />
            </div>
            <div className="flex flex-col gap-3 rounded-card border border-hairline bg-white p-4">
              <p className="text-center text-[16px] font-bold text-charcoal">{s.talk}</p>
              <CallText track="hero" desktop={false} or={s.or} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
