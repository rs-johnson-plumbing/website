import type { Metadata } from "next";
import Link from "next/link";
import { plumbing, services, faqs, cities, site, link, type IconName } from "@/lib/content";
import { plumberJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/blocks/JsonLd";
import { ActionCard } from "@/components/blocks/ActionCard";
import { AnchorBar, type Anchor } from "@/components/blocks/AnchorBar";
import { ServiceCard } from "@/components/blocks/ServiceCard";
import { ServiceBand } from "@/components/blocks/ServiceBand";
import { FAQ } from "@/components/blocks/FAQ";
import { ClosingCTA } from "@/components/blocks/ClosingCTA";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { Icon, IconTile } from "@/components/ui/Icon";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

export const metadata: Metadata = {
  title: { absolute: plumbing.meta.title },
  description: plumbing.meta.description,
  alternates: { canonical: "/plumbing" },
  openGraph: { title: plumbing.meta.title, description: plumbing.meta.description, url: "/plumbing" },
};

export default function PlumbingHubPage() {
  const bands = services.filter((s) => s.slug !== "emergency-plumbing");
  const emergency = services.find((s) => s.slug === "emergency-plumbing")!;
  const signs = plumbing.signs.items as { icon: IconName; title: string; text: string }[];

  return (
    <>
      <JsonLd data={plumberJsonLd()} />

      {/* Compact hero */}
      <section className="bg-offwhite">
        <div className="site-width gutter grid grid-cols-1 items-start gap-8 pb-10 pt-10 lg:grid-cols-[1fr_380px] lg:gap-16 lg:pb-12 lg:pt-14">
          <div className="flex flex-col items-start gap-5">
            <h1 className="text-h1-m lg:text-[40px] lg:leading-[1.1]">{plumbing.hero.heading}</h1>
            <p className="text-[16px] leading-[1.7] lg:text-body">{plumbing.hero.intro}</p>
            <div className="flex items-center gap-2 text-[14px] text-slate">
              <Icon name="star" size={16} filled className="text-blue" />
              <span>{plumbing.hero.trustLine}</span>
            </div>
          </div>
          <ActionCard trackPrefix="hub-hero" />
        </div>
      </section>

      <AnchorBar anchors={plumbing.anchors as Anchor[]} />

      {/* Services grid */}
      <Section id="services" ariaLabelledby="hub-services-h" className="scroll-mt-[140px]">
        <SectionHeading id="hub-services-h" title={plumbing.services.heading} line={plumbing.services.line} />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} href={`#${s.slug}`} description={s.hubShort} learnMoreLabel="Jump to section" />
          ))}
        </div>
      </Section>

      {/* Signs */}
      <Section id="signs" tone="white" ariaLabelledby="signs-h" className="scroll-mt-[140px] border-y border-hairline">
        <SectionHeading id="signs-h" title={plumbing.signs.heading} line={plumbing.signs.line} />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-8">
          {signs.map((item) => (
            <div key={item.title} className="flex flex-col items-start gap-3">
              <IconTile name={item.icon} size={40} />
              <h3 className="text-[20px] font-semibold lg:text-h3">{item.title}</h3>
              <p className="text-[16px] leading-[1.7] text-charcoal">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Seven service bands, alternating */}
      {bands.map((s, i) => (
        <ServiceBand key={s.slug} service={s} photoLeft={i % 2 === 0} />
      ))}

      {/* Emergency */}
      <Section id={emergency.slug} tone="charcoal" ariaLabelledby="emergency-h" className="scroll-mt-[140px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start gap-4">
            <h2 id="emergency-h" className="text-h2-m text-offwhite lg:text-h2">
              {emergency.hub.heading}
            </h2>
            <p className="text-[16px] leading-[1.7] text-ondark-muted lg:text-body">{emergency.hub.paragraph}</p>
            <p className="text-[15px] text-ondark-muted">
              <strong className="text-offwhite">{plumbing.emergency.responseLead}</strong> {plumbing.emergency.response}
            </p>
            <Button href={site.phone.tel} variant="filled" track="call-emergency-hub" className="mt-1">
              {plumbing.emergency.button}
            </Button>
          </div>
          <div>
            <div className="mb-4 text-[16px] font-bold text-offwhite">{plumbing.emergency.whileYouWait}</div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {plumbing.emergency.tips.map((t) => (
                <div key={t} className="rounded-card border border-darkborder bg-darkcard p-4 text-[15px] leading-relaxed text-ondark-helper">
                  {t}
                </div>
              ))}
            </div>
            <div className="mt-5">
              <Link href={`/plumbing/${emergency.slug}`} className="inline-flex items-center gap-1 text-[15px] font-bold text-blue-ondark hover:underline">
                {emergency.hub.link}
                <Icon name="arrow-right" size={16} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Builders */}
      <Section id="builders" pad="band" className="border-b border-hairline">
        <div className="flex flex-col items-start gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-[720px]">
            <h2 className="text-h2-m lg:text-h2">{plumbing.builders.heading}</h2>
            <p className="mt-2 text-[16px] leading-[1.7] lg:text-body">{plumbing.builders.text}</p>
          </div>
          <Button href="/for-builders" variant="outlined" className="shrink-0">
            {plumbing.builders.button}
          </Button>
        </div>
      </Section>

      {/* Where we work */}
      <Section id="service-area" tone="sand" ariaLabelledby="hub-area-h">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start gap-5">
            <h2 id="hub-area-h" className="text-h2-m lg:text-h2">
              {plumbing.serviceArea.heading}
            </h2>
            <p className="text-[16px] leading-[1.7] lg:text-body">{plumbing.serviceArea.intro}</p>
            {cities.regions.map((r) => (
              <div key={r.name}>
                <h3 className="mb-1 text-[17px] font-bold">{r.name}</h3>
                <p className="text-[16px] leading-[1.7] lg:text-body">
                  {r.cities.map((c, i) => (
                    <span key={c.slug}>
                      {i > 0 && " · "}
                      {c.tier === 1 ? (
                        <Link href={`/service-area/${c.slug}`} className="text-link font-medium">
                          {c.name}
                        </Link>
                      ) : (
                        c.name
                      )}
                    </span>
                  ))}
                </p>
              </div>
            ))}
            <p className="text-[16px] leading-[1.7] lg:text-body">
              {plumbing.serviceArea.rangeLine}{" "}
              <a href={`sms:${site.phone.tel.replace("tel:", "")}`} className="text-link font-medium" data-track="sms-hub-area">
                {site.phone.display}
              </a>
              .
            </p>
          </div>
          <PhotoPlaceholder photo={plumbing.serviceArea.map} aspect="4/3" />
        </div>
      </Section>

      {/* Why us */}
      <Section id="why-us" ariaLabelledby="why-h" className="scroll-mt-[140px]">
        <SectionHeading id="why-h" title={plumbing.whyUs.heading} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {plumbing.whyUs.items.map((item) => (
            <div key={item.title} className="flex flex-col gap-2 rounded-card border border-hairline bg-white p-5">
              <h3 className="text-[17px] font-bold">{item.title}</h3>
              <p className="text-[15px] leading-relaxed text-slate">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-6">
          {plumbing.whyUs.links.map((l) => (
            <TextLink key={l.href} href={l.href}>
              {l.label}
            </TextLink>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="white" ariaLabelledby="hub-faq-h" className="scroll-mt-[140px] border-t border-hairline">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <h2 id="hub-faq-h" className="text-h2-m lg:text-h2">
            {plumbing.faq.heading}
          </h2>
          <FAQ items={faqs.plumbing.items} />
        </div>
      </Section>

      <ClosingCTA heading={plumbing.closing.heading} secondary={{ label: site.closingCta.secondary, href: link("book") }} />
    </>
  );
}
