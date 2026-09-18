# Contextual Plumbing Conversation

With `OPENAI_API_KEY` set on the server, free-text chat uses OpenAI Responses with the recent user and assistant history, verified company facts, and matching plumbing reference entries. A missing keyword match does not block a conversation. The default model is `gpt-5.4-mini`; `OPENAI_MODEL` overrides it. Voice remains the separate OpenAI speech endpoint.

`ROBO_RYAN_AI_ENABLED=false` or `ROBO_RYAN_CONVERSATION_ENABLED=false` disables conversation. `ROBO_RYAN_WEB_SEARCH_ENABLED=false` disables the search tool independently. An absent key retains the local reference fallback; adding a key requires a new Vercel deployment.

The assistant asks clarifying questions, provides safe observations, and searches for manuals and model-specific facts when needed. Explicit search requests require the web search tool. The UI displays search progress when OpenAI emits its actual search event. Searched answers require valid HTTPS URL citations, rendered as clickable references. Existing JSON callers remain compatible; the updated widget uses newline-delimited status and answer events.

Company prices, hours, arrival times, warranties, and availability remain unconfirmed. The assistant cannot book a visit, dispatch anyone, or promise a callback. Request Service opens the existing Housecall Pro form. Email follow-up is offered only when that separate integration is configured.

The request includes at most 30 recent messages. Common email, phone, and street-address patterns are redacted before the provider call; this is not a guarantee of complete personal-data removal. The prompt forbids personal details in search queries. OpenAI response storage is disabled (`store: false`); provider retention policies still apply. API keys stay server-side. Existing origin and body limits, emergency replies, a 45-second provider timeout, and a per-instance 20-request/minute backstop apply. The backstop is not a distributed customer quota.

Tests mock the provider to cover full history, key-only activation, redaction, company constraints, emergency handling, actual search events, citations, failures, and typing during guided intake on phone and desktop. A production check must also exercise real OpenAI answers and search after deployment.
