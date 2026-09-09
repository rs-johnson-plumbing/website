import type { Metadata } from "next";
import Link from "next/link";
import { plumbing, services, faqs, cities, site, link, type IconName } from "@/lib/content";
import { plumberJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/blocks/JsonLd";
import { AnchorBar, type Anchor } from "@/components/blocks/AnchorBar";
import { ServiceBand } from "@/components/blocks/ServiceBand";
import { ServiceIllustration } from "@/components/blocks/ServiceIllustration";
import { AreaMapSketch } from "@/components/blocks/AreaMapSketch";
import { FAQ } from "@/components/blocks/FAQ";
import { ClosingCTA } from "@/components/blocks/ClosingCTA";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";
import { IconTile } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: { absolute: plumbing.meta.title },
  description: plumbing.meta.description,
  alternates: { canonical: "/plumbing" },
  openGraph: { title: plumbing.meta.title, description: plumbing.meta.description, url: "/plumbing" },
};

type Sign = { icon: IconName; title: string; text: string; service: string; link: string };

export default function PlumbingHubPage() {
  const signs = plumbing.signs.items as Sign[];

  return (
    <>
      <JsonLd data={plumberJsonLd()} />

      {/* The page opens on the anchor bar. The H1 stays for search engines and
          screen readers; the first visible heading is "What We Do". */}
      <h1 className="sr-only">{plumbing.seoHeading}</h1>

      <AnchorBar anchors={plumbing.anchors as Anchor[]} />

      {/* What We Do: hero-style heading and the eight service cards. Each card
          jumps to its section below; the card itself is the link. */}
      <Section id="services" ariaLabelledby="hub-services-h" className="scroll-mt-[140px]">
        <div className="mb-8 flex flex-col items-center gap-3 text-center lg:mb-12">
          <h2 id="hub-services-h" className="text-[clamp(26px,8vw,32px)] font-bold leading-[1.1] tracking-[-0.01em] lg:text-h1 lg:font-bold">
            {plumbing.services.heading}
          </h2>
          {plumbing.services.line && <p className="max-w-[560px] text-[16px] leading-[1.5] text-slate lg:text-body">{plumbing.services.line}</p>}
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`#${s.slug}`}
              className="flex flex-col items-center gap-2 rounded-card border border-hairline bg-white p-4 text-center text-charcoal transition-colors hover:border-blue hover:no-underline lg:p-6"
            >
              <ServiceIllustration slug={s.slug} className="h-[104px] w-[104px] lg:h-[132px] lg:w-[132px]" />
              <span className="text-[17px] font-bold leading-tight lg:text-[19px]">{s.name}</span>
              <span className="text-[14px] leading-snug text-slate lg:text-[15px]">{s.hubShort}</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* One band per service, alternating photo side. Emergency has no
          photo yet and renders as a single text column. */}
      {services.map((s, i) => (
        <ServiceBand key={s.slug} service={s} photoLeft={i % 2 === 0} />
      ))}

      {/* Signs: each card points back to the service it belongs to */}
      <Section id="signs" tone="sand" ariaLabelledby="signs-h" className="scroll-mt-[140px]">
        <div className="mb-8">
          <h2 id="signs-h" className="text-h2-m lg:text-h2">
            {plumbing.signs.heading}
          </h2>
          {plumbing.signs.line && <p className="mt-2 max-w-[720px] text-[16px] text-slate">{plumbing.signs.line}</p>}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {signs.map((item) => (
            <div key={item.title} className="flex flex-col items-start gap-3 rounded-card border border-hairline bg-white p-5 lg:p-6">
              <IconTile name={item.icon} size={40} />
              <h3 className="text-[19px] font-bold leading-tight lg:text-[20px]">{item.title}</h3>
              <p className="text-[15px] leading-[1.65] text-charcoal lg:text-[16px]">{item.text}</p>
              <div className="mt-auto pt-1">
                <TextLink href={`#${item.service}`}>{item.link}</TextLink>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Where we work */}
      <Section id="service-area" tone="white" ariaLabelledby="hub-area-h" className="border-y border-hairline">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-16">
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
          <div>
            <AreaMapSketch title={plumbing.serviceArea.map.alt} />
            <p className="mt-2 text-[13px] text-slate">{plumbing.serviceArea.map.caption}</p>
          </div>
        </div>
      </Section>

      {/* Why us: the one dark band on the page, numbered */}
      <Section id="why-us" tone="charcoal" ariaLabelledby="why-h" className="scroll-mt-[140px]">
        <h2 id="why-h" className="mb-8 text-h2-m text-offwhite lg:mb-10 lg:text-h2">
          {plumbing.whyUs.heading}
        </h2>
        <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-10">
          {plumbing.whyUs.items.map((item, i) => (
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
          {plumbing.whyUs.links.map((l) => (
            <Link key={l.href} href={l.href} className="text-[16px] font-bold text-blue-ondark hover:underline">
              {l.label}
            </Link>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" ariaLabelledby="hub-faq-h" className="scroll-mt-[140px]">
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
