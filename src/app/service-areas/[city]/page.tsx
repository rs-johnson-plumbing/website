import { notFound } from "next/navigation";
import { conceptTwo, site, SITE_URL } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/blocks/JsonLd";
import { C2ServiceAreas } from "@/components/concept-two/pages/C2ServiceAreas";

const copy = conceptTwo.serviceAreas;
type Props = { params: Promise<{ city: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return copy.pages.map(page => ({ city: page.slug })); }
export async function generateMetadata({ params }: Props) {
  const { city: slug } = await params;
  const city = copy.pages.find(page => page.slug === slug);
  if (!city) return {};
  return pageMetadata({ title: city.title, description: city.description, path: `/service-areas/${city.slug}` });
}
export default async function CityPage({ params }: Props) {
  const { city: slug } = await params;
  const city = copy.pages.find(page => page.slug === slug);
  if (!city) notFound();
  const url = `${SITE_URL}/service-areas/${city.slug}`;
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: city.title.split(" | ")[0], description: city.description, url,
      provider: { "@type": "Plumber", "@id": `${SITE_URL}/#business`, name: site.name, url: SITE_URL },
      areaServed: { "@type": "City", name: `${city.name}, MO` },
    }} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: copy.homeLabel, item: SITE_URL },
      { "@type": "ListItem", position: 2, name: copy.navLabel, item: `${SITE_URL}/service-areas` },
      { "@type": "ListItem", position: 3, name: city.name, item: url },
    ] }} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: city.faqs.map(item => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }} />
    <C2ServiceAreas city={city} />
  </>;
}
