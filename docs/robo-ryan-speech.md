# OpenAI Spoken Replies

The speaker and Read Answer controls use the server route `/api/robo-ryan/speech`, OpenAI `gpt-4o-mini-tts`, and the `cedar` voice. The browser voice is no longer used. Microphone dictation still uses browser speech recognition; this is not a Realtime voice session.

Add a billing-enabled project's `OPENAI_API_KEY` to Vercel Production and redeploy. Never prefix the key with NEXT_PUBLIC_. Speech activates when the key is present unless `ROBO_RYAN_TTS_ENABLED=false`. Other AI feature flags do not control speech. Configure OpenAI project usage controls: the route's 20 requests / 40,000 characters per minute backstop is per function instance, not a global quota.

Only reply text is sent to OpenAI for speech. Audio has no-store headers; the client keeps up to three decoded replies in memory for replay. Stopping, muting, minimizing, or hiding the page cancels pending speech and playback. Provider failures leave text visible and explain voice is unavailable, without substituting browser speech. The UI discloses AI-generated voice.

Automated tests mock the provider and browser audio separately. Before calling voice live, verify a real generated reply and replay on desktop and a physical iPhone after a user speaker/microphone gesture. Missing credentials, billing, or model permissions must not be reported as a successful voice activation.
