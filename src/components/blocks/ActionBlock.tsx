import { Button, type ButtonVariant } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Props = {
  label: string;
  helper: string;
  buttonLabel: string;
  href: string;
  variant?: ButtonVariant;
  dark?: boolean;
  track?: string;
};

/**
 * Reusable label / helper / button trio. Used in pairs: "Emergency service"
 * with a filled Call Now beside "Scheduled service" with an outlined Book
 * Online. Both blocks share a top baseline and equal padding.
 */
export function ActionBlock({ label, helper, buttonLabel, href, variant = "filled", dark = false, track }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className={cn("text-[15px] font-bold", dark ? "text-white" : "text-charcoal")}>{label}</div>
      <div className={cn("min-h-[40px] text-[13px] leading-snug", dark ? "text-ondark-helper" : "text-slate")}>{helper}</div>
      <Button href={href} variant={variant} size="sm" track={track} className="mt-1 w-full">
        {buttonLabel}
      </Button>
    </div>
  );
}

/** Two action blocks side by side, the standard homeowner pairing. */
export function ActionBlockPair({ dark = false, blocks }: { dark?: boolean; blocks: [Props, Props] }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {blocks.map((b) => (
        <ActionBlock key={b.label} {...b} dark={dark} />
      ))}
    </div>
  );
}
