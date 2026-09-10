import type { Metadata } from "next";
import { servicesHub, builderServices } from "@/lib/content";
import { plumberJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/blocks/JsonLd";
import { AudienceProvider } from "@/components/blocks/AudienceContext";
import { AudienceTabs, type AudienceTab } from "@/components/blocks/AudienceTabs";
import { BuilderBand } from "@/components/blocks/ServiceBand";
import { BuilderServiceGrid } from "@/components/blocks/BuilderServiceGrid";
import { PageHeading } from "@/components/blocks/ServiceGrid";
import { IntakeBanner } from "@/components/blocks/IntakeBanner";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = pageMetadata({ ...servicesHub.buildersMeta, path: "/services/builders" });

/**
 * Builder services: the tabs, the six stage cards on cream, then one band
 * per stage with a big scene, every other band deep teal, then the bid
 * request banner.
 */
export default function BuilderServicesPage() {
  return (
    <AudienceProvider initial="builders" locked>
      <script dangerouslySetInnerHTML={{ __html: 'document.body.dataset.audience="builders";' }} />
      <JsonLd data={plumberJsonLd()} />
      <h1 className="sr-only">{servicesHub.buildersSeoHeading}</h1>

      <AudienceTabs tabs={servicesHub.tabs as AudienceTab[]} current="/services/builders" />

      <Section id="builder-services" ariaLabelledby="hub-build-h" className="scroll-mt-[140px]">
        <PageHeading id="hub-build-h" title={servicesHub.builders.heading} line={servicesHub.builders.line} align="left" />
        <BuilderServiceGrid hrefFor={(slug) => `#${slug}`} />
      </Section>

      {builderServices.map((s, i) => (
        <BuilderBand key={s.slug} stage={s} photoLeft={i % 2 === 0} dark={i % 2 === 0} />
      ))}

      <IntakeBanner audience="builders" />
    </AudienceProvider>
  );
}
