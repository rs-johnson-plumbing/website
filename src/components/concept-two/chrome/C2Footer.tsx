"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import type { Service, BuilderService } from "@/lib/content";
import { C2ServiceDetails } from "../ui/C2ServiceDetails";
import { useRequestService } from "../ui/C2Request";
import { conceptTwo as copy, site, footerCities, services, builderServices } from "@/lib/content";
import { c2Label } from "../ui/drawingFor";
import { Lockup } from "@/components/ui/Logo";

/** Contact details and service navigation follow the active Concept 2 content. */
export function C2Footer() {
  const request = useRequestService();
  const [selected, setSelected] = useState<Service | BuilderService | null>(null);
  const closeDetails = useCallback(() => setSelected(null), []);
  return (
    <footer className="c2-footer">
      <div className="c2-wrap c2-footer-inner">
        <div className="c2-footer-contact">
        <Link href="/" aria-label={`${site.name} home`} className="c2-logo c2-logo--footer">
          <Lockup title={site.name} />
        </Link>
        <div className="c2-footer-social" style={{ display: "flex", gap: 12, margin: "20px 0" }}>
          <span title="LinkedIn — Coming Soon" style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 4, background: "#eaf3fb", color: "#397bd4" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" role="img" aria-label="LinkedIn placeholder"><path fill="currentColor" d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96C2 21.32 2.69 22 3.55 22h16.9c.86 0 1.55-.68 1.55-1.52V3.52C22 2.68 21.31 2 20.45 2ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.52 2.8-1.52 2.99 0 3.57 1.97 3.57 4.53v5.24Z"/></svg>
          </span>
          <span title="Facebook — Coming Soon" style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 4, background: "#eaf3fb", color: "#397bd4" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" role="img" aria-label="Facebook placeholder"><path fill="currentColor" d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.25.2 2.25.2v2.46H15.2c-1.25 0-1.64.78-1.64 1.56V12h2.79l-.45 2.89h-2.34v6.99A10 10 0 0 0 22 12Z"/></svg>
          </span>
        </div>
        <address className="c2-footer-address">{site.city}, {site.state}</address>
        <a href={site.phone.tel} className="c2-footer-phone" data-track="call-footer">
          {site.phone.display}
        </a>
        </div>

        <div className="c2-footer-service-groups">
          <nav aria-label="Services for Homeowners">
            <h2><span className="c2-footer-heading-phone">Services for Homeowners</span><span className="c2-footer-heading-desktop">Services</span></h2>
            <ul>{services.map((service) => (
              <li key={service.slug}><button type="button" className="c2-footer-service-trigger" aria-haspopup="dialog" onClick={() => setSelected(service)}>{c2Label(service.slug, service.name)}</button></li>
            ))}</ul>
          </nav>
          <nav aria-label="Services for Builders">
            <h2><span className="c2-footer-heading-phone">Services for Builders</span><span className="c2-footer-heading-desktop">Builders</span></h2>
            <ul>{builderServices.map((service) => (
              <li key={service.slug}><button type="button" className="c2-footer-service-trigger" aria-haspopup="dialog" onClick={() => setSelected(service)}>{c2Label(service.slug, service.name)}</button></li>
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
          <span>{copy.footer.basedIn}</span>
          <span>{copy.footer.servingLine}</span>
        </div>
      </div>
      {selected && <C2ServiceDetails service={selected} onClose={closeDetails} onRequest={() => { setSelected(null); request(); }} />}
    </footer>
  );
}

