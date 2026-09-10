"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site, smsLink } from "@/lib/content";
import { RequestChooser } from "@/components/blocks/RequestChooser";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/**
 * Fixed bottom bar on every page below the desktop breakpoint: outlined Call
 * and Text, filled Schedule, matching the hero. In builders mode the bar goes charcoal and
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
  const pathname = usePathname();

  // Re-run on every route change: the bar lives in the layout, so without
  // this it would keep watching the hero of whichever page loaded first.
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
    // Back/forward cache restores the page without re-running effects.
    window.addEventListener("pageshow", onScroll);
    // The hero changes height when the homeowner/builder toggle flips.
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(onScroll) : null;
    ro?.observe(sentinel);
    // And re-measure whenever the audience flips, even if the height stays.
    const mo = new MutationObserver(onScroll);
    mo.observe(document.body, { attributes: true, attributeFilter: ["data-audience"] });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pageshow", onScroll);
      ro?.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-hairline bg-offwhite px-4 py-2.5 pb-[max(10px,env(safe-area-inset-bottom))] transition-transform duration-300 lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <a
        href={site.phone.tel}
        data-track="call-sticky"
        tabIndex={visible ? 0 : -1}
        className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-btn border-[1.5px] border-blue bg-transparent py-3 text-[14px] font-bold text-blue hover:opacity-[0.88]"
        aria-label={`${site.cta.call} ${site.phone.display}`}
      >
        {site.cta.stickyCall}
        <Icon name="phone" size={16} strokeWidth={1.8} className="shrink-0" />
      </a>
      <a
        href={smsLink()}
        data-track="text-sticky"
        tabIndex={visible ? 0 : -1}
        className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-btn border-[1.5px] border-blue bg-transparent py-3 text-[14px] font-bold text-blue hover:opacity-[0.88]"
        aria-label={`${site.cta.text} ${site.phone.display}`}
      >
        {site.cta.stickyText}
        <Icon name="message" size={16} strokeWidth={1.8} className="shrink-0" />
      </a>
      <RequestChooser className="flex-[1.3] whitespace-nowrap" />
    </div>
  );
}
