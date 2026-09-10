# Concept 2: First Design Milestone

Baseline: `c7836fb8c0b9248f4d13fde666775be164fb078f`.

This milestone includes the isolated homepage concept switcher and Concept 2
header, hero, compact proof row, and six service illustrations. The existing
footer and all service, homeowner, builder, and request flows remain available.
The builder band, differentiators, testimonial, and final CTA are the next
design milestone, after Daren reviews these first sections.

## Design Reference

Based on Daren's written handoff and the subsequently supplied
`rs-johnson-concept-2-handoff.html`: navy headline, large gray secondary line,
trust items within the hero, centered services heading, six line illustrations,
and a restrained desktop photograph. The implemented brand takes precedence:
Figtree, blue `#2868A8`, navy `#0D2A4D`, and 8px button corners. The four-word
hero button is intentional: Daren explicitly chose “I Need a Plumber”.

## Preservation and Selection

- The original homepage composition is in `ConceptOne.tsx`, with its page
  metadata and JSON-LD retained in `src/app/page.tsx`.
- Existing Header, Footer, HomeHero, form components, global styles, tokens,
  service content, and API handlers are unchanged.
- Only the selected homepage mounts. Concept state applies exclusively to `/`.
- Selection precedence: valid `?concept=1|2`, then localStorage key
  `rsj-homepage-concept`, then Concept 1.
- Explicit choices update storage and browser history; Back/Forward works.
- Storage exceptions are caught. Direct links work even when storage is blocked.
- Static HTML and no-JavaScript visits retain Concept 1. A layout effect resolves
  the selection before the hydrated paint. On a slow first load, the static
  Concept 1 HTML may briefly appear before JavaScript activates Concept 2.
- The existing sticky bar remounts when concepts change to observe the current
  hero. The switcher rises above the visible mobile bar and remains below dialogs.
- Why Johnson and Reviews currently use working homeowner-page anchors.
- Remodels leads to the existing builder services section, where renovation work
  is represented; no nonexistent remodel route or anchor was introduced.

## Imagery

`public/images/concept-two/kitchen-illustrative.webp` was generated with the
built-in ImageGen tool, then encoded as a 104 KB WebP for the website. It is
visibly labeled as an AI-generated design image and its alt text makes clear
that it does not depict a Johnson project. No real employee is depicted.

Generation prompt:

> Use case: photorealistic-natural. Asset type: single standalone website hero photograph, portrait 4:5, no typography or web UI. Create a warm, quietly beautiful editorial architectural photograph of a real-feeling Midwestern home kitchen, close view of a brushed stainless steel gooseneck faucet and clean white inset sink, off-white lightly textured backsplash, natural oak lower cabinets and a navy cotton tea towel neatly folded at right. Focus on the faucet and accurate functional plumbing fixture, with a softly out-of-focus window and garden greenery in the upper left background. Gentle late-morning natural window light and soft shadows, warm stone and cream tones, authentic tactile materials, restrained residential styling, welcoming lived-in quality. Eye-level three-quarter composition, faucet centered slightly right, enough surrounding kitchen context to feel like a home, modest nice home rather than luxury showroom. Photographic realism, no illustration. No people, no logos, no branding, no lettering, no text, no watermarks, no collage. This is an illustrative design asset, not documentation of a particular company's completed job.

Service drawings are deterministic SVGs in `ServiceDrawing.tsx`; they use the
existing brand tokens and do not modify the original illustration family.

## Validation

Required gates: lint, typecheck, build/content check, route/API/metadata smoke
tests, concept-selection tests, and visual inspection at phone and desktop widths.
`tests/concepts.spec.ts` also checks blocked storage, browser history, existing
request-dialog access, menu Escape behavior, service-link targets, responsive
overflow, image loading, and clearance above the mobile actions.

The content checker now uses Node's `fileURLToPath`, correcting a pre-existing
Windows `C:\C:\...` path failure while preserving its content checks.

Housecall Pro integration remains deferred. Existing forms are prototypes and
do not deliver leads to Ryan. No new ratings or review counts are published.

Daren authorized merging this milestone to main after verification so it can
be reviewed on gojohnsonplumbing.com. Future work should start from main;
repository-required PRs may still be used to land changes there.
