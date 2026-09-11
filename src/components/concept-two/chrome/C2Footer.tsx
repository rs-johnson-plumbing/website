import Link from "next/link";
import { conceptTwo as copy, site, footerCities, services, builderServices } from "@/lib/content";
import { c2Label } from "../ui/drawingFor";
import { Lockup } from "@/components/ui/Logo";

/** Contact details and service navigation follow the active Concept 2 content. */
export function C2Footer() {
  const year = 2026;
  return (
    <footer className="c2-footer">
      <div className="c2-wrap c2-footer-inner">
        <div className="c2-footer-contact">
        <Link href="/" aria-label={`${site.name} home`} className="c2-logo c2-logo--footer">
          <Lockup title={site.name} />
        </Link>
        <address className="c2-footer-address">{site.city}, {site.state}</address>
        <a href={site.phone.tel} className="c2-footer-phone" data-track="call-footer">
          {site.phone.display}
        </a>
        </div>

        <div className="c2-footer-service-groups">
          <nav aria-label="Services for Homeowners">
            <h2>Services for Homeowners</h2>
            <ul>{services.map((service) => (
              <li key={service.slug}><Link href={`/services/${service.slug}`}>{c2Label(service.slug, service.name)}</Link></li>
            ))}</ul>
          </nav>
          <nav aria-label="Services for Builders">
            <h2>Services for Builders</h2>
            <ul>{builderServices.map((service) => (
              <li key={service.slug}><Link href={`/services/builders#${service.slug}`}>{c2Label(service.slug, service.name)}</Link></li>
            ))}</ul>
          </nav>
        </div>
        <section className="c2-footer-areas" aria-labelledby="c2-footer-areas-heading">
          <h2 id="c2-footer-areas-heading">Service Areas</h2>
          <ul>{footerCities().map((city) => <li key={city.slug}>{city.name}</li>)}</ul>
        </section>
        <div className="c2-footer-meta">
          <span>
            &copy; {year} {copy.footer.legal}
          </span>
          <span>{copy.footer.basedIn}</span>
          <span>{copy.footer.servingLine}</span>
        </div>
      </div>
    </footer>
  );
}

