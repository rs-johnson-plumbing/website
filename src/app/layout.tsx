import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { site, SITE_URL } from "@/lib/content";
import { Header } from "@/components/layout/Header";
import { UtilityBar } from "@/components/layout/UtilityBar";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Plumber in O'Fallon, MO | ${site.shortName}, Master Plumber`,
    template: `%s | ${site.shortName}`,
  },
  description: `Master Plumber Ryan Johnson and crew handle emergency and scheduled plumbing for homes and job sites across St. Charles County. Based in O'Fallon. Call or text ${site.phone.display}.`,
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  // TEMPORARY: keep search engines off the shell while pages are placeholders.
  // Remove this block at launch, when app/robots.ts and sitemap.ts go in.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={figtree.variable}>
      <body>
        <UtilityBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyMobileBar />
      </body>
    </html>
  );
}
