# RoboRyan Website Chat

User-approved first release: Friendly Hello, responsive desktop and mobile web UI, guided questions, free text, and a handoff to the existing Housecall service form. The user explicitly approved the pill-shaped chat launcher and testing directly on GoJohnsonPlumbing.com; the launcher is an intentional exception to the older website button-shape rules.

The default is a clearly labeled guided preview. The widget is enabled unless `ROBO_RYAN_WIDGET_ENABLED=false`. `/robo-ryan-preview` compares the three launcher treatments. The production default is the blue Friendly Pill.

The Request Service action uses the existing `openHousecallBooking()` helper and existing public booking configuration. It does not submit an appointment. It does not automatically transfer the chat to Housecall; visitors can copy their summary. No separate chatbot contact form is presented.

## Live AI Setup

Server-only settings: `ROBO_RYAN_AI_ENABLED=true`, `OPENAI_API_KEY`, `OPENAI_MODEL`, and optionally `OPENAI_VECTOR_STORE_ID`. Choose and test the model before activation. The backend calls the Responses API and can search the configured knowledge store. No keys belong in browser code. Responses are not stored by the application; the provider request uses `store:false`.

Before activating paid AI publicly, configure distributed request limits or a Vercel Firewall rate-limit rule for `/api/robo-ryan`, set account spending limits, and test the actual model and approved library. Hours, pricing, emergency availability and callback expectations remain unconfirmed. Test that the model declines to invent these.

The initial free-text preview explains that AI is not connected. Guided repair/install requests work without an API key. Each question and answer remains in the chat until a reload or Start Over; only the dismissal preference is stored in sessionStorage.

## Inquiry Delivery Preference

Daren requested any future chatbot inquiry notifications go to `daren.ungerboeck@gmail.com`. The subsequent requirement makes Housecall the primary service-request handoff. This release does not change Housecall recipients, send email, or configure email delivery. If notification email is added later, validate a server-side delivery provider and avoid collecting the same details twice.

## Validation

Typecheck, lint, production build, website smoke checks, and browser checks at desktop and mobile widths. Verify the summary, custom-question path, minimize/reopen, and Housecall handoff without submitting a booking.
