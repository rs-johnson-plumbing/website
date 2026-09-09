import { site, allCities, SITE_URL } from "./content";

/**
 * Plumber (LocalBusiness) structured data. Rendered on /, /services, /for-homeowners, and
 * /contact. No street address by design: the business is service-area based.
 */
export function plumberJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": `${SITE_URL}/#business`,
    name: site.name,
    url: SITE_URL,
    telephone: "+1-314-220-1827",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: "US",
    },
    areaServed: allCities().map((c) => ({ "@type": "City", name: `${c.name}, MO` })),
    founder: { "@type": "Person", name: site.owner.name, jobTitle: site.owner.title },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: site.owner.credential,
    },
    priceRange: "$$",
  };
}
