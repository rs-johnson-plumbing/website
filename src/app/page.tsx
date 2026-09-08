import type { Metadata } from "next";
import { home, site, services, team, reviews, projects, faqs, cities, link, type IconName } from "@/lib/content";
import { plumberJsonLd } from "@/lib/jsonld";
import { HomeHero } from "@/components/blocks/HomeHero";
import { TrustBar } from "@/components/blocks/TrustBar";
import { ServiceCard } from "@/components/blocks/ServiceCard";
import { ProjectCard } from "@/components/blocks/ProjectCard";
import { ReviewCard, ReviewSummaryTile } from "@/components/blocks/ReviewCard";
import { FAQ } from "@/components/blocks/FAQ";
import { ClosingCTA } from "@/components/blocks/ClosingCTA";
import { JsonLd } from "@/components/blocks/JsonLd";
import { Section, SectionHeading } from "@/components/ui/Section";
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

export default function HomePage() {
  const featuredProjects = projects.items.filter((p) => p.featured).slice(0, 3);
  const featuredReviews = reviews.items.filter((r) => r.featured && r.audience === "homeowner").slice(0, 3);
  const promises = team.promises as { icon: IconName; title: string; line: string }[];

  return (
    <>
      <JsonLd data={plumberJsonLd()} />
      <HomeHero />
      <TrustBar />

      {/* Services */}
      <Section ariaLabelledby="services-h">
        <SectionHeading id="services-h" title={home.services.heading} line={home.services.line} action={<TextLink href="/plumbing">{home.services.link}</TextLink>} />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      {/* Who shows up */}
      <Section tone="sand" id="who-shows-up" ariaLabelledby="who-h">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col items-start gap-5">
            <h2 id="who-h" className="text-h2-m lg:text-h2">
              {home.whoShowsUp.heading}
            </h2>
            <ul className="flex flex-col gap-3 text-[16px]">
              {home.whoShowsUp.items.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <Icon name="check" size={18} strokeWidth={2} className="shrink-0 text-blue" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="max-w-[520px] text-[16px] lg:text-[17px]">{home.whoShowsUp.line}</p>
            <Button href="/our-team" variant="outlined" className="mt-1">
              {home.whoShowsUp.button}
            </Button>
          </div>
          <PhotoPlaceholder photo={team.groupPhoto} aspect="16/10" />
        </div>
      </Section>

      {/* Recent builder work */}
      <Section ariaLabelledby="builder-work-h">
        <SectionHeading id="builder-work-h" title={home.builderWork.heading} action={<TextLink href="/for-builders">{home.builderWork.link}</TextLink>} />
        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-5">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
        <figure className="m-0 max-w-[640px] rounded-card border border-hairline bg-white p-6">
          <blockquote className="m-0 mb-4 text-[16px] leading-relaxed">{projects.contractorQuote.quote}</blockquote>
          <figcaption className="text-[14px] font-bold text-slate">
            — {projects.contractorQuote.author}, {projects.contractorQuote.company}, {projects.contractorQuote.city}
          </figcaption>
        </figure>
      </Section>

      {/* Promises */}
      <Section tone="sand" ariaLabelledby="promises-h">
        <SectionHeading id="promises-h" title={home.promises.heading} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {promises.map((p) => (
            <div key={p.title} className="flex flex-col items-start gap-3 rounded-card border border-hairline bg-white p-6">
              <Icon name={p.icon} size={24} className="text-blue" />
              <div className="text-[17px] font-bold">{p.title}</div>
              <p className="text-[15px] leading-relaxed text-slate">{p.line}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Reviews */}
      <Section id="reviews" ariaLabelledby="reviews-h">
        <SectionHeading id="reviews-h" title={home.reviews.heading} action={<TextLink href="/reviews">{home.reviews.link}</TextLink>} />
        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-[640px]">
          {reviews.summary.map((s) => (
            <ReviewSummaryTile key={s.source} {...s} />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-5">
          {featuredReviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </Section>

      {/* Where we work */}
      <Section tone="sand" id="service-area" ariaLabelledby="area-h">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col items-start gap-5">
            <h2 id="area-h" className="text-h2-m lg:text-h2">
              {home.serviceArea.heading}
            </h2>
            <p className="max-w-[460px] text-[16px] lg:text-[17px]">{cities.summary}</p>
            <Button href="/service-area" variant="outlined">
              {home.serviceArea.button}
            </Button>
          </div>
          <PhotoPlaceholder photo={home.serviceArea.map} aspect="4/3" />
        </div>
      </Section>

      {/* FAQ */}
      <Section ariaLabelledby="faq-h">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_2fr] lg:gap-14">
          <div>
            <h2 id="faq-h" className="text-h2-m lg:text-h2">
              {home.faq.heading}
            </h2>
            <p className="mt-2 text-[16px] text-slate">{home.faq.line}</p>
          </div>
          <FAQ items={faqs.home.items} />
        </div>
      </Section>

      <ClosingCTA secondary={{ label: site.closingCta.secondary, href: link("book") }} />
    </>
  );
}
