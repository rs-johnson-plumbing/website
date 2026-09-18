import { createHash } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { followUpAvailable } from '@/lib/robo-ryan-followup';
import copy from '../../../../../content/robo-ryan-followup.json';

export const runtime = 'nodejs';
// Per-instance backstop. Enable platform rate limits before high-traffic use.
let windowStart = 0, attempts = 0;
const respond = (body: object, status = 200) => NextResponse.json(body, {status, headers: {'Cache-Control': 'no-store'}});

export async function POST(request: NextRequest) {
  if (request.headers.get('origin') !== request.nextUrl.origin) return respond({error: copy.failure}, 403);
  if (!followUpAvailable()) return respond({error: copy.unavailable}, 503);
  const reader = request.body?.getReader();
  if (!reader) return respond({error: copy.invalid}, 400);
  let raw = '', size = 0;
  const decoder = new TextDecoder();
  try {
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 28000) {await reader.cancel(); return respond({error: copy.invalid}, 413)}
      raw += decoder.decode(value, {stream: true});
    }
    raw += decoder.decode();
  } finally {reader.releaseLock()}
  let data;
  try {data = JSON.parse(raw)} catch {return respond({error: copy.invalid}, 400)}
  const {email, messages, requestId} = data ?? {};
  if (typeof email !== 'string' || email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)
    || typeof requestId !== 'string' || !/^[a-f0-9-]{36}$/i.test(requestId)
    || !Array.isArray(messages) || !messages.length || messages.length > 30
    || !messages.some(m => m?.role === 'user')
    || messages.some(m => !m || !['user', 'assistant'].includes(m.role) || typeof m.content !== 'string' || !m.content.trim() || m.content.length > 2000)) {
    return respond({error: copy.invalid}, 400);
  }
  const now = Date.now();
  if (now - windowStart >= 60000) {windowStart = now; attempts = 0}
  if (attempts >= 10) return respond({error: copy.failure}, 429);
  attempts++;
  // Fixed server-side recipient: visitors cannot redirect messages or trigger replies to themselves.
  const text = `${copy.emailIntro}\n\nReply email: ${email}\n\n${messages.map(m => `${m.role}: ${m.content}`).join('\n\n')}`;
  const digest = createHash('sha256').update(text).digest('hex');
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `chat-${requestId}-${digest}`},
      body: JSON.stringify({from: process.env.ROBO_RYAN_FOLLOWUP_FROM, to: ['daren.ungerboeck@gmail.com'], reply_to: email, subject: copy.subject, text}),
      signal: AbortSignal.timeout(15000),
    });
    const result = await response.json();
    // Provider acceptance is not a delivery receipt. Never report success for a stub or error.
    if (!response.ok || typeof result.id !== 'string' || !result.id) throw new Error('Email not accepted');
    return respond({ok: true, message: copy.success});
  } catch {return respond({error: copy.failure}, 502)}
}
