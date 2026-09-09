import type { Metadata } from "next";
import { builders, faqs } from "@/lib/content";
import { plumberJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/blocks/JsonLd";
import { AnchorBar, type Anchor } from "@/components/blocks/AnchorBar";
import { AudienceProvider } from "@/components/blocks/AudienceContext";
import { SetsApart } from "@/components/blocks/SetsApart";
import { BuilderServiceGrid } from "@/components/blocks/BuilderServiceGrid";
import { BidRequest } from "@/components/blocks/BidRequest";
import { TeamStrip } from "@/components/blocks/TeamStrip";
import { Neighbors } from "@/components/blocks/Neighbors";
import { FAQ } from "@/components/blocks/FAQ";
import { ContactBlock } from "@/components/blocks/ContactBlock";
import { IntakeBanner } from "@/components/blocks/IntakeBanner";
import { Section, SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { pageH2 } from "@/styles/headings";

export const metadata: Metadata = {
  title: { absolute: builders.meta.title },
  description: builders.meta.description,
  alternates: { canonical: "/for-builders" },
  openGraph: { title: builders.meta.title, description: builders.meta.description, url: "/for-builders" },
};

const H = pageH2;

/**
 * For Builders: the contractor door, the whole page in the dark builders
 * mode. The audience provider mounts locked on builders, which sets
 * data-audience on the body so the header, anchor bar, sections, sticky bar,
 * and closing strip all flip. In order: why builders trust us, what we do
 * for builders (the six stages), meet the team, what other contractors are
 * saying, FAQ, contact us, then the bid request banner.
 */
export default function ForBuildersPage() {
  return (
    <AudienceProvider initial="builders" locked>
      {/* Paint the dark mode before hydration so the page never flashes light. */}
      <script dangerouslySetInnerHTML={{ __html: 'document.body.dataset.audience="builders";' }} />
      <JsonLd data={plumberJsonLd()} />
      <h1 className="sr-only">{builders.seoHeading}</h1>

      <AnchorBar anchors={builders.anchors as Anchor[]} />

      {/* 1. Why builders trust us */}
      <Section id="apart" pad="band" ariaLabelledby="apart-h" className="scroll-mt-[140px]">
        <SetsApart heading={builders.apart.heading} headingClassName={H} />
      </Section>

      {/* 2. What we do for builders: the six stages, then the bid button */}
      <Section id="services" tone="sand" pad="band" ariaLabelledby="b-services-h" className="scroll-mt-[140px]">
        <SectionHeading id="b-services-h" title={builders.services.heading} line={builders.services.line} titleClassName={H} />
        <BuilderServiceGrid hrefFor={(slug) => `/services/builders#${slug}`} />
        <div className="mt-8 flex justify-center lg:mt-10">
          <BidRequest className="w-full lg:w-auto" />
        </div>
      </Section>

      {/* 3. Meet the team */}
      <Section id="team" pad="band" ariaLabelledby="b-team-h" className="scroll-mt-[140px]">
        <TeamStrip id="b-team-h" heading={builders.team.heading} titleClassName={H} />
      </Section>

      {/* 4. What other contractors are saying */}
      <Section id="reviews" tone="sand" pad="band" ariaLabelledby="neighbors-h" className="scroll-mt-[140px]">
        <Neighbors headingClassName={H} />
      </Section>

      {/* 5. Builder FAQ */}
      <Section id="faq" pad="band" ariaLabelledby="b-faq-h" className="scroll-mt-[140px]">
        <h2 id="b-faq-h" className={cn("mb-8 lg:mb-10", H)}>
          {faqs.builders.heading}
        </h2>
        <FAQ items={faqs.builders.items} />
      </Section>

      {/* 6. Contact us */}
      <Section id="contact" tone="sand" pad="band" ariaLabelledby="contact-h" className="scroll-mt-[140px]">
        <ContactBlock headingClassName={H} />
      </Section>

      <IntakeBanner audience="builders" id="request-a-bid" />
    </AudienceProvider>
  );
}
