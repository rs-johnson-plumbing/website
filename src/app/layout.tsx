import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { site, SITE_URL } from "@/lib/content";
import { Header } from "@/components/layout/Header";
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
  // Search indexing is off until NEXT_PUBLIC_SITE_INDEXABLE=true is set in
  // Vercel. Flip it at launch; nothing else changes.
  robots: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true" ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={figtree.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyMobileBar />
      </body>
    </html>
  );
}
