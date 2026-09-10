"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { conceptTwo as copy, site, smsLink } from "@/lib/content";
import { C2Icon } from "./C2Icon";
import { C2Button } from "./C2Button";

type State = "idle" | "sending" | "done" | "error";

const Context = createContext<() => void>(() => {});

/** Any Concept 2 button can open the one request dialog. */
export function useRequestService() {
  return useContext(Context);
}

export function C2RequestProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openDialog = useCallback(() => setOpen(true), []);
  return (
    <Context.Provider value={openDialog}>
      {children}
      {open && <RequestDialog onClose={() => setOpen(false)} />}
    </Context.Provider>
  );
}

function RequestDialog({ onClose }: { onClose: () => void }) {
  const [state, setState] = useState<State>("idle");
  const panel = useRef<HTMLDivElement>(null);
  const firstField = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // The first render returns null while the portal mounts, so wait for that
  // before moving focus; otherwise focus stays behind the modal.
  useEffect(() => {
    if (!mounted) return;
    firstField.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panel.current) return;
      const focusable = panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, select, textarea');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [mounted, onClose]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const [firstName, ...rest] = name.split(" ");
    setState("sending");
    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName: rest.join(" ") || firstName,
          phone: String(form.get("phone") ?? ""),
          email: "",
          comments: `${String(form.get("address") ?? "")} — ${String(form.get("details") ?? "")}`,
        }),
      });
      setState(response.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (!mounted) return null;

  return createPortal(
    <div className="c2 c2-overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div ref={panel} className="c2-dialog" role="dialog" aria-modal="true" aria-labelledby="c2-request-title">
        <button type="button" className="c2-dialog-close" onClick={onClose} aria-label={copy.request.close}>
          <C2Icon name="close" size={22} />
        </button>
        {state === "done" ? (
          <div className="c2-dialog-done">
            <C2Icon name="check" size={34} />
            <h2 id="c2-request-title">{copy.request.doneHeading}</h2>
            <p>{copy.request.doneLine}</p>
            <C2Button href={site.phone.tel} variant="outline" icon="phone" trailingIcon={null} block>
              {copy.ui.callNumber}
            </C2Button>
          </div>
        ) : (
          <>
            <h2 id="c2-request-title">{copy.request.heading}</h2>
            <p className="c2-dialog-line">{copy.request.line}</p>
            <form onSubmit={submit} className="c2-form">
              <label>
                <span>{copy.request.name}</span>
                <input ref={firstField} name="name" required autoComplete="name" />
              </label>
              <label>
                <span>{copy.request.phone}</span>
                <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" />
              </label>
              <label>
                <span>{copy.request.address}</span>
                <input name="address" autoComplete="street-address" />
              </label>
              <label>
                <span>{copy.request.details}</span>
                <textarea name="details" rows={3} required />
              </label>
              {state === "error" && <p className="c2-form-error">{copy.request.error}</p>}
              <C2Button type="submit" trailingIcon={null} block disabled={state === "sending"}>
                {state === "sending" ? copy.request.sending : copy.request.submit}
              </C2Button>
              <p className="c2-dialog-alt">
                {copy.request.orReach}{" "}
                <a href={site.phone.tel}>{site.phone.display}</a> {copy.request.or} <a href={smsLink()}>{copy.ui.text}</a>
              </p>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
