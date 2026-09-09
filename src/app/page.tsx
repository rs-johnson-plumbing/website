import type { Metadata } from "next";
import { home, site, services, reviews, link } from "@/lib/content";
import { plumberJsonLd } from "@/lib/jsonld";
import { HomeHero } from "@/components/blocks/HomeHero";
import { AudienceProvider } from "@/components/blocks/AudienceContext";
import { SetsApart } from "@/components/blocks/SetsApart";
import { TrustBar } from "@/components/blocks/TrustBar";
import { ServiceIllustration } from "@/components/blocks/ServiceIllustration";
import { ReviewCard } from "@/components/blocks/ReviewCard";
import { MessageForm } from "@/components/blocks/MessageForm";
import { ClosingCTA } from "@/components/blocks/ClosingCTA";
import { JsonLd } from "@/components/blocks/JsonLd";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { Icon } from "@/components/ui/Icon";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

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
  const popular = home.popularServices.slugs.map((slug) => services.find((s) => s.slug === slug)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const moreReviews = home.neighbors.reviewIds.map((id) => reviews.items.find((r) => r.id === id)).filter((r): r is NonNullable<typeof r> => Boolean(r));

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
      </AudienceProvider>

      {/* What our neighbors say */}
      <Section tone="sand" id="reviews" ariaLabelledby="neighbors-h">
        <div className="flex flex-col gap-3 lg:gap-5">
          <H2 id="neighbors-h">{home.neighbors.heading}</H2>
          <div className="flex items-center justify-center gap-2 text-[13px] font-semibold text-slate lg:justify-start">
            <Icon name="star" size={14} filled className="text-blue" />
            {home.neighbors.proofLine}
          </div>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-5">
            <figure className="m-0 rounded-card border border-hairline border-l-4 border-l-blue bg-white p-5">
              <blockquote className="m-0 text-[20px] font-bold leading-[1.3] tracking-[-0.01em]">“{home.neighbors.lead.quote}”</blockquote>
              <figcaption className="mt-1.5 text-[13px] text-slate">{home.neighbors.lead.attribution}</figcaption>
            </figure>
            {moreReviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
          <div className="text-center lg:text-left">
            <TextLink href="/reviews">{home.neighbors.link}</TextLink>
          </div>
        </div>
      </Section>

      {/* Our most popular services */}
      <Section ariaLabelledby="popular-h">
        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-baseline lg:justify-between">
            <H2 id="popular-h">{home.popularServices.heading}</H2>
            <div className="hidden lg:block">
              <TextLink href="/plumbing">See all services</TextLink>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-4 lg:gap-5">
            {popular.map((s) => (
              <div key={s.slug} className="flex flex-col items-center rounded-card border border-hairline bg-white p-4 text-center lg:p-5">
                <ServiceIllustration slug={s.slug} className="h-[150px] w-[150px] lg:h-[140px] lg:w-[140px]" />
                <div className="mt-2 text-[20px] font-bold">{s.name}</div>
                <div className="mt-1 text-[14px] text-slate">{s.short}</div>
                <Button href={`/plumbing/${s.slug}`} variant="filled" size="sm" className="mt-4 w-full">
                  {s.name}
                </Button>
              </div>
            ))}
          </div>
          <Button href="/plumbing" variant="outlined" className="w-full lg:hidden">
            {home.popularServices.seeAll}
          </Button>
        </div>
      </Section>

      {/* Why R.S. Johnson */}
      <Section tone="sand" ariaLabelledby="why-h">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-center lg:gap-14">
          <PhotoPlaceholder photo={home.why.photo} aspect="16/10" className="lg:order-last" />
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

      <ClosingCTA secondary={{ label: site.closingCta.secondary, href: link("book") }} />
    </>
  );
}
