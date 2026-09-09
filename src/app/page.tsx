import type { Metadata } from "next";
import { home, site, services, builderServices, link } from "@/lib/content";
import { plumberJsonLd } from "@/lib/jsonld";
import { HomeHero } from "@/components/blocks/HomeHero";
import { AudienceProvider } from "@/components/blocks/AudienceContext";
import { SetsApart } from "@/components/blocks/SetsApart";
import { Neighbors } from "@/components/blocks/Neighbors";
import { TrustBar } from "@/components/blocks/TrustBar";
import { ServiceIllustration } from "@/components/blocks/ServiceIllustration";
import { MessageForm } from "@/components/blocks/MessageForm";
import { ClosingCTA } from "@/components/blocks/ClosingCTA";
import { JsonLd } from "@/components/blocks/JsonLd";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { CrewSketch } from "@/components/blocks/CrewSketch";

export const metadata: Metadata = {
  title: { absolute: home.meta.title },
  description: home.meta.description,
  alternates: { canonical: "/" },
  openGraph: { title: home.meta.title, description: home.meta.description, url: "/" },
};

function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-center text-[24px] font-bold tracking-[-0.01em] lg:text-left lg:text-h2 lg:font-bold">
      {children}
    </h2>
  );
}

export default function HomePage() {
  const popularHome = home.popularServices.homeowners;
  const popularBuilders = home.popularServices.builders;
  const popular = popularHome.slugs.map((slug) => services.find((s) => s.slug === slug)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const popularBuild = popularBuilders.slugs.map((slug) => builderServices.find((s) => s.slug === slug)).filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <JsonLd data={plumberJsonLd()} />
      <AudienceProvider>
      <HomeHero />
      <div className="hidden lg:block">
        <TrustBar />
      </div>

      {/* What sets us apart (follows the homeowner/builder toggle) */}
      <Section ariaLabelledby="apart-h" className="!pt-6 lg:!pt-16">
        <SetsApart />
      </Section>

      {/* What our neighbors / other contractors say (follows the toggle) */}
      <Section tone="sand" id="reviews" ariaLabelledby="neighbors-h">
        <Neighbors />
      </Section>
      </AudienceProvider>

      {/* Our most popular services (follows the toggle via body[data-audience]) */}
      <Section ariaLabelledby="popular-h">
        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-baseline lg:justify-between">
            <div>
              <H2 id="popular-h">
                <span className="builders:hidden">{popularHome.heading}</span>
                <span className="hidden builders:inline">{popularBuilders.heading}</span>
              </H2>
              {popularBuilders.line && <p className="mt-1 hidden text-[15px] text-ondark-muted builders:block">{popularBuilders.line}</p>}
            </div>
            <div className="hidden lg:block builders:hidden">
              <TextLink href="/services">See All Services</TextLink>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 builders:hidden lg:grid-cols-4 lg:gap-5">
            {popular.map((s) => (
              <div key={s.slug} className="flex flex-col items-center rounded-card border border-hairline bg-white p-4 text-center text-charcoal lg:p-5">
                <ServiceIllustration slug={s.slug} className="h-[150px] w-[150px] lg:h-[140px] lg:w-[140px]" />
                <div className="mt-2 text-[20px] font-bold">{s.name}</div>
                <div className="mt-1 text-[14px] text-slate">{s.short}</div>
                <Button href={`/services#${s.slug}`} variant="filled" size="sm" className="mt-4 w-full">
                  {s.name}
                </Button>
              </div>
            ))}
          </div>
          <div className="hidden grid-cols-2 gap-3 builders:grid lg:grid-cols-3 lg:gap-5">
            {popularBuild.map((s) => (
              <div key={s.slug} className="flex flex-col items-center rounded-card border border-hairline bg-white p-3 text-center text-charcoal lg:p-5">
                <ServiceIllustration slug={s.illustration} className="h-[110px] w-[110px] lg:h-[140px] lg:w-[140px]" />
                <div className="mt-2 text-[17px] font-bold leading-tight lg:text-[20px]">{s.name}</div>
                <div className="mt-1 text-[13px] leading-snug text-slate lg:text-[14px]">{s.short}</div>
              </div>
            ))}
          </div>
          <Button href="/services" variant="outlined" className="w-full builders:hidden lg:hidden">
            {popularHome.seeAll}
          </Button>
          <Button href={link("bid")} variant="filled" className="hidden w-full builders:inline-flex lg:w-auto lg:self-center">
            {popularBuilders.button}
          </Button>
        </div>
      </Section>

      {/* Why R.S. Johnson */}
      <Section tone="sand" ariaLabelledby="why-h">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-center lg:gap-14">
          <CrewSketch title={home.why.photo.alt} className="w-full rounded-card border border-hairline-strong builders:border-darkborder lg:order-last" />
          <div className="flex flex-col items-start gap-3 lg:gap-5">
            <H2 id="why-h">{home.why.heading}</H2>
            <p className="text-[16px] leading-[1.6] lg:text-body">{home.why.paragraph}</p>
            <Button href="/our-team" variant="outlined">
              {home.why.button}
            </Button>
          </div>
        </div>
      </Section>

      {/* Ready when you are: buttons and form */}
      <Section ariaLabelledby="ready-h">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_520px] lg:items-start lg:gap-16">
          <div className="flex flex-col gap-2.5 lg:gap-5">
            <h2 id="ready-h" className="hidden text-h2 font-bold lg:block">
              {home.ready.heading}
            </h2>
            <p className="hidden max-w-[480px] text-body lg:block">{home.ready.line}</p>
            <div className="hidden lg:flex lg:flex-row lg:gap-3">
              <Button href={link("book")} variant="filled" track="book-ready" className="h-[52px] w-full lg:w-auto">
                {home.hero.homeowners.primary}
              </Button>
              <Button href={site.phone.tel} variant="outlined" track="call-ready" className="h-[52px] w-full bg-white lg:w-auto">
                {home.hero.homeowners.secondary}
              </Button>
            </div>
          </div>
          <MessageForm />
        </div>
      </Section>

      <ClosingCTA secondary={{ label: site.closingCta.secondary, href: link("book") }} builders={{ heading: home.closingBuilders.heading, secondary: { label: home.closingBuilders.secondary, href: link("bid") } }} />
    </>
  );
}
