import { cn } from "@/lib/cn";

type Tone = "offwhite" | "sand" | "charcoal" | "white";

type Props = {
  children: React.ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  /** Vertical padding preset. Default is 40px top and bottom on desktop (32px on phone); "band" is the same and kept for older call sites. */
  pad?: "default" | "band" | "none";
  ariaLabelledby?: string;
  ariaLabel?: string;
  as?: "section" | "div";
};

const tones: Record<Tone, string> = {
  offwhite: "bg-offwhite text-charcoal builders:bg-charcoal builders:text-offwhite",
  sand: "bg-sand text-charcoal builders:bg-[#242424] builders:text-offwhite",
  charcoal: "bg-charcoal text-offwhite builders:bg-[#1f1f1f]",
  white: "bg-white text-charcoal builders:bg-charcoal builders:text-offwhite",
};

const pads = {
  default: "py-8 lg:py-10",
  band: "py-8 lg:py-10",
  none: "",
};

/**
 * Full-width section with the shared horizontal gutter. Every section on the
 * site uses this so the logo, content, and header button share one left and
 * right edge.
 */
export function Section({ children, tone = "offwhite", id, className, pad = "default", ariaLabelledby, ariaLabel, as = "section" }: Props) {
  const Tag = as;
  return (
    <Tag id={id} aria-labelledby={ariaLabelledby} aria-label={ariaLabel} className={cn(tones[tone], pads[pad], className)}>
      <div className="site-width gutter">{children}</div>
    </Tag>
  );
}

/** Section heading row: H2 left, optional link right, optional muted line under. */
export function SectionHeading({ id, title, action, line, dark = false, titleClassName }: { id?: string; title: string; action?: React.ReactNode; line?: string; dark?: boolean; titleClassName?: string }) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-baseline justify-between gap-5">
        <h2 id={id} className={cn(titleClassName ?? "text-h2-m lg:text-h2", dark && "text-offwhite")}>
          {title}
        </h2>
        {action}
      </div>
      {line && <p className={cn("mt-2 text-[16px]", dark ? "text-ondark-muted" : "text-slate builders:text-ondark-muted")}>{line}</p>}
    </div>
  );
}
