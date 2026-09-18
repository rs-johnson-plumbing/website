import {NextRequest, NextResponse} from 'next/server';
import copy from '../../../../../content/robo-ryan-speech.json';

export const runtime = 'nodejs';
export const maxDuration = 60;
// Per-instance backstop only; configure OpenAI project spend limits as well.
let windowStart = 0, requests = 0, characters = 0;
const fail = (error: string, status: number) => NextResponse.json({error}, {status, headers: {'Cache-Control': 'no-store'}});

export async function POST(request: NextRequest) {
  if (request.headers.get('origin') !== request.nextUrl.origin) return fail(copy.invalid, 403);
  const reader = request.body?.getReader();
  if (!reader) return fail(copy.invalid, 400);
  let raw = '', bytes = 0;
  const decoder = new TextDecoder();
  try {
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 28000) {await reader.cancel(); return fail(copy.invalid, 413)}
      raw += decoder.decode(value, {stream: true});
    }
    raw += decoder.decode();
  } catch {return fail(copy.invalid, 400)} finally {reader.releaseLock()}
  let text: unknown;
  try {text = JSON.parse(raw)?.text} catch {return fail(copy.invalid, 400)}
  if (typeof text !== 'string' || !text.trim() || text.length > 6000) return fail(copy.invalid, 400);
  if (!process.env.OPENAI_API_KEY || process.env.ROBO_RYAN_TTS_ENABLED === 'false') return fail(copy.unavailable, 503);
  const now = Date.now();
  if (now - windowStart >= 60000) {windowStart = now; requests = 0; characters = 0}
  if (requests >= 20 || characters + text.length > 40000) return fail(copy.busy, 429);
  requests++; characters += text.length;
  try {
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json'},
      body: JSON.stringify({model: 'gpt-4o-mini-tts', voice: 'cedar', input: text.trim(), instructions: copy.instructions, response_format: 'mp3'}),
      signal: AbortSignal.any([request.signal, AbortSignal.timeout(45000)]),
    });
    if (!response.ok || !response.body || !response.headers.get('content-type')?.startsWith('audio/')) return fail(copy.unavailable, 502);
    return new Response(response.body, {headers: {'Content-Type': 'audio/mpeg', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff'}});
  } catch {return fail(copy.unavailable, 502)}
}
