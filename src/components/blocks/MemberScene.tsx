import { AvatarArt, hasAvatar } from "./Avatar";
import { cn } from "@/lib/cn";

/**
 * The team page's photo slot: a 4:3 scene in the same style as the service
 * bands, the plumber's cartoon avatar large on the light-blue wall over the
 * sand floor. Swap for the real photo when one exists.
 */
const C = "#2B2B2B";
const T = "#E3ECFD";
const H = "#E3DFD5";
const W = "#FFFFFF";

export function MemberScene({ id, title, className }: { id: string; title: string; className?: string }) {
  if (!hasAvatar(id)) return null;
  return (
    <svg viewBox="0 0 400 300" fill="none" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={title} className={cn("block h-auto w-full overflow-hidden rounded-card border border-hairline-strong", className)}>
      <rect x="0" y="0" width="400" height="300" fill={T} />
      <rect x="0" y="250" width="400" height="50" fill={H} />
      <path d="M0 250 h400" stroke={C} strokeWidth="4" />
      {/* clouds, as on the crew sketch */}
      <g fill={W}>
        <ellipse cx="70" cy="52" rx="30" ry="12" />
        <ellipse cx="90" cy="45" rx="20" ry="12" />
        <ellipse cx="330" cy="70" rx="26" ry="10" />
        <ellipse cx="346" cy="64" rx="18" ry="10" />
      </g>
      {/* the plumber, large, feet on the floor line */}
      <g transform="translate(96 40) scale(1.3)">
        <AvatarArt id={id} clipId={`scene-clip-${id}`} />
      </g>
    </svg>
  );
}
