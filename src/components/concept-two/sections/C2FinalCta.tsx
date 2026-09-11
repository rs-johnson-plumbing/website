"use client";

import { conceptTwo as copy, site, smsLink } from "@/lib/content";
import { Mark } from "@/components/ui/Logo";
import { C2Button } from "../ui/C2Button";
import { useRequestService } from "../ui/C2Request";

/** The closing band keeps a subtle brand mark behind the contact actions. */
export function C2FinalCta({ audience = "homeowners" }: { audience?: "homeowners" | "builders" }) {
  const isBuilder = audience === "builders";
  const cta = isBuilder ? copy.builders.finalCta : copy.home.finalCta;
  const requestService = useRequestService();
  return (
    <section className="c2-final" aria-labelledby="c2-final-heading">
      <Mark className="c2-final-mark" />
      <div className="c2-wrap c2-final-inner">
        <div>
          <p className="c2-eyebrow">{cta.eyebrow}</p>
          <h2 id="c2-final-heading">{copy.home.finalCta.heading}</h2>
        </div>
        <div className="c2-final-actions">
          <C2Button href={site.phone.tel} variant="on-dark" icon="phone" trailingIcon={null} data-track="call-final">
            {copy.ui.call}
          </C2Button>
          <C2Button href={smsLink()} variant="on-dark" icon="message" trailingIcon={null} data-track="text-final">
            {copy.ui.text}
          </C2Button>
          <C2Button href={isBuilder ? "#request-a-bid" : undefined} onClick={isBuilder ? undefined : requestService} className="c2-final-request" variant="on-dark" icon="calendar" trailingIcon={null}>
            {isBuilder ? copy.ui.requestBid : <>{copy.ui.requestShort}<span className="c2-only-lg">Service</span></>}
          </C2Button>
        </div>
      </div>
    </section>
  );
}
