import { conceptTwo } from "@/lib/content";

/** Which Concept 2 illustration stands for each service slug. */
const byService: Record<string, string> = {
  "water-heaters": "heater",
  "leaks-and-repairs": "leaks",
  "drains-and-sewer": "drains",
  "toilets-and-faucets": "fixtures",
  "water-softeners": "softener",
  "gas-lines": "gas",
  "sump-pumps": "pump",
  "emergency-plumbing": "emergency",
  "planning-and-takeoffs": "plans",
  underground: "underground",
  "rough-in": "roughin",
  "gas-runs": "gas",
  "water-and-sewer-tie-in": "service",
  "trim-and-fixture-set": "trim",
};

export function drawingFor(slug: string): string {
  return byService[slug] ?? "other";
}

/** Concept 2 keeps the authority's ampersands in short labels. */
export function c2Label(slug: string, fallback: string): string {
  const labels: Record<string, string> = conceptTwo.serviceLabels;
  return labels[slug] ?? fallback;
}
