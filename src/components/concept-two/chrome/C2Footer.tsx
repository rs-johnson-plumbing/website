import Link from "next/link";
import { conceptTwo as copy, site, footerCities } from "@/lib/content";
import { Lockup } from "@/components/ui/Logo";

/** Light, quiet footer. Never a sitemap. */
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
        <section className="c2-footer-areas" aria-labelledby="c2-footer-areas-heading">
          <h2 id="c2-footer-areas-heading">Service Areas</h2>
          <ul>{footerCities().map((city) => <li key={city.slug}>{city.name}</li>)}</ul>
        </section>
        <nav className="c2-footer-nav" aria-label="Footer">
          {copy.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

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
