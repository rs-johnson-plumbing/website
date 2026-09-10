"use client";

import { conceptTwo as copy, services, site } from "@/lib/content";
import { C2PageHero } from "../sections/C2PageHero";
import { C2ServiceGrid } from "../sections/C2ServiceGrid";
import { C2Split } from "../sections/C2Split";
import { C2FinalCta } from "../sections/C2FinalCta";
import { C2Button } from "../ui/C2Button";
import { useRequestService } from "../ui/C2Request";
import { drawingFor, c2Label } from "../ui/drawingFor";

const tiles = services.map((service) => ({
  id: drawingFor(service.slug),
  label: c2Label(service.slug, service.name),
  href: `/services/${service.slug}`,
}));

export function C2Services() {
  const page = copy.services;
  const requestService = useRequestService();

  return (
    <>
      <C2PageHero
        eyebrow={page.hero.eyebrow}
        headingLines={page.hero.headingLines}
        lead={page.hero.lead}
        slot="servicesHero"
        actions={
          <>
            <C2Button onClick={requestService}>{copy.ui.requestService}</C2Button>
            <C2Button href={site.phone.tel} variant="outline" icon="phone" trailingIcon={null} data-track="call-hero">
              {copy.ui.callNumber}
            </C2Button>
          </>
        }
      />

      <section className="c2-section c2-section--paper" aria-labelledby="c2-services-home">
        <div className="c2-wrap">
          <h2 id="c2-services-home" className="c2-h2 c2-section-head">
            {page.homeownersHeading}
          </h2>
          <C2ServiceGrid items={tiles} columns={4} />
        </div>
      </section>

      <section className="c2-section c2-section--tight c2-section--navy" aria-labelledby="c2-help-now">
        <div className="c2-wrap c2-help-now">
          <div>
            <h2 id="c2-help-now" className="c2-h2">
              {page.helpNow.heading}
            </h2>
            <p>{page.helpNow.line}</p>
          </div>
          <div className="c2-help-now-actions">
            <C2Button href={site.phone.tel} variant="on-dark" icon="phone" trailingIcon={null} data-track="call-help">
              {copy.ui.call}
            </C2Button>
            <C2Button onClick={requestService} variant="on-dark" icon="calendar" trailingIcon={null}>
              {page.helpNow.cta}
            </C2Button>
          </div>
        </div>
      </section>

      <C2Split
        id="for-builders"
        slot="builderFraming"
        flip
        eyebrow={page.buildersSplit.eyebrow}
        heading={page.buildersSplit.heading}
        line={page.buildersSplit.line}
        ctaLabel={page.buildersSplit.cta}
        ctaHref="/services/builders"
      />

      <C2FinalCta />
    </>
  );
}
