"use client";

import { useEffect, useState } from "react";
import { site, link } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Fixed bottom bar on every page below the desktop breakpoint: filled Call
 * with the number, outlined Book. In builders mode the bar goes charcoal and
 * Book becomes Request a Bid. Body padding reserves its height in
 * globals.css.
 *
 * On a page with a `data-sticky-sentinel` element (the homepage hero), the
 * bar stays hidden while that element is on screen and slides in once it
 * scrolls away, so the hero buttons and the bar are never both visible.
 * Pages without a sentinel show the bar immediately.
 */
export function StickyMobileBar() {
  // Start hidden so the hero never shows the bar before hydration; pages
  // without a sentinel slide it in on mount.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.querySelector<HTMLElement>("[data-sticky-sentinel]");
    if (!sentinel) {
      setVisible(true);
      return;
    }
    // Scroll-based rather than IntersectionObserver: identical behavior in
    // every mobile browser, no first-callback quirks. Show the bar once the
    // hero's bottom edge has scrolled above the viewport.
    let ticking = false;
    const update = () => {
      ticking = false;
      setVisible(sentinel.getBoundingClientRect().bottom <= 0);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // The hero changes height when the homeowner/builder toggle flips.
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(onScroll) : null;
    ro?.observe(sentinel);
    // And re-measure whenever the audience flips, even if the height stays.
    const mo = new MutationObserver(onScroll);
    mo.observe(document.body, { attributes: true, attributeFilter: ["data-audience"] });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ro?.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 flex gap-2.5 border-t border-hairline bg-offwhite px-4 py-2.5 pb-[max(10px,env(safe-area-inset-bottom))] transition-transform duration-300 builders:border-darkborder builders:bg-charcoal lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <a
        href={site.phone.tel}
        data-track="call-sticky"
        tabIndex={visible ? 0 : -1}
        className="flex flex-[1.6] items-center justify-center whitespace-nowrap rounded-btn bg-blue py-3 text-[14px] font-bold text-white hover:opacity-[0.88]"
        aria-label={`${site.phone.note} ${site.phone.display}`}
      >
        {site.cta.stickyCall}
      </a>
      <a
        href={link("book")}
        data-track="book-sticky"
        tabIndex={visible ? 0 : -1}
        className="flex flex-1 items-center justify-center rounded-btn border-[1.5px] border-charcoal py-3 text-[14px] font-bold text-charcoal hover:opacity-[0.88] builders:hidden"
      >
        {site.cta.stickyBook}
      </a>
      <a
        href={link("bid")}
        data-track="bid-sticky"
        tabIndex={visible ? 0 : -1}
        className="hidden flex-1 items-center justify-center whitespace-nowrap rounded-btn border-[1.5px] border-offwhite py-3 text-[14px] font-bold text-offwhite hover:opacity-[0.88] builders:flex"
      >
        {site.cta.stickyBid}
      </a>
    </div>
  );
}
