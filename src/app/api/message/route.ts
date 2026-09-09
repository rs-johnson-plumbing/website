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
  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const comments = String(body.comments ?? "").trim();
  if (!firstName || !lastName || !phone || !comments) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }
  console.log("[message] new lead", { firstName, lastName, email, phone, comments });
  return NextResponse.json({ ok: true });
}
