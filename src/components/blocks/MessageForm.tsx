"use client";

import { useState } from "react";
import { home } from "@/lib/content";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Short message form: first and last name, email, phone, comments, in four
 * rows. Posts to /api/message, which is a stub until the Housecall Pro
 * webhook and Resend notification are wired (step 7).
 */
export function MessageForm({ className, heading = true }: { className?: string; /** Show the card's own heading and line. Off when the section heading already says it. */ heading?: boolean }) {
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

  const input = "h-12 w-full rounded-btn border border-hairline bg-white px-3.5 text-[15px] text-charcoal placeholder:text-slate focus:border-teal focus:outline-none";

  return (
    <form id="message" onSubmit={onSubmit} className={cn("flex flex-col gap-3 rounded-card border border-hairline bg-white p-5", className)}>
      {heading && (
        <>
          <div className="text-[20px] font-bold">{f.heading}</div>
          <p className="text-[14px] text-slate">{f.line}</p>
        </>
      )}
      {status === "sent" ? (
        <p className="rounded-btn bg-teal-tint px-4 py-3 text-[15px] font-semibold">{f.success}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2">
            <input name="firstName" required placeholder={f.fields.firstName} aria-label={f.fields.firstName} className={input} autoComplete="given-name" />
            <input name="lastName" required placeholder={f.fields.lastName} aria-label={f.fields.lastName} className={input} autoComplete="family-name" />
            <input name="email" type="email" placeholder={f.fields.email} aria-label={f.fields.email} className={input} autoComplete="email" />
            <input name="phone" required type="tel" placeholder={f.fields.phone} aria-label={f.fields.phone} className={input} autoComplete="tel" />
            <textarea name="comments" required placeholder={f.fields.comments} aria-label={f.fields.comments} rows={4} className={cn(input, "h-auto py-3 lg:col-span-2")} />
          </div>
          {status === "error" && <p className="text-[14px] font-semibold text-charcoal">{f.error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            data-track="message-submit"
            className="flex h-[52px] items-center justify-center rounded-btn bg-teal text-[16px] font-bold text-white transition-opacity hover:opacity-[0.88] disabled:opacity-60"
          >
            {f.button}
          </button>
        </>
      )}
    </form>
  );
}
