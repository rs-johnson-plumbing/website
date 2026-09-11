"use client";

import { useCallback, useState } from "react";
import { conceptTwo as copy, services as serviceContent } from "@/lib/content";
import { C2Hero } from "../sections/C2Hero";
import { C2ServiceGrid, type ServiceTile } from "../sections/C2ServiceGrid";
import { C2BuilderBand } from "../sections/C2BuilderBand";
import { C2Apart } from "../sections/C2Apart";
import { C2Split } from "../sections/C2Split";
import { C2Reviews } from "../sections/C2Reviews";
import { C2FinalCta } from "../sections/C2FinalCta";
import { C2Button } from "../ui/C2Button";

import { C2ServiceDetails, type ServiceDetailsContent } from "../ui/C2ServiceDetails";
import { useRequestService } from "../ui/C2Request";

const additionalDetails: Record<string, ServiceDetailsContent> = {
  remodels: {
    slug: "remodels", name: "Remodels", short: "Plumbing for kitchen and bathroom updates",
    hub: { whatWeDo: ["Kitchen and bath faucet replacement", "Toilet replacement", "Shower valve and fixture installation", "Supply and drain line work"] },
    problems: ["Replacing older fixtures", "Updating a kitchen or bathroom", "Moving plumbing connections"]
  },
  other: {
    slug: "other-plumbing", name: "Other Plumbing", short: "Help with the plumbing needs around your home",
    hub: { whatWeDo: ["Water softeners and filtration", "Gas lines and appliance hookups", "Sump pumps and backup systems", "Help identifying the right plumbing service"] },
    problems: ["Hard water or scale on fixtures", "Sump pump problems", "A new appliance needs a hookup", "Not sure where to start"]
  }
};

export function C2Home() {
  const [selected, setSelected] = useState<ServiceDetailsContent | null>(null);
  const closeDetails = useCallback(() => setSelected(null), []);
  const request = useRequestService();
  const selectService = (item: ServiceTile) => {
    const service = additionalDetails[item.id] ?? serviceContent.find(s => item.href === `/services/${s.slug}`);
    if (service) setSelected(service);
  };
  const services = copy.home.services;
  return (
    <div className="c2-home">
      <C2Hero />

      <section className="c2-section c2-section--sand" aria-labelledby="c2-services-heading">
        <div className="c2-wrap">
          <h2 id="c2-services-heading" className="c2-h2 c2-center">
            {services.heading}
          </h2>
          <div className="c2-service-block">
            <C2ServiceGrid items={services.items} onSelect={selectService} />
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
        ctaLabel={copy.home.remodel.cta.label}
        ctaHref={copy.home.remodel.cta.href}
      />

      <C2Reviews heading={copy.home.reviews.heading} showProof={false} />
      {selected && <C2ServiceDetails service={selected} onClose={closeDetails} onRequest={() => { setSelected(null); request(); }} />}
      <C2FinalCta />
    </div>
  );
}
