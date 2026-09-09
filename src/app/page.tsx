import type { Metadata } from "next";
import { type IconName, home, site, builderServices, link } from "@/lib/content";
import { plumberJsonLd } from "@/lib/jsonld";
import { HomeHero } from "@/components/blocks/HomeHero";
import { AudienceProvider } from "@/components/blocks/AudienceContext";
import { SetsApart } from "@/components/blocks/SetsApart";
import { Neighbors } from "@/components/blocks/Neighbors";
import { TeamStrip } from "@/components/blocks/TeamStrip";
import { ServiceGrid } from "@/components/blocks/ServiceGrid";
import { ServiceIllustration } from "@/components/blocks/ServiceIllustration";
import { MessageForm } from "@/components/blocks/MessageForm";
import { IconTile } from "@/components/ui/Icon";
import { ClosingCTA } from "@/components/blocks/ClosingCTA";
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

type ContactDetail = { icon: IconName; label: string; value: string; href?: string };

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
  const popularBuild = popularBuilders.slugs.map((slug) => builderServices.find((s) => s.slug === slug)).filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <JsonLd data={plumberJsonLd()} />
      <AudienceProvider>
        <HomeHero />

        {/* 1. Why homeowners trust us / Why trust us (follows the toggle) */}
        <Section tone="sand" ariaLabelledby="apart-h">
          <SetsApart />
        </Section>

        {/* 2. What we do: four popular homeowner services, or the six builder stages */}
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
              <ServiceGrid hrefFor={(slug) => `/services#${slug}`} slugs={popularHome.slugs} />
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

        {/* 3. Meet the team */}
        <Section tone="sand" ariaLabelledby="team-h">
          <TeamStrip id="team-h" heading={home.team.heading} />
        </Section>

        {/* 4. What your neighbors / other contractors are saying (follows the toggle) */}
        <Section id="reviews" ariaLabelledby="neighbors-h">
          <Neighbors />
        </Section>

        {/* 5. Contact us: heading, one line, the three facts, and the form */}
        <Section tone="sand" id="contact" ariaLabelledby="contact-h">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_520px] lg:items-start lg:gap-16">
            <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
              <div className="flex flex-col gap-2">
                <H2 id="contact-h">{home.ready.heading}</H2>
                {home.ready.line && <p className="text-[15px] text-slate builders:text-ondark-muted lg:max-w-[440px] lg:text-body">{home.ready.line}</p>}
              </div>
              <ul className="flex w-full max-w-[440px] flex-col gap-3 text-left">
                {(home.ready.details as ContactDetail[]).map((d) => (
                  <li key={d.label} className="flex items-center gap-3.5">
                    <IconTile name={d.icon} size={44} />
                    <div className="flex flex-col leading-tight">
                      <span className="text-[12px] font-semibold text-slate builders:text-ondark-muted">{d.label}</span>
                      {d.href ? (
                        <a href={d.href} data-track="call-contact" className="text-[18px] font-bold text-charcoal hover:no-underline builders:text-offwhite">
                          {d.value}
                        </a>
                      ) : (
                        <span className="text-[17px] font-bold text-charcoal builders:text-offwhite">{d.value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <MessageForm heading={false} />
          </div>
        </Section>
      </AudienceProvider>

      <ClosingCTA secondary={{ label: site.closingCta.secondary, href: link("book") }} builders={{ heading: home.closingBuilders.heading, secondary: { label: home.closingBuilders.secondary, href: link("bid") } }} />
    </>
  );
}
