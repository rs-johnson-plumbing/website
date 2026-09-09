"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, type NavItem } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Sticky header. Desktop (80px): logo left, nav links, then the phone number
 * as a callout, not a button: a soft sand plate (lighter charcoal in
 * builders mode) with the phone and message icons stacked at left, a small
 * "Call or text" label, and the number under it. It stays a tel link. The
 * teal buttons belong to the intake forms in the hero. Mobile (60px): 24px mark plus
 * short wordmark and a hamburger that opens a stacked nav panel. No number
 * on mobile: the sticky bottom bar carries Call and Text on every page. The
 * current page link is underlined.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const nav = site.nav as NavItem[];

  // Close the panel on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <header className="sticky top-0 z-20 border-b border-hairline bg-offwhite builders:border-darkborder builders:bg-teal">
      <div className="site-width gutter flex h-header-m items-center justify-between gap-3 lg:h-header">
        <Logo />
        <div className="flex items-center">
          <nav aria-label="Primary" className="hidden items-center gap-5 text-[15px] lg:flex xl:gap-8 xl:text-[16px]">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className={cn("nav-link", isActive(item.href) && "nav-link-active")} aria-current={isActive(item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={site.phone.tel}
            data-track="call-header"
            className="ml-5 hidden shrink-0 items-center gap-2.5 rounded-btn bg-sand py-2 pl-3 pr-3.5 xl:ml-8 text-charcoal hover:no-underline builders:bg-teal-dark builders:text-offwhite lg:flex"
          >
            <span className="flex flex-col gap-0.5 text-teal builders:text-offwhite" aria-hidden="true">
              <Icon name="phone" size={15} strokeWidth={1.8} />
              <Icon name="message" size={15} strokeWidth={1.8} />
            </span>
            <span className="flex flex-col items-end text-right leading-none">
              <span className="text-[12px] font-semibold text-slate builders:text-ondark-muted">{site.cta.headerCallout}</span>
              <span className="mt-0.5 whitespace-nowrap text-[19px] font-extrabold tracking-[-0.01em]">{site.phone.display}</span>
            </span>
          </a>
          <button
            type="button"
            className="-mr-2 flex h-10 w-10 items-center justify-center text-charcoal builders:text-offwhite lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={22} strokeWidth={2} />
          </button>
        </div>
      </div>
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={cn(
          open ? "flex" : "hidden",
          "flex-col gap-4 border-t border-hairline bg-offwhite px-gutter-m pb-6 pt-4 text-[16px] font-semibold builders:border-darkborder builders:bg-teal lg:!hidden",
        )}
      >
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className={cn("text-charcoal builders:text-offwhite", isActive(item.href) && "underline underline-offset-4")} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
