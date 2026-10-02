import { isSiteIndexable } from "@/lib/indexing";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

/**
 * /robots.txt. Follows the same switch as the noindex tag in layout.tsx:
 * production is indexable; previews and development stay blocked.
 */
export default function robots(): MetadataRoute.Robots {
  const indexable = isSiteIndexable();
  if (!indexable) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
