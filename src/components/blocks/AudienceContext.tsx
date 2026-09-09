"use client";

import { createContext, useContext, useState } from "react";

export type Audience = "homeowners" | "builders";

const AudienceContext = createContext<{ audience: Audience; setAudience: (a: Audience) => void }>({
  audience: "homeowners",
  setAudience: () => {},
});

/**
 * Which door the visitor picked on the homepage toggle. The hero and the
 * "sets us apart" section both read it, so flipping the toggle changes both.
 * Desktop shows both doors and keeps the homeowner set.
 */
export function AudienceProvider({ children }: { children: React.ReactNode }) {
  const [audience, setAudience] = useState<Audience>("homeowners");
  return <AudienceContext.Provider value={{ audience, setAudience }}>{children}</AudienceContext.Provider>;
}

export function useAudience() {
  return useContext(AudienceContext);
}
