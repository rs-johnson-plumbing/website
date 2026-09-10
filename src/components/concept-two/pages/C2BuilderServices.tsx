"use client";

import { conceptTwo as copy, builderServices, site } from "@/lib/content";
import { C2PageHero } from "../sections/C2PageHero";
import { C2FinalCta } from "../sections/C2FinalCta";
import { C2Button } from "../ui/C2Button";
import { C2Drawing } from "../ui/C2Drawing";
import { C2Icon } from "../ui/C2Icon";
import { drawingFor, c2Label } from "../ui/drawingFor";

export function C2BuilderServices() {
  const page = copy.builders;
  return (
    <>
      <C2PageHero
        tone="navy"
        eyebrow={page.hero.eyebrow}
        headingLines={[page.services.heading]}
        lead={page.services.line}
        slot="builderFraming"
        actions={
          <>
            <C2Button href="/for-builders#request-a-bid" variant="on-dark">
              {copy.ui.requestBid}
            </C2Button>
            <C2Button href={site.phone.tel} variant="on-dark" icon="phone" trailingIcon={null} data-track="call-hero">
              {copy.ui.callNumber}
            </C2Button>
          </>
        }
      />

      <section className="c2-section c2-section--paper" aria-labelledby="c2-stages">
        <div className="c2-wrap">
          <h2 id="c2-stages" className="sr-only">
            {page.services.heading}
          </h2>
          <ul className="c2-stage-list">
            {builderServices.map((service) => (
              <li key={service.slug} id={service.slug} className="c2-stage">
                <C2Drawing id={drawingFor(service.slug)} />
                <div>
                  <h3 className="c2-h3">{c2Label(service.slug, service.name)}</h3>
                  <p>{service.hub.paragraph}</p>
                  <ul>
                    {service.hub.whatWeDo.map((item) => (
                      <li key={item}>
                        <C2Icon name="check" size={16} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <C2FinalCta />
    </>
  );
}
