import type { Metadata } from "next";
import { home } from "@/lib/content";
import { plumberJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/blocks/JsonLd";
import { ConceptOne } from "@/components/concepts/ConceptOne";
import { ConceptPage } from "@/components/concepts/ConceptPage";
import { C2Home } from "@/components/concept-two/pages/C2Home";

export const metadata: Metadata = pageMetadata({ ...home.meta, path: "/" });

export default function HomePage() {
  return (
    <>
      <JsonLd data={plumberJsonLd()} />
      <ConceptPage one={<ConceptOne />} two={<C2Home />} />
    </>
  );
}
