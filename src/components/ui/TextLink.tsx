import Link from "next/link";
import { Icon } from "./Icon";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  arrow?: boolean;
};

/** Brand-blue text link with an optional trailing arrow. */
export function TextLink({ href, children, className, arrow = true }: Props) {
  const cls = cn("text-link inline-flex items-center gap-1 text-[15px]", className);
  const inner = (
    <>
      {children}
      {arrow && <Icon name="arrow-right" size={16} strokeWidth={2} />}
    </>
  );
  if (href.startsWith("http") || href.startsWith("tel:")) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
