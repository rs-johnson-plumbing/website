"use client";

import { useState, useCallback } from "react";
import type { BuilderService } from "@/lib/content";
import { C2ServiceDetails } from "../ui/C2ServiceDetails";
import { useRequestBid } from "../ui/C2Request";
import { conceptTwo as copy, builderServices, faqs, site } from "@/lib/content";
import { C2PageHero } from "../sections/C2PageHero";
import { C2TrustStrip } from "../sections/C2TrustStrip";
import { C2ServiceGrid } from "../sections/C2ServiceGrid";
import { C2Faq } from "../sections/C2Faq";
import { C2Split } from "../sections/C2Split";
import { C2Points } from "../sections/C2Points";
import { C2FinalCta } from "../sections/C2FinalCta";
import { C2Button } from "../ui/C2Button";
import { drawingFor, c2Label } from "../ui/drawingFor";

const tiles = builderServices.map((service) => ({
  id: drawingFor(service.slug),
  label: c2Label(service.slug, service.name),
  href: `/services/builders#${service.slug}`,
}));

export function C2Builders() {
  const page = copy.builders;
  const requestBid = useRequestBid();
  const [selected, setSelected] = useState<BuilderService | null>(null);
  const closeDetails = useCallback(() => setSelected(null), []);
  return (
    <div className="c2-builders">
      <C2PageHero
        eyebrow={page.hero.eyebrow}
        headingLines={page.hero.headingLines}
        lead={page.hero.lead}
        slot="builderHero"
        actions={
          <>
            <C2Button href={page.hero.primary.href}>
              {page.hero.primary.label}
            </C2Button>
            <C2Button href={site.phone.tel} variant="outline" icon="phone" trailingIcon={null} data-track="call-hero">
              {page.hero.secondary.label}
            </C2Button>
          </>
        }
      />
      <C2TrustStrip items={page.benefits} />

      <section id="services" className="c2-section" aria-labelledby="c2-builder-services">
        <div className="c2-wrap">
          <div className="c2-section-head">
            <h2 id="c2-builder-services" className="c2-h2">
              {page.services.heading}
            </h2>
          </div>
          <C2ServiceGrid items={tiles} detailed onSelect={item => setSelected(builderServices.find(service => item.href.endsWith(`#${service.slug}`)) ?? null)} />
        </div>
      </section>

      <C2Split id="builder-feature" slot="builderFraming" eyebrow={page.feature.eyebrow} heading={page.feature.heading} line={page.feature.line} ctaLabel={page.feature.cta} ctaHref="#request-a-bid" />
      <C2Points id="why-builders" heading={page.reasons.heading} items={page.reasons.items} />

      <section className="c2-section c2-section--navy" aria-labelledby="c2-phases">
        <div className="c2-wrap">
          <h2 id="c2-phases" className="c2-h2">
            {page.phases.heading}
          </h2>
          <ol className="c2-steps">
            {page.phases.items.map((phase) => (
              <li key={phase.step} className="c2-step">
                <p className="c2-step-number">{phase.step}</p>
                <h3 className="c2-h3">{phase.title}</h3>
                <p>{phase.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <C2Faq heading={page.faqHeading} items={faqs.builders.items} illustrated />
      <C2FinalCta audience="builders" />
      {selected && <C2ServiceDetails service={selected} onClose={closeDetails} onRequest={() => { setSelected(null); requestBid(); }} />}
    </div>
  );
}
