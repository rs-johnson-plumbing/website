import type { Metadata } from "next";
import { servicesHub, services } from "@/lib/content";
import { plumberJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/blocks/JsonLd";
import { AudienceTabs, type AudienceTab } from "@/components/blocks/AudienceTabs";
import { ServiceBand } from "@/components/blocks/ServiceBand";
import { ServiceGrid, PageHeading } from "@/components/blocks/ServiceGrid";
import { IntakeBanner } from "@/components/blocks/IntakeBanner";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: { absolute: servicesHub.meta.title },
  description: servicesHub.meta.description,
  alternates: { canonical: "/services" },
  openGraph: { title: servicesHub.meta.title, description: servicesHub.meta.description, url: "/services" },
};

/**
 * Homeowner services: the tabs (this page and /services/builders), the
 * eight illustrated cards, one band per service, then the service request
 * banner. Audience-specific material (signs, why us, FAQ, reviews) lives on
 * /for-homeowners.
 */
export default function ServicesPage() {
  return (
    <>
      <JsonLd data={plumberJsonLd()} />
      <h1 className="sr-only">{servicesHub.seoHeading}</h1>

      <AudienceTabs tabs={servicesHub.tabs as AudienceTab[]} current="/services" />

      <Section id="homeowner-services" ariaLabelledby="hub-home-h" className="scroll-mt-[140px]">
        <PageHeading id="hub-home-h" title={servicesHub.homeowners.heading} line={servicesHub.homeowners.line} align="left" />
        <ServiceGrid hrefFor={(slug) => `#${slug}`} />
      </Section>

      {services.map((s, i) => (
        <ServiceBand key={s.slug} service={s} photoLeft={i % 2 === 0} />
      ))}

      <IntakeBanner audience="homeowners" />
    </>
  );
}
