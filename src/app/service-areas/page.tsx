import { conceptTwo } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { plumberJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/blocks/JsonLd";
import { C2ServiceAreas } from "@/components/concept-two/pages/C2ServiceAreas";

const copy = conceptTwo.serviceAreas;
export const metadata = pageMetadata({ title: copy.title, description: copy.description, path: "/service-areas" });

export default function ServiceAreasPage() {
  return <><JsonLd data={plumberJsonLd()} /><C2ServiceAreas /></>;
}
