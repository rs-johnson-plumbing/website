"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Audience = "homeowners" | "builders";

const AudienceContext = createContext<{ audience: Audience; setAudience: (a: Audience) => void }>({
  audience: "homeowners",
  setAudience: () => {},
});

/**
 * Which door the visitor picked on the homepage toggle. The hero and the
 * "sets us apart" section both read it, so flipping the toggle changes both.
 * Desktop shows both doors and keeps the homeowner set. The For Builders
 * page mounts it locked on builders, which flips the whole page dark.
 */
export function AudienceProvider({ children, initial = "homeowners", locked = false }: { children: React.ReactNode; /** Starting door. The For Builders page starts on builders. */ initial?: Audience; /** Ignore setAudience, for pages that are one door only. */ locked?: boolean }) {
  const [audience, setAudienceState] = useState<Audience>(initial);
  const setAudience = locked ? () => {} : setAudienceState;
  useEffect(() => {
    document.body.dataset.audience = audience;
    return () => {
      delete document.body.dataset.audience;
    };
  }, [audience]);
  return <AudienceContext.Provider value={{ audience, setAudience }}>{children}</AudienceContext.Provider>;
}

export function useAudience() {
  return useContext(AudienceContext);
}
