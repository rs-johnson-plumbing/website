import type { Metadata } from "next";
import Link from "next/link";
import { site, services } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page Not Found" };

export default function NotFound() {
  const nf = site.notFound;
  return (
    <Section pad="default">
      <div className="max-w-2xl">
        <div className="text-[14px] text-slate">Error 404</div>
        <h1 className="mt-2 text-h1-m lg:text-h1">{nf.heading}</h1>
        <p className="mt-4 text-[16px] leading-[1.7] lg:text-body">{nf.line}</p>
        <div className="mt-6">
          <Button href="/" variant="filled">
            {nf.button}
          </Button>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
          {site.nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="text-link">
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 border-t border-hairline pt-6">
          <div className="mb-2 text-[15px] font-bold">Services</div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-slate">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services#${s.slug}`} className="hover:text-charcoal hover:underline">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
