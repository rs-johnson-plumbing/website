"use client";

import { useConcept } from "./ConceptProvider";

/** One route, two designs. Only the selected one mounts. */
export function ConceptPage({ one, two }: { one: React.ReactNode; two?: React.ReactNode }) {
  return useConcept() === "2" && two ? two : one;
}
