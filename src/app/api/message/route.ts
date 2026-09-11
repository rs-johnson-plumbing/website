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
  let photos: { name: string; size: number; type: string }[] = [];
  try {
    if (req.headers.get("content-type")?.includes("multipart/form-data")) {
      const data = await req.formData();
      body = Object.fromEntries(Array.from(data.entries()).filter(([, value]) => typeof value === "string"));
      const uploads = data.getAll("photos").filter((value): value is File => value instanceof File && value.size > 0);
      if (uploads.length > 5 || uploads.reduce((sum, file) => sum + file.size, 0) > 4 * 1024 * 1024 || uploads.some(file => !file.type.startsWith("image/") || file.size > 4 * 1024 * 1024)) {
        return NextResponse.json({ ok: false, error: "Invalid photos" }, { status: 400 });
      }
      // File delivery/storage remains part of the existing intake integration TODO.
      photos = uploads.map(file => ({ name: file.name, size: file.size, type: file.type }));
    } else {
      body = await req.json();
    }
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
  console.log("[message] new lead", { firstName, lastName, email, phone, comments, photos });
  return NextResponse.json({ ok: true });
}
