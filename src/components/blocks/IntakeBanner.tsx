import { home } from "@/lib/content";
import { AvailabilityCheck } from "./AvailabilityCheck";
import { BidRequest } from "./BidRequest";
import { RequestChooser } from "./RequestChooser";

/**
 * The white banner at the bottom of every page, in place of a closing strip:
 * Submit Service Request on homeowner pages, Submit Bid Request on builder
 * pages, and one Submit Request that asks homeowner or builder first on
 * pages that serve everyone (homepage, team, service area).
 * Stays white on the dark builders ground on purpose.
 */
export function IntakeBanner({ audience, id }: { audience: "homeowners" | "builders" | "both"; id?: string }) {
  return (
    <section id={id} aria-label={audience === "builders" ? home.banner.bid : audience === "homeowners" ? home.banner.service : home.chooser.button} className="scroll-mt-[140px] border-y border-hairline bg-white py-10 lg:py-[60px]">
      <div className="site-width gutter flex flex-col items-center gap-3 lg:flex-row lg:justify-center lg:gap-4">
        {audience === "homeowners" && <AvailabilityCheck className="w-full lg:w-auto" />}
        {audience === "builders" && <BidRequest className="w-full lg:w-auto" />}
        {audience === "both" && <RequestChooser size="full" className="w-full lg:w-auto" />}
      </div>
    </section>
  );
}
