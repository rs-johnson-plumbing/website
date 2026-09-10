"use client";

import { conceptTwo as copy, builderServices, faqs, site } from "@/lib/content";
import { C2PageHero } from "../sections/C2PageHero";
import { C2TrustStrip } from "../sections/C2TrustStrip";
import { C2ServiceGrid } from "../sections/C2ServiceGrid";
import { C2Faq } from "../sections/C2Faq";
import { C2BidForm } from "../sections/C2BidForm";
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
  return (
    <>
      <C2PageHero
        tone="navy"
        eyebrow={page.hero.eyebrow}
        headingLines={page.hero.headingLines}
        lead={page.hero.lead}
        slot="builderFraming"
        actions={
          <>
            <C2Button href={page.hero.primary.href} variant="on-dark">
              {page.hero.primary.label}
            </C2Button>
            <C2Button href={site.phone.tel} variant="on-dark" icon="phone" trailingIcon={null} data-track="call-hero">
              {page.hero.secondary.label}
            </C2Button>
          </>
        }
      />
      <C2TrustStrip items={page.benefits} />

      <section id="services" className="c2-section c2-section--paper" aria-labelledby="c2-builder-services">
        <div className="c2-wrap">
          <div className="c2-section-head">
            <h2 id="c2-builder-services" className="c2-h2">
              {page.services.heading}
            </h2>
            <p>{page.services.line}</p>
          </div>
          <C2ServiceGrid items={tiles} />
        </div>
      </section>

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

      <C2BidForm />
      <C2Faq heading={page.faqHeading} items={faqs.builders.items} />
      <C2FinalCta />
    </>
  );
}
