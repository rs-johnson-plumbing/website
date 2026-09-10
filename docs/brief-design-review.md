# Brief: consumer-feel design review

Paste this into a new session on this repository, or tell the session to
read this file and follow it.

---

You are reviewing the live marketing site for R.S. Johnson Plumbing LLC at
gojohnsonplumbing.com, in this repository (rs-johnson-plumbing/website).
Your job is a design review, not a build: come back with a prioritized list
of recommendations for making the site feel like a consumer website rather
than a business application. Do not change any code in this session.

## Background

The business: an owner-operated plumbing company in O'Fallon, Missouri.
Ryan Johnson, Missouri Master Plumber, plus four plumbers. About 80 percent
of the work is new construction and renovation plumbing for general
contractors; about 20 percent is homeowner repair. The site's first job is
to win homeowner calls and bookings in St. Charles County and West St.
Louis County, while giving builders a credible second door. Positioning:
owner-operated, you talk to the plumber, same crew every time, a Master
Plumber on every job. Only contact is 314-220-1827, call or text. No street
address anywhere, by design.

The audience: homeowners, often on a phone, sometimes with water on the
floor, who want to call or book in one tap. Builders arrive by referral to
validate the crew before asking for a bid. Daren directs the work on
Ryan's behalf and reviews everything on a phone first, so phone comes
first in your review too.

What is live: Home, For Homeowners, For Builders, Services (homeowner
hub), Services for Builders (builder hub), eight service pages, and Our
Team. Reviews, Service Area, city pages, and Contact do not exist yet and
their links were removed. Every page ends in a Submit Request banner. A
phone sticky bar carries Call, Text, and Submit Request. Submit Request
asks "Are you a homeowner or a builder?" then runs a short modal intake:
address, category, issue, note, phone for homeowners; contractor, project
type, plans upload, phone for builders. The For Builders page has Our
Recent Projects, a rolling row of five sample projects that open a photo
viewer. All five projects, four of the five crew members, all contractor
quotes, and many facts are placeholders and are marked as such.

The look: off-white page (#F7F5F0), charcoal text, brand blue (#246FF2) on
buttons, links, and illustration strokes, blue on the logo flanges too, sand
bands for rhythm, navy bands on the builders pages. Figtree
everywhere. Buttons are 8px-radius rectangles, outlined blue or filled
blue. Every image on the site is an inline SVG illustration in one
cartoon style: service icons, band scenes, cartoon avatars of the crew, a
metro map behind the desktop hero, and stand-in scenes for project
photos. There are no photographs anywhere. Ryan has not sent any yet.

Rules that will still apply to whatever you recommend (CLAUDE.md has the
full list): Title Case labels, no ampersands or exclamation points, never
promise "same day" or "24/7", bracketed facts stay bracketed, one H1 per
page, no street address, no white-ground buttons. Read CLAUDE.md, docs/handoff-2026-09-10-seo.md, and
docs/rsj-claude-design-master-brief.md before you start.

## How to look

The sandbox cannot reach gojohnsonplumbing.com or any outside site. Build
and serve main locally (npm install, npm run build, npx next start -p
3239) and screenshot every route with Playwright at 390px wide and 1280px
wide, using the Chromium at /opt/pw-browsers/chromium. Open the Submit
Request flow, the builder flow, and a project in Our Recent Projects, and
screenshot those too. Look at the whole page, not just the top.

## What to assess

Go page by page and section by section, and ask of each: does this feel
like something a homeowner would trust and want to call, or does it feel
like an internal tool? Cover at least:

- Imagery. Where does the all-illustration approach hold up, and where
  does it read as clip art or as a software product? Where would real
  photographs matter most (hero, team, projects, service bands)? What
  should Ryan shoot, in what settings, and how many? Be specific enough to
  become a shot list.
- Warmth and voice. Headlines, helper lines, button labels, the intake
  questions. Where is the copy corporate or generic, and what would a
  neighbor-to-neighbor voice sound like instead?
- Tells of a business application: cards on everything, chips, anchor
  bars, modal wizards, dashboard-like grids, uniform 8px rounding, dense
  uniform sections. Which of these are working and which should go.
- Hero and first screen on a phone. Does it feel like a local company or
  a product landing page?
- Color and contrast. Is the blue doing too much? Where would a warmer or
  more human accent help without breaking the palette rules?
- Typography and density. Scale, weight, line length, whitespace, how
  much is on screen at once on a phone.
- Motion. The rolling project row and the intake animations: charming or
  gimmicky?
- Trust and social proof. Placement and treatment of the Nextdoor proof,
  the quotes, the license line, the crew.
- Calls to action. Are there too many buttons? Does the sticky bar plus
  the banners plus the hero feel pushy?
- The intake flows. Does a modal wizard feel like an app? What would a
  more human alternative look like on a phone?
- Team page, footer, and the 404 page.

## What to deliver

A prioritized list of recommendations, published as a page and summarized
in chat. For each one: what to change, why it reads as "business
application" today, what it would look like instead, rough effort (small,
medium, large), and which page or component it touches. Separate quick
wins from bigger moves. Include a photo shot list for Ryan as its own
section. Where two directions are possible, say which you recommend and
why. Do not implement anything; Daren will pick from the list and a build
session will follow.
