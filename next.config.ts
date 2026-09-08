import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The site is fully static. Dynamic routes use generateStaticParams and
  // route handlers under /api are the only thing that runs at request time.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
