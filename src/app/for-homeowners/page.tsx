import type { Metadata } from "next";
import Link from "next/link";
import { homeowners, faqs, reviews, site, link, type IconName } from "@/lib/content";
import { plumberJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/blocks/JsonLd";
import { AnchorBar, type Anchor } from "@/components/blocks/AnchorBar";
import { ServiceGrid, PageHeading } from "@/components/blocks/ServiceGrid";
import { ReviewCard } from "@/components/blocks/ReviewCard";
import { SetsApart } from "@/components/blocks/SetsApart";
import { TeamStrip } from "@/components/blocks/TeamStrip";
import { FAQ } from "@/components/blocks/FAQ";
import { ClosingCTA } from "@/components/blocks/ClosingCTA";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { IconTile } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: { absolute: homeowners.meta.title },
  description: homeowners.meta.description,
  alternates: { canonical: "/for-homeowners" },
  openGraph: { title: homeowners.meta.title, description: homeowners.meta.description, url: "/for-homeowners" },
};

type Sign = { icon: IconName; title: string; text: string; service: string; link: string };

/**
 * For Homeowners: the homeowner door. In order: what sets us apart, what we do for homeowners
 * (cards point at the hub), why homeowners call us, meet the team, what
 * neighbors are saying, signs you need a plumber, FAQ. Service detail lives
 * on /services.
 */
export default function ForHomeownersPage() {
  const signs = homeowners.signs.items as Sign[];
  const neighborReviews = homeowners.neighbors.reviewIds.map((id) => reviews.items.find((r) => r.id === id)).filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <>
      <JsonLd data={plumberJsonLd()} />
      <h1 className="sr-only">{homeowners.seoHeading}</h1>

      <AnchorBar anchors={homeowners.anchors as Anchor[]} />

      {/* Here's what sets us apart (homeowner set; no toggle on this page) */}
      <Section id="apart" ariaLabelledby="apart-h" className="scroll-mt-[140px]">
        <SetsApart heading={homeowners.apart.heading} />
      </Section>

      {/* What we do for homeowners */}
      <Section id="services" ariaLabelledby="ho-services-h" className="scroll-mt-[140px]">
        <PageHeading id="ho-services-h" title={homeowners.residential.heading} line={homeowners.residential.line} />
        <ServiceGrid hrefFor={(slug) => `/services#${slug}`} />
        <div className="mt-6 flex justify-center lg:mt-8">
          <Button href="/services" variant="outlined" className="w-full lg:w-auto">
            {homeowners.residential.seeAll}
          </Button>
        </div>
      </Section>

      {/* Why us: the one dark band on the page, numbered */}
      <Section id="why-us" tone="charcoal" ariaLabelledby="why-h" className="scroll-mt-[140px]">
        <h2 id="why-h" className="mb-8 text-h2-m text-offwhite lg:mb-10 lg:text-h2">
          {homeowners.whyUs.heading}
        </h2>
        <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-10">
          {homeowners.whyUs.items.map((item, i) => (
            <li key={item.title} className="flex gap-4">
              <span aria-hidden="true" className="w-9 shrink-0 text-[32px] font-bold leading-none text-blue-ondark lg:text-[36px]">
                {i + 1}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[18px] font-bold leading-tight text-offwhite lg:text-[20px]">{item.title}</h3>
                <p className="text-[15px] leading-[1.65] text-ondark-muted lg:text-[16px]">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-6 lg:mt-10">
          {homeowners.whyUs.links.map((l) => (
            <Link key={l.href} href={l.href} className="text-[16px] font-bold text-blue-ondark hover:underline">
              {l.label}
            </Link>
          ))}
        </div>
      </Section>

      {/* Meet the team */}
      <Section id="team" ariaLabelledby="ho-team-h" className="scroll-mt-[140px]">
        <TeamStrip id="ho-team-h" heading={homeowners.team.heading} link={homeowners.team.link} />
      </Section>

      {/* What your neighbors are saying */}
      <Section id="reviews" tone="sand" ariaLabelledby="ho-reviews-h" className="scroll-mt-[140px]">
        <SectionHeading id="ho-reviews-h" title={homeowners.neighbors.heading} action={<TextLink href="/reviews">{homeowners.neighbors.link}</TextLink>} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-5">
          {neighborReviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </Section>

      {/* Signs: each card points to the service it belongs to */}
      <Section id="signs" tone="white" ariaLabelledby="signs-h" className="scroll-mt-[140px] border-y border-hairline">
        <SectionHeading id="signs-h" title={homeowners.signs.heading} line={homeowners.signs.line} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {signs.map((item) => (
            <div key={item.title} className="flex flex-col items-start gap-3 rounded-card border border-hairline bg-white p-5 lg:p-6">
              <IconTile name={item.icon} size={40} />
              <h3 className="text-[19px] font-bold leading-tight lg:text-[20px]">{item.title}</h3>
              <p className="text-[15px] leading-[1.65] text-charcoal lg:text-[16px]">{item.text}</p>
              <div className="mt-auto pt-1">
                <TextLink href={`/services#${item.service}`}>{item.link}</TextLink>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Homeowner FAQ */}
      <Section id="faq" ariaLabelledby="ho-faq-h" className="scroll-mt-[140px]">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <h2 id="ho-faq-h" className="text-h2-m lg:text-h2">
            {homeowners.faq.heading}
          </h2>
          <FAQ items={faqs.homeowners.items} />
        </div>
      </Section>

      <ClosingCTA heading={homeowners.closing.heading} secondary={{ label: site.closingCta.secondary, href: link("book") }} />
    </>
  );
}
