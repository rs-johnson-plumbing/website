"use client";

import { useState } from "react";
import { home } from "@/lib/content";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Short homeowner message form. Posts to /api/message, which is a stub until
 * the Housecall Pro webhook and Resend notification are wired (step 7).
 */
export function MessageForm({ className }: { className?: string }) {
  const f = home.form;
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/message", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const input = "h-12 w-full rounded-btn border border-hairline bg-white px-3.5 text-[15px] text-charcoal placeholder:text-slate focus:border-blue focus:outline-none";

  return (
    <form id="message" onSubmit={onSubmit} className={cn("flex flex-col gap-3 rounded-card border border-hairline bg-white p-5", className)}>
      <div className="text-[20px] font-bold">{f.heading}</div>
      <p className="text-[14px] text-slate">{f.line}</p>
      {status === "sent" ? (
        <p className="rounded-btn bg-blue-tint px-4 py-3 text-[15px] font-semibold">{f.success}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2">
            <input name="name" required placeholder={f.fields.name} aria-label={f.fields.name} className={input} autoComplete="name" />
            <input name="phone" required type="tel" placeholder={f.fields.phone} aria-label={f.fields.phone} className={input} autoComplete="tel" />
            <input name="city" placeholder={f.fields.city} aria-label={f.fields.city} className={input} autoComplete="address-level2" />
            <textarea name="message" required placeholder={f.fields.message} aria-label={f.fields.message} rows={4} className={cn(input, "h-auto py-3 lg:row-span-2")} />
          </div>
          <label className="flex items-start gap-2 text-[12px] leading-snug text-slate">
            <input type="checkbox" name="smsConsent" className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate" />
            {f.consent}
          </label>
          {status === "error" && <p className="text-[14px] font-semibold text-charcoal">{f.error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            data-track="message-submit"
            className="flex h-[52px] items-center justify-center rounded-btn bg-blue text-[16px] font-bold text-white transition-opacity hover:opacity-[0.88] disabled:opacity-60"
          >
            {f.button}
          </button>
        </>
      )}
    </form>
  );
}
