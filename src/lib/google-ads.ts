// Public identifiers from the owner's Google Ads installation files.
export const GOOGLE_ADS_ID = "AW-18469026355";
export const BOOK_APPOINTMENT_SEND_TO = `${GOOGLE_ADS_ID}/KRr-CJTB6YEdELP02-ZE`;
export const BOOKING_CONFIRMATION_PATH = "/booking-confirmed";

const RECEIPT_KEY = "johnson-plumbing:confirmed-booking";
const RECEIPT_MAX_AGE = 24 * 60 * 60 * 1000;
const HOUSECALL_ORIGIN = "https://book.housecallpro.com";

type GoogleWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  johnsonAdsInitialized?: boolean;
};
type BookingReceipt = { id: string; confirmedAt: number; sent: boolean };

export function isGoogleAdsHost() {
  return typeof window !== "undefined" &&
    ["gojohnsonplumbing.com", "www.gojohnsonplumbing.com"].includes(window.location.hostname);
}

export function initializeGoogleAds() {
  if (!isGoogleAdsHost()) return;
  const target = window as GoogleWindow;
  target.dataLayer ??= [];
  target.gtag ??= function () {
    // Keep the standard gtag arguments queue, including events before script load.
    // eslint-disable-next-line prefer-rest-params -- Google's queue uses IArguments.
    target.dataLayer!.push(arguments);
  };
  if (!target.johnsonAdsInitialized) {
    target.gtag("js", new Date());
    target.gtag("config", GOOGLE_ADS_ID);
    target.johnsonAdsInitialized = true;
  }
  return target.gtag;
}

function saveReceipt(receipt: BookingReceipt) {
  sessionStorage.setItem(RECEIPT_KEY, JSON.stringify(receipt));
}

function newReceipt(): BookingReceipt {
  return { id: crypto.randomUUID(), confirmedAt: Date.now(), sent: false };
}

function readReceipt(): BookingReceipt | null {
  const receipt = JSON.parse(sessionStorage.getItem(RECEIPT_KEY) || "null") as BookingReceipt | null;
  if (!receipt || typeof receipt.id !== "string" || !/^[0-9a-f-]{36}$/.test(receipt.id) || typeof receipt.sent !== "boolean" ||
    !Number.isFinite(receipt.confirmedAt) || receipt.confirmedAt > Date.now() ||
    Date.now() - receipt.confirmedAt > RECEIPT_MAX_AGE) return null;
  return receipt;
}

// The provider sends this message after a successful booking, then its embed
// navigates the top window. Save the receipt before that navigation takes place.
export function rememberHousecallConfirmation(event: MessageEvent) {
  if (!isGoogleAdsHost() || event.origin !== HOUSECALL_ORIGIN ||
    event.data?.type !== "hcp:redirect" || typeof event.data.url !== "string") return;
  try {
    const isBookingFrame = Array.from(document.querySelectorAll<HTMLIFrameElement>("iframe.hcp-iframe"))
      .some(frame => frame.contentWindow === event.source && new URL(frame.src).origin === HOUSECALL_ORIGIN);
    if (!isBookingFrame) return;
    const destination = new URL(event.data.url);
    if (destination.origin !== window.location.origin || destination.pathname !== BOOKING_CONFIRMATION_PATH) return;
    saveReceipt(newReceipt());
  } catch {
    // Storage restrictions or malformed messages must never interrupt booking.
  }
}

export function trackConfirmedBooking() {
  if (!isGoogleAdsHost() || window.location.pathname !== BOOKING_CONFIRMATION_PATH) return;
  try {
    let receipt = readReceipt();
    // A hosted booking (including the widget's fallback) returns directly from
    // Housecall. Refreshes/back navigation must not manufacture a new receipt.
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const fromHostedBooking = document.referrer && new URL(document.referrer).origin === HOUSECALL_ORIGIN;
    if (!receipt && fromHostedBooking && navigation?.type === "navigate") {
      receipt = newReceipt();
      saveReceipt(receipt);
    }
    if (!receipt || receipt.sent) return;
    const gtag = initializeGoogleAds();
    if (!gtag) return;
    gtag("event", "conversion", {
      send_to: BOOK_APPOINTMENT_SEND_TO,
      transaction_id: receipt.id,
    });
    saveReceipt({ ...receipt, sent: true });
  } catch {
    // Fail closed if storage/referrer is unavailable; the customer page still works.
  }
}
