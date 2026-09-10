"use client";

import { useConcept } from "./ConceptProvider";
import { Header } from "@/components/layout/Header";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import { ConceptTwoHeader } from "@/components/concept-two/ConceptTwoHeader";

export function ConceptHeader() {
  return useConcept() === "2" ? <ConceptTwoHeader /> : <Header />;
}

export function ConceptMobileBar() {
  // Remount so the original mobile bar observes the selected hero's sentinel.
  const concept = useConcept();
  return <StickyMobileBar key={concept} />;
}
