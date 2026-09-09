import { team } from "@/lib/content";
import { PersonCard } from "./PersonCard";
import { SectionHeading } from "@/components/ui/Section";

/**
 * "Meet the Team": the crew as compact cards in one panel. The link to the
 * team page is held back until that page exists. Used on the homepage and the
 * For Homeowners page. Goes dark with the builders toggle.
 */
export function TeamStrip({ id, heading, titleClassName }: { id: string; heading: string; titleClassName?: string }) {
  return (
    <>
      <SectionHeading id={id} title={heading} titleClassName={titleClassName} />
      <div className="grid grid-cols-1 gap-3 rounded-card border border-hairline bg-white p-5 builders:border-darkborder builders:bg-darkcard sm:grid-cols-2 lg:grid-cols-5 lg:gap-6 lg:p-6">
        {team.members.map((m) => (
          <PersonCard key={m.id} member={m} compact />
        ))}
      </div>
    </>
  );
}
