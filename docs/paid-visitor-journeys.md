# Paid Visitor Journeys

Owner request: record paid visitors' page paths, foreground time, key section exposures and contact actions; append a compact daily report page.

## Website Events

Existing native GA4 page views and engagement stay unchanged. `section_view` emits a fixed `section_id` once per route mount after approximately two continuous seconds with at least half of the section's viewport-sized area exposed in a focused, visible tab. This is exposure, not evidence of reading. The selector allowlist covers Concept 2 hero, services, service details, reviews, why-us, FAQ, contact and team. Unsupported sections/designs must be reported unavailable, not unseen.

`page_active_time` emits incremental `active_time_ms` for the focused visible tab, at ten-second intervals and on hide/navigation. A delayed tick is capped at 1.5 seconds to avoid counting device sleep. Route cleanup attributes the remainder to the old path. Sum these chunks once; do not add native GA4 `engagement_time_msec`. This measures foreground time, not attention, and can undercount closed/blocked/suspended sessions. It is diagnostic, never an Ads conversion or GA4 key event.

Only fixed public identifiers, path and time are added. No DOM text, forms, phone numbers, customer details, session replay or custom persistent visitor identifiers. GA4 manages pseudonymous session identity and consent behavior.

## Account Work Still Required

October 6 inspection found GA4 property 557097189 had zero Google Ads links. Link account 6123850925 with personalization and embedded editing access disabled; verify completion before reporting fixed. Confirm enhanced history-based page views in the web stream. Inspect/configure BigQuery event export and permissions before promising automated per-session histories. Existing aggregate reports cannot reconstruct an ordered journey.

## Daily Report Contract

One card per supported anonymous session: source/ad group, landing page, chronological page/action steps, active time, exposed sections, last recorded page, and contact outcome. Match Ads click IDs only with actual event-level IDs, never shared costs/timestamps/city counts. Count distinct matched clicks separately from sessions. Show unmatched/unavailable journeys explicitly. Never infer search phrases or individual prices from group averages. No contact action recorded is not proof there was no phone call. Call clicks are not connected calls and requests are not booked jobs.

Until event export is available, append a clearly marked unavailable state and separate aggregate paid-session landing pages. Keep the existing report schedule and recipients.
