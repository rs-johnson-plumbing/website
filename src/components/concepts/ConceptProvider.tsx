"use client";

import { createContext, useContext, useLayoutEffect, useState } from "react";

export type Concept = "1" | "2";
const STORAGE_KEY = "rsj-homepage-concept";
const Context = createContext<Concept>("2");

function valid(value: string | null): value is Concept {
  return value === "1" || value === "2";
}

function rememberedConcept(): Concept {
  const parameter = new URLSearchParams(window.location.search).get("concept");
  if (valid(parameter)) return parameter;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "2") return stored;
  } catch {
    // Direct URLs and in-page selection also work with storage disabled.
  }
  return "2";
}

function persist(concept: Concept) {
  try {
    window.localStorage.setItem(STORAGE_KEY, concept);
  } catch {
    // A privacy setting must never prevent switching designs.
  }
}

/** Concept 2 is the public default; direct concept URLs remain available for review. */
export function ConceptProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<Concept>("2");

  useLayoutEffect(() => {
    const sync = () => {
      const next = rememberedConcept();
      setSelected(next);
      persist(next);
      document.documentElement.dataset.concept = next;
    };
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener("pageshow", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("pageshow", sync);
    };
  }, []);

  return (
    <Context.Provider value={selected}>
      {children}
    </Context.Provider>
  );
}

export function useConcept() {
  return useContext(Context);
}
