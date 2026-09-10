import { NextResponse } from "next/server";

/**
 * Request a Visit intake, two posts from the homepage hero.
 *
 * Step 1: { address } — capture the service address and answer "in area".
 * Every address is in area for now; the point is to capture it fast.
 * Step 2: { address, category, issue, note?, phone } — what they need and
 * where to reach them.
 *
 * TODO(step 7): on step 2, text Ryan (Twilio or the Housecall Pro lead
 * webhook) with address, category, issue, note, and phone. Add bot
 * protection. For now: validate, log, return success.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }
  const address = String(body.address ?? "").trim();
  if (address.length < 5) {
    return NextResponse.json({ ok: false, error: "Address required" }, { status: 400 });
  }
  if (body.phone === undefined) {
    console.log("[availability] address captured", { address });
    return NextResponse.json({ ok: true, inArea: true });
  }
  const phone = String(body.phone ?? "").replace(/\D/g, "");
  if (phone.length < 10) {
    return NextResponse.json({ ok: false, error: "Phone required" }, { status: 400 });
  }
  const lead = {
    address,
    phone,
    category: String(body.category ?? "").slice(0, 40),
    issue: String(body.issue ?? "").slice(0, 40),
    note: String(body.note ?? "").slice(0, 500),
  };
  console.log("[availability] callback requested", lead);
  return NextResponse.json({ ok: true });
}
