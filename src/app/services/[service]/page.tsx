import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, serviceBySlug, servicesHub, site, link, SITE_URL } from "@/lib/content";
import { JsonLd } from "@/components/blocks/JsonLd";
import { ClosingCTA } from "@/components/blocks/ClosingCTA";
import { TextLink } from "@/components/ui/TextLink";
import { Icon, IconTile } from "@/components/ui/Icon";

type Params = { service: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { service: slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  const title = `${s.name} ${servicesHub.servicePage.titleSuffix} | ${site.shortName}`;
  return {
    title: { absolute: title },
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title, description: s.metaDescription, url: `/services/${s.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { service: slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();

  const sp = servicesHub.servicePage;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.name,
    description: s.metaDescription,
    url: `${SITE_URL}/services/${s.slug}`,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: { "@type": "AdministrativeArea", name: "St. Charles County, MO" },
  };

  return (
    <>
      <JsonLd data={serviceLd} />

      {/* Crew, FAQ, reviews, and the action card are held back from this
          template for now; the closing strip carries the calls to action. */}
      <section className="bg-offwhite">
        <div className="site-width gutter grid grid-cols-1 items-start gap-8 py-10 lg:max-w-[820px] lg:py-[60px]">
          <div className="flex flex-col items-start gap-5">
            <TextLink href="/services" arrow={false} className="text-[14px]">
              ← {sp.backToHub}
            </TextLink>
            <div className="flex items-center gap-3">
              <IconTile name={s.icon} size={44} />
              <h1 className="text-h1-m lg:text-[40px] lg:leading-[1.1]">
                {s.name} {sp.titleSuffix}
              </h1>
            </div>
            <p className="text-[16px] leading-[1.7] lg:text-body">{s.intro}</p>

            <h2 className="mt-2 text-[20px] font-semibold lg:text-h3">{sp.problemsHeading}</h2>
            <ul className="flex flex-col gap-2 text-[16px] leading-[1.7] lg:text-body">
              {s.problems.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <Icon name="check" size={18} strokeWidth={2} className="mt-1.5 shrink-0 text-blue" />
                  {p}
                </li>
              ))}
            </ul>

            {s.hub.whatWeDo.length > 0 && (
              <>
                <h2 className="mt-2 text-[20px] font-semibold lg:text-h3">{servicesHub.whatWeDoLabel.replace(":", "")}</h2>
                <ul className="flex list-disc flex-col gap-1.5 pl-5 text-[16px] leading-[1.7] lg:text-body">
                  {s.hub.whatWeDo.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </>
            )}

            {s.hub.callout && (
              <div role="note" className="rounded-card border border-hairline border-l-[3px] border-l-charcoal bg-white px-4 py-3.5 text-[16px] leading-[1.7]">
                <strong>{s.hub.callout.lead}</strong> {s.hub.callout.text}
              </div>
            )}

          </div>
        </div>
      </section>

      <ClosingCTA secondary={{ label: site.closingCta.secondary, href: link("book") }} />
    </>
  );
}
