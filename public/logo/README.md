# Website logo

The active website artwork is `johnson-plumbing.png`: the owner's selected
Refined Original concept, with JOHNSON PLUMBING and no R.S. prefix.
The source PNG is preserved unchanged at 2169 × 725 pixels.

`src/components/ui/Logo.tsx` uses SVG viewports to display the full wordmark,
standalone pipe mark, and badge from this same artwork. Shared components
cover the header, footer, intake dialog, and final call-to-action mark.

The browser icon in `src/app/icon.svg` contains a resized crop of the pipe
mark. `npm run og:image` regenerates `public/share-image.png` using the
selected artwork. The `rsj-*` assets are retained as historical originals;
they are no longer used by the active website logo components.
