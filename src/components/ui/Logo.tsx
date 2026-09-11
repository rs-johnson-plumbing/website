import Link from "next/link";
import { site } from "@/lib/content";
import { cn } from "@/lib/cn";

type Props = { size?: "header" | "footer"; className?: string };

function PipeJ({ reversed = false }: { reversed?: boolean }) {
 const navy=reversed ? "#eef7ff" : "#12345b";
 return <g fill="none" strokeLinejoin="round">
  <path d="M140 28V143C140 202 48 205 48 143H26" stroke={navy} strokeWidth="29"/>
  <path d="M140 28V143C140 202 48 205 48 143H26" stroke="#73b2dc" strokeWidth="21"/>
  <path d="M135 28V142C135 190 59 196 55 147H26" stroke="#f6fbff" strokeWidth="9"/>
  <path d="M148 36V143C148 171 133 187 111 191M45 158l14-5M56 177l12-9M77 189l6-13" stroke="#2868a8" strokeWidth="2"/>
  <path d="M117 12H162V32H117ZM16 126H49V143H16Z" fill={reversed?"#eef7ff":"#fff"} stroke={navy} strokeWidth="6"/>
  <path d="M122 22H157M22 135H44" stroke="#2868a8" strokeWidth="3"/>
 </g>;
}

/** Crisp vector pipe mark used by the shared brand components. */
export function Mark({ className, title, reversed = false }: { className?: string; title?: string; reversed?: boolean }) {
 return <svg viewBox="0 0 190 220" aria-hidden={title ? undefined : true} role={title ? "img" : undefined} className={className}>
 {title&&<title>{title}</title>}<PipeJ reversed={reversed}/></svg>;
}

export function Badge({ className, title }: { className?: string; title?: string }) {
 return <svg viewBox="0 0 320 320" aria-hidden={title ? undefined : true} role={title ? "img" : undefined} className={className}>
 {title&&<title>{title}</title>}<circle cx="160" cy="160" r="152" fill="#12345b"/><circle cx="160" cy="160" r="141" fill="none" stroke="#8ec6eb" strokeWidth="2"/>
 <g transform="translate(97 27) scale(.7)"><PipeJ reversed/></g>
 <g textAnchor="middle" fontFamily="var(--font-figtree),Figtree,Arial,sans-serif" fontWeight="800"><text x="160" y="219" fontSize="30" fill="#fff">R.S. JOHNSON</text><text x="160" y="250" fontSize="24" letterSpacing="4" fill="#8ec6eb">PLUMBING</text></g></svg>;
}

/** Bold two-line vector wordmark: navy company name, blue plumbing descriptor. */
export function Lockup({ className, title, reversed = false, largerWordmark = false }: { className?: string; title?: string; reversed?: boolean; largerWordmark?: boolean }) {
 return <svg viewBox={largerWordmark ? "0 0 855 180" : "0 0 800 180"} aria-hidden={title ? undefined : true} role={title ? "img" : undefined} className={className}>
 {title&&<title>{title}</title>}<g transform="translate(0 1) scale(.8)"><PipeJ reversed={reversed}/></g>
 <g fontFamily="var(--font-figtree),Figtree,Arial,sans-serif" fontWeight="800">
 <text x="174" y="84" fontSize={largerWordmark ? 80 : 74} fill={reversed?"#fff":"#12345b"} textLength={largerWordmark ? 665 : 610} lengthAdjust="spacingAndGlyphs">R.S. JOHNSON</text>
 <text x="177" y="144" fontSize={largerWordmark ? 59 : 53} letterSpacing="6" fill={reversed?"#8ec6eb":"#087bcc"}>PLUMBING</text>
 </g></svg>;
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
