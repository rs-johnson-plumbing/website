import { team } from "@/lib/content";
import { Avatar } from "./Avatar";
import { SectionHeading } from "@/components/ui/Section";

/**
 * "Meet the Team": Ryan's avatar (his photo, once one exists), his name and
 * title, and one line about the crew, directly on the band with no panel.
 * The four other plumbers stay off the strip until their real names and
 * photos arrive; the team page says the same. Used on the homepage, For
 * Homeowners, and For Builders.
 */
export function TeamStrip({ id, heading, titleClassName }: { id: string; heading: string; titleClassName?: string }) {
  const ryan = team.members.find((m) => m.featured) ?? team.members[0];
  return (
    <>
      <SectionHeading id={id} title={heading} titleClassName={titleClassName} />
      <div className="flex items-start gap-4 lg:items-center lg:gap-6">
        <Avatar id={ryan.id} title={ryan.photo.alt} className="h-20 w-20 shrink-0 lg:h-24 lg:w-24" />
        <div>
          <div className="text-[18px] font-bold leading-tight lg:text-[20px]">{ryan.name}</div>
          <div className="mt-0.5 text-[14px] font-semibold text-slate builders:text-ondark-muted">{ryan.title}</div>
          <p className="mt-2 max-w-[560px] text-[16px] leading-[1.6] lg:text-body">{team.strip.line}</p>
        </div>
      </div>
    </>
  );
}
