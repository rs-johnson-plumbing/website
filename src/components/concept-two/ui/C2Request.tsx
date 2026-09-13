"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Script from "next/script";
import { housecallScriptUrl, openHousecallBooking, useCustomServiceForm } from "@/lib/service-request";
import { IntakeContext } from "./C2IntakeContext";
import { C2IntakeDialog } from "./C2IntakeDialog";
export { useRequestService, useRequestBid } from "./C2IntakeContext";
export function C2RequestProvider({ children }: { children: React.ReactNode }) {
  const [kind, setKind] = useState<"service" | "bid" | null>(null);
  const [bookingRequest, setBookingRequest] = useState(0);
  const service = useCallback(() => {
    if (useCustomServiceForm) setKind("service");
    else setBookingRequest(count => count + 1);
  }, []);
  // Allow native service dialogs to unmount and restore body scroll/focus first.
  useEffect(() => {
    if (!bookingRequest) return;
    const frame = requestAnimationFrame(openHousecallBooking);
    return () => cancelAnimationFrame(frame);
  }, [bookingRequest]);
  const bid = useCallback(() => setKind("bid"), []);
  const close = useCallback(() => setKind(null), []);
  const value = useMemo(() => ({ service, bid }), [service, bid]);
  return <IntakeContext.Provider value={value}>
    {!useCustomServiceForm && <Script id="housecall-online-booking" src={housecallScriptUrl} strategy="afterInteractive" />}
    {children}
    {kind && <C2IntakeDialog key={kind} kind={kind} onClose={close} />}
  </IntakeContext.Provider>;
}
