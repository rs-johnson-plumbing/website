"use client";

import Link from "next/link";
import { conceptTwo as copy, faqs, services, site, type Service } from "@/lib/content";
import { C2PageHero } from "../sections/C2PageHero";
import { C2ServiceGrid } from "../sections/C2ServiceGrid";
import { C2Faq } from "../sections/C2Faq";
import { C2FinalCta } from "../sections/C2FinalCta";
import { C2Button } from "../ui/C2Button";
import { C2Icon } from "../ui/C2Icon";
import { useRequestService } from "../ui/C2Request";
import { drawingFor, c2Label } from "../ui/drawingFor";

/** A field that is still only a bracketed placeholder does not render. */
function pending(text: string): boolean {
  return /^\[[^\]]*\]$/.test(text.trim());
}

export function C2ServiceDetail({ service }: { service: Service }) {
  const detail = copy.services.detail;
  const requestService = useRequestService();
  const others = services
    .filter((other) => other.slug !== service.slug)
    .map((other) => ({ id: drawingFor(other.slug), label: c2Label(other.slug, other.name), href: `/services/${other.slug}` }));

  return (
    <>
      <C2PageHero
        eyebrow={copy.services.hero.eyebrow}
        headingLines={[c2Label(service.slug, service.name)]}
        lead={service.hubShort}
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

      <section className="c2-section c2-section--paper" aria-labelledby="c2-detail-heading">
        <div className="c2-wrap c2-detail">
          <div>
            <h2 id="c2-detail-heading" className="c2-h2">
              {detail.introHeading}
            </h2>
            <p className="c2-detail-intro">{service.intro}</p>
            {service.hub.whatWeDo.length > 0 && (
              <ul className="c2-detail-list">
                {service.hub.whatWeDo.map((item) => (
                  <li key={item}>
                    <C2Icon name="check" size={17} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            {!pending(service.whatToExpect) && (
              <>
                <h3 className="c2-h3">{detail.expectHeading}</h3>
                <p className="c2-detail-intro">{service.whatToExpect}</p>
              </>
            )}
          </div>
          <div className="c2-detail-card">
            <h3 className="c2-h3">{detail.problemsHeading}</h3>
            <ul>
              {service.problems.map((problem) => (
                <li key={problem}>
                  <C2Icon name="check" size={17} />
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
            <C2Button onClick={requestService} block>
              {copy.ui.requestService}
            </C2Button>
          </div>
        </div>
      </section>

      <section className="c2-section c2-section--sand" aria-labelledby="c2-other-services">
        <div className="c2-wrap">
          <div className="c2-section-head c2-section-head--split">
            <h2 id="c2-other-services" className="c2-h2">
              {detail.otherHeading}
            </h2>
            <Link href="/services" className="c2-textlink">
              {detail.back}
              <C2Icon name="arrow-right" size={17} />
            </Link>
          </div>
          <C2ServiceGrid items={others} columns={4} />
        </div>
      </section>

      <C2Faq heading={detail.faqHeading} items={faqs.service.items} />
      <C2FinalCta />
    </>
  );
}
