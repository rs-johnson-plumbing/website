# Claude Code kickoff — R.S. Johnson Plumbing website

Paste everything below the line into Claude Code, running in an empty folder that contains `design-reference/` (the unzipped Claude Design export) and the three `.md` files.

---

You're building the marketing website for R.S. Johnson Plumbing LLC, a small plumbing company in O'Fallon, Missouri. Read these before doing anything:

- `rsj-claude-design-master-brief.md` — the full brief: business, audiences, brand, UI rules, every page's structure and copy, and a list of facts that are still unconfirmed and must stay bracketed
- `rsj-homeowner-services-hub-copy.md` — full copy for the `/plumbing` hub page
- `rsj-for-builders-copy.md` — full copy for `/for-builders`
- `design-reference/*.dc.html` — the approved visual design, exported from Claude Design. These are the pixel reference for layout, spacing, type sizes, and colors. They depend on a runtime (`support.js`) and custom tags; do not copy them into the app — port them.

## Stack and conventions

- Next.js 15, App Router, TypeScript, Tailwind. Fully static (`generateStaticParams` for dynamic routes; no server rendering at request time).
- Repo: `github.com/rs-johnson-plumbing/website` (org already exists; initialize git, create the repo with `gh`, push `main`). Hosting: Vercel team "Johnson Plumbing" — the project will be connected there; every push to `main` is production, every branch is a preview.
- Production domain: `https://gojohnsonplumbing.com` — use it for canonical URLs, the sitemap, Open Graph URLs, and JSON-LD `url`. Read it from a single `SITE_URL` constant in `site.json`. The business name stays "R.S. Johnson Plumbing LLC" everywhere; only the URL changes. Footer email placeholder is `[email]` until a domain mailbox exists.
- Design tokens in `src/styles/tokens.ts` and `tailwind.config.ts`: off-white `#F7F5F0`, charcoal `#2B2B2B`, brand blue `#2F6FE0`, muted slate for secondary text. Font: Manrope (headings and body), Georgia only for the logo wordmark.
- UI rules from the brief are hard constraints: 8px button radius, one filled button per section, Title Case button labels, sentence case everything else, no ampersands, equal-baseline columns, `tel:3142201827` on every phone button, one H1 per page.
- **Content lives in `/content` as JSON (or MDX where prose is long): `services.json`, `cities.json`, `team.json`, `reviews.json`, `faqs.json`, `projects.json`, `site.json` (name, phone, hours, tagline, footer).** Components never contain copy; they render content. This is non-negotiable — a non-developer will maintain the site by editing these files.
- Shared components: `Header`, `Footer`, `StickyMobileBar`, `TrustBar`, `ActionBlock`, `ServiceCard`, `PersonCard`, `ReviewCard`, `ProjectCard`, `FAQ`, `ClosingCTA`, `JsonLd`.
- Images: `next/image`, files in `/public/photos/` with the naming convention `crew-<firstname>.jpg`, `project-<city>-<nn>.jpg`, `site-<description>.jpg`. Alt text comes from the content files. Until real photos exist, use a neutral placeholder component that shows the intended caption — never a large empty block.

## Pages and routes

| Route | Source |
|---|---|
| `/` | `RS Johnson Plumbing Homepage.dc.html` |
| `/plumbing` | `Homeowner Services.dc.html` + hub copy file |
| `/plumbing/[service]` | template; 8 entries in `services.json` |
| `/for-builders` | `For Builders.dc.html` + builders copy file |
| `/service-area` | brief §10 |
| `/service-area/[city]` | template; 6 Tier 1 cities in `cities.json` |
| `/our-team` | brief §11 (bios included there) |
| `/reviews` | brief §12 |
| `/contact` | brief §13 |

The mobile hero: use the "Situation cards" pattern from the brief's mobile section — no stacked full-width buttons; sticky bottom bar with Call and Book.

## SEO layer (build in from the start)

- `generateMetadata` on every route with patterns: home `"Plumber in O'Fallon, MO | R.S. Johnson Plumbing, Master Plumber"`; services `"[Service] in St. Charles County | R.S. Johnson Plumbing"`; cities `"Plumber in [City], MO | R.S. Johnson Plumbing"`. Descriptions from the content files, 150–160 chars.
- JSON-LD components: `Plumber` (LocalBusiness) on `/`, `/plumbing`, `/contact` with `areaServed` from `cities.json`, `founder` Ryan Johnson, `hasCredential` "Missouri Master Plumber"; `Service` on each service page; `FAQPage` wherever an FAQ block renders; `Person` on team cards.
- `app/sitemap.ts` and `app/robots.ts` generated from content. Canonical URLs. Open Graph tags with a default image.
- GA4 via `@next/third-parties` with click events on every `tel:` link and every Book / Request a Bid button. Vercel Analytics.

## Lead intake (stub now, wire later)

- "Book Online" → placeholder for the Housecall Pro booking widget; make it a single component so the embed snippet drops in once.
- "Message Us" and "Request a Bid" → forms posting to route handlers at `/api/message` and `/api/bid`. For now, log and return success; leave clear TODOs for the Housecall Pro webhook and Resend notification. Bid form includes a plans upload — stub with Vercel Blob.
- Add Cloudflare Turnstile or Vercel bot protection to both forms.

## Repo hygiene for the non-developer maintainer

Create `CONTRIBUTING.md` (content changes go in `/content` and `/public/photos`; never edit `/src/components` or `/src/app` without Daren) and `HOW-TO-EDIT.md` with five copy-paste Claude Code prompts: swap a crew photo, add a review, update hours, change a bio, add a project card. Branch protection: PRs required to `main`.

## Order of work

1. Scaffold, tokens, shared components, `Header`/`Footer`/`StickyMobileBar`. Push. Confirm the Vercel preview renders.
2. Homepage, matched to the Design export at 1440 and 390. Stop and show me before continuing.
3. `/plumbing` hub, then the service template + 8 pages.
4. `/for-builders`.
5. `/our-team`, `/reviews`, `/contact`.
6. `/service-area` + 6 city pages.
7. SEO layer, analytics, form stubs, docs.

Keep every unconfirmed fact from the brief's §15 visibly bracketed in the content files. Do not invent an email address, hours, license number, or review counts. When you've finished step 1, stop and report.
