import { conceptTwo as copy } from "@/lib/content";
import { C2Icon, type C2IconName } from "../ui/C2Icon";
import { C2Button } from "../ui/C2Button";
import { C2Photo } from "../ui/C2Photo";
import { C2Location } from "../ui/C2Location";

/**
 * Homepage hero. One canvas: cream ground, copy on the left, the photograph
 * on the right fading into the cream so there is no vertical seam. On phones
 * the media layer is replaced by the dedicated house crop in the authority
 * override stylesheet so the composition matches the mobile reference.
 */
export function C2Hero() {
  const hero = copy.home.hero;
  const trust: Array<{ icon: C2IconName; line1: string; line2: string }> = [
    { icon: "star", line1: "Locally", line2: "Trusted" },
    { icon: "users", line1: "Locally", line2: "Owned" },
    { icon: "shield", line1: "Licensed", line2: "& Insured" },
  ];

  return (
    <section className="c2-hero" aria-labelledby="c2-hero-heading">
      <div className="c2-wrap c2-hero-inner">
        <div className="c2-hero-copy">
          <C2Location />
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
            {trust.map((item) => (
              <div key={`${item.line1}-${item.line2}`}>
                <C2Icon name={item.icon} size={28} />
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
          <C2Photo slot="homeHero" sizes="100vw" desktopSrc="/images/concept-two/hero-desktop-authority.webp" />
        </div>
      </div>
    </section>
  );
}
