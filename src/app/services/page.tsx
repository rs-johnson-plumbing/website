import type { Metadata } from "next";
import { servicesHub, services } from "@/lib/content";
import { plumberJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/blocks/JsonLd";
import { AnchorBar, type Anchor } from "@/components/blocks/AnchorBar";
import { ServiceBand } from "@/components/blocks/ServiceBand";
import { ServiceGrid, PageHeading } from "@/components/blocks/ServiceGrid";
import { BuilderServiceGrid } from "@/components/blocks/BuilderServiceGrid";
import { BuilderStageList } from "@/components/blocks/BuilderStageList";
import { BidRequest } from "@/components/blocks/BidRequest";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: { absolute: servicesHub.meta.title },
  description: servicesHub.meta.description,
  alternates: { canonical: "/services" },
  openGraph: { title: servicesHub.meta.title, description: servicesHub.meta.description, url: "/services" },
};

/**
 * Services hub: "What We Do", in two groups. Homeowner Services: the eight
 * illustrated cards, then one band per service. Builder Services, on the
 * dark builders ground: the six stage cards, the stage detail rows, and the
 * bid button. No closing strip here; the builder group ends on the bid
 * button. Audience-specific material (signs, why us, FAQ, reviews) lives on
 * /for-homeowners and /for-builders.
 */
export default function ServicesPage() {
  return (
    <>
      <JsonLd data={plumberJsonLd()} />
      <h1 className="sr-only">{servicesHub.seoHeading}</h1>

      <AnchorBar anchors={servicesHub.anchors as Anchor[]} spread={false} />

      {/* Homeowner services: cards, then the bands */}
      <Section id="homeowner-services" ariaLabelledby="hub-home-h" className="scroll-mt-[140px]">
        <PageHeading id="hub-home-h" title={servicesHub.homeowners.heading} line={servicesHub.homeowners.line} align="left" />
        <ServiceGrid hrefFor={(slug) => `#${slug}`} />
      </Section>

      {services.map((s, i) => (
        <ServiceBand key={s.slug} service={s} photoLeft={i % 2 === 0} />
      ))}

      {/* Builder services: the dark group, cards then stage detail */}
      <Section id="builder-services" tone="charcoal" ariaLabelledby="hub-build-h" className="scroll-mt-[140px]">
        <PageHeading id="hub-build-h" title={servicesHub.builders.heading} line={servicesHub.builders.line} align="left" dark />
        <BuilderServiceGrid hrefFor={(slug) => `#${slug}`} />
        <div className="mt-8 lg:mt-12">
          <BuilderStageList />
        </div>
        <div className="mt-8 flex justify-center lg:mt-10">
          <BidRequest className="w-full lg:w-auto" />
        </div>
      </Section>

    </>
  );
}
