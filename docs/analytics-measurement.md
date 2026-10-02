# Website Measurement

GA4 stream: `G-E210NRHFEF`. The existing Google tag loads both Analytics and Ads on production hostnames only.

| Event | Meaning | Lead? |
| --- | --- | --- |
| `click_to_call` | A website telephone link was clicked | No; does not prove a call connected |
| `click_to_text` | A website SMS link was clicked | No; does not prove a text was sent |
| `booking_start` | A request to open Housecall booking, including hosted fallback | No; does not prove form interaction or submission |
| `generate_lead` | Existing Housecall confirmation-return checks passed | Provisional until a real provider completion is verified |

The explicit events are routed to GA4 only. They contain no form fields, customer contact details, or chat text. Existing Ads conversions remain separate. Do not import GA4 leads as a second primary Ads conversion for the same booking without deduplicating the conversion configuration.

## Confirmation Limits

The existing confirmation page uses a trusted Housecall iframe redirect message or a direct navigation referred by Housecall. A fresh session receipt prevents duplicates on reload/back navigation. A direct visit to the confirmation URL without that evidence does not convert. These are client-side checks, not a provider-verified booking ID or server webhook. Missing referrers/storage can undercount. The redirect destination must be configured correctly in Housecall.

Automated tests simulate provider completion and do not create actual appointments. Before marking `generate_lead` as a key event, complete a clearly identified test request with the business, verify its arrival in Housecall, and verify exactly one matching GA4 event. Refreshing the confirmation page must not emit another event. Organic, GBP and offsite bookings that do not return to the website are outside this measurement path.

## Other Forms

The current `/api/bid`, `/api/message`, and `/api/availability` handlers validate and log requests but do not implement delivery/storage integrations. Do not count their HTTP success as a delivered lead. The default homeowner booking uses Housecall; the custom service form is behind a build-time flag. Builder intake delivery is a separate outstanding issue.

## Remaining Account Setup

- Verify reporting time zone is America/Chicago.
- Keep enhanced page-view/history measurement enabled; no manual duplicate page-view event is added.
- Verify the interaction events in Realtime/DebugView.
- In Analytics Admin, Product links, Search Console Links, link the verified `https://gojohnsonplumbing.com/` property to the Johnson Plumbing web stream.
- Leave key-event classification pending real completion verification.
