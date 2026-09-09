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
 * Full lockup: the two-tone mark on the left, "R.S." above and "JOHNSON
 * PLUMBING" beside it in Figtree ExtraBold, the site's own face. No LLC in the lockup; the legal name
 * appears in the footer text. Same drawing as /public/logo/rsj-lockup.svg.
 * Scales by height; width follows (4:1).
 */
export function Lockup({ className, title, reversed = false }: { className?: string; title?: string; reversed?: boolean }) {
  // Ink follows the parent's text color so the header can flip it in
  // For Builders mode; `reversed` forces off-white regardless.
  const ink = reversed ? "#F7F5F0" : "currentColor";
  return (
    <svg viewBox="0 0 800 200" aria-hidden={title ? undefined : true} role={title ? "img" : undefined} className={className}>
      {title && <title>{title}</title>}
      <g transform="translate(0 18) scale(0.78)" fill="none">
        <path d="M140 22 V150 A35 35 0 0 1 70 150 V138 A24 24 0 0 0 46 114 H18" stroke={ink} strokeWidth="34" strokeLinejoin="round" />
        <rect x="112" y="6" width="56" height="18" rx="2" fill="#2F6FE0" />
        <rect x="116" y="112" width="48" height="14" rx="2" fill="#2F6FE0" />
        <rect x="8" y="90" width="16" height="48" rx="2" fill="#2F6FE0" />
      </g>
      <g fontFamily="var(--font-figtree), Figtree, system-ui, sans-serif" fontWeight="800" fill={ink} letterSpacing="1">
        {/* textLength pins the wordmark width so a fallback font can never
            overflow the box before Figtree loads. */}
        <text x="150" y="72" fontSize="50">
          R.S.
        </text>
        <text x="150" y="148" fontSize="58" textLength="620" lengthAdjust="spacingAndGlyphs">
          JOHNSON PLUMBING
        </text>
      </g>
    </svg>
  );
}

/**
 * Header and footer logo: the full lockup, small. About 40px tall on phones
 * and 52px on desktop, which keeps the wordmark readable without crowding
 * the nav.
 */
export function Logo({ size = "header", className }: Props) {
  const isHeader = size === "header";
  const dims = isHeader ? "h-10 w-[160px] lg:h-[52px] lg:w-[208px]" : "h-11 w-[176px]";
  return (
    <Link href="/" aria-label={`${site.name} home`} className={cn("flex items-center text-charcoal builders:text-offwhite hover:no-underline", className)}>
      <Lockup className={cn("shrink-0", dims)} title={site.name} />
    </Link>
  );
}
