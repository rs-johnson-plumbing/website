import { site } from "@/lib/content";
import { Button } from "@/components/ui/Button";

/**
 * Single home for the Housecall Pro booking widget.
 *
 * TODO(step 7): drop the Housecall Pro embed snippet in here. Until then this
 * renders a labeled placeholder with the phone button so the Book Online
 * target is never a dead end.
 */
export function BookingWidget() {
  return (
    <div id="book" className="flex flex-col items-start gap-4 rounded-card border border-dashed border-hairline-strong bg-white p-6">
      <div className="text-[13px] font-semibold text-slate">Online booking</div>
      <p className="text-[16px]">[Housecall Pro booking widget goes here.] Until it is live, call or text and we will confirm a window.</p>
      <Button href={site.phone.tel} variant="filled" track="call-booking-placeholder">
        {site.cta.headerDesktop}
      </Button>
    </div>
  );
}
