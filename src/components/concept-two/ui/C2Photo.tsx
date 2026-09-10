import Image from "next/image";
import { conceptTwo } from "@/lib/content";

type Slot = keyof typeof conceptTwo.photos;

type PhotoEntry = { src?: string | null; alt: string; illustrative?: boolean; note?: string };

/**
 * A photograph slot. Real files drop in by setting `src` on the slot in
 * content/concept-two.json; until then the slot renders a labeled navy panel
 * at the same crop, so the layout never shifts when photography arrives.
 */
export function C2Photo({ slot, className, priority = false, sizes = "100vw" }: { slot: Slot; className?: string; priority?: boolean; sizes?: string }) {
  const photo = conceptTwo.photos[slot] as PhotoEntry;
  if (!photo?.src) {
    return (
      <div className={`c2-photo-slot ${className ?? ""}`} role="img" aria-label={photo?.alt ?? ""}>
        <svg viewBox="0 0 200 240" fill="none" aria-hidden="true">
          <path d="M140 22 V150 A35 35 0 0 1 70 150 V138 A24 24 0 0 0 46 114 H18" stroke="currentColor" strokeWidth="34" strokeLinejoin="round" />
        </svg>
        {photo?.note && <span>{photo.note}</span>}
      </div>
    );
  }
  return (
    <>
      {/* Served as-is. These are small stand-ins, and the optimizer's WASM
          fallback (no sharp outside Vercel) is slow enough on a CI runner to
          time the hero out. Revisit when real photography lands. */}
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} unoptimized className={className} />
      {photo.illustrative && <span className="c2-photo-note">{conceptTwo.ui.illustrativePhoto}</span>}
    </>
  );
}
