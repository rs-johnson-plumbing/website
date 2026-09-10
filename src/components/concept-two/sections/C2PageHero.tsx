import { conceptTwo } from "@/lib/content";
import { C2Photo } from "../ui/C2Photo";

type Slot = keyof typeof conceptTwo.photos;

/**
 * The inside-page hero: copy on the cream (or navy) ground, a photograph on
 * the right that fades into it. Same canvas idea as the homepage, shorter.
 */
export function C2PageHero({
  eyebrow,
  headingLines,
  lead,
  actions,
  slot,
  tone = "paper",
}: {
  eyebrow: string;
  headingLines: string[];
  lead?: string;
  actions: React.ReactNode;
  slot: Slot;
  tone?: "paper" | "navy";
}) {
  return (
    <section className={`c2-hero c2-hero--page ${tone === "navy" ? "c2-hero--navy" : ""}`} aria-labelledby="c2-page-heading">
      <div className="c2-wrap c2-hero-inner">
        <div className="c2-hero-copy">
          <p className={`c2-eyebrow c2-hero-eyebrow ${tone === "navy" ? "c2-eyebrow--on-dark" : ""}`}>{eyebrow}</p>
          <h1 id="c2-page-heading">
            {headingLines.map((line, index) => (
              <span key={line}>
                {line}
                {index < headingLines.length - 1 && <br />}
              </span>
            ))}
          </h1>
          {lead && <p className="c2-hero-page-lead">{lead}</p>}
          <div className="c2-hero-actions">{actions}</div>
        </div>
        <div className="c2-hero-media">
          <C2Photo slot={slot} priority sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </div>
    </section>
  );
}
