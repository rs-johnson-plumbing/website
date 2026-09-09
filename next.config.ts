import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The site is fully static. Dynamic routes use generateStaticParams and
  // route handlers under /api are the only thing that runs at request time.
  // Old hub URLs. Nothing indexed yet, but links may exist in messages.
  async redirects() {
    return [
      { source: "/plumbing", destination: "/for-homeowners", permanent: true },
      { source: "/plumbing/:slug", destination: "/services/:slug", permanent: true },
      // Remodel plumbing moved under the builders side; the old service page is gone.
      { source: "/services/bath-and-kitchen-remodel", destination: "/services", permanent: true },
      { source: "/plumbing/bath-and-kitchen-remodel", destination: "/services", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
