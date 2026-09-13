"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { conceptTwo as copy, site } from "@/lib/content";
import { Lockup } from "@/components/ui/Logo";
import { C2Icon } from "../ui/C2Icon";
import { C2Button } from "../ui/C2Button";
import { useRequestService, useRequestBid } from "../ui/C2Request";

const housecallToken = "d509e8f43f414e87b70566cc9cb066dc";
const housecallOrg = "R-S-Johnson-Plumbing-LLC";
const housecallBookingUrl = `https://book.housecallpro.com/book/${housecallOrg}/${housecallToken}?v2=true`;

function openHousecallBooking() {
  const widget = (window as Window & { HCPWidget?: { openModal: () => void } }).HCPWidget;
  if (widget) {
    widget.openModal();
  } else {
    // Keep booking available if the third-party script is still loading or blocked.
    window.location.assign(housecallBookingUrl);
  }
}

export function C2Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);
  const requestService = useRequestService();
  const requestBid = useRequestBid();
  const openRequest = (request: () => void) => {
    setOpen(false);
    menuButton.current?.focus();
    request();
  };

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className="c2-header">
      <Script
        id="housecall-online-booking"
        src={`https://online-booking.housecallpro.com/script.js?token=${housecallToken}&orgName=${housecallOrg}`}
        strategy="afterInteractive"
      />
      <a className="c2-skip" href="#c2-main">
        {copy.ui.skipToContent}
      </a>
      <div className="c2-wrap c2-header-inner">
        <Link href="/" aria-label={`${site.name} home`} className="c2-logo">
          <Lockup title={site.name} largerWordmark />
        </Link>
        <nav aria-label={copy.ui.primaryNavigation} className="c2-nav">
          {copy.nav.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="c2-header-actions">
          <a href={site.phone.tel} className="c2-header-phone" data-track="call-header">
            <C2Icon name="phone" size={18} />
            {site.phone.display}
          </a>
          <C2Button onClick={openHousecallBooking} size="sm" trailingIcon={null}>
            {copy.ui.requestService}
          </C2Button>
        </div>
        <button
          ref={menuButton}
          type="button"
          className="c2-menu-btn"
          aria-expanded={open}
          aria-controls="c2-menu"
          aria-label={open ? copy.ui.closeMenu : copy.ui.openMenu}
          onClick={() => setOpen(!open)}
        >
          <C2Icon name={open ? "close" : "menu"} size={26} />
        </button>
      </div>
      <nav id="c2-menu" aria-label={copy.ui.mobileNavigation} hidden={!open} className="c2-wrap c2-mobile-nav">
        {copy.nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
            <C2Icon name="chevron-right" size={18} />
          </Link>
        ))}
        <div className="c2-menu-requests">
          <C2Button onClick={() => openRequest(requestService)} trailingIcon={null}>Request Service</C2Button>
          <C2Button onClick={() => openRequest(requestBid)} trailingIcon={null}>Submit Bid Request</C2Button>
        </div>
      </nav>
    </header>
  );
}
