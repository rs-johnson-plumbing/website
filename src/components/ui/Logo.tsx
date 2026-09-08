import Link from "next/link";
import { site } from "@/lib/content";
import { cn } from "@/lib/cn";

type Props = { size?: "header" | "footer"; className?: string };

/**
 * Brand mark: the P-trap J from the business card, redrawn as vector.
 * Two-tone by default (charcoal pipe, brand-blue flanges); pass `reversed`
 * for a light pipe on dark backgrounds. Source files live in /public/logo.
 */
export function Mark({ className, title, reversed = false }: { className?: string; title?: string; reversed?: boolean }) {
  const pipe = reversed ? "#F7F5F0" : "#2B2B2B";
  return (
    <svg viewBox="0 0 200 240" fill="none" aria-hidden={title ? undefined : true} role={title ? "img" : undefined} className={className}>
      {title && <title>{title}</title>}
      <path d="M140 22 V150 A35 35 0 0 1 70 150 V138 A24 24 0 0 0 46 114 H18" stroke={pipe} strokeWidth="34" strokeLinejoin="round" />
      <rect x="112" y="6" width="56" height="18" rx="2" fill="#2F6FE0" />
      <rect x="116" y="112" width="48" height="14" rx="2" fill="#2F6FE0" />
      <rect x="8" y="90" width="16" height="48" rx="2" fill="#2F6FE0" />
    </svg>
  );
}

/**
 * Round badge: charcoal disc, off-white ring, the reversed two-tone mark,
 * with the company name around the top and O'Fallon, MO around the bottom.
 * This is the logo in the header and footer, and the file for shirts, truck
 * doors, and social avatars.
 */
export function Badge({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 320 320" aria-hidden={title ? undefined : true} role={title ? "img" : undefined} className={className}>
      {title && <title>{title}</title>}
      <defs>
        <path id="rsj-arc-top" d="M40 160 a120 120 0 0 1 240 0" />
        <path id="rsj-arc-bot" d="M56 160 a104 104 0 0 0 208 0" />
      </defs>
      <circle cx="160" cy="160" r="152" fill="#2B2B2B" />
      <circle cx="160" cy="160" r="140" fill="none" stroke="#F7F5F0" strokeWidth="2" />
      <text fontFamily="Georgia, 'Times New Roman', serif" fontWeight="700" fontSize="24" letterSpacing="3" fill="#F7F5F0">
        <textPath href="#rsj-arc-top" startOffset="50%" textAnchor="middle">
          R.S. JOHNSON PLUMBING
        </textPath>
      </text>
      <text fontFamily="Georgia, 'Times New Roman', serif" fontWeight="700" fontSize="18" letterSpacing="3" fill="#A9C4F5">
        <textPath href="#rsj-arc-bot" startOffset="50%" textAnchor="middle">
          O&apos;FALLON, MO
        </textPath>
      </text>
      <g transform="translate(88 78) scale(0.72)" fill="none">
        <path d="M140 22 V150 A35 35 0 0 1 70 150 V138 A24 24 0 0 0 46 114 H18" stroke="#F7F5F0" strokeWidth="34" strokeLinejoin="round" />
        <rect x="112" y="6" width="56" height="18" rx="2" fill="#2F6FE0" />
        <rect x="116" y="112" width="48" height="14" rx="2" fill="#2F6FE0" />
        <rect x="8" y="90" width="16" height="48" rx="2" fill="#2F6FE0" />
      </g>
    </svg>
  );
}

/**
 * Header and footer logo: the round badge, plus the serif wordmark from the
 * desktop breakpoint up. Phones show the badge alone.
 */
export function Logo({ size = "header", className }: Props) {
  const isHeader = size === "header";
  const badge = isHeader ? "h-11 w-11 lg:h-14 lg:w-14" : "h-12 w-12";
  const word = isHeader ? "hidden lg:inline text-[20px]" : "text-[18px]";
  return (
    <Link href="/" aria-label={`${site.name} home`} className={cn("flex items-center gap-3 text-charcoal hover:no-underline", className)}>
      <Badge className={cn("shrink-0", badge)} />
      <span className={cn("font-serif font-bold whitespace-nowrap", word)}>
        {site.shortName}
        <span className="hidden lg:inline"> LLC</span>
      </span>
    </Link>
  );
}
