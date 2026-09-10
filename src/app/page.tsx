import type { Metadata } from "next";
import { home } from "@/lib/content";
import { plumberJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/blocks/JsonLd";
import { ConceptOne } from "@/components/concepts/ConceptOne";
import { ConceptHome } from "@/components/concepts/ConceptHome";
import { ConceptTwo } from "@/components/concept-two/ConceptTwo";

export const metadata: Metadata = pageMetadata({ ...home.meta, path: "/" });

export default function HomePage() {
  return (
    <>
      <JsonLd data={plumberJsonLd()} />
      <ConceptHome conceptOne={<ConceptOne />} conceptTwo={<ConceptTwo />} />
    </>
  );
}
