import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";
import type { IconName } from "@/lib/content";

export type ButtonVariant = "filled" | "outlined" | "outlined-dark";
export type ButtonSize = "md" | "sm";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Data attribute picked up by analytics click tracking in step 7. */
  track?: string;
  ariaLabel?: string;
  /** Outline icon after the label (the site convention: label first, icon trailing). */
  icon?: IconName;
};

/**
 * The only button style on the site: 8px radius rectangle, bold label, never
 * wraps. One filled button per section; the rest are outlined. On charcoal
 * sections use "outlined-dark" (white outline). An optional outline icon
 * trails the label: arrow on the forms, phone on Call, message on Text.
 */
export function Button({ href, children, variant = "filled", size = "md", className, track, ariaLabel, icon }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-btn font-bold transition-opacity hover:opacity-[0.88] hover:no-underline";
  const sizes: Record<ButtonSize, string> = {
    md: "px-6 py-3.5 text-[16px]",
    sm: "px-5 py-3 text-[15px]",
  };
  const variants: Record<ButtonVariant, string> = {
    filled: "bg-teal text-white builders:bg-charcoal hover:text-white",
    outlined: "bg-transparent text-charcoal border-[1.5px] border-charcoal hover:text-charcoal builders:border-offwhite builders:text-offwhite builders:hover:text-offwhite builders:bg-transparent",
    "outlined-dark": "bg-transparent text-offwhite border-[1.5px] border-offwhite hover:text-offwhite",
  };
  const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const cls = cn(base, sizes[size], variants[variant], className);

  const inner = (
    <>
      {children}
      {icon && <Icon name={icon} size={size === "sm" ? 18 : 20} strokeWidth={1.8} className="shrink-0" />}
    </>
  );

  if (isExternal) {
    return (
      <a href={href} className={cls} data-track={track} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-track={track} aria-label={ariaLabel}>
      {inner}
    </Link>
  );
}
