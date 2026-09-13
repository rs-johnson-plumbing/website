# Custom Request Service Form

## Tell Codex this
"Read docs/forms/custom-request-service-form.md. Restore our custom Request Service form and connect its submission to Housecall Pro's API. Keep the current website design and builder bid form."

## Current behavior
All Concept 2 Request Service actions use Housecall's hosted booking modal: global header, mobile menu, page calls to action, service detail dialogs, footer service dialogs, and mobile contact bar. Existing button styling remains. If the widget is unavailable, the action navigates to the hosted booking page.

The original custom form is preserved in the working source, not just Git history. Do not delete it or replace it with the abandoned Concept 1 form.

## Source map
- `src/lib/service-request.ts`: provider selection and Housecall public booking configuration.
- `src/components/concept-two/ui/C2Request.tsx`: shared routing, widget script and custom dialog mounting.
- `src/components/concept-two/ui/C2IntakeContext.tsx`: service and bid hooks.
- `src/components/concept-two/ui/C2IntakeDialog.tsx`: original branded service form and builder bid form.
- `src/styles/`: preserved Concept 2 intake styles (search for `ci-service-dialog` and `ci-dialog`).
- `src/app/api/message/route.ts`: custom service submission endpoint.
- `src/app/api/bid/route.ts`: separate builder submission endpoint.
- `tests/concepts.spec.ts`: preserved custom form regression coverage.
- `tests/housecall.spec.ts`: Housecall routing and handoff coverage.

## Restore for development or preview
Set `NEXT_PUBLIC_SERVICE_REQUEST_PROVIDER=custom` before building, then rebuild and deploy a preview. The same setting restores every service action, including the header. No per-button edits are needed.
Unset it (or use `housecall`) and rebuild to return to Housecall.
This is build-time configuration, not a visitor query-string switch.
CI builds and tests both modes.

## Before making the custom form live
The existing service endpoint validates/logs requests; it is not a completed Housecall integration or durable delivery system. The UI's success response does not establish that Housecall received a request. Uploaded photos also need real storage/delivery.
Keep Housecall active publicly until server-side integration, error handling and end-to-end delivery are verified.

For future API work: verify current Housecall API access and plan requirements; keep credentials server-side; map contact, address, issue, preferred arrival and photos deliberately; prevent duplicate submissions/customers; only show success after durable receipt. Decide whether a request creates a lead or a scheduled job. Do not promise a booked appointment when only a preference was collected.

## Verification
Housecall mode: test header, mobile menu, sticky bar, page CTAs and a service-details-to-booking handoff; close booking and confirm scrolling still works. Keep bid requests on the custom bid form.
Custom mode: verify all six service steps, back navigation, photos, validation, retry, dismissal and submission; confirm the header also uses the custom form.
