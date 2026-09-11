"use client";

import { useState } from "react";
import { conceptTwo as copy, site } from "@/lib/content";
import { C2Button } from "../ui/C2Button";
import { C2Icon } from "../ui/C2Icon";

type State = "idle" | "sending" | "done" | "error";

/** Request a Bid. Posts to the existing /api/bid handler. */
export function C2BidForm() {
  const form = copy.builders.form;
  const [state, setState] = useState<State>("idle");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setState("sending");
    try {
      const response = await fetch("/api/bid", { method: "POST", body: data });
      setState(response.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <section id="request-a-bid" className="c2-section c2-section--sand" aria-labelledby="c2-bid-heading">
      <div className="c2-wrap c2-bid">
        <div>
          <h2 id="c2-bid-heading" className="c2-h2">
            {form.heading}
          </h2>
          <p className="c2-lead">{form.line}</p>
          <a href={site.phone.tel} className="c2-textlink" data-track="call-bid">
            <C2Icon name="phone" size={18} />
            {form.orCall}
          </a>
        </div>
        {state === "done" ? (
          <div className="c2-bid-done">
            <C2Icon name="check" size={32} />
            <p>{form.done}</p>
          </div>
        ) : (
          <form className="c2-form" onSubmit={submit}>
            <label>
              <span>{form.contractor}</span>
              <input name="contractor" required autoComplete="organization" />
            </label>
            <div className="c2-form-row">
              <label><span>Contact Name</span><input name="contactName" autoComplete="name" maxLength={80} /></label>
              <label><span>Email</span><input name="email" type="email" autoComplete="email" maxLength={254} /></label>
            </div>
            <label><span>Project Location</span><input name="projectLocation" autoComplete="street-address" maxLength={200} /></label>
            <div className="c2-form-row">
              <label>
                <span>{form.projectType}</span>
                <select name="projectType" defaultValue={form.projectTypes[0]}>
                  {form.projectTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>{form.phone}</span>
                <input name="phone" type="tel" inputMode="tel" required autoComplete="tel" />
              </label>
            </div>
            <label><span>Project Details</span><textarea name="projectDetails" rows={3} maxLength={2000} /></label>
            <label className="c2-plans-upload">
              <span>{form.plans}</span>
              <input name="plans" type="file" accept="application/pdf,image/*" aria-describedby="c2-plans-help" />
              <small id="c2-plans-help">PDF or image, up to 4 MB.</small>
            </label>
            {state === "error" && <p className="c2-form-error">{form.error}</p>}
            <C2Button type="submit" trailingIcon={null} disabled={state === "sending"}>
              {state === "sending" ? form.sending : form.submit}
            </C2Button>
          </form>
        )}
      </div>
    </section>
  );
}
