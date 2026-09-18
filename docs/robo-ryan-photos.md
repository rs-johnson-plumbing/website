# Photos and model numbers

The chat supports Take Photo (mobile rear-camera hint) and Choose Photos (device library or desktop file picker). Camera behavior depends on the browser and OS; desktop browsers generally open a file picker. No live camera stream or automatic capture is used.

Visitors can attach up to two photos to a message, preview and remove them, and send photos with or without text. Photos are displayed in the conversation. The helper asks for a fixture photo plus a close-up of its brand/model label. Visitors can type the model number at any time.

## Processing and privacy

Photos are decoded and re-encoded as JPEG in the browser before sending: longest dimension 1600 pixels, at most 1,000,000 data-URL characters per image. Re-encoding omits original EXIF metadata. Source files over 20 MB or decoded images over 40 megapixels are rejected. Supported decoding depends on the browser; JPEG, PNG, and WebP are preferred, and unsupported HEIC files get a retry message.

The chat API accepts only embedded JPEG data, at most two images, checks JPEG signature bytes, and reads a bounded 2.2 MB request body. Remote image URLs are rejected. It does not create public uploads or save photos in a database. Only newly sent photos are included in each request; older chat thumbnails are not retransmitted. Photos and messages remain in page memory and disappear on refresh. They are not submitted to Housecall, email, or the plumbing team.

If enabled, image data goes to OpenAI for label reading with `store:false`. That setting does not eliminate all provider retention. The UI explains that Send shares photos with the automated assistant and asks visitors to leave people and personal documents out of frame.

## Label reading

Enable `ROBO_RYAN_VISION_ENABLED=true` together with `ROBO_RYAN_AI_ENABLED=true`, `OPENAI_API_KEY`, and a compatible `OPENAI_MODEL` or optional `OPENAI_VISION_MODEL` in Vercel. Redeploy after configuration. The model must support image inputs and structured outputs. This does not train or fine-tune a model.

The task is deliberately limited to visible brand and model labels, without diagnoses, repair procedures, serial-number transcription, or identifying people. Unclear or inconsistent labels get a request for a better photo or typed details. Clear results appear as tentative readings with a Use These Details button. Only a customer's confirmation sends those details as a new text message to the existing manufacturer-search flow; automatic search from an unconfirmed photo reading is not performed.

Without API activation, photo attachments still work, but the assistant clearly says automatic photo reading is not enabled and asks the customer to type the brand/model. The separate design-preview page does not process photos. Safety messages supplied in the customer's text run before image analysis.

Before enabling publicly, verify real model-label photos (including glare, blur, rotated labels, and ambiguous characters) with the configured API model. Automated tests use provider fixtures and exercise attachment, compression, removal, photo-only sends, confirmation, rejection of invalid payloads, and the disabled state. Real iPhone camera capture and real model accuracy must be checked separately. Configure appropriate API spend controls and shared/platform rate limiting; the current per-instance burst guard is not a distributed quota.

References: https://developers.openai.com/api/docs/guides/images-vision and https://developers.openai.com/api/docs/guides/structured-outputs.
