import { site, link } from "@/lib/content";

/**
 * Fixed bottom bar on every page below the desktop breakpoint: filled Call
 * and outlined Book. Body padding reserves its height in globals.css.
 */
export function StickyMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2.5 border-t border-hairline bg-offwhite px-4 py-2.5 pb-[max(10px,env(safe-area-inset-bottom))] lg:hidden">
      <a
        href={site.phone.tel}
        data-track="call-sticky"
        className="flex flex-1 items-center justify-center rounded-btn bg-blue py-3 text-[15px] font-bold text-white hover:opacity-[0.88]"
        aria-label={`${site.phone.note} ${site.phone.display}`}
      >
        {site.cta.stickyCall}
      </a>
      <a
        href={link("book")}
        data-track="book-sticky"
        className="flex flex-1 items-center justify-center rounded-btn border-[1.5px] border-charcoal py-3 text-[15px] font-bold text-charcoal hover:opacity-[0.88]"
      >
        {site.cta.stickyBook}
      </a>
    </div>
  );
}
