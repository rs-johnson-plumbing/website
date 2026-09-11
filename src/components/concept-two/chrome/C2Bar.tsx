"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { conceptTwo as copy, site, smsLink } from "@/lib/content";
import { C2Button } from "../ui/C2Button";
import { useRequestService } from "../ui/C2Request";

const BID_ROUTES = ["/for-builders", "/services/builders"];

/** Phone-only action bar: Call, Text, Request. */
export function C2Bar() {
  const requestService = useRequestService();
  const pathname = usePathname();
  const [barState, setBarState] = useState({ path: "", visible: false });
  const visible = barState.path === pathname && barState.visible;

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const headerBottom = document.querySelector(".c2-header")?.getBoundingClientRect().bottom ?? 0;
      const opening = document.querySelector("main .c2-hero-actions")
        ?? document.querySelector("main .directory-preview > .dp-wrap")
        ?? document.querySelector("main .c2-hero");
      // Pages without an opening contact area use a short scroll threshold.
      const passedOpening = opening
        ? opening.getBoundingClientRect().bottom <= headerBottom
        : window.scrollY > 240;
      const next = window.scrollY > 20 && passedOpening;
      setBarState(previous => previous.path === pathname && previous.visible === next
        ? previous : { path: pathname, visible: next });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  // A builder on a builder page wants the bid form, not the homeowner intake.
  const wantsBid = BID_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  return (
    <div className={`c2-bar${visible ? " c2-bar--visible" : ""}`} inert={!visible} aria-hidden={!visible}>
      <C2Button href={site.phone.tel} icon="phone" trailingIcon={null} data-track="call-sticky">
        {copy.ui.call}
      </C2Button>
      <C2Button href={smsLink()} variant="outline" icon="message" trailingIcon={null} data-track="text-sticky">
        {copy.ui.text}
      </C2Button>
      {wantsBid ? (
        <C2Button href="/for-builders#request-a-bid" variant="outline" icon="calendar" trailingIcon={null} data-track="bid-sticky">
          {copy.ui.request}
        </C2Button>
      ) : (
        <C2Button onClick={requestService} variant="outline" icon="calendar" trailingIcon={null} data-track="request-sticky">
          {copy.ui.request}
        </C2Button>
      )}
    </div>
  );
}
