import Link from "next/link";
import { C2Button } from "../ui/C2Button";
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
        <p className="c2-footer-brand-legal">&copy; {year} {copy.footer.legal}</p>
        <address className="c2-footer-address">{site.city}, {site.state}</address>
        <a href={site.phone.tel} className="c2-footer-phone" data-track="call-footer">
          {site.phone.display}
        </a>
        <C2Button href="/for-builders#request-a-bid" size="sm" variant="outline">Request a Bid</C2Button>
        </div>

        <div className="c2-footer-service-groups">
          <nav aria-label="Services for Homeowners">
            <h2><span className="c2-footer-heading-phone">Services for Homeowners</span><span className="c2-footer-heading-desktop">Services</span></h2>
            <ul>{services.map((service) => (
              <li key={service.slug}><Link href={`/services/${service.slug}`}>{c2Label(service.slug, service.name)}</Link></li>
            ))}</ul>
          </nav>
          <nav aria-label="Services for Builders">
            <h2><span className="c2-footer-heading-phone">Services for Builders</span><span className="c2-footer-heading-desktop">Builders</span></h2>
            <ul>{builderServices.map((service) => (
              <li key={service.slug}><Link href={`/services/builders#${service.slug}`}>{c2Label(service.slug, service.name)}</Link></li>
            ))}</ul>
          </nav>
        </div>
        <div className="c2-footer-desktop-details">
          <address><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-9 8-14a8 8 0 1 0-16 0c0 5 8 14 8 14Z" fill="currentColor"/><circle cx="12" cy="8" r="3" fill="white"/></svg>{site.city}, {site.state}</address>
          <a href={site.phone.tel} data-track="call-footer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 3 4 4-2 3c2 3 4 5 7 7l3-2 4 4c-2 6-9 1-13-3S0 5 5 3Z" fill="currentColor"/></svg>{site.phone.display}</a>
          <p>{copy.footer.servingLine}</p>
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

