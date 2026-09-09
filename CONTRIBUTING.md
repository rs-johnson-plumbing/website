# Contributing

This site is maintained by people who are not developers, with help from
Claude Code. These rules keep it safe to edit.

## You may edit, any time

- `content/*.json` — all the words on the site. Prices, hours, bios, reviews,
  FAQs, service descriptions, city lists.
- `public/photos/` — real photos. Follow the names in `public/photos/README.md`
  and update the matching `alt` and `caption` in the content file.

## Ask Daren before editing

- `src/components/` and `src/app/` — layout and code.
- `src/styles/tokens.ts` and `tailwind.config.ts` — colors and type.
- Anything under `.github/`, `scripts/`, or the config files at the root.

## How a change gets to the live site

1. Work on a branch, never on `main`. Claude Code does this for you.
2. Open a pull request. Vercel builds a preview link and posts it on the PR.
3. Check the preview on your phone.
4. Merge. The live site updates in about two minutes.

## Rules the checker enforces

`npm run build` runs `scripts/check-content.mjs`. It fails the build if a
content file is malformed, a service or city is missing a required field, or
copy contains an ampersand, an exclamation point, "same day", or "24/7". It
also prints every remaining `[bracket]` so you can see what still needs a
real value from Ryan.

## Things never to do

- Don't type a value into a bracket unless Ryan confirmed it.
- Don't add a street address.
- Don't change the phone number anywhere but `content/site.json`.
- Don't edit the design export in `design-reference/`. It is history.
