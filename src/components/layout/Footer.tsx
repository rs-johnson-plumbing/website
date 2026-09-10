import Link from "next/link";
import { site, services, builderServices, footerCities, link } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";

/**
 * Two columns on desktop, one on a phone. Left: the logo, the phone number
 * set large, email, and one paragraph with where we are based and the
 * cities we serve. Right: the homeowner and builder services as wrapped
 * inline lists, then the review links. The license and insurance line
 * closes it. Email stays bracketed until a domain mailbox exists.
 */
export function Footer() {
  const reviewLinks = site.footer.reviewLinks as { label: string; hrefKey: "nextdoor" | "googleReviews" }[];
  const cityList = footerCities().map((c) => c.name).join(", ");
  const inline = "flex flex-wrap gap-x-4 gap-y-1.5 text-[15px] text-slate";
  return (
    <footer className="border-t border-hairline bg-offwhite text-charcoal">
      <div className="site-width gutter pb-8 pt-12 lg:pt-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
          <div className="flex flex-col items-start">
            <Logo size="footer" />
            <a href={site.phone.tel} data-track="call-footer" className="mt-5 text-[30px] font-extrabold leading-none tracking-[-0.01em] text-charcoal hover:no-underline lg:text-[34px]">
              {site.phone.display}
            </a>
            <div className="mt-2 text-[15px] text-slate">
              {site.phone.note} · {site.email}
            </div>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.6] text-slate">
              {site.basedIn}. {site.footer.servingLine} {cityList}.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <div className="mb-2 text-[15px] font-bold">{site.footer.servicesHeading}</div>
              <ul className={inline}>
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services#${s.slug}`} className="hover:text-charcoal hover:underline">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-2 text-[15px] font-bold">{site.footer.builderServicesHeading}</div>
              <ul className={inline}>
                {builderServices.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/builders#${s.slug}`} className="hover:text-charcoal hover:underline">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-2 text-[15px] font-bold">{site.footer.reviewsHeading}</div>
              <ul className={inline}>
                {reviewLinks.map((r) => (
                  <li key={r.label}>
                    <a href={link(r.hrefKey)} className="hover:text-charcoal hover:underline" rel="noopener">
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-hairline pt-5 text-[13px] text-slate">
          {site.name} · {site.licenseLine} · {site.insuredLine}
        </div>
      </div>
    </footer>
  );
}
