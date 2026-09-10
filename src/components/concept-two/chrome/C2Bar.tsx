"use client";

import { usePathname } from "next/navigation";
import { conceptTwo as copy, site, smsLink } from "@/lib/content";
import { C2Button } from "../ui/C2Button";
import { useRequestService } from "../ui/C2Request";

const BID_ROUTES = ["/for-builders", "/services/builders"];

/** Phone-only action bar: Call, Text, Request. */
export function C2Bar() {
  const requestService = useRequestService();
  const pathname = usePathname();
  // A builder on a builder page wants the bid form, not the homeowner intake.
  const wantsBid = BID_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  return (
    <div className="c2-bar">
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
