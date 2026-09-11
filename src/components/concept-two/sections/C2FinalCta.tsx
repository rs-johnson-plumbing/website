"use client";
import { conceptTwo as copy, site, smsLink } from "@/lib/content";
import { Mark } from "@/components/ui/Logo";
import { C2Button } from "../ui/C2Button";
import { useRequestService, useRequestBid } from "../ui/C2Request";
export function C2FinalCta({ audience = "homeowners" }: { audience?: "homeowners" | "builders" }) {
  const requestService = useRequestService();
  const requestBid = useRequestBid();
  return <section className="c2-final" aria-labelledby="c2-final-heading">
    <Mark className="c2-final-mark" />
    <div className="c2-wrap c2-final-inner"><div><p className="c2-eyebrow">{audience === "builders" ? copy.builders.finalCta.eyebrow : copy.home.finalCta.eyebrow}</p><h2 id="c2-final-heading">{copy.home.finalCta.heading}</h2></div>
    <div className="c2-final-actions">
      <C2Button href={site.phone.tel} variant="on-dark" icon="phone" trailingIcon={null} data-track="call-final">Call</C2Button>
      <C2Button href={smsLink()} variant="on-dark" icon="message" trailingIcon={null} data-track="text-final">Text</C2Button>
      <C2Button onClick={requestBid} variant="on-dark" trailingIcon={null} className="c2-final-bid">Submit Bid Request</C2Button>
      <C2Button onClick={requestService} variant="on-dark" trailingIcon={null} className="c2-final-request">Request Service</C2Button>
    </div></div>
  </section>;
}
