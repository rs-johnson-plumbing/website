import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";
import { siteRoutes } from "@/lib/routes";

/** /sitemap.xml, built from the route list in src/lib/routes.ts. */
export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes().map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
