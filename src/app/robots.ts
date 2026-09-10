import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

/**
 * /robots.txt. Follows the same switch as the noindex tag in layout.tsx:
 * until NEXT_PUBLIC_SITE_INDEXABLE is "true" in Vercel, crawlers are told to
 * stay out and no sitemap is advertised.
 */
export default function robots(): MetadataRoute.Robots {
  const indexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";
  if (!indexable) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
