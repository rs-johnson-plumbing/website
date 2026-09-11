"use client";

import { conceptTwo as copy, team, site } from "@/lib/content";
import { C2PageHero } from "../sections/C2PageHero";
import { C2Apart } from "../sections/C2Apart";
import { C2Reviews } from "../sections/C2Reviews";
import { C2FinalCta } from "../sections/C2FinalCta";
import { C2Button } from "../ui/C2Button";
import { C2Icon } from "../ui/C2Icon";
import { C2Photo } from "../ui/C2Photo";

export function C2Team() {
  const page = copy.team;
  const ryan = team.members.find((member) => member.featured) ?? team.members[0];

  return (
    <div className="c2-team">
      <C2PageHero
        eyebrow={page.hero.eyebrow}
        headingLines={page.hero.headingLines}
        lead={page.hero.lead}
        slot="crewGroup"
        actions={
          <>
            <C2Button href={site.phone.tel} icon="phone" trailingIcon={null} data-track="call-hero">
              {copy.ui.callNumber}
            </C2Button>
            <C2Button href="/services" variant="outline" className="c2-btn--quiet">
              {copy.homeowners.services.seeAll}
            </C2Button>
          </>
        }
      />

      <section className="c2-section c2-section--paper" aria-labelledby="c2-owner">
        <div className="c2-wrap c2-owner">
          <div className="c2-owner-photo">
            <C2Photo slot="ownerPortrait" sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
          <div>
            <p className="c2-eyebrow">{page.ownerHeading}</p>
            <h2 id="c2-owner" className="c2-h2">
              {ryan.name}
            </h2>
            <p className="c2-owner-title">{ryan.title}</p>
            <p className="c2-owner-bio">{ryan.bio}</p>
            <ul className="c2-owner-badges">
              {(ryan.badges ?? []).map((badge) => (
                <li key={badge}>
                  <C2Icon name="check" size={16} />
                  <span>{badge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>


      <C2Apart />
      <C2Reviews heading={copy.homeowners.reviews.heading} />
      <C2FinalCta />
    </div>
  );
}
