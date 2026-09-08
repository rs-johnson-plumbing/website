import { site, services } from "@/lib/content";
import { TrustBar } from "@/components/blocks/TrustBar";
import { ServiceCard } from "@/components/blocks/ServiceCard";
import { ClosingCTA } from "@/components/blocks/ClosingCTA";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";

/**
 * Step 1 placeholder homepage. Exists so the Vercel preview renders the
 * shared header, trust bar, a content section, closing CTA, and footer.
 * Step 2 replaces this with the full homepage from the design export.
 */
export default function HomePage() {
  return (
    <>
      <Section pad="default">
        <h1 className="max-w-3xl text-h1-m lg:text-h1">{site.tagline}</h1>
        <p className="mt-5 max-w-xl text-slate">[Step 1 scaffold. Full homepage arrives in step 2.]</p>
      </Section>
      <TrustBar />
      <Section ariaLabelledby="services-h">
        <SectionHeading id="services-h" title="What we fix and install" action={<TextLink href="/plumbing">See all services</TextLink>} line="Repairs and installs for homes across St. Charles and St. Louis County." />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>
      <ClosingCTA />
    </>
  );
}
