import type { TeamMember } from "@/lib/content";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Avatar, hasAvatar } from "./Avatar";
import { JsonLd } from "./JsonLd";
import { site } from "@/lib/content";

type Props = {
  member: TeamMember;
  /** Compact variant for the "Who'll show up" strip: thumbnail, name, title. */
  compact?: boolean;
  /** Emit Person structured data. Off on compact strips to avoid duplicates. */
  withJsonLd?: boolean;
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function PersonCard({ member, compact = false, withJsonLd = !compact }: Props) {
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.title,
    worksFor: { "@type": "Organization", name: site.name },
  };

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        {hasAvatar(member.id) ? (
          <Avatar id={member.id} title={member.photo.alt} className="h-16 w-16 shrink-0" />
        ) : (
          <div
            role="img"
            aria-label={member.photo.alt}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-dashed border-hairline-strong bg-sand text-[15px] font-bold text-slate"
          >
            {initials(member.name)}
          </div>
        )}
        <div>
          <div className="text-[15px] font-bold text-charcoal">{member.name}</div>
          <div className="text-[14px] text-slate">{member.title}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-card border border-hairline bg-white p-6">
      {withJsonLd && <JsonLd data={personLd} />}
      <PhotoPlaceholder photo={member.photo} aspect="4/3" />
      <div>
        <div className="text-[18px] font-semibold">{member.name}</div>
        <div className="text-[14px] font-bold text-slate">{member.title}</div>
      </div>
      <div className="text-[15px] font-medium">{member.role}</div>
      <p className="text-[15px] leading-relaxed text-slate">{member.bio}</p>
      {member.placeholder && <div className="text-[12px] font-semibold text-slate">[Placeholder crew member — replace with real name and bio]</div>}
    </div>
  );
}
