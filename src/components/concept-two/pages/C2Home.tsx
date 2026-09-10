"use client";

import { conceptTwo as copy } from "@/lib/content";
import { C2Hero } from "../sections/C2Hero";
import { C2ServiceGrid } from "../sections/C2ServiceGrid";
import { C2BuilderBand } from "../sections/C2BuilderBand";
import { C2Apart } from "../sections/C2Apart";
import { C2Split } from "../sections/C2Split";
import { C2Reviews } from "../sections/C2Reviews";
import { C2FinalCta } from "../sections/C2FinalCta";
import { C2Button } from "../ui/C2Button";

export function C2Home() {
  const services = copy.home.services;
  return (
    <>
      <C2Hero />

      <section className="c2-section c2-section--sand" aria-labelledby="c2-services-heading">
        <div className="c2-wrap">
          <h2 id="c2-services-heading" className="c2-h2 c2-center">
            {services.heading}
          </h2>
          <div className="c2-service-block">
            <C2ServiceGrid items={services.items} />
          </div>
          <div className="c2-center">
            <C2Button href="/services" variant="outline" className="c2-btn--quiet">
              {services.seeAll}
            </C2Button>
          </div>
        </div>
      </section>

      <C2BuilderBand />
      <C2Apart />

      <C2Split
        id="remodels"
        slot="bathRemodel"
        eyebrow={copy.home.remodel.eyebrow}
        heading={copy.home.remodel.heading}
        line={copy.home.remodel.line}
        ctaLabel={copy.home.remodel.cta.label}
        ctaHref={copy.home.remodel.cta.href}
      />

      <C2Reviews heading={copy.home.reviews.heading} />
      <C2FinalCta />
    </>
  );
}
