"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { GOOGLE_ADS_ID, initializeGoogleAds, isGoogleAdsHost, rememberHousecallConfirmation } from "@/lib/google-ads";

export function GoogleAds() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (!isGoogleAdsHost()) return;
    initializeGoogleAds();
    window.addEventListener("message", rememberHousecallConfirmation);
    setEnabled(true);
    return () => window.removeEventListener("message", rememberHousecallConfirmation);
  }, []);

  return enabled ? <Script id="google-ads-tag" src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" /> : null;
}
