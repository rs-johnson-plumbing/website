import Image from "next/image";
import type { Photo } from "@/lib/content";
import { cn } from "@/lib/cn";

type Props = {
  photo: Photo;
  /** CSS aspect ratio, e.g. "16/10". Keeps the block proportional, never tall. */
  aspect?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Set true once a real file exists in /public/photos. */
  ready?: boolean;
};

/**
 * Real-photo slot. Until a file exists in /public/photos, renders a modest,
 * clearly labeled placeholder showing the intended caption, never a large
 * empty block. Once `ready` is true it renders the image with next/image.
 */
export function PhotoPlaceholder({ photo, aspect = "16/10", className, sizes = "(min-width: 1140px) 45vw, 100vw", priority, ready = false }: Props) {
  if (ready) {
    return (
      <div className={cn("relative overflow-hidden rounded-card border border-hairline-strong", className)} style={{ aspectRatio: aspect }}>
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={photo.alt}
      className={cn(
        "flex items-center justify-center rounded-card border border-dashed border-hairline-strong bg-sand p-6 text-center",
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      <div className="max-w-xs">
        <div className="text-[13px] font-semibold text-slate">Photo</div>
        <div className="mt-1 text-[15px] font-semibold text-charcoal">{photo.caption}</div>
      </div>
    </div>
  );
}
