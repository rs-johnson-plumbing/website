# R.S. Johnson Plumbing — website

Marketing site for R.S. Johnson Plumbing LLC, O'Fallon, Missouri.
Production: https://gojohnsonplumbing.com

## Stack

Next.js 15 (App Router, fully static), TypeScript, Tailwind. Hosted on Vercel.
Every push to `main` is production; every other branch gets a preview URL.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (must pass before merging)
npm run lint
npm run typecheck
```

## Before you push

```bash
npm run lint && npm run typecheck && npm run build && npm run test:smoke
```

`npm run build` runs the content checker first. See `CLAUDE.md` for the house
rules, `CONTRIBUTING.md` for what to edit, and `HOW-TO-EDIT.md` for prompts.

## Where things live

- `content/*.json` — every piece of copy: services, cities, team, reviews, FAQs, projects, site-wide strings. Edit these to change the site.
- `public/photos/` — real photos, named per `public/photos/README.md`.
- `src/components/` — shared components. They render content; they never contain it.
- `src/app/` — routes.
- `src/styles/tokens.ts` — colors, type, spacing. Tailwind reads from here.
- `docs/` — the brief, page copy, and the build plan.
- `design-reference/` — the approved Claude Design export. Reference only; not part of the app.

Anything in square brackets in the content files, like `[hours]`, is an
unconfirmed fact. Leave it bracketed until Ryan confirms it.
