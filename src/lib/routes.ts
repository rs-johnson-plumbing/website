/**
 * Every public route on the site, in nav order. One list feeds the sitemap
 * and the smoke test, so a page that ships is indexed and checked together.
 * Add new routes here as pages ship.
 */
import { services, conceptTwo } from "./content";

export function siteRoutes(): string[] {
  return ["/", "/for-homeowners", "/for-builders", "/services", "/services/builders", ...services.map((s) => `/services/${s.slug}`), "/service-areas", ...conceptTwo.serviceAreas.pages.map((city) => `/service-areas/${city.slug}`), "/our-team"];
}
