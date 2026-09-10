# Handoff: site state and SEO review brief (September 10, 2026)

Read this first if you are the session reviewing gojohnsonplumbing.com for
SEO. It says what is live, how the site is built, what is still placeholder,
how to ship a change, and where the SEO work should start. `CLAUDE.md` is
the house-rules contract and still applies to everything below.

## 1. The business and the people

- **R.S. Johnson Plumbing LLC**, O'Fallon, Missouri. Owner Ryan Johnson,
  Missouri Master Plumber. Ryan plus four plumbers. About 80 percent of the
  work is new construction and renovation plumbing for general contractors;
  about 20 percent is homeowner repair. The site's first job is growing the
  homeowner side while giving builders a credible door.
- **Service area**: St. Charles County and West St. Louis County. Tier 1
  cities (meant to get their own pages): O'Fallon, St. Charles, St. Peters,
  Wentzville, Lake St. Louis, Dardenne Prairie. Tier 2 cities are listed in
  `content/cities.json`.
- **Phone**: 314-220-1827, call or text. The only phone number. No street
  address anywhere, by design: "Based in O'Fallon, MO."
- **Proof**: Nextdoor Neighborhood Favorite 2023, 24 Nextdoor
  recommendations, five approved neighbor quotes. Google reviews do not
  exist yet. Contractor quotes are placeholders.
- **Daren** (daren.ungerboeck@gmail.com) directs the work on Ryan's behalf
  and reviews everything on a phone first. Ryan supplies facts and photos.

## 2. Stack, hosting, and how a change ships

- Next.js 15 App Router, React 19, TypeScript, Tailwind 3, fully static
  except three API routes. Repo `rs-johnson-plumbing/website` on GitHub.
  `main` is production at https://gojohnsonplumbing.com on Vercel; every
  branch gets a preview.
- A ruleset blocks direct pushes to `main`. Every change, even a copy edit,
  goes through a PR. The working pattern that has held for 40 PRs:
  1. Branch from `origin/main`, make the change.
  2. `npm run lint`, `npx tsc --noEmit`, `npm run build` (runs the content
     check), `PW_CHROMIUM_PATH=/opt/pw-browsers/chromium npm run test:smoke`
     (18 tests: every route renders, one H1, the tel link is present, no
     console errors, plus the three APIs).
  3. Screenshot with Playwright against `npx next start -p 3239` at 390px
     and 1280px. Phone first.
  4. Commit, push, open the PR, wait for the `checks` run to pass, squash
     merge, then reset the branch onto `main` and confirm the Vercel status
     on the merge commit reads success.
- The remote sandbox cannot reach gojohnsonplumbing.com or any outside
  site (the network policy denies them), so verify production through the
  GitHub API and the Vercel commit status, or serve `main` locally.
- `HOW-TO-EDIT.md` and `CONTRIBUTING.md` explain the same for non-developers.

## 3. What is live right now

Production is `main` at `a3953bd`, after PR #79.

Routes:

| Route | What it is | H1 |
| --- | --- | --- |
| `/` | Homepage. Desktop: single banner, metro-map illustration behind it, two blue doors (Submit Service Request, Submit Bid Request). Phone: serving eyebrow with a pin, headline, two stacked boxes (Submit Request; Call or Text). Then sets-us-apart, popular services, team strip, reviews, contact, intake banner. A homeowner/builder toggle drives several blocks. | Visible headline "Family Owned and Professionally Operated" |
| `/for-homeowners` | Anchor bar, sets-us-apart, homeowner service cards, why-us, team strip, three neighbor quotes, signs you need a plumber, FAQ, service request banner. | Screen-reader-only H1 from `homeowners.seoHeading` |
| `/for-builders` | Same shape for contractors on cream with navy bands: why builders trust us, six builder stages, **Our Recent Projects** (rolling row of five sample projects, tap opens a photo viewer), team strip, What Contractors Say, FAQ, contact, bid banner. | Screen-reader-only H1 from `builders.seoHeading` |
| `/services` | Homeowner services hub: eight service bands (water heaters, leaks, drains and sewer, toilets and faucets, water softeners, gas lines, sump pumps, emergency). Plumber JSON-LD. | Visible |
| `/services/builders` | Builder stages hub: six bands (plans and takeoffs, underground, rough-in, gas runs, water service and sewer, trim and fixture set). Plumber JSON-LD. | Visible |
| `/services/[service]` | One page per homeowner service (8). Title "[Service] in St. Charles County | R.S. Johnson Plumbing". Service JSON-LD. | Visible |
| `/our-team` | Meet the Team: one band per plumber (Ryan first), How We Work lists, banner. Person JSON-LD per member. | Visible |
| `/api/availability`, `/api/bid`, `/api/message` | Intake endpoints. Validate and log only; nothing is sent anywhere yet. | n/a |

Navigation is Home, For Homeowners, For Builders, Services, Our Team. The
footer has contact, Reviews (external Nextdoor and Google links, both still
bracketed placeholders), Services for Homeowners, Services for Builders,
and a plain-text Service Area city list.

**Removed from the live site on purpose, because the pages do not exist
yet**: the Reviews and Service Area nav items, the footer links to
`/service-area` and city pages, and every "See All Reviews" and "Read
Reviews" link. `/reviews`, `/service-area`, `/service-area/[city]`, and
`/contact` are all 404 today. Concept builds of the Reviews and Service
Area pages were made and shelved; the design brief in `docs/` describes
what they should contain.

Intake flows, all modal, opened from the hero, the phone sticky bar, and
the closing banner on every page:

- **Submit Request** asks "Are you a homeowner or a builder?" then hands
  off.
- **Homeowner**: address, "Good news. We service your area." then
  Repair / Replace or Install / Remodel or Project, the specific issue,
  an optional note, phone, done.
- **Builder**: contractor name, New Construction or Renovation, optional
  plans upload up to 4 MB, phone, done.

## 4. Where things live in the code

- `content/*.json` holds every word. `src/lib/content.ts` types it.
  `scripts/check-content.mjs` runs before every build and fails on
  ampersands, exclamation points, "same day", "24/7", or a wrong tel link,
  and prints every remaining `[bracketed]` placeholder (78 today).
- Page metadata is per route in `src/app/**/page.tsx`, from the content
  files: absolute title, description, canonical, Open Graph title and
  description. Root defaults are in `src/app/layout.tsx`.
- Structured data: `src/lib/jsonld.ts` builds the `Plumber` object (name,
  URL, phone, locality, `areaServed` from every city, founder, license
  credential, price range). Rendered on `/`, `/services`, `/for-homeowners`,
  `/for-builders`, `/services/builders`. `Service` on each service page.
  `Person` per crew member on `/our-team`. `FAQPage` where an FAQ renders.
- Every image on the site is an inline SVG illustration (services, band
  scenes, avatars, the metro map, project stand-ins). There are no
  photographs anywhere. `public/photos/README.md` gives the naming
  convention for when they arrive.
- Buttons and links carry `data-track` attributes, but no analytics
  script reads them. Nothing is instrumented.
- `.github/workflows/ci.yml` runs the same checks as step 2 above.

## 5. SEO facts you should verify on day one

These are the findings from this session, not a full audit. Confirm each
against the repo and the live site.

1. **Indexing is gated by an environment variable.** `src/app/layout.tsx`
   sets `robots` to `noindex, nofollow` unless `NEXT_PUBLIC_SITE_INDEXABLE`
   equals `true` in Vercel. Nobody in this session confirmed the Vercel
   setting. If the flag is not set, Google is being told to ignore the
   whole site. This is the first thing to check.
2. **No sitemap and no robots file.** There is no `src/app/sitemap.ts`, no
   `robots.ts`, and nothing in `public/` for either.
3. **No Open Graph image.** Only OG title, description, and URL are set.
   There is no `opengraph-image`, so shares show no picture.
4. **Two pages hide their H1.** `/for-homeowners` and `/for-builders` use a
   screen-reader-only H1 and lead with an anchor bar. The visible heading
   hierarchy starts at H2.
5. **City pages do not exist.** The brief plans "Plumber in [City], MO"
   pages for six Tier 1 cities with meta descriptions already written in
   `content/cities.json` (`cityPages`). Local context paragraphs are
   bracketed placeholders. This is the largest planned local-SEO surface
   and none of it is built.
6. **Reviews, Service Area, and Contact pages do not exist**, and the
   Contact page is where the brief puts the Plumber JSON-LD with hours and
   the message form. Links to them were removed so nothing 404s.
7. **No Google Business Profile link, no Google reviews, no aggregate
   rating.** The footer's Google and Nextdoor links are `[bracketed]`.
   Review schema should not be added until real reviews exist.
8. **Placeholders that affect trust and E-E-A-T**: license number, years in
   the trade, founding year, email, hours, emergency policy, bid turnaround,
   four of the five crew members (names and bios are fictional), all three
   contractor quotes, all five projects (sample names, addresses, and
   descriptions), Google rating and count. Run `npm run check:content` for
   the live list.
9. **Titles and descriptions exist on every route** and follow the patterns
   in `CLAUDE.md`. Descriptions were written to land between 150 and 160
   characters. Worth a pass for keyword targeting per page and for
   duplication across the two hubs.
10. **Everything is an SVG drawing.** No image files, so no image search
    surface, no photo alt text to tune, and no real job-site imagery for
    local relevance until Ryan sends photos.
11. **Performance is likely fine but unmeasured.** Static pages, one font
    (Figtree via `next/font`), inline SVG. The project row and the intake
    flows are client components. No one has run Lighthouse or checked Core
    Web Vitals on production.
12. **No analytics or Search Console.** `data-track` attributes are in
    place for whatever tool is chosen. Search Console is not verified as
    far as this session knows.

## 6. Decisions still open with Daren

- **Review marquee** for the homepage, For Homeowners, and For Builders.
  Three concepts were shown: M1 Ticker (one rolling row of quote cards with
  a pinned Nextdoor proof tile, recommended), M2 Two Lanes (two rows of
  short quote pills moving opposite ways), M3 Lead and Ticker (the big lead
  quote fixed, the rest rolling under it). `MarqueeRail` in
  `src/components/blocks/` is the reusable rolling row and already handles
  swipe, drag, arrows, and reduced motion.
- **Project photos.** Daren wants real pictures in Our Recent Projects.
  The sandbox cannot generate or fetch images; photos have to be pasted
  into the chat or shared through Google Drive. Each project photo in
  `content/projects.json` has an optional `src`; the drawing shows only
  when it is empty.
- Whether "What Contractors Say" was meant to be singular.

## 7. Everything else still parked

- Wire the three API routes to Twilio (text Ryan) and Housecall Pro.
- File storage for plans over 4 MB.
- Google Places autocomplete on the address step.
- The SMS consent wording on the forms.
- The desktop hero's serving-area line (a tagline under the headline or a
  trust strip) and the plumbing-themed map variants (`variant` prop on
  `MetroMap`: pipes, blueprint, valve).

## 8. What the SEO session should produce

Suggested order, so the cheap wins land while the plan is written:

1. Confirm or fix the indexing flag, add `sitemap.ts` and `robots.ts`, add
   an Open Graph image, and make the two hidden H1s visible or restructure
   those pages. These are small PRs.
2. Audit every route's title, description, headings, internal links, and
   structured data against a target keyword map (service plus city, and
   builder plus county). Note where the two hubs and the service pages
   compete with each other.
3. Write the strategic plan: local SEO foundation (Google Business Profile
   as a service-area business, NAP consistency without a street address,
   citations), the city page rollout for the six Tier 1 cities, the
   Reviews and Contact pages, a review-acquisition loop for Google, a
   content plan for the service pages, and measurement (Search Console,
   analytics on the existing `data-track` hooks, Core Web Vitals).
4. Keep every house rule: Title Case labels, no ampersands or exclamation
   points, never "same day" or "24/7", bracketed facts stay bracketed, one
   H1 per page, no street address.

## 9. Session history, for context

PRs #44 through #79 in this session, newest first: dialogs portal to the
body (sticky-bar modal bug), "What Contractors Say", Our Recent Projects
with desktop arrows and a swipeable row, the projects section and viewer,
footer split into homeowner and builder services, Service Area and Reviews
taken off the live site, the Our Team page, the phone hero as two stacked
boxes, the serving eyebrow, the one-button Submit Request chooser, the
metro map behind the desktop hero, the slate-teal palette replacing blue,
copper logo flanges, the builders pages on cream with navy bands, and
the single-banner desktop hero. `git log origin/main` has the rest.
