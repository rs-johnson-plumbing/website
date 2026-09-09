# R.S. Johnson Plumbing website — working rules

Read this before changing anything. It is the contract between the people who
maintain this site and the sessions that edit it.

## What this is

Marketing site for R.S. Johnson Plumbing LLC, O'Fallon, Missouri. Next.js 15
App Router, TypeScript, Tailwind 3, fully static. Hosted on Vercel; `main` is
production at https://gojohnsonplumbing.com and every branch gets a preview.

Two audiences: homeowners (the site's first job is homeowner calls and
bookings) and general contractors (a credible second door). Positioning:
owner-operated, you talk to the plumber, same crew every time, a Master
Plumber on every job.

## Where things live

- `content/*.json` — every word on the site. Services, cities, team, reviews,
  FAQs, projects, homepage, hub, site-wide strings. **Copy changes go here and
  only here.**
- `src/components/` — shared components. They render content; they never
  contain copy.
- `src/app/` — routes. `generateStaticParams` for dynamic routes.
- `src/styles/tokens.ts` — colors, type, spacing. Tailwind reads from it.
- `public/logo/` — logo files. `public/photos/` — real photos, named per
  `public/photos/README.md`.
- `docs/` — the brief, page copy, and build plan. `design-reference/` — the
  original design export; history, not a source of truth once a page is built.
- `scripts/check-content.mjs` — validates the content files on every build.

## House rules (hard constraints)

- Sentence case for headings, eyebrows, labels, trust items. **Title Case only
  on button labels** ("Book Service", "Call Now", "Request a Bid").
- **No ampersands. No exclamation points.** Write "and".
- **Never promise "same day" or "24/7".** Ryan has not confirmed either.
- Buttons: 8px radius, never pills. Labels never wrap, three words max. One
  filled blue button per section; the rest outlined. On charcoal sections,
  outlined buttons are white.
- Every phone link is `tel:3142201827`. The number is always live text.
- One H1 per page. Credentials appear once per page.
- Columns share a top baseline. Shared gutter: 64px desktop, 20px mobile.
- **Bracketed facts stay bracketed** until Ryan confirms them: `[hours]`,
  `[##]` years, `[number]` license, `[email]`, `[rating]`, `[count]`, the
  crew's real names and bios, bid turnaround, emergency policy. Never invent
  a value to fill one. `npm run check:content` lists what is still open.
- No street address anywhere. "Based in O'Fallon, MO."
- Business name is "R.S. Johnson Plumbing LLC" everywhere it is written out.
- Brand: off-white `#F7F5F0`, charcoal `#2B2B2B`, brand blue `#2F6FE0` on
  buttons, links, and active states only. Font: Figtree; Georgia only in the
  logo wordmark.

## Workflow

1. One task, one branch, one PR. Keep PRs small and merge the same day.
2. Before pushing: `npm run lint`, `npm run typecheck`, `npm run build`
   (which runs the content check), `npm run test:smoke`.
3. Vercel posts a preview URL on the PR. Check it at phone width first; this
   site is phone-first.
4. Merge to `main` deploys production. Branch protection requires a PR.
5. `NEXT_PUBLIC_SITE_INDEXABLE` gates search indexing. Unset or anything but
   `true` means every page carries `noindex`. Flip it to `true` in Vercel at
   launch.

## SEO patterns (do not change casually)

- Titles: home "Plumber in O'Fallon, MO | R.S. Johnson Plumbing, Master
  Plumber"; services "[Service] in St. Charles County | R.S. Johnson
  Plumbing"; cities "Plumber in [City], MO | R.S. Johnson Plumbing".
- Descriptions 150–160 characters, from the content files.
- JSON-LD: `Plumber` on `/`, `/plumbing`, `/contact`; `Service` per service
  page; `FAQPage` wherever an FAQ renders; `Person` on team cards.
- Canonical URLs on `https://gojohnsonplumbing.com`, from `siteUrl` in
  `content/site.json`.

## For non-developers

See `HOW-TO-EDIT.md` for copy-paste prompts and `CONTRIBUTING.md` for what
you may and may not touch.
