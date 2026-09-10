import type { Metadata } from "next";
import { site } from "./content";

/**
 * The share image every page carries: public/share-image.png, rendered by
 * `npm run og:image` from content/site.json.
 */
export const shareImage = {
  url: "/share-image.png",
  width: 1200,
  height: 630,
  alt: `${site.name}, ${site.trustBar[0].label}, based in O'Fallon, MO`,
};

/**
 * Title, description, canonical, and Open Graph for one page. A page's
 * openGraph block replaces the root layout's outright, so the share image
 * has to travel with it; every page builds its metadata here.
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, images: [shareImage] },
  };
}
