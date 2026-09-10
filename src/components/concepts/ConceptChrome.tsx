"use client";

import { useConcept } from "./ConceptProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import { C2Header } from "@/components/concept-two/chrome/C2Header";
import { C2Footer } from "@/components/concept-two/chrome/C2Footer";
import { C2Bar } from "@/components/concept-two/chrome/C2Bar";
import { C2RequestProvider } from "@/components/concept-two/ui/C2Request";

/**
 * Each design brings its own header, footer, and phone action bar. Concept 1's
 * chrome is untouched; Concept 2's lives entirely under the `c2` root so its
 * styles can never reach Concept 1.
 */
export function ConceptShell({ children }: { children: React.ReactNode }) {
  if (useConcept() === "2") {
    return (
      <C2RequestProvider>
        <div className="c2">
          <C2Header />
          <main id="c2-main">{children}</main>
          <C2Footer />
          <C2Bar />
        </div>
      </C2RequestProvider>
    );
  }
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <StickyMobileBar />
    </>
  );
}
