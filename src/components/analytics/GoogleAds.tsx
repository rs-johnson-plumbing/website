"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { startVisitTracking } from "@/lib/visit-tracking";
import { GOOGLE_ADS_ID, initializeGoogleAds, isGoogleAdsHost, rememberHousecallConfirmation, trackContactClick } from "@/lib/google-ads";

export function GoogleAds() {
  const pathname = usePathname();
  useEffect(() => startVisitTracking(pathname), [pathname]);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (!isGoogleAdsHost()) return;
    initializeGoogleAds();
    window.addEventListener("message", rememberHousecallConfirmation);
    document.addEventListener("click", trackContactClick, true);
    setEnabled(true);
    return () => {
      window.removeEventListener("message", rememberHousecallConfirmation);
      document.removeEventListener("click", trackContactClick, true);
    };
  }, []);

  return enabled ? <Script id="google-ads-tag" src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" /> : null;
}
