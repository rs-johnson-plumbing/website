"use client";

import { home } from "@/lib/content";
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
 * Phone: no audience toggle. The statement centered, a full-width Submit
 * Service Request, the Call and Text pair, then one bordered row that gives
 * builders their door as a text link. Desktop has no Call and Text pair;
 * the header callout carries the number, since a desktop cannot dial.
 */
export function HomeHero() {
  const s = home.hero.single;
  const doors = [
    { key: "homeowners", ...s.homeowners, action: <AvailabilityCheck className="self-start" /> },
    { key: "builders", ...s.builders, action: <BidRequest className="self-start" /> },
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

      {/* Phone: statement, Submit Service Request, Call and Text, then a one-line builders door. */}
      <section data-sticky-sentinel className="bg-offwhite text-charcoal lg:hidden">
        <div className="flex flex-col gap-4 px-gutter-m pb-8 pt-7">
          <p className="text-center text-[32px] font-bold leading-[1.1] tracking-[-0.01em]">{s.heading}</p>
          <AvailabilityCheck className="mt-2 w-full" />
          <CallText track="hero" desktop={false} />
          <div className="mt-2 flex items-center justify-between gap-4 rounded-btn border border-hairline px-4 py-3">
            <span className="inline-flex items-center gap-2 text-[16px] font-semibold tracking-[-0.01em]">
              <Icon name={s.builders.icon as IconName} size={18} strokeWidth={1.8} className="text-teal" />
              {s.builders.label}
            </span>
            <BidRequest variant="link" />
          </div>
        </div>
      </section>
    </>
  );
}
