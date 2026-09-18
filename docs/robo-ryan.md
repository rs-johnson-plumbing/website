# RoboRyan Website Chat

User-approved first release: Friendly Hello, responsive desktop and mobile web UI, guided questions, free text, and a handoff to the existing Housecall service form. The user explicitly approved the pill-shaped chat launcher and testing directly on GoJohnsonPlumbing.com; the launcher is an intentional exception to the older website button-shape rules.

The website now has a sourced plumbing knowledge guide as well as the guided intake. The widget is enabled unless `ROBO_RYAN_WIDGET_ENABLED=false`. `/robo-ryan-preview` remains an offline design comparison of the three launcher treatments. The production default is the blue Friendly Pill.

The Request Service action uses the existing `openHousecallBooking()` helper and existing public booking configuration. It does not submit an appointment. It does not automatically transfer the chat to Housecall; visitors can copy their summary. No separate chatbot contact form is presented.

## Live AI Setup

Server-only settings: `ROBO_RYAN_AI_ENABLED=true`, `OPENAI_API_KEY`, `OPENAI_MODEL`, and optionally `OPENAI_VECTOR_STORE_ID`. Choose and test the model before activation. The backend calls the Responses API and can search the configured knowledge store. No keys belong in browser code. Responses are not stored by the application; the provider request uses `store:false`.

Before activating paid AI publicly, configure distributed request limits or a Vercel Firewall rate-limit rule for `/api/robo-ryan`, set account spending limits, and test the actual model and approved library. Hours, pricing, emergency availability and callback expectations remain unconfirmed. Test that the model declines to invent these.

The main website answers matched free-text questions from the curated library without an API key. This is reference lookup, not generative AI or semantic vector search. Ambiguous or unmatched questions receive a transparent fallback. The design comparison page retains its offline preview disclosure. Each question and answer remains in the chat until a reload or Start Over; only the dismissal preference is stored in sessionStorage.

## Knowledge Library

`content/robo-ryan-knowledge.json` is the current versioned knowledge store: 54 authored entries, 22 primary-source or company-source references, all eight homeowner service categories, all five builder phases, and business-policy boundaries. It ships with the server and does not need a separate database account. No external vector database has been populated by this release.

Each entry records category, question variants, search terms, a bounded answer, a useful follow-up, source IDs, review date, and whether it is general information, a website-listed service, or a policy boundary. Sources include the current service catalog, EPA, CDC, CPSC, Red Cross, Spire, MSD Project Clear, manufacturer documentation, and county resources. Manufacturer references are educational, not endorsements or assertions that Johnson Plumbing is an authorized installer. County resources do not establish jurisdiction for every property. Review dates mean source research, not Ryan's signoff.

The API handles hazards before retrieval. Unconfirmed price, availability, hours, warranty, and callback questions receive a policy answer. Technical questions use conservative keyword and question matching; unsupported or ambiguous follow-ups are not inferred from conversation history. References are rendered as links. No chat content is added to the library, and customer-provided source links cannot replace its references. The backend also makes this structured library available as context for the optional AI path. Paid generation remains explicitly gated.

To maintain it, edit the JSON, retain source provenance, update the version and reviewedOn values, and run the existing checks and the knowledge tests. Confirm service/policy changes with Ryan rather than copying marketing placeholders. The same JSON can be consumed by a future voice service or exported for OpenAI file search; importing into a vector store still requires the configured account and a successful indexing check. No database migration is necessary for this release.

## Inquiry Delivery Preference

Daren requested any future chatbot inquiry notifications go to `daren.ungerboeck@gmail.com`. The subsequent requirement makes Housecall the primary service-request handoff. This release does not change Housecall recipients, send email, or configure email delivery. If notification email is added later, validate a server-side delivery provider and avoid collecting the same details twice.

## Validation

Typecheck, lint, production build, website smoke checks, and browser checks at desktop and mobile widths. Verify the summary, custom-question path, minimize/reopen, and Housecall handoff without submitting a booking.
