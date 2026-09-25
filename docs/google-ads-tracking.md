# Google Ads appointment tracking

The owner supplied the Google tag `AW-18469026355` and the Book appointment
event destination `AW-18469026355/KRr-CJTB6YEdELP02-ZE`. These are public tag
identifiers, not account credentials.

## Housecall Pro setup

In **Settings > Booking > Online Booking > Advanced settings > Booking redirect**, set:

`https://gojohnsonplumbing.com/booking-confirmed`

Housecall documents this redirect as running after a successful booking:
https://help.housecallpro.com/en/articles/7034474-online-booking-overview

The website's tag is independent of Business Profile verification and Reserve
with Google. Booking tracking is not operational until this redirect is saved.

## Event boundaries

- The Google tag loads once across the site, only on the apex/www production
  domains. Localhost and Vercel preview domains do not send Ads data.
- Opening/closing the booking widget, clicking a phone link, submitting a bid,
  and ordinary page views never send the Book appointment conversion.
- The provider's current embedded script sends `hcp:redirect` and then
  navigates the parent window. We accept a receipt only from the actual
  `iframe.hcp-iframe`, with origin `https://book.housecallpro.com`, pointing
  to our confirmation page on the current origin.
- On the confirmation page, a fresh receipt causes the supplied conversion
  event. The hosted booking fallback can also qualify by a Housecall referrer.
- Session storage and a random transaction ID prevent reload/back duplicates.
  Receipts expire after 24 hours. No customer names, email addresses, phone
  numbers, or booking details are added to the event.
- The confirmation page is noindex and absent from the sitemap/navigation.
  Direct visits without a receipt or Housecall referrer do not convert.
- Restricted session storage or missing hosted referrers can undercount; they
  never prevent a booking. Hosted-only repeat bookings in the same session
  count once; a new embedded completion generates a fresh receipt.

This measures the provider's browser completion redirect, not a server-side
reconciliation of jobs. Future changes to Housecall's message contract must be
retested. Ad blockers and browser privacy settings can prevent measurement.

## Verification

Run `npx playwright test tests/google-ads.spec.ts tests/housecall.spec.ts` against
a production build. Tests serve the local build under an intercepted production
hostname and stub Google and Housecall endpoints; they do not send conversion
hits or create real customer bookings.

After deployment, verify the tag loads on the live domain. In Google Ads, use
Tag Assistant to validate the Book appointment action after an authorized real
booking. A simulated callback test is not proof that a real booking was saved.
Do not claim the Ads status is verified until Google reports it.
