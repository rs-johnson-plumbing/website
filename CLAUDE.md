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
  FAQs, projects, homepage, For Homeowners page, services hub, site-wide
  strings. **Copy changes go here and
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

- **Title Case for every label**: headings, eyebrows, section labels, anchor
  labels, card titles, service names, trust items, button labels ("Water
  Heaters", "Here's What Sets Us Apart", "Send Us a Message"). Keep a, an,
  the, and, or, of, to, in, at, for, by, with lowercase unless first or last.
  Body copy, helper lines, and list bullets stay sentence case. The hub's
  "WHAT WE DO" heading is all caps on purpose.
- **No ampersands. No exclamation points.** Write "and".
- **Never promise "same day" or "24/7".** Ryan has not confirmed either.
- Buttons: 8px radius, never pills. Labels never wrap, three words max. One
  filled teal button per section; the rest outlined (the homepage hero, with
  a door per audience, is the one exception). On dark sections, outlined
  buttons are white and filled buttons are charcoal. No button ever has a
  white ground.
- Every phone link is `tel:3142201827`; text links use `smsLink()` from
  `src/lib/content.ts`. On phones the pair is two buttons, Call and Text,
  with no number in the label. On desktop it is one button that shows the
  number. The footer always shows the number as live text.
- One H1 per page. Credentials appear once per page.
- Columns share a top baseline. Shared gutter: 64px desktop, 20px mobile.
- **Bracketed facts stay bracketed** until Ryan confirms them: `[hours]`,
  `[##]` years, `[number]` license, `[email]`, `[rating]`, `[count]`, the
  crew's real names and bios, bid turnaround, emergency policy. Never invent
  a value to fill one. `npm run check:content` lists what is still open.
- No street address anywhere. "Based in O'Fallon, MO."
- Business name is "R.S. Johnson Plumbing LLC" everywhere it is written out.
- Brand: off-white `#F7F5F0`, charcoal `#2B2B2B` for text, slate teal
  `#3F6C78` on buttons, links, active states, illustration strokes, and as
  the ground of the builders pages (`src/styles/tokens.ts` has the family). Font: Figtree everywhere, including
  the logo wordmark (the logo files carry it as outlines).

## Workflow

1. Small tweaks (copy edits, a class change, a content-file update) go
   straight to `main` in one commit. New pages, new components, and anything
   touching more than a few files go on a branch with a PR so Vercel posts a
   preview first. Either way, one task per commit or PR.
2. Before every push, to `main` or a branch: `npm run lint`,
   `npm run typecheck`, `npm run build` (which runs the content check),
   `npm run test:smoke`. A direct push to `main` skips the PR safety net, so
   the local checks are the gate.
3. On a PR, Vercel posts a preview URL. Check it at phone width first; this
   site is phone-first. On a direct push, check production a minute later.
4. Every push to `main` deploys production. Never force-push or delete
   `main`; the ruleset blocks both.
5. `NEXT_PUBLIC_SITE_INDEXABLE` gates search indexing. Unset or anything but
   `true` means every page carries `noindex`. Flip it to `true` in Vercel at
   launch.

## SEO patterns (do not change casually)

- Titles: home "Plumber in O'Fallon, MO | R.S. Johnson Plumbing, Master
  Plumber"; services "[Service] in St. Charles County | R.S. Johnson
  Plumbing"; cities "Plumber in [City], MO | R.S. Johnson Plumbing".
- Descriptions 150–160 characters, from the content files.
- JSON-LD: `Plumber` on `/`, `/services`, `/for-homeowners`, `/contact`; `Service` per service
  page; `FAQPage` wherever an FAQ renders; `Person` on team cards.
- Canonical URLs on `https://gojohnsonplumbing.com`, from `siteUrl` in
  `content/site.json`.

## For non-developers

See `HOW-TO-EDIT.md` for copy-paste prompts and `CONTRIBUTING.md` for what
you may and may not touch.
