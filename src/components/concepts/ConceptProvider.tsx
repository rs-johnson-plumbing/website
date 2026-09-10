"use client";

import { createContext, useContext, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { conceptTwo } from "@/lib/content";
import styles from "./concepts.module.css";

type Concept = "1" | "2";
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

/** Static HTML remains Concept 1. Resolve the preference before the first
 * hydrated paint; never mount both homepages or duplicate their IDs. */
export function ConceptProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [selected, setSelected] = useState<Concept>("1");
  const isHome = pathname === "/";

  useLayoutEffect(() => {
    if (!isHome) return;
    const sync = () => {
      const next = rememberedConcept();
      setSelected(next);
      persist(next);
    };
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener("pageshow", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("pageshow", sync);
    };
  }, [isHome]);

  function select(concept: Concept) {
    if (concept === selected) return;
    const url = new URL(window.location.href);
    // Pin an implicit preference to the entry being left. Otherwise Back to
    // plain / would resolve the newly persisted preference, not this design.
    if (!valid(url.searchParams.get("concept"))) {
      url.searchParams.set("concept", selected);
      window.history.replaceState(window.history.state, "", url);
    }
    url.searchParams.set("concept", concept);
    // An anchor in the old design may not exist in the selected design.
    url.hash = "";
    window.history.pushState(null, "", url);
    persist(concept);
    setSelected(concept);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  return (
    <Context.Provider value={isHome ? selected : "1"}>
      {children}
      {isHome && (
        <div className={styles.switcher} role="group" aria-label={conceptTwo.ui.switcherLabel}>
          {(["1", "2"] as const).map((concept) => (
            <button key={concept} type="button" aria-pressed={selected === concept} onClick={() => select(concept)}>
              {concept === "1" ? conceptTwo.ui.conceptOne : conceptTwo.ui.conceptTwo}
            </button>
          ))}
        </div>
      )}
    </Context.Provider>
  );
}

export function useConcept() {
  return useContext(Context);
}
