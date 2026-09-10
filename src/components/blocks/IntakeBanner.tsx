import { home } from "@/lib/content";
import { AvailabilityCheck } from "./AvailabilityCheck";
import { BidRequest } from "./BidRequest";
import { RequestChooser } from "./RequestChooser";
import { CallText } from "@/components/ui/CallText";

/**
 * The closing band at the bottom of every page: a heading, one line that
 * says what to do if it is urgent and what to do if it is not, the phone
 * pair, and one request button. Request Service on homeowner pages,
 * Request a Bid on builder pages, and one Request Service that asks home
 * or job site first on pages that serve everyone (homepage, team). Sand,
 * so the page ends on the same warm ground it started on; the builders
 * pages keep it cream-side too, since it is not a dark band.
 */
export function IntakeBanner({ audience, id }: { audience: "homeowners" | "builders" | "both"; id?: string }) {
  const copy = audience === "builders" ? home.banner.builders : home.banner.homeowners;
  const headingId = `${id ?? "intake"}-h`;
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-[140px] border-t border-hairline bg-sand py-10 text-charcoal lg:py-[60px]">
      <div className="site-width gutter flex flex-col items-start gap-5 lg:gap-6">
        <div className="flex flex-col gap-2">
          <h2 id={headingId} className="text-h2-m lg:text-h2">
            {copy.heading}
          </h2>
          <p className="max-w-[560px] text-[16px] leading-[1.6] lg:text-body">{copy.line}</p>
        </div>
        <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:items-center lg:gap-4">
          {audience === "homeowners" && <AvailabilityCheck className="w-full lg:w-auto" />}
          {audience === "builders" && <BidRequest className="w-full lg:w-auto" />}
          {audience === "both" && <RequestChooser size="full" className="w-full lg:w-auto" />}
          <CallText track="banner" className="lg:w-auto" />
        </div>
      </div>
    </section>
  );
}
