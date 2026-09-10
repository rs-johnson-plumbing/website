import { conceptTwo as copy } from "@/lib/content";
import { C2Icon } from "../ui/C2Icon";
import { C2Button } from "../ui/C2Button";
import { C2Photo } from "../ui/C2Photo";

/**
 * Homepage hero. One canvas: cream ground, copy on the left, the photograph
 * on the right fading into the cream so there is no vertical seam. On phones
 * the photograph drops away and the type carries the page.
 */
export function C2Hero() {
  const hero = copy.home.hero;
  return (
    <section className="c2-hero" aria-labelledby="c2-hero-heading">
      <div className="c2-wrap c2-hero-inner">
        <div className="c2-hero-copy">
          <p className="c2-eyebrow c2-hero-eyebrow">{hero.eyebrow}</p>
          <h1 id="c2-hero-heading">
            {hero.headingLines.map((line, index) => (
              <span key={line}>
                {line}
                {index < hero.headingLines.length - 1 && (
                  <>
                    {" "}
                    <br className="c2-wide-break" />
                  </>
                )}
              </span>
            ))}
          </h1>
          <p className="c2-hero-sub">{hero.subheading}</p>
          <p className="c2-hero-lead">{hero.lead}</p>
          <div className="c2-hero-actions">
            <C2Button href={hero.primary.href} icon="wrench">
              {hero.primary.label}
            </C2Button>
            <C2Button href={hero.secondary.href} variant="outline" icon="hard-hat">
              {hero.secondary.label}
            </C2Button>
          </div>
          <div className="c2-hero-trust">
            {hero.trust.map((item) => (
              <div key={item.line1}>
                <C2Icon name={item.icon as "star"} size={26} />
                <span>
                  {item.line1}
                  <br />
                  {item.line2}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="c2-hero-media">
          {/* hidden below 1024px, so it must not be eager: phones would pay for a photograph they never see */}
          <C2Photo slot="homeHero" sizes="(min-width: 1024px) 52vw, 100vw" />
        </div>
      </div>
    </section>
  );
}
