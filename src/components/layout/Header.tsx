"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, type NavItem } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Sticky header. Desktop (80px): logo left, five nav links, filled phone
 * button. Mobile (60px): 24px mark plus short wordmark, filled Call button,
 * hamburger that opens a stacked nav panel. The current page link is
 * underlined.
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
    <header className="sticky top-0 z-20 border-b border-hairline bg-offwhite">
      <div className="site-width gutter flex h-header-m items-center justify-between gap-3 lg:h-header">
        <Logo />
        <div className="flex items-center">
          <nav aria-label="Primary" className="hidden items-center gap-7 text-[16px] lg:flex xl:gap-8">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className={cn("nav-link", isActive(item.href) && "nav-link-active")} aria-current={isActive(item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>
          <Button href={site.phone.tel} variant="filled" size="sm" track="call-header" className="ml-10 hidden lg:inline-flex">
            {site.cta.headerDesktop}
          </Button>
          <a
            href={site.phone.tel}
            data-track="call-header-mobile"
            className="inline-flex h-9 items-center justify-center rounded-btn bg-blue px-4 text-[14px] font-bold text-white hover:opacity-[0.88] lg:hidden"
            aria-label={`${site.phone.note} ${site.phone.display}`}
          >
            {site.cta.headerMobile}
          </a>
          <button
            type="button"
            className="ml-3 flex h-10 w-10 items-center justify-center text-charcoal lg:hidden"
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
          "flex-col gap-4 border-t border-hairline bg-offwhite px-gutter-m pb-6 pt-4 text-[16px] font-semibold lg:!hidden",
        )}
      >
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className={cn("text-charcoal", isActive(item.href) && "underline underline-offset-4")} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
