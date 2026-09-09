import type { Metadata } from "next";
import { servicesHub, services, site, link } from "@/lib/content";
import { plumberJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/blocks/JsonLd";
import { AnchorBar, type Anchor } from "@/components/blocks/AnchorBar";
import { ServiceBand } from "@/components/blocks/ServiceBand";
import { ServiceGrid, PageHeading } from "@/components/blocks/ServiceGrid";
import { ClosingCTA } from "@/components/blocks/ClosingCTA";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: { absolute: servicesHub.meta.title },
  description: servicesHub.meta.description,
  alternates: { canonical: "/services" },
  openGraph: { title: servicesHub.meta.title, description: servicesHub.meta.description, url: "/services" },
};

/**
 * Services hub: "What We Do". Shared by homeowners and builders. Opens on
 * the anchor bar, then the eight illustrated cards, then one band per
 * service. Audience-specific material (signs, why us, FAQ, reviews) lives on
 * /for-homeowners and /for-builders.
 */
export default function ServicesPage() {
  return (
    <>
      <JsonLd data={plumberJsonLd()} />
      <h1 className="sr-only">{servicesHub.seoHeading}</h1>

      <AnchorBar anchors={servicesHub.anchors as Anchor[]} />

      <Section id="services" ariaLabelledby="hub-services-h" className="scroll-mt-[140px]">
        <PageHeading id="hub-services-h" title={servicesHub.heading} line={servicesHub.line} />
        <ServiceGrid hrefFor={(slug) => `#${slug}`} />
      </Section>

      {services.map((s, i) => (
        <ServiceBand key={s.slug} service={s} photoLeft={i % 2 === 0} />
      ))}

      <ClosingCTA heading={servicesHub.closing.heading} secondary={{ label: site.closingCta.secondary, href: link("book") }} />
    </>
  );
}
