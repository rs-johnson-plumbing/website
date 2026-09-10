"use client";

import { useConcept } from "./ConceptProvider";

export function ConceptHome({ conceptOne, conceptTwo }: { conceptOne: React.ReactNode; conceptTwo: React.ReactNode }) {
  return useConcept() === "2" ? conceptTwo : conceptOne;
}
