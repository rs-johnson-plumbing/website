"use client";

import { conceptTwo as copy, faqs, site, services } from "@/lib/content";
import { C2PageHero } from "../sections/C2PageHero";
import { C2TrustStrip } from "../sections/C2TrustStrip";
import { C2ServiceGrid } from "../sections/C2ServiceGrid";
import { C2Split } from "../sections/C2Split";
import { C2Points } from "../sections/C2Points";
import { C2Reviews } from "../sections/C2Reviews";
import { C2Faq } from "../sections/C2Faq";
import { C2FinalCta } from "../sections/C2FinalCta";
import { C2Button } from "../ui/C2Button";
import { useRequestService } from "../ui/C2Request";
import { drawingFor, c2Label } from "../ui/drawingFor";

const tiles = services
  .filter((service) => service.slug !== "emergency-plumbing")
  .slice(0, 6)
  .map((service) => ({ id: drawingFor(service.slug), label: c2Label(service.slug, service.name), href: `/services/${service.slug}` }));

export function C2Homeowners() {
  const page = copy.homeowners;
  const requestService = useRequestService();

  return (
    <>
      <C2PageHero
        eyebrow={page.hero.eyebrow}
        headingLines={page.hero.headingLines}
        lead={page.hero.lead}
        slot="homeownerHero"
        actions={
          <>
            <C2Button onClick={requestService} trailingIcon="arrow-right">
              {page.hero.primary.label}
            </C2Button>
            <C2Button href={site.phone.tel} variant="outline" icon="phone" trailingIcon={null} data-track="call-hero">
              {page.hero.secondary.label}
            </C2Button>
          </>
        }
      />
      <C2TrustStrip items={page.trust} />

      <section id="services" className="c2-section c2-section--paper" aria-labelledby="c2-home-services">
        <div className="c2-wrap">
          <div className="c2-section-head c2-section-head--split">
            <div>
              <h2 id="c2-home-services" className="c2-h2">
                {page.services.heading}
              </h2>
              <p>{page.services.line}</p>
            </div>
            <C2Button href="/services" variant="outline" size="sm">
              {page.services.seeAll}
            </C2Button>
          </div>
          <C2ServiceGrid items={tiles} />
        </div>
      </section>

      <C2Split
        id="remodels"
        slot="bathRemodel"
        eyebrow={page.remodel.eyebrow}
        heading={page.remodel.heading}
        line={page.remodel.line}
        ctaLabel={page.remodel.cta.label}
        onCta={requestService}
      />

      <C2Points id="why-us" heading={page.why.heading} items={page.why.items} />
      <C2Reviews heading={page.reviews.heading} />
      <C2Faq heading={page.faq.heading} items={faqs.homeowners.items} />
      <C2FinalCta />
    </>
  );
}
