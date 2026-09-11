"use client";
import { useRequestBid } from "./C2IntakeContext";
import Link from "next/link";
import { C2Icon, type C2IconName } from "./C2Icon";

type Variant = "filled" | "outline" | "on-dark";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  size?: "md" | "sm";
  block?: boolean;
  icon?: C2IconName;
  trailingIcon?: C2IconName | null;
  className?: string;
  disabled?: boolean;
  "data-track"?: string;
};

/** Concept 2's only button. 8px radius, never a pill, label never wraps. */
export function C2Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "filled",
  size = "md",
  block = false,
  icon,
  trailingIcon = "arrow-right",
  className = "",
  disabled,
  ...rest
}: Props) {
  const requestBid = useRequestBid();
  if (href?.endsWith("#request-a-bid")) { href = undefined; onClick = requestBid; }
  const classes = ["c2-btn", `c2-btn--${variant}`, size === "sm" ? "c2-btn--sm" : "", block ? "c2-btn--block" : "", className]
    .filter(Boolean)
    .join(" ");
  const inner = (
    <>
      {icon && <C2Icon name={icon} size={size === "sm" ? 17 : 19} />}
      <span>{children}</span>
      {trailingIcon && <C2Icon name={trailingIcon} size={size === "sm" ? 16 : 18} />}
    </>
  );

  if (href) {
    const external = /^(tel:|sms:|mailto:|https?:)/.test(href);
    if (external) {
      return (
        <a href={href} className={classes} {...rest}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled} {...rest}>
      {inner}
    </button>
  );
}
