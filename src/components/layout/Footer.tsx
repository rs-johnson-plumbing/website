import Link from "next/link";
import { site, services, builderServices, footerCities, link } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";

/**
 * Four columns: business name and contact, services for homeowners,
 * services for builders, service area. Review links sit under the contact
 * column. Bottom line carries the license and
 * insurance statement. Email stays bracketed until a domain mailbox exists.
 */
export function Footer() {
  const reviewLinks = site.footer.reviewLinks as { label: string; hrefKey: "nextdoor" | "googleReviews" }[];
  return (
    <footer className="border-t border-hairline bg-offwhite builders:border-darkborder builders:bg-teal-ink">
      <div className="site-width gutter pb-8 pt-14 lg:pt-16">
        <div className="mb-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-start gap-2 text-[15px]">
            <Logo size="footer" />
            <div className="text-slate builders:text-ondark-muted">{site.basedIn}</div>
            <div className="mt-1">
              <a href={site.phone.tel} data-track="call-footer" className="text-charcoal hover:underline builders:text-offwhite">
                {site.phone.display}
              </a>
              <span className="text-slate builders:text-ondark-muted"> · {site.phone.note}</span>
            </div>
            <div className="text-charcoal builders:text-offwhite">{site.email}</div>
            <div className="mt-3 text-[15px] font-bold">{site.footer.reviewsHeading}</div>
            <ul className="flex flex-col gap-2 text-slate builders:text-ondark-muted">
              {reviewLinks.map((r) => (
                <li key={r.label}>
                  <a href={link(r.hrefKey)} className="hover:text-charcoal hover:underline builders:hover:text-offwhite" rel="noopener">
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-3 text-[15px] font-bold">{site.footer.servicesHeading}</div>
            <ul className="flex flex-col gap-2 text-[15px] text-slate builders:text-ondark-muted">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className="hover:text-charcoal hover:underline builders:hover:text-offwhite">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-3 text-[15px] font-bold">{site.footer.builderServicesHeading}</div>
            <ul className="flex flex-col gap-2 text-[15px] text-slate builders:text-ondark-muted">
              {builderServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/builders#${s.slug}`} className="hover:text-charcoal hover:underline builders:hover:text-offwhite">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-3 text-[15px] font-bold">{site.footer.areaHeading}</div>
            <ul className="flex flex-col gap-2 text-[15px] text-slate builders:text-ondark-muted">
              {/* Plain text until the service area and city pages ship. */}
              {footerCities().map((c) => (
                <li key={c.slug}>{c.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-hairline pt-5 text-[13px] text-slate builders:border-darkborder builders:text-ondark-muted">
          {site.name} · {site.licenseLine} · {site.insuredLine}
        </div>
      </div>
    </footer>
  );
}
