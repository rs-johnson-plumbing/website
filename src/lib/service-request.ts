// See docs/forms/custom-request-service-form.md before changing providers.
// Set to "custom" at BUILD time to restore the preserved website form.
export const useCustomServiceForm = process.env.NEXT_PUBLIC_SERVICE_REQUEST_PROVIDER === "custom";
export const housecallToken = "d509e8f43f414e87b70566cc9cb066dc";
export const housecallOrg = "R-S-Johnson-Plumbing-LLC";
export const housecallBookingUrl = `https://book.housecallpro.com/book/${housecallOrg}/${housecallToken}?v2=true`;
export const housecallScriptUrl = `https://online-booking.housecallpro.com/script.js?token=${housecallToken}&orgName=${housecallOrg}`;

export function openHousecallBooking() {
  const widget = (window as Window & { HCPWidget?: { openModal: () => void } }).HCPWidget;
  if (widget?.openModal) widget.openModal();
  else window.location.assign(housecallBookingUrl);
}

