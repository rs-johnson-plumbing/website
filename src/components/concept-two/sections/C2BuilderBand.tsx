import { conceptTwo as copy } from "@/lib/content";
import { C2Button } from "../ui/C2Button";
import { C2Photo } from "../ui/C2Photo";

/** Navy on the left, framing photography on the right, angled seam between. */
export function C2BuilderBand() {
  const band = copy.home.builderBand;
  return (
    <section className="c2-builder-band" aria-labelledby="c2-builder-heading">
      <div className="c2-builder-copy">
        <p className="c2-eyebrow c2-eyebrow--on-dark">{band.eyebrow}</p>
        <h2 id="c2-builder-heading">
          {band.headingLines.map((line, index) => (
            <span key={line}>
              {line}
              {index < band.headingLines.length - 1 && <br />}
            </span>
          ))}
        </h2>
        <C2Button href={band.cta.href} variant="on-dark">
          {band.cta.label}
        </C2Button>
      </div>
      <div className="c2-builder-photo">
        <C2Photo slot="builderFraming" sizes="(min-width: 1024px) 57vw, 100vw" />
      </div>
      <p className="c2-builder-notes">
        {band.notes.map((note) => (
          <span key={note}>
            {note}
            <br />
          </span>
        ))}
      </p>
    </section>
  );
}
