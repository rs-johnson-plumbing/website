import { NextResponse } from "next/server";

/**
 * Message Us intake.
 *
 * TODO(step 7): forward to the Housecall Pro lead webhook and send a Resend
 * notification to Ryan. Add bot protection (Turnstile or Vercel) before
 * launch. For now: validate, log, return success.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }
  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const message = String(body.message ?? "").trim();
  if (!name || !phone || !message) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }
  console.log("[message] new lead", { name, phone, city: body.city ?? "", message, smsConsent: Boolean(body.smsConsent) });
  return NextResponse.json({ ok: true });
}
