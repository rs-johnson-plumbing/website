import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { site, SITE_URL } from "@/lib/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyMobileBar />
      </body>
    </html>
  );
}
