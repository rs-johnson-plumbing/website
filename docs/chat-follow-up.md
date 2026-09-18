# Unverified Answers and Team Follow-Up

Unknown questions no longer fall through to ungrounded model generation, regardless of the AI activation flags. Curated business-policy answers and unavailable/unverified manufacturer searches also offer follow-up and the existing Housecall service form. Urgent safety guidance stays first.

The canned response and form labels live in `content/robo-ryan-followup.json`. The bot admits it has no verified answer. When email sending is off, it offers the business phone and Request Service without collecting an email or promising a callback. Manufacturer citations are required by the existing search adapter; citations alone cannot guarantee factual accuracy, so manual source review remains important when enabling search.

To activate email follow-up in Vercel Production:

1. Configure `RESEND_API_KEY` and `ROBO_RYAN_FOLLOWUP_FROM` with a sender verified in Resend.
2. Set `ROBO_RYAN_FOLLOWUP_ENABLED=true` and redeploy.
3. Verify a controlled submission reaches the authorized recipient, `daren.ungerboeck@gmail.com`, and that replying targets the visitor's email. No real message is sent by automated tests.

The recipient is fixed server-side. Submission includes the visible text conversation up to that fallback and the visitor's email; it excludes photos. The UI discloses this before sending. Only a successful Resend response containing an email ID produces acceptance text; it does not claim inbox delivery, a booked visit, or a response time. There is no durable local queue and no automated research promise. Retries use a stable request ID plus a payload digest for Resend idempotency. No contact details or transcript are logged by this route.

Same-origin checks, bounded input and a per-instance ten-attempts-per-minute backstop are included. Add platform rate limits before high-traffic use; the in-memory limit is not a distributed quota. Provider errors retain the form for retry and offer Request Service. The legacy `/api/message` logging stub is not used.
