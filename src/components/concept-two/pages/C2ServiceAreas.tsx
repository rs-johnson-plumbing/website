"use client";

import Link from "next/link";
import { conceptTwo, cities, site } from "@/lib/content";
import { C2Button } from "../ui/C2Button";
import { useRequestService } from "../ui/C2Request";
import { C2Faq } from "../sections/C2Faq";
import styles from "./C2ServiceAreas.module.css";

const copy = conceptTwo.serviceAreas;
type LocalPage = (typeof copy.pages)[number];

export function C2ServiceAreas({ city }: { city?: LocalPage }) {
  const request = useRequestService();
  const listed = new Set(copy.pages.map(page => page.slug));
  const nearby = city ? copy.pages.filter(page => city.related.includes(page.slug)) : copy.pages;
  const actions = <div className={styles.actions}>
    <C2Button onClick={request}>{conceptTwo.ui.requestService}</C2Button>
    <C2Button href={site.phone.tel} variant="outline" icon="phone" trailingIcon={null}>{conceptTwo.ui.callNumber}</C2Button>
  </div>;

  return <div className={styles.page}>
    <section className={`c2-section c2-section--paper ${styles.hero}`}>
      <div className="c2-wrap">
        <nav aria-label={copy.breadcrumbLabel} className={styles.breadcrumb}>
          <Link href="/">{copy.homeLabel}</Link><span aria-hidden="true">/</span>
          {city ? <><Link href="/service-areas">{copy.navLabel}</Link><span aria-hidden="true">/</span><span aria-current="page">{city.name}</span></> : <span aria-current="page">{copy.navLabel}</span>}
        </nav>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>{city?.county ?? copy.eyebrow}</p>
            <h1>{city ? city.title.split(" | ")[0] : copy.heading}</h1>
            <p className={styles.lead}>{city?.intro ?? copy.lead}</p>
            {actions}
          </div>
          <aside className={styles.note}>
            <h2>{city ? copy.zipLabel : copy.planHeading}</h2>
            {city && <p className={styles.zips}>{city.zips.join(" · ")}</p>}
            <p>{city ? copy.zipNote : copy.planText}</p>
            <p>{copy.emergencyText}</p>
          </aside>
        </div>
      </div>
    </section>

    {!city && <section className="c2-section c2-section--sand" aria-labelledby="area-cities">
      <div className="c2-wrap">
        <h2 id="area-cities" className="c2-h2">{copy.citiesHeading}</h2>
        <div className={styles.grid}>
          {copy.pages.map(page => <Link key={page.slug} href={`/service-areas/${page.slug}`} className={styles.card}>
            <span className={styles.eyebrow}>{page.county}</span>
            <h3>{page.name}</h3><p>{copy.zipLabel}: {page.zips.join(", ")}</p><span aria-hidden="true">→</span>
          </Link>)}
        </div>
        <p className={styles.helper}>{copy.zipNote}</p>
      </div>
    </section>}

    <section className="c2-section c2-section--paper" aria-labelledby="area-services">
      <div className="c2-wrap">
        <h2 id="area-services" className="c2-h2">{copy.servicesHeading}</h2>
        <div className={styles.grid}>
          {copy.services.map(service => <article key={service.slug} className={styles.card}>
            <h3>{service.heading}</h3><p>{service.body}</p>
            <Link className="c2-textlink" href={`/services/${service.slug}`}>{copy.detailsLabel}<span className="sr-only">: {service.heading}</span><span aria-hidden="true"> →</span></Link>
          </article>)}
        </div>
      </div>
    </section>

    {city ? <>
      <section className="c2-section c2-section--sand">
        <div className={`c2-wrap ${styles.columns}`}>
          <div><h2 className="c2-h2">{city.heading}</h2><p>{city.body}</p><h2 className="c2-h2">{copy.planHeading}</h2><p>{copy.planText}</p></div>
          <aside className={styles.resource}><p className={styles.eyebrow}>{copy.localHeading}</p><h2 className="c2-h3">{city.localHeading}</h2><p>{city.localBody}</p><a href={city.resource.href} className="c2-textlink">{city.resource.label}<span aria-hidden="true"> ↗</span></a></aside>
        </div>
      </section>
      <C2Faq heading={copy.faqHeading} items={city.faqs} />
    </> : <section className="c2-section c2-section--sand">
      <div className="c2-wrap"><h2 className="c2-h2">{copy.otherHeading}</h2><p className={styles.lead}>{copy.otherText}</p>
        <div className={styles.columns}>{cities.regions.map(region => <div key={region.name}><h3 className="c2-h3">{region.name}</h3><ul className={styles.communities}>{region.cities.filter(item => !listed.has(item.slug)).map(item => <li key={item.slug}>{item.name}</li>)}</ul></div>)}</div>
      </div>
    </section>}

    {city && <section className="c2-section c2-section--paper">
      <div className="c2-wrap"><h2 className="c2-h2">{copy.nearbyHeading}</h2><div className={styles.nearby}>{nearby.map(page => <Link key={page.slug} className="c2-textlink" href={`/service-areas/${page.slug}`}>{page.name}</Link>)}<Link className="c2-textlink" href="/service-areas">{copy.backLabel}</Link></div></div>
    </section>}

    <section className={`c2-section ${styles.closing}`}>
      <div className="c2-wrap"><h2 className="c2-h2">{copy.closingHeading}</h2><p className={styles.lead}>{copy.closingText}</p>{actions}<p className={styles.helper}>{copy.credentials}</p></div>
    </section>
  </div>;
}
