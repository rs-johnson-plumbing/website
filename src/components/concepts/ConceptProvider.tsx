"use client";

import { createContext, useContext, useLayoutEffect } from "react";

export type Concept = "1" | "2";
const Context = createContext<Concept>("2");

/** The public site always uses Concept 2, including legacy concept links. */
export function ConceptProvider({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    document.documentElement.dataset.concept = "2";
  }, []);

  return <Context.Provider value="2">{children}</Context.Provider>;
}

export function useConcept() {
  return useContext(Context);
}

