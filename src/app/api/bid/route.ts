import { NextResponse } from "next/server";

const MAX_PLANS_BYTES = 4 * 1024 * 1024;
const PLAN_TYPES = /^(application\/pdf|image\/)/;

/**
 * Request a Bid intake from the builders hero, one multipart post:
 * contractor, projectType, phone, and an optional plans file (PDF or image,
 * 4 MB cap so it fits the serverless request limit).
 *
 * TODO(step 7): text Ryan with contractor, project type, and phone; store the
 * plans file (Vercel Blob or email attachment) and include a link. Add bot
 * protection. For now: validate, log, return success.
 */
export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }
  const contractor = String(form.get("contractor") ?? "").trim().slice(0, 80);
  if (contractor.length < 2) {
    return NextResponse.json({ ok: false, error: "Contractor required" }, { status: 400 });
  }
  const phone = String(form.get("phone") ?? "").replace(/\D/g, "");
  if (phone.length < 10) {
    return NextResponse.json({ ok: false, error: "Phone required" }, { status: 400 });
  }
  const plans = form.get("plans");
  let plansInfo: { name: string; size: number; type: string } | null = null;
  if (plans instanceof File && plans.size > 0) {
    if (plans.size > MAX_PLANS_BYTES || !PLAN_TYPES.test(plans.type)) {
      return NextResponse.json({ ok: false, error: "Plans must be a PDF or image under 4 MB" }, { status: 400 });
    }
    plansInfo = { name: plans.name.slice(0, 120), size: plans.size, type: plans.type };
  }
  const lead = {
    contractor,
    contactName: String(form.get("contactName") ?? "").trim().slice(0, 80),
    email: String(form.get("email") ?? "").trim().slice(0, 254),
    projectLocation: String(form.get("projectLocation") ?? "").trim().slice(0, 200),
    projectDetails: String(form.get("projectDetails") ?? "").trim().slice(0, 2000),
    projectType: String(form.get("projectType") ?? "").slice(0, 40),
    phone,
    plans: plansInfo,
  };
  console.log("[bid] bid requested", lead);
  return NextResponse.json({ ok: true });
}
