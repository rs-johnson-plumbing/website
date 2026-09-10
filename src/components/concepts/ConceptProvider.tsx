"use client";

import { createContext, useCallback, useContext, useLayoutEffect, useState } from "react";
import { conceptTwo } from "@/lib/content";
import styles from "./concepts.module.css";

export type Concept = "1" | "2";
const STORAGE_KEY = "rsj-homepage-concept";
const Context = createContext<Concept>("1");

function valid(value: string | null): value is Concept {
  return value === "1" || value === "2";
}

function rememberedConcept(): Concept {
  const parameter = new URLSearchParams(window.location.search).get("concept");
  if (valid(parameter)) return parameter;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (valid(stored)) return stored;
  } catch {
    // Direct URLs and in-page selection also work with storage disabled.
  }
  return "1";
}

function persist(concept: Concept) {
  try {
    window.localStorage.setItem(STORAGE_KEY, concept);
  } catch {
    // A privacy setting must never prevent switching designs.
  }
}

/**
 * The two site designs share every route. Concept 1 is the static HTML, so it
 * is what search engines and a reader without JavaScript get; the preference
 * resolves before the first hydrated paint. Only one design is ever mounted,
 * so IDs and H1s are never duplicated.
 */
export function ConceptProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<Concept>("1");

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

  const select = useCallback(
    (concept: Concept) => {
      if (concept === selected) return;
      const url = new URL(window.location.href);
      url.searchParams.set("concept", concept);
      // An anchor in the old design may not exist in the selected design.
      url.hash = "";
      window.history.pushState(null, "", url);
      persist(concept);
      setSelected(concept);
      document.documentElement.dataset.concept = concept;
      window.scrollTo({ top: 0, behavior: "instant" });
    },
    [selected],
  );

  return (
    <Context.Provider value={selected}>
      {children}
      <div className={styles.switcher} role="group" aria-label={conceptTwo.ui.switcherLabel}>
        {(["1", "2"] as const).map((concept) => (
          <button key={concept} type="button" aria-pressed={selected === concept} onClick={() => select(concept)}>
            {concept === "1" ? conceptTwo.ui.conceptOne : conceptTwo.ui.conceptTwo}
          </button>
        ))}
      </div>
    </Context.Provider>
  );
}

export function useConcept() {
  return useContext(Context);
}
