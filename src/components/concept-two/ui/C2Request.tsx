"use client";
import { useCallback, useMemo, useState } from "react";
import { IntakeContext } from "./C2IntakeContext";
import { C2IntakeDialog } from "./C2IntakeDialog";
export { useRequestService, useRequestBid } from "./C2IntakeContext";
export function C2RequestProvider({ children }: { children: React.ReactNode }) {
  const [kind, setKind] = useState<"service" | "bid" | null>(null);
  const service = useCallback(() => setKind("service"), []);
  const bid = useCallback(() => setKind("bid"), []);
  const close = useCallback(() => setKind(null), []);
  const value = useMemo(() => ({ service, bid }), [service, bid]);
  return <IntakeContext.Provider value={value}>{children}{kind && <C2IntakeDialog key={kind} kind={kind} onClose={close} />}</IntakeContext.Provider>;
}
