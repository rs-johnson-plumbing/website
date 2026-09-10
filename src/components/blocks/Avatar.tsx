/**
 * Cartoon avatars for the crew cards, in the same style as the service
 * illustrations: charcoal outlines, flat fills, light-blue disc. Ryan's is
 * drawn from his photo (shaved head, short beard, big grin, blue crewneck).
 * The other four are placeholders until the real crew is confirmed; keep
 * them generic. Keyed by team member id.
 */
const C = "#2B2B2B";
const B = "#2868A8";
const T = "#E4ECF6";
const W = "#FFFFFF";

type Look = {
  skin: string;
  hair: "none" | "short" | "cropped" | "swept" | "cap";
  hairColor?: string;
  beard: "none" | "stubble" | "short" | "goatee";
  glasses?: boolean;
  grin?: boolean;
};

const looks: Record<string, Look> = {
  ryan: { skin: "#F1D2BC", hair: "none", beard: "short", hairColor: "#4A3B32", grin: true },
  mike: { skin: "#D9A47E", hair: "short", hairColor: "#2B2B2B", beard: "goatee" },
  tyler: { skin: "#F3D9C4", hair: "cap", hairColor: "#A8763E", beard: "none" },
  chris: { skin: "#8D5A3C", hair: "cropped", hairColor: "#1F1A17", beard: "stubble", glasses: true },
  danny: { skin: "#E0B48F", hair: "swept", hairColor: "#3A2A20", beard: "stubble" },
};

function Hair({ look }: { look: Look }) {
  const h = look.hairColor ?? C;
  switch (look.hair) {
    case "short":
      return <path d="M50 66 c0 -22 12 -34 30 -34 c18 0 30 12 30 34 c-4 -10 -14 -16 -30 -16 c-16 0 -26 6 -30 16z" fill={h} stroke={C} strokeWidth="3" />;
    case "cropped":
      return <path d="M50 64 c0 -20 12 -32 30 -32 c18 0 30 12 30 32 c-6 -8 -16 -12 -30 -12 c-14 0 -24 4 -30 12z" fill={h} stroke={C} strokeWidth="3" />;
    case "swept":
      return (
        <path d="M50 66 c0 -22 12 -36 30 -36 c20 0 32 10 32 30 c-8 -8 -18 -10 -28 -8 c-8 2 -14 6 -20 12 c-6 -2 -10 -2 -14 2z" fill={h} stroke={C} strokeWidth="3" />
      );
    case "cap":
      return (
        <>
          <path d="M52 48 c0 -16 12 -26 28 -26 c16 0 28 10 28 26z" fill={B} stroke={C} strokeWidth="3" />
          <path d="M46 48 h68 a4 4 0 0 1 0 8 h-68 a4 4 0 0 1 0 -8z" fill={B} stroke={C} strokeWidth="3" />
          <path d="M77 36 v-5 M80 31 h4" stroke={W} strokeWidth="3" />
        </>
      );
    default:
      return <path d="M62 40 c6 -6 14 -8 22 -6" stroke={W} strokeWidth="3" opacity="0.7" />;
  }
}

function Beard({ look }: { look: Look }) {
  const h = look.hairColor ?? C;
  switch (look.beard) {
    case "stubble":
      return <path d="M52 72 c2 22 12 32 28 33 c16 -1 26 -11 28 -33 c-4 16 -14 24 -28 25 c-14 -1 -24 -9 -28 -25z" fill={h} opacity="0.45" />;
    case "short":
      return (
        <path d="M51 70 c2 24 12 34 29 35 c17 -1 27 -11 29 -35 c-2 18 -12 26 -29 27 c-17 -1 -27 -9 -29 -27z" fill={h} stroke={h} strokeWidth="2" strokeLinejoin="round" opacity="0.9" />
      );
    case "goatee":
      return <path d="M70 90 c4 6 16 6 20 0 c-2 8 -6 11 -10 11 c-4 0 -8 -3 -10 -11z" fill={h} />;
    default:
      return null;
  }
}

function Person({ look }: { look: Look }) {
  return (
    <>
      {/* shirt */}
      <path d="M18 160 v-18 c0 -16 10 -26 26 -30 l36 -10 l36 10 c16 4 26 14 26 30 v18z" fill={B} stroke={C} strokeWidth="3.5" />
      <path d="M62 104 c4 10 32 10 36 0" fill={look.skin} stroke={C} strokeWidth="3" />
      {/* neck */}
      <path d="M68 86 h24 v20 c-4 6 -20 6 -24 0z" fill={look.skin} stroke={C} strokeWidth="3" />
      {/* ears */}
      <circle cx="50" cy="68" r="6" fill={look.skin} stroke={C} strokeWidth="3" />
      <circle cx="110" cy="68" r="6" fill={look.skin} stroke={C} strokeWidth="3" />
      {/* head */}
      <ellipse cx="80" cy="66" rx="30" ry="34" fill={look.skin} stroke={C} strokeWidth="3.5" />
      <Beard look={look} />
      <Hair look={look} />
      {/* brows and eyes */}
      <path d="M61 56 c4 -5 10 -5 14 -2 M85 54 c4 -3 10 -3 14 2" stroke={C} strokeWidth="3" />
      <circle cx="69" cy="65" r="2.8" fill={C} />
      <circle cx="91" cy="65" r="2.8" fill={C} />
      {look.glasses && (
        <>
          <circle cx="69" cy="65" r="9" fill="none" stroke={C} strokeWidth="2.5" />
          <circle cx="91" cy="65" r="9" fill="none" stroke={C} strokeWidth="2.5" />
          <path d="M78 65 h4 M60 63 l-6 -2 M100 63 l6 -2" stroke={C} strokeWidth="2.5" />
        </>
      )}
      {/* nose */}
      <path d="M80 68 c-3 4 -3 8 1 9" stroke={C} strokeWidth="2.5" fill="none" />
      {/* mouth */}
      {look.grin ? <path d="M65 80 c6 12 24 12 30 0 z" fill={W} stroke={C} strokeWidth="3" /> : <path d="M70 82 c5 5 15 5 20 0" stroke={C} strokeWidth="3" fill="none" />}
    </>
  );
}

export function hasAvatar(id: string) {
  return id in looks;
}

/**
 * The avatar as a bare group in a 160 by 160 box, for placing inside a
 * larger scene (the team page bands). `clipId` keeps the clip path unique
 * when the same face appears twice on a page.
 */
export function AvatarArt({ id, clipId }: { id: string; clipId?: string }) {
  const look = looks[id];
  if (!look) return null;
  const clip = clipId ?? `avatar-clip-${id}`;
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <clipPath id={clip}>
          <circle cx="80" cy="80" r="78" />
        </clipPath>
      </defs>
      <circle cx="80" cy="80" r="78" fill={T} />
      <g clipPath={`url(#${clip})`}>
        <Person look={look} />
      </g>
      <circle cx="80" cy="80" r="76.5" fill="none" stroke={C} strokeWidth="3" />
    </g>
  );
}

export function Avatar({ id, title, className }: { id: string; title?: string; className?: string }) {
  if (!hasAvatar(id)) return null;
  return (
    <svg viewBox="0 0 160 160" fill="none" strokeLinecap="round" strokeLinejoin="round" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true} className={className}>
      <AvatarArt id={id} />
    </svg>
  );
}
