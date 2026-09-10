import Link from "next/link";
import { conceptTwo as copy, site } from "@/lib/content";
import { Lockup } from "@/components/ui/Logo";

/** Light, quiet footer. Never a sitemap. */
export function C2Footer() {
  const year = 2026;
  return (
    <footer className="c2-footer">
      <div className="c2-wrap c2-footer-inner">
        <Link href="/" aria-label={`${site.name} home`} className="c2-logo c2-logo--footer">
          <Lockup title={site.name} />
        </Link>
        <nav className="c2-footer-nav" aria-label="Footer">
          {copy.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <a href={site.phone.tel} className="c2-footer-phone" data-track="call-footer">
          {site.phone.display}
        </a>
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
