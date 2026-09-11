import Link from "next/link";
import { site } from "@/lib/content";
import { cn } from "@/lib/cn";

type Props = { size?: "header" | "footer"; className?: string };
type BrandProps = { className?: string; title?: string; reversed?: boolean; largerWordmark?: boolean };

/** The supplied artwork is cropped in the SVG viewport without altering it. */
export function Lockup({ className, title }: BrandProps) {
  return <svg viewBox="145 170 1880 405" aria-hidden={title ? undefined : true} role={title ? "img" : undefined} className={className} style={{mixBlendMode:"multiply"}}>
    {title && <title>{title}</title>}
    <image href="/logo/rsj-approved.png" width="2169" height="725" />
  </svg>;
}

export function Mark({ className, title }: BrandProps) {
  return <svg viewBox="145 170 330 405" aria-hidden={title ? undefined : true} role={title ? "img" : undefined} className={className}>
    {title && <title>{title}</title>}
    <image href="/logo/rsj-approved.png" width="2169" height="725" />
  </svg>;
}

export function Badge({ className, title }: BrandProps) {
  return <svg viewBox="0 0 400 400" aria-hidden={title ? undefined : true} role={title ? "img" : undefined} className={className}>
    {title && <title>{title}</title>}
    <circle cx="200" cy="200" r="196" fill="#fff" stroke="#12345b" strokeWidth="4"/>
    <svg x="24" y="156" width="352" height="76" viewBox="145 170 1880 405"><image href="/logo/rsj-approved.png" width="2169" height="725"/></svg>
  </svg>;
}

export function Logo({ size = "header", className }: Props) {
  const dims = size === "header" ? "h-10 w-[160px] lg:h-[52px] lg:w-[208px]" : "h-11 w-[176px]";
  return <Link href="/" aria-label={`${site.name} home`} className={cn("flex items-center text-charcoal builders:text-offwhite hover:no-underline", className)}>
    <Lockup className={cn("shrink-0", dims)} title={site.name} />
  </Link>;
}
