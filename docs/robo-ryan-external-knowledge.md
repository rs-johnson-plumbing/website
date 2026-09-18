# Manufacturer knowledge and live search

The website uses two different sources of knowledge:

- Approved Johnson Plumbing facts and general guidance: `content/robo-ryan-knowledge.json`.
- Live manufacturer lookup: OpenAI Responses API web search, restricted to official domains in `content/robo-ryan-external.json`. The initial list is Rinnai, Moen, Delta, Kohler, and Pfister, including their subdomains. Adding a brand requires reviewing its official domains and support link.

No separate database is required for live search. The existing optional `OPENAI_VECTOR_STORE_ID` connection can hold a curated uploaded-manual library later; this change does not create, populate, or claim to search such a library. Downloading manuals and uploading them to a vector store is a separate ingestion task. Web answers are not automatically added to the approved business knowledge.

## Activation

In the Vercel `website` project, set these server-side variables for Production, then redeploy:

1. `OPENAI_API_KEY`: an API key for the intended OpenAI project, with API billing enabled. Enter it directly into Vercel as a sensitive variable, never into chat or source control.
2. `OPENAI_MODEL`: a Responses model supporting `web_search` and domain filters. Verify model access in that OpenAI project.
3. `ROBO_RYAN_AI_ENABLED=true`.
4. `ROBO_RYAN_WEB_SEARCH_ENABLED=true`.

Before enabling, set API-project spend alerts and appropriate platform request limits. A per-function-instance 20 lookups/minute backstop and a two-tool-call cap reduce accidental bursts, but are not a distributed rate limit or a guaranteed monthly spending cap. Public paid rollout should use Vercel Firewall rate limiting or a shared limiter as needed.

Without activation, a product question receives an honest explanation that live lookup is unavailable, an official manufacturer support link, and guidance to match the model number. General approved answers continue working. Turning the web-search flag off restores this behavior immediately after redeployment.

## Answer behavior

While an enabled manufacturer lookup is running, the chat displays “Searching the web…”. The server flushes an activity header and leading JSON whitespace before waiting for the provider; the final body remains JSON for existing clients. Disabled, rate-limited, photo, urgent, and local-answer paths do not emit the web-search activity. The status clears when the answer or failure arrives.

Urgent safety responses run before any lookup. Business questions stay in approved local policy. Manufacturer lookup can override a generic plumbing FAQ match, so a Rinnai model question is not answered from a generic water-heater article. Recent user messages retain brand context for follow-up model numbers; assistant messages cannot select a brand.

Lookup requests require web search on approved manufacturer domains. The response must contain a completed search and a valid inline URL citation on an approved HTTPS domain. Otherwise the bot returns the official support link and says it could not verify the answer. Incomplete responses and provider failures do not produce guessed product instructions. Inline citations are clickable and source links remain below the answer.

The prompt requires exact-model matching, one follow-up question when needed, no diagnosis or booking claims, and no dangerous gas, electrical, venting, or safety-control procedures. A manufacturer warranty is never a Johnson Plumbing warranty. These are safeguards, not a guarantee that every generated answer is correct; review representative real answers before advertising broad product expertise.

Only the last four user messages are sent for product context. Common email, phone, and street-address patterns are redacted. Names and every possible personal-information format cannot be reliably removed by pattern matching; the model is instructed to search only brand, model, symptoms, and topic. Provider responses use `store:false`, which does not by itself disable all provider abuse-monitoring retention.

## Verification before calling it live

Test a real Rinnai model question, an error code follow-up, a Moen or Delta parts question, a manufacturer warranty question, an unknown brand, a question about Johnson Plumbing hours, a gas-smell message, and a simulated search failure. Confirm the citations support the specific answer and open the expected manufacturer pages. Automated provider fixtures verify wiring; they do not establish real model quality or API account access.

References: https://developers.openai.com/api/docs/guides/tools-web-search and https://developers.openai.com/api/docs/guides/tools-file-search.
