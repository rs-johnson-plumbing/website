import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { site, SITE_URL } from "@/lib/content";
import { shareImage } from "@/lib/seo";
import { ConceptProvider } from "@/components/concepts/ConceptProvider";
import { ConceptShell } from "@/components/concepts/ConceptChrome";
import "./globals.css";
import "@/styles/concept-two.css";
import "@/styles/concept-two-authority-fixes.css";
import "@/styles/concept-two-mobile-polish.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  // Stops iOS Safari from underlining addresses and numbers it guesses at;
  // every phone number on the site is an explicit tel: link already.
  formatDetection: { telephone: false, address: false, email: false },
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
    images: [shareImage],
  },
  twitter: { card: "summary_large_image" },
  // Search indexing is off until NEXT_PUBLIC_SITE_INDEXABLE=true is set in
  // Vercel. Flip it at launch; nothing else changes.
  robots: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true" ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={figtree.variable}>
      <body>
        <ConceptProvider>
          <ConceptShell>{children}</ConceptShell>
        </ConceptProvider>
      </body>
    </html>
  );
}
