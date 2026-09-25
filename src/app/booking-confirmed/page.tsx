import type { Metadata } from "next";
import { BookingConversion } from "@/components/analytics/BookingConversion";
import { C2Button } from "@/components/concept-two/ui/C2Button";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for choosing Johnson Plumbing. Check your booking confirmation for details and contact our team with any questions.",
  robots: { index: false, follow: false },
};

export default function BookingConfirmedPage() {
  return (
    <section className="c2-section">
      <BookingConversion />
      <div className="c2-wrap" style={{ paddingBlock: "48px", minHeight: "420px" }}>
        <div style={{ maxWidth: "680px", display: "grid", gap: "24px" }}>
          <h1 className="c2-h2">Thanks for choosing Johnson Plumbing.</h1>
          <p style={{ fontSize: "18px", lineHeight: 1.7 }}>
            Check your Housecall Pro confirmation for your service details and scheduling information.
            If you have questions or need to make a change, call our team.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            <C2Button href={site.phone.tel} icon="phone" trailingIcon={null}>Call {site.phone.display}</C2Button>
            <C2Button href="/" variant="outline">Back to Home</C2Button>
          </div>
        </div>
      </div>
    </section>
  );
}
