import { GOOGLE_ANALYTICS_ID, initializeGoogleAds, isGoogleAdsHost } from "./google-ads";

// Fixed public section identifiers only. Never extract DOM text or form values.
const sections: Record<string, string> = {
  hero: '.c2-hero',
  services: '#services, #homeowner-services, section[aria-labelledby="c2-services-heading"]',
  service_details: 'section[aria-labelledby="c2-detail-heading"]',
  reviews: 'section[aria-labelledby="c2-reviews-heading"]',
  why_us: '#why-us, section[aria-labelledby="c2-apart-heading"]',
  faq: 'section[aria-labelledby="c2-faq-heading"]',
  contact: '.c2-final',
  team: 'section[aria-labelledby="c2-owner"]',
};

/** One route's foreground time and section exposures; GA4 supplies session IDs. */
export function startVisitTracking(path: string) {
  if (!isGoogleAdsHost()) return;
  const send = (name: string, values: Record<string, string | number>) => {
    try {
      initializeGoogleAds()?.("event", name, {
        send_to: GOOGLE_ANALYTICS_ID,
        page_path: path,
        page_location: `${window.location.origin}${path}`,
        transport_type: "beacon",
        ...values,
      });
    } catch { /* Analytics must never interrupt a visitor. */ }
  };
  const seen = new Set<string>();
  const exposure = new Map<string, number>();
  let previous = performance.now();
  let active = document.visibilityState === "visible" && document.hasFocus();
  let pendingMs = 0;
  let stopped = false;
  const flush = () => {
    const milliseconds = Math.floor(pendingMs);
    if (milliseconds >= 1000) {
      send("page_active_time", { active_time_ms: milliseconds });
      pendingMs -= milliseconds;
    }
  };
  const tick = () => {
    if (stopped) return;
    const now = performance.now();
    // Cap a delayed tick so sleeping devices cannot manufacture engagement.
    const elapsed = Math.min(Math.max(now - previous, 0), 1500);
    previous = now;
    if (active) pendingMs += elapsed;
    active = document.visibilityState === "visible" && document.hasFocus();
    for (const [id, selector] of Object.entries(sections)) {
      if (seen.has(id)) continue;
      const visible = active && Array.from(document.querySelectorAll(selector)).some(element => {
        const rect = element.getBoundingClientRect();
        const width = Math.max(0, Math.min(rect.right, innerWidth) - Math.max(rect.left, 0));
        const height = Math.max(0, Math.min(rect.bottom, innerHeight) - Math.max(rect.top, 0));
        const area = Math.min(rect.width, innerWidth) * Math.min(rect.height, innerHeight);
        return area > 0 && width * height / area >= 0.5;
      });
      const duration = visible ? (exposure.get(id) ?? 0) + elapsed : 0;
      exposure.set(id, duration);
      if (duration >= 2000) {
        seen.add(id);
        send("section_view", { section_id: id });
      }
    }
    if (pendingMs >= 10000) flush();
  };
  const visibility = () => { tick(); if (!active) flush(); };
  const leave = () => { tick(); flush(); active = false; exposure.clear(); };
  const timer = window.setInterval(tick, 1000);
  document.addEventListener("visibilitychange", visibility);
  window.addEventListener("focus", visibility);
  window.addEventListener("blur", visibility);
  window.addEventListener("pagehide", leave);
  return () => {
    leave();
    stopped = true;
    window.clearInterval(timer);
    document.removeEventListener("visibilitychange", visibility);
    window.removeEventListener("focus", visibility);
    window.removeEventListener("blur", visibility);
    window.removeEventListener("pagehide", leave);
  };
}
