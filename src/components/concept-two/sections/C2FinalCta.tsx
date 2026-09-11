"use client";
import { conceptTwo as copy } from "@/lib/content";
import { Mark } from "@/components/ui/Logo";
import { C2Button } from "../ui/C2Button";
import { useRequestService, useRequestBid } from "../ui/C2Request";
export function C2FinalCta({ audience = "homeowners" }: { audience?: "homeowners" | "builders" }) {
  const requestService = useRequestService();
  const requestBid = useRequestBid();
  return <section className="c2-final" data-audience={audience} aria-labelledby="c2-final-heading">
    <Mark className="c2-final-mark" />
    <div className="c2-wrap c2-final-inner"><div><p className="c2-eyebrow">Ready to Get Started?</p><h2 id="c2-final-heading">{copy.home.finalCta.heading}</h2></div>
    <div className="c2-final-actions">
      <C2Button onClick={requestService} variant="on-dark" icon="wrench" trailingIcon={null} className="c2-final-request">Request Service</C2Button>
      <C2Button onClick={requestBid} variant="on-dark" icon="hard-hat" trailingIcon={null} className="c2-final-bid">Submit Bid Request</C2Button>
    </div></div>
  </section>;
}
