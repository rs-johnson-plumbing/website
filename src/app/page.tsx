import type { Metadata } from "next";
import { home, link } from "@/lib/content";
import { plumberJsonLd } from "@/lib/jsonld";
import { HomeHero } from "@/components/blocks/HomeHero";
import { AudienceProvider } from "@/components/blocks/AudienceContext";
import { SetsApart } from "@/components/blocks/SetsApart";
import { Neighbors } from "@/components/blocks/Neighbors";
import { TeamStrip } from "@/components/blocks/TeamStrip";
import { ServiceGrid } from "@/components/blocks/ServiceGrid";
import { ContactBlock } from "@/components/blocks/ContactBlock";
import { BuilderServiceGrid } from "@/components/blocks/BuilderServiceGrid";
import { IntakeBanner } from "@/components/blocks/IntakeBanner";
import { JsonLd } from "@/components/blocks/JsonLd";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: { absolute: home.meta.title },
  description: home.meta.description,
  alternates: { canonical: "/" },
  openGraph: { title: home.meta.title, description: home.meta.description, url: "/" },
};

function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-center text-h2-m tracking-[-0.01em] lg:text-left lg:text-h2">
      {children}
    </h2>
  );
}

export default function HomePage() {
  const popularHome = home.popularServices.homeowners;
  const popularBuilders = home.popularServices.builders;

  return (
    <>
      <JsonLd data={plumberJsonLd()} />
      <AudienceProvider>
        <HomeHero />

        {/* 1. Why homeowners trust us / Why trust us (follows the toggle) */}
        <Section tone="sand" ariaLabelledby="apart-h">
          <SetsApart />
        </Section>

        {/* 2. What we do: six homeowner services as a list on phones and tiles on desktop, or the six builder stages in builders mode */}
        <Section ariaLabelledby="popular-h">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-baseline lg:justify-between">
              <div>
                <H2 id="popular-h">
                  <span className="builders:hidden">{popularHome.heading}</span>
                  <span className="hidden builders:inline">{popularBuilders.heading}</span>
                </H2>
                {popularBuilders.line && <p className="mt-1 hidden text-center text-[15px] text-ondark-muted builders:block lg:text-left">{popularBuilders.line}</p>}
              </div>
              <div className="hidden lg:block builders:hidden">
                <TextLink href="/services">{popularHome.seeAll}</TextLink>
              </div>
            </div>
            <div className="builders:hidden">
              <ServiceGrid hrefFor={(slug) => `/services#${slug}`} slugs={popularHome.slugs} phoneList />
            </div>
            <div className="hidden builders:block">
              <BuilderServiceGrid slugs={popularBuilders.slugs} />
            </div>
            <Button href="/services" variant="outlined" className="w-full builders:hidden lg:hidden">
              {popularHome.seeAll}
            </Button>
            <Button href={link("bid")} variant="filled" className="hidden w-full builders:inline-flex lg:w-auto lg:self-center">
              {popularBuilders.button}
            </Button>
          </div>
        </Section>

        {/* 3. Meet the team */}
        <Section tone="sand" ariaLabelledby="team-h">
          <TeamStrip id="team-h" heading={home.team.heading} />
        </Section>

        {/* 4. What your neighbors / other contractors are saying (follows the toggle) */}
        <Section id="reviews" ariaLabelledby="neighbors-h">
          <Neighbors />
        </Section>

        {/* 5. Contact us */}
        <Section tone="sand" id="contact" ariaLabelledby="contact-h">
          <ContactBlock />
        </Section>
      </AudienceProvider>

      {/* Bottom banner: this page serves both doors, so both intake buttons */}
      <IntakeBanner audience="both" />
    </>
  );
}
