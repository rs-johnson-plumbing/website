import { conceptTwo } from "@/lib/content";
import { C2Button } from "../ui/C2Button";
import { C2Photo } from "../ui/C2Photo";

type Slot = keyof typeof conceptTwo.photos;

/** Editorial split: a photograph against a quiet panel. Not a card. */
export function C2Split({
  id,
  slot,
  eyebrow,
  heading,
  line,
  ctaLabel,
  ctaHref,
  onCta,
  flip = false,
}: {
  id: string;
  slot: Slot;
  eyebrow: string;
  heading: string;
  line?: string;
  ctaLabel: string;
  ctaHref?: string;
  onCta?: () => void;
  flip?: boolean;
}) {
  return (
    <section id={id} className={`c2-split ${flip ? "c2-split--flip" : ""}`} aria-labelledby={`${id}-heading`}>
      <div className="c2-split-photo">
        <C2Photo slot={slot} sizes="(min-width: 1024px) 55vw, 100vw" />
      </div>
      <div className="c2-split-copy">
        <p className="c2-eyebrow">{eyebrow}</p>
        <h2 id={`${id}-heading`}>{heading}</h2>
        {line && <p>{line}</p>}
        <C2Button href={ctaHref} onClick={onCta}>
          {ctaLabel}
        </C2Button>
      </div>
    </section>
  );
}
