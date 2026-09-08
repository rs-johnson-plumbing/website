import Link from "next/link";
import { site } from "@/lib/content";

type Props = { size?: "header" | "footer"; className?: string };

/**
 * The P-trap J mark, redrawn as vector from the business-card logo, plus the
 * serif wordmark. On phones the header shows the mark alone; the wordmark
 * appears from the desktop breakpoint up. The footer always shows both.
 */
export function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 200 240" fill="none" aria-hidden={title ? undefined : true} role={title ? "img" : undefined} className={className}>
      {title && <title>{title}</title>}
      <path d="M140 22 V150 A35 35 0 0 1 70 150 V138 A24 24 0 0 0 46 114 H18" stroke="currentColor" strokeWidth="34" strokeLinejoin="round" />
      <rect x="112" y="6" width="56" height="18" rx="2" fill="currentColor" />
      <rect x="116" y="112" width="48" height="14" rx="2" fill="currentColor" />
      <rect x="8" y="90" width="16" height="48" rx="2" fill="currentColor" />
    </svg>
  );
}

export function Logo({ size = "header", className }: Props) {
  const isHeader = size === "header";
  const mark = isHeader ? "h-8 w-[27px] lg:h-9 lg:w-[30px]" : "h-7 w-6";
  const word = isHeader ? "hidden lg:inline text-[20px]" : "text-[18px]";
  return (
    <Link href="/" aria-label={`${site.name} home`} className={`flex items-center gap-2.5 text-charcoal hover:no-underline ${className ?? ""}`}>
      <Mark className={`shrink-0 ${mark}`} />
      <span className={`font-serif font-bold whitespace-nowrap ${word}`}>
        {site.shortName}
        <span className="hidden lg:inline"> LLC</span>
      </span>
    </Link>
  );
}
