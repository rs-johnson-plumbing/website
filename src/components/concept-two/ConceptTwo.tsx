import Image from "next/image";
import Link from "next/link";
import { conceptTwo as copy, site } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { RequestServiceButton } from "./RequestServiceButton";
import { ServiceDrawing } from "./ServiceDrawing";
import styles from "./concept-two.module.css";

/** First design milestone: hero, compact proof, and six service categories.
 * The existing footer remains until the next approved design milestone. */
export function ConceptTwo() {
  return (
    <div className={styles.page} id="concept-two-main" tabIndex={-1}>
      <section data-sticky-sentinel aria-labelledby="concept-two-heading" className={styles.hero}>
        <div className={`site-width gutter ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span aria-hidden="true" />{copy.hero.eyebrow}</p>
            <h1 id="concept-two-heading" className={styles.headline}>{copy.hero.headingFirst}{" "}<span>{copy.hero.headingSecond}</span></h1>
            <p className={styles.subheading}>{copy.hero.line}</p>
            <div className={styles.heroActions}>
              <RequestServiceButton label={copy.hero.homeownerAction} />
              <Link className={`${styles.button} ${styles.secondary}`} href="/for-builders">{copy.hero.builderAction}<Icon name="arrow-right" size={20} /></Link>
            </div>
            <p className={styles.serviceArea}><Icon name="map" size={18} /><span>{copy.hero.serviceArea}</span></p>
            <div className={styles.proofInner}>
              <span><Icon name="shield" size={20} />{site.owner.credential}</span>
              <span><Icon name="star" size={20} />{site.proof.nextdoorAward}</span>
            </div>
          </div>
          <figure className={styles.heroImage}>
            {/* The portrait is already a 104 KB WebP. Serve it directly;
                lazy loading avoids fetching the hidden photograph on phones. */}
            <Image src={copy.hero.image.src} alt={copy.hero.image.alt} fill unoptimized className={styles.photo} />
            <figcaption>{copy.hero.image.caption}</figcaption>
          </figure>
        </div>
      </section>
      <section aria-labelledby="concept-two-services" className={`site-width gutter ${styles.services}`}>
        <div className={styles.servicesHeading}>
          <h2 id="concept-two-services">{copy.services.heading}</h2>
        </div>
        <ul className={styles.serviceGrid}>
          {copy.services.items.map((service) => (
            <li key={service.id}>
              <Link href={service.href} className={styles.service}>
                <ServiceDrawing id={service.id} />
                <span>{service.label}</span>
                <Icon name="arrow-right" size={18} className={styles.serviceArrow} />
              </Link>
            </li>
          ))}
        </ul>
        <Link className={styles.allServices} href="/services">{copy.services.allLabel}<Icon name="arrow-right" size={18} /></Link>
      </section>
    </div>
  );
}
