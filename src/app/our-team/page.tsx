import type { Metadata } from "next";
import { team, site, type TeamMember } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { MemberScene } from "@/components/blocks/MemberScene";
import { ServiceIllustration } from "@/components/blocks/ServiceIllustration";
import { IntakeBanner } from "@/components/blocks/IntakeBanner";
import { JsonLd } from "@/components/blocks/JsonLd";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { pageH2 } from "@/styles/headings";
import { ConceptPage } from "@/components/concepts/ConceptPage";
import { C2Team } from "@/components/concept-two/pages/C2Team";

export const metadata: Metadata = pageMetadata({ ...team.page.meta, path: "/our-team" });

const H = pageH2;

/**
 * One plumber, laid out like a service band: the scene on one side (the
 * avatar large until a photo exists), and on the other the illustration
 * of what they mostly do beside their name, the title, the role line, the
 * bio, and Ryan's badges. The scene side alternates down the page; every
 * band stays cream, like the services hub.
 */
function MemberBand({ member, sceneLeft }: { member: TeamMember; sceneLeft: boolean }) {
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.title,
    worksFor: { "@type": "Organization", name: site.name },
  };
  return (
    <section id={member.id} className="scroll-mt-[140px] bg-offwhite text-charcoal">
      <JsonLd data={personLd} />
      <div className="site-width gutter grid grid-cols-1 items-start gap-6 py-10 lg:grid-cols-2 lg:gap-16 lg:py-[60px]">
        <MemberScene id={member.id} title={member.photo.alt} className={cn("order-first", sceneLeft ? "lg:order-first" : "lg:order-last")} />
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-3 lg:gap-4">
            {member.illustration && <ServiceIllustration slug={member.illustration} className="h-14 w-14 shrink-0 lg:h-[72px] lg:w-[72px]" />}
            <div>
              <h2 className="text-h2-m lg:text-h2">{member.name}</h2>
              <div className="text-[15px] font-bold text-slate">{member.title}</div>
            </div>
          </div>
          <div className="text-[17px] font-semibold leading-snug lg:text-[18px]">{member.role}</div>
          <p className="text-[16px] leading-[1.7] lg:text-body">{member.bio}</p>
          {member.badges && (
            <ul className="flex flex-wrap gap-2">
              {member.badges.map((b) => (
                <li key={b} className="inline-flex items-center gap-1.5 rounded-btn bg-sand px-3 py-1.5 text-[13px] font-bold text-charcoal">
                  <Icon name="check-circle" size={14} strokeWidth={2} />
                  {b}
                </li>
              ))}
            </ul>
          )}
          {member.placeholder && <div className="text-[13px] font-semibold text-slate">[Placeholder crew member. Replace with the real name and bio]</div>}
        </div>
      </div>
    </section>
  );
}

/**
 * Our Team: the faces page. Meet the Team, then one band per real plumber
 * (Ryan today; the four placeholder members stay in the content file but
 * do not render until their placeholder flag clears), a short note about
 * the crew, the two How We Work lists, then the Request Service banner.
 */
function ConceptOneTeam() {
  const ryan = team.members.find((m) => m.featured) ?? team.members[0];
  const members = [ryan, ...team.members.filter((m) => m.id !== ryan.id && !m.placeholder)];
  const hidden = team.members.some((m) => m.placeholder);
  const p = team.page;

  return (
    <>
      <Section pad="none" ariaLabelledby="team-h" className="pt-8 lg:pt-12">
        <h1 id="team-h" className="text-[clamp(28px,8vw,32px)] font-bold leading-[1.1] tracking-[-0.01em] lg:text-h1 lg:font-bold">
          {team.heading}
        </h1>
      </Section>

      {/* One band per plumber, scene side alternating */}
      {members.map((m, i) => (
        <MemberBand key={m.id} member={m} sceneLeft={i % 2 === 0} />
      ))}

      {/* The rest of the crew, until their names and photos are real */}
      {hidden && (
        <Section pad="band" ariaLabelledby="crew-h">
          <h2 id="crew-h" className={cn("mb-3", H)}>
            {team.crew.heading}
          </h2>
          <p className="max-w-[640px] text-[16px] leading-[1.7] lg:text-body">{team.crew.line}</p>
        </Section>
      )}

      {/* How we work, one list per audience */}
      <Section tone="sand" pad="band" ariaLabelledby="work-h">
        <h2 id="work-h" className={cn("mb-8 lg:mb-10", H)}>
          {p.howWeWorkHeading}
        </h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {(["homeowners", "builders"] as const).map((k) => {
            const block = team.howWeWork[k];
            return (
              <div key={k}>
                <h3 className="inline-flex items-center gap-2 text-[19px] font-bold lg:text-[20px]">
                  <Icon name={k === "homeowners" ? "house" : "hammer"} size={20} strokeWidth={1.8} className="text-charcoal" />
                  {block.heading}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[16px] leading-snug">
                      <Icon name="check" size={18} strokeWidth={2.2} className="mt-0.5 shrink-0 text-charcoal" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      <IntakeBanner audience="both" />
    </>
  );
}

export default function OurTeamPage() {
  return <ConceptPage one={<ConceptOneTeam />} two={<C2Team />} />;
}
