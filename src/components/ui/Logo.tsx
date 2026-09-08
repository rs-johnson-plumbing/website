import Link from "next/link";
import { site } from "@/lib/content";

type Props = { size?: "header" | "footer"; className?: string };

/**
 * Placeholder logo: a "J" drawn as a P-trap pipe plus the serif wordmark.
 * The real logo file replaces the SVG here once it arrives. On mobile the
 * wordmark drops "LLC".
 */
export function Logo({ size = "header", className }: Props) {
  const mark = size === "header" ? "h-6 w-6 lg:h-[34px] lg:w-[34px]" : "h-6 w-6";
  const word = size === "header" ? "text-[16px] lg:text-[20px]" : "text-[18px]";
  return (
    <Link href="/" aria-label={`${site.name} home`} className={`flex items-center gap-2.5 text-charcoal hover:no-underline ${className ?? ""}`}>
      <svg viewBox="0 0 34 34" fill="none" aria-hidden="true" className={`shrink-0 ${mark}`}>
        <path
          d="M9 4 L9 18 A8 8 0 0 0 25 18 L25 12 L32 12"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={`font-serif font-bold whitespace-nowrap ${word}`}>
        {site.shortName}
        <span className="hidden lg:inline"> LLC</span>
      </span>
    </Link>
  );
}
