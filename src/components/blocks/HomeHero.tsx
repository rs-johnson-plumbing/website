"use client";

import { useState } from "react";
import Link from "next/link";
import { home, site, link } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type Audience = "homeowners" | "builders";
type Card = { label: string; helper: string; link: string; hrefKey: "tel" | "book" | "bid"; track: string };

function resolve(key: Card["hrefKey"]): string {
  if (key === "tel") return site.phone.tel;
  return link(key);
}

/**
 * Two-door homepage hero.
 *
 * Desktop: homeowners door left (55%, off-white, filled Book Service) and
 * builders door right (45%, charcoal, outlined Request a Bid), side by side
 * with a shared top baseline.
 *
 * Mobile: a segmented For Homeowners / For Builders control under the header
 * flips between the two doors. Each door shows two situation cards instead of
 * stacked full-width buttons.
 */
export function HomeHero() {
  const [audience, setAudience] = useState<Audience>("homeowners");
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

      <section className="grid grid-cols-1 lg:grid-cols-[55%_45%] lg:items-start">
        {/* Homeowners door */}
        <div className={cn("bg-offwhite text-charcoal", audience !== "homeowners" && "hidden lg:block")}>
          <div className="flex flex-col items-start gap-4 px-gutter-m py-7 lg:ml-auto lg:max-w-[calc(1440px*0.55)] lg:gap-5 lg:px-gutter lg:py-[72px]">
            <div className="hidden text-[14px] font-bold uppercase tracking-[0.04em] text-slate lg:block">{h.homeowners.eyebrow}</div>
            <h1 className="text-h1-m lg:min-h-[106px] lg:text-h1">{h.homeowners.heading}</h1>
            <p className="max-w-[520px] text-[16px] lg:min-h-[58px] lg:text-body">{h.homeowners.line}</p>
            <div className="hidden lg:block lg:pt-2">
              <Button href={link("book")} variant="filled" track="book-hero">
                {h.homeowners.button}
              </Button>
            </div>
            <SituationCards cards={h.homeowners.cards as Card[]} />
            <div className="flex items-center gap-2 text-[13px] text-slate lg:hidden">
              <Icon name="star" size={14} filled className="text-blue" />
              <span>{h.homeowners.trustLine}</span>
            </div>
          </div>
        </div>

        {/* Builders door */}
        <div id="builders" className={cn("bg-charcoal text-offwhite", audience !== "builders" && "hidden lg:block")}>
          <div className="flex flex-col items-start gap-4 px-gutter-m py-7 lg:mr-auto lg:max-w-[calc(1440px*0.45)] lg:gap-5 lg:px-gutter lg:py-[72px]">
            <div className="hidden text-[14px] font-bold uppercase tracking-[0.04em] text-ondark-muted lg:block">{h.builders.eyebrow}</div>
            <h2 className="text-h1-m text-offwhite lg:min-h-[106px] lg:text-h1">{h.builders.heading}</h2>
            <p className="max-w-[520px] text-[16px] text-ondark-muted lg:min-h-[58px] lg:text-body">{h.builders.line}</p>
            <div className="hidden lg:block lg:pt-2">
              <Button href={link("bid")} variant="outlined-dark" track="bid-hero">
                {h.builders.button}
              </Button>
            </div>
            <SituationCards cards={h.builders.cards as Card[]} dark />
            <div className="text-[13px] text-ondark-muted lg:hidden">{h.builders.trustLine}</div>
          </div>
        </div>
      </section>
    </>
  );
}

function SituationCards({ cards, dark = false }: { cards: Card[]; dark?: boolean }) {
  return (
    <div className="grid w-full grid-cols-2 gap-3 lg:hidden">
      {cards.map((c) => {
        const href = resolve(c.hrefKey);
        const cls = cn(
          "flex flex-col gap-2 rounded-card border p-4 hover:no-underline",
          dark ? "border-darkborder bg-darkcard text-offwhite" : "border-hairline-strong bg-white text-charcoal",
        );
        const inner = (
          <>
            <span className={cn("text-[15px] font-bold", dark && "text-white")}>{c.label}</span>
            <span className={cn("min-h-[36px] text-[13px] leading-snug", dark ? "text-ondark-helper" : "text-slate")}>{c.helper}</span>
            <span className={cn("inline-flex items-center gap-1 whitespace-nowrap text-[15px] font-bold", dark ? "text-blue-ondark" : "text-blue")}>
              {c.link}
              <Icon name="arrow-right" size={16} strokeWidth={2} />
            </span>
          </>
        );
        return href.startsWith("tel:") ? (
          <a key={c.label} href={href} className={cls} data-track={c.track}>
            {inner}
          </a>
        ) : (
          <Link key={c.label} href={href} className={cls} data-track={c.track}>
            {inner}
          </Link>
        );
      })}
    </div>
  );
}
