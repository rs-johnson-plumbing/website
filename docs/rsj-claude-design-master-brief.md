# R.S. Johnson Plumbing — Website design brief

Design a complete, production-ready multi-page website for R.S. Johnson Plumbing LLC. Build it as working responsive HTML (real text, semantic headings with one H1 per page, `tel:3142201827` on every phone button, placeholder anchors for Book Online / Request a Bid / Message Us, descriptive alt text on every image placeholder). Structure every page as stacked full-width sections so it can be imported into Wix and edited section by section. Deliver desktop (1440px) and mobile (390px) for every page, plus a style tile.

Work in chunks. Start with the homepage hero and header only, wait for feedback, then proceed page by page. Do not generate every page at once.

---

## 1. The business

- **Name:** R.S. Johnson Plumbing LLC
- **Owner:** Ryan Johnson, Missouri Master Plumber. ~[##] years in the trade (he said 19 years as of late 2022 — confirm). Company founded ~2022.
- **Crew:** Ryan plus four plumbers. Small, stable, same crew on every job.
- **Based in:** O'Fallon, Missouri. **Do not display a street address.** Use "Based in O'Fallon, MO."
- **Phone:** 314-220-1827 (call or text). This is the only phone number.
- **Email:** appears in the footer only, never as a call to action.
- **Business mix:** ~80% new construction and renovation plumbing for general contractors and builders; ~20% homeowner repairs. **The website's first job is growing the homeowner side to fill schedule gaps, while giving builders a credible door.**
- **Service area:** St. Charles County and West St. Louis County. Cities, in priority order: O'Fallon, St. Charles, St. Peters, Wentzville, Lake St. Louis, Dardenne Prairie (Tier 1 — get their own city pages); Cottleville, Weldon Spring, Chesterfield, Wildwood, Ballwin, Kirkwood, Manchester, Ellisville, Creve Coeur, Town and Country, Clayton, Ladue (listed on the service-area page).
- **Proof points available now:** Nextdoor Neighborhood Favorite 2023; 24 Nextdoor neighbor recommendations; Google reviews to come. Neighbor quotes (approved for use): B.L., Wildwood — "Ryan is wonderful. He's honest, reliable and knows his stuff."; J.R., O'Fallon area — "R.S. Johnson Plumbing… super!"; Neighbor, St. Louis — "R.S. Plumbing is terrific."; K.G., O'Fallon area — "I recommend R.S. Johnson Plumbing LLC."; A.S., Chesterfield — recommended R.S. Johnson to a neighbor who needed a plumber fast (paraphrase).
- **Booking:** the "Book Online" action will embed the Housecall Pro booking widget. "Message Us" and "Request a Bid" are short forms that will feed Housecall Pro.

## 2. Two audiences

1. **Homeowners** needing repairs — water heaters, leaks, drains and sewer, toilets and faucets, remodel plumbing, gas lines, sump pumps. Often on a phone, sometimes in an emergency. They want to call or book in one tap.
2. **General contractors and builders** evaluating a plumbing subcontractor for new construction and renovation, rough-in through trim. They usually arrive by referral and are validating; they want to see capability, the crew, and how to reach Ryan.

The whole site should make both groups feel they already know the crew before meeting them. Positioning against large local competitors: **owner-operated, you talk to the plumber, same crew every time, a Master Plumber on every job.**

## 3. Brand and visual direction

- **Logo:** a "J" drawn as a P-trap pipe, with the serif wordmark "R.S. Johnson Plumbing LLC". Use a placeholder mark of that shape. On mobile the wordmark drops "LLC".
- **Palette:** off-white page `#F7F5F0`; dark charcoal `#2B2B2B` for headings, body text, and dark sections; one bright brand blue `#2F6FE0` used **only** for primary buttons and active states; muted slate for secondary text and icons; white for cards. (Blue is eyeballed from the business card — treat as close-enough until the logo file arrives.)
- **Type:** Inter or Manrope for everything except the logo. Headlines 500–600 weight. Body 18px desktop / 16px mobile, line-height 1.6. H1 48–52px desktop, 32px mobile.
- **Tone:** trustworthy local trade professional — clean, a little warm. Not a national franchise, not corporate SaaS, not clip-art.
- **Photography:** real-photo placeholders only, with descriptive labels (crew in company shirts, marked trucks, actual jobs). Never stock-style families or models. Photos do not exist yet; any placeholder must be clearly labeled and kept modest in size — never a large empty beige block.

## 4. Non-negotiable UI rules

- Buttons are rectangles with 8px corner radius, never pills. Labels never wrap and are three words max.
- **Button labels in Title Case** ("Book Online", "Call Now", "Request a Bid"). **Everything else in sentence case** — headings, eyebrows, labels, trust items. No ampersands, no exclamation points.
- One filled blue button per section; all others outlined. On charcoal sections, outlined buttons are white.
- Side-by-side columns share the same top baseline, equal padding, and equal headline size. Never one column top-aligned and its neighbor vertically centered.
- Header, hero, and all sections share the same horizontal gutter: the logo's left edge aligns with the content's left edge; the header button's right edge aligns with the content's right edge.
- Phone number is always live text, never in an image.
- **Credentials appear exactly once per page** — in the trust bar — never repeated in the hero and again in a card.
- Keep bracketed text (e.g. `[hours]`, `[##]`) visibly bracketed; those are unconfirmed facts.

## 5. Shared header and footer

**Header (desktop, 80px, sticky):** logo left. Right-grouped: five nav links — For Homeowners · For Builders · Service Area · Our Team · Reviews — 16px medium, 32px apart, then a 40px gap, then a filled blue button "Call or Text 314-220-1827" on one line. Current page link gets a subtle underline.

**Header (mobile, 60px):** logo mark 24px + wordmark "R.S. Johnson Plumbing" 16px on the left; filled blue "Call" button (36px tall) and a hamburger on the right. Plus a **sticky bottom bar** on every page with two buttons: "Call" (filled) and "Book" (outlined).

**Footer:** three columns — business name and "Based in O'Fallon, MO", phone, email; services list; the service-area city list; links to Nextdoor and Google reviews. Bottom line: "R.S. Johnson Plumbing LLC · Missouri Master Plumber License #[number] · Licensed and insured".

---

## 6. Homepage

### Hero (build this first)
Full-width off-white section, content left 55%, photo right 45%, top-aligned.

Left:
- Small rounded pill with star icon: "Nextdoor Neighborhood Favorite 2023"
- H1: "Plumbing for homes and job sites in St. Charles County"
- One line: "Master Plumber Ryan Johnson and crew, based in O'Fallon. Emergency and scheduled service."
- Two buttons on one row: filled blue **Book Online**, outlined **Call 314-220-1827**
- Text link in brand blue beneath: "Builders and contractors: request a bid →"
- Nothing else.

Right: photo placeholder labeled "R.S. Johnson truck with Ryan and crew, three-quarter view", bleeding to the right edge. Keep it proportional to the text column — no taller than the left content.

Mobile: pill, H1 (32px), line, the two buttons side by side, builder link, then the photo. No persona switcher.

### Trust bar
Directly under the hero. Full width, 1px hairline top and bottom, 20px vertical padding. Four items evenly spread so the first aligns with the logo and the last with the header button, each with a 36px light-blue-tinted circle containing an outline icon and a 16px label: Missouri Master Plumber · Licensed and insured · Upfront pricing · You talk to the plumber. (On mobile: 2×2 grid.)

### Services grid — "What we fix and install"
Heading row: heading left, text link "See All Services →" right-aligned to the gutter. One muted line under the heading: "Repairs and installs for homes across St. Charles and St. Louis County." Eight cards, 4×2 desktop / 2×4 mobile, hairline border, 24px padding, left-aligned: a 40px light-blue rounded square with an outline icon top-left; service name 18px medium; one 15px muted description; a small "Learn more →" link. One consistent outline icon set (Lucide or Tabler), same stroke weight throughout the site.

| Service | Description |
|---|---|
| Water heaters | Repair, replacement, tankless |
| Leaks and repairs | Pipes, valves, fixtures |
| Drains and sewer | Clogs, camera inspection, main lines |
| Toilets and faucets | Repair and replacement |
| Bath and kitchen remodel | Rough-in to fixture set |
| Gas lines | New runs, repairs, appliance hookups |
| Sump pumps | Install, replace, battery backup |
| Emergency plumbing | Leaks, no hot water, backups |

### Builders band
Slim full-width charcoal strip, white text. Left: building icon, bold "Builders and contractors", then "New construction and renovation plumbing, rough-in through trim. Custom homes, spec builds, whole-house remodels. Same crew start to finish." Right: outlined white button "Request a Bid".

### Who shows up
Two columns. Left: heading "Here's who shows up at your door", three lines with check icons (Licensed and background-checked · Marked truck and company shirt · Text before we arrive), one line "No call center, no rotating subcontractors — the crew on this page is the crew at your door.", outlined button "Meet the Team". Right: photo placeholder "Whole crew in front of two trucks", modest height.

### Recent builder work
Heading. Three text-only project cards (image slot at top collapsed to zero height for later), each with a small blue city label, bold project type, two lines of scope: Chesterfield / Custom home / "Full rough-in through trim, 4.5 baths, tankless water heater [placeholder]"; Town and Country / Whole-house remodel / "Master bath and kitchen re-plumb, new fixtures throughout [placeholder]"; O'Fallon / Spec build / "Underground through trim on a 3-bath two-story [placeholder]". Beneath: one contractor quote card with placeholder text and "— [Name], [Builder company], [City]".

### Our promises
Four cards, hairline border, outline icon, bold promise, one supporting line: "We show up when we say" / "You get a text with a name and ETA before we arrive"; "Price before we start" / "Upfront pricing, no surprises on the invoice"; "Cleaner than we found it" / "Shoe covers, drop cloths, and we haul out what we bring in"; "You talk to the plumber" / "Owner-operated — Ryan answers the phone, not a call center".

### Reviews — "What neighbors say"
Summary row with two tiles: "Nextdoor · Neighborhood Favorite 2023 · 24 recommendations" and "Google · [rating] · [count] reviews". Three quote cards (B.L., Wildwood; J.R., O'Fallon; Neighbor, St. Louis — quotes in section 1). Text link "See all reviews →".

### Where we work
Two columns. Left: heading "Where we work", paragraph "Serving St. Charles County and West St. Louis County — O'Fallon, St. Charles, St. Peters, Wentzville, Lake St. Louis, Dardenne Prairie, Chesterfield, Wildwood, Ballwin, Kirkwood, and surrounding communities.", outlined button "See All Areas". Right: flat map placeholder centered on O'Fallon.

### Common questions
Two columns: heading and one line left; five accordions right, first expanded: "What areas do you serve?" (answer lists the cities above); "Do you handle emergencies?"; "Do you work with builders and contractors?"; "Are you licensed and insured?"; "How does pricing work?"

### Closing CTA
Charcoal strip: "Need a plumber?" · filled blue "Call or Text 314-220-1827" · outlined white "Book Online" · line "Mon–Sat [hours] · Emergency line [confirm]".

---

## 7. Homeowner Services hub (`/plumbing`)

A long-form content page (~2,000 words) built for search. Use the copy provided separately (file `rsj-homeowner-services-hub-copy.md`) verbatim.

- **Hero, two columns:** left 55% — H1 "Plumbing services in St. Charles County" at 40px on one line; two-sentence intro ("Licensed, insured, and based in O'Fallon. Master Plumber Ryan Johnson and the crew on our team page handle emergency and scheduled plumbing across St. Charles and West St. Louis County — water heaters, drains and sewer, leaks, toilets and faucets, remodels, gas lines, and sump pumps."); trust line with star icon "Nextdoor Neighborhood Favorite 2023 · Licensed and insured in Missouri". Right 45% — white card with hairline border: two action blocks side by side (label "Emergency service" / helper "Leak, no hot water, backed-up drain" / filled "Call Now"; label "Scheduled service" / helper "Repairs, water heaters, remodels" / outlined "Book Online"), text link "Or message us and we'll call you back", a hairline divider, and three small trust items (Missouri master plumber · Licensed and insured · Upfront pricing). Hero padding 48px so the anchor bar is above the fold.
- **Sticky anchor bar** under the hero: twelve items with 16px outline icons — Services · Signs · Water heaters · Drains and sewer · Leaks · Toilets and faucets · Remodels · Gas lines · Sump pumps · Emergency · Why us · FAQ. Active item underlined in blue. Horizontal scroll on mobile.
- **Sections in order:** What we do for homeowners (the eight service cards) · Signs you need a plumber (six items, 3×2, icon + H3 + paragraph) · seven service sections (Water heaters, Drains and sewer, Leaks and repairs, Toilets and faucets, Bath and kitchen remodel, Gas lines, Sump pumps), each a two-column band alternating photo-left/text-right and text-left/photo-right, with the matching service icon beside the H2, a paragraph, a "What we do" bulleted list, and a "[Service] →" link; Gas lines includes an "If you smell gas" callout box · Emergency plumbing (charcoal band, H2, paragraph, bracketed hours, filled "Call 314-220-1827", three "While you wait" cards) · Builders and contractors (short band, outlined "For Builders") · Where we work (two city lists left, map right, Tier 1 cities as links) · Why homeowners call us (five cards) · Common questions (seven accordions) · closing CTA.

## 8. Service page template (`/plumbing/[service]`)
Design once. H1 "[Service] in St. Charles County". Two columns: left — "what we fix" paragraph, bulleted list of 5–6 common problems, "what to expect" paragraph; right — sticky card with the two action blocks and the trust line. Below: "Who'll show up" strip with two crew thumbnails, names, titles; three FAQ accordions; reviews block; closing CTA.

## 9. For Builders (`/for-builders`)
Charcoal hero: eyebrow "For general contractors and builders"; H1 "The plumbing crew your schedule can count on"; line "Rough-in through trim for custom homes, spec builds, and whole-house renovations across St. Charles and West St. Louis County. Licensed, insured, and on site when the framer leaves."; filled blue "Request a Bid", outlined white "View Projects"; four stat tiles: [##] homes plumbed · [##] builder partners · [##] years in the trade · Trade partner since 2022. Then: capabilities by phase (four columns — Bid and plan review · Underground and rough-in · Top-out and inspections · Trim and punch — with a small photo/name card for the rough-in lead beside them); "How we work with builders" (Same crew on your job start to finish · Daily check-in with your super · We schedule and meet inspections); project gallery (six city-tagged cards); one large contractor quote card; Request a Bid form (Company · Contact · Phone · Email · Project address · Project type dropdown · Phase checkboxes · Target rough-in date · Plans upload · Notes; filled "Send Bid Request") with Ryan's photo and "Call or text me directly at 314-220-1827. You'll have a number back within [# business days]." beside it. Optional slim anchor bar: Capabilities · Process · Projects · Who's on site · Request a bid · FAQ.

## 10. Service Area (`/service-area`) and city page template
Hub: H1 "Where we work"; map placeholder; two groups of city cards (St. Charles County; West St. Louis County — lists in section 1); Tier 1 cities link to city pages. City template: H1 "Plumber in [City], MO"; line "Emergency and scheduled plumbing for [City] homeowners and builders"; the two action blocks; two-column body (local context paragraph placeholder, services most requested, one local review card / sticky action card and a city map); "Recent work in [City]" with three photo placeholders; crew strip; closing CTA.

## 11. Our Team (`/our-team`)
H1 "Here's who shows up at your door — and your job site"; line "Every plumber on our crew is licensed, insured, background-checked, and drives a marked R.S. Johnson truck."; group photo placeholder.

**Featured owner card** (two columns): photo "Ryan in company shirt in front of truck" left; right — "Ryan Johnson", "Owner · Master Plumber", role line "Runs every bid, walks every job, and still takes service calls", bio:
> "I started R.S. Johnson Plumbing in [year] after [#] years working for other outfits, because I wanted to do the work the way I'd want it done in my own house: show up when we say we will, leave it cleaner than we found it, and explain what we fixed and why. Most of our work is new construction and remodels for builders across St. Charles County, and we take on homeowner repairs in between. I've lived in O'Fallon since [year] with [family detail], and there's a good chance we've already worked on a house on your street."

Badges: Missouri Master Plumber · [#] years in the trade · O'Fallon since [year]. "Your point of contact" block: filled "Call or Text 314-220-1827" / "Bids, scheduling, or something's gone sideways"; outlined "Request a Bid" / "Builders: plans, phase, target date — number back within [# days]"; outlined "Message Us" / "Homeowners: you'll get a confirmation text and a same-day follow-up".

**Four crew cards** (photo, name, title, role line, two-sentence bio). All four are fictional placeholders to be replaced:
- **Mike Delgado**, Master Plumber — "Leads most of our new-construction rough-ins." — "Mike has been plumbing for 14 years and is the one Ryan puts on a job when the framing crew is moving fast and the underground has to be right the first time. He grew up in St. Peters, and his weekends belong to his daughter's softball schedule."
- **Tyler Brandt**, Master Plumber — "Your service call for water heaters, leaks, and repairs." — "Tyler has been plumbing for 9 years and handles most of our homeowner repair calls — if you've got no hot water on a Sunday, he's the truck you'll see pull up. He lives in Wentzville with his wife and two dogs and is a lifelong Cardinals fan, for better or worse."
- **Chris Okafor**, Master Plumber — "Trim-out and fixture specialist on custom homes." — "Chris has been plumbing for 11 years and does most of our finish work — setting fixtures, tile-side details, and the final walkthroughs with builders and homeowners. He's from Lake St. Louis originally and restores old pickup trucks when he's not on a job."
- **Danny Reyes**, Master Plumber — "Drains, sewer lines, and the jobs nobody else wants." — "Danny has been plumbing for 8 years and runs our drain and sewer work, from camera inspections to full line replacements. He grew up in Dardenne Prairie, still lives a few miles from where he was raised, and is the guy on the crew who brings the donuts."

Then a two-column "How we work" strip — For homeowners (Text before arrival · Company shirt and ID · We clean up) and For builders (Same crew on your job start to finish · Daily check-in with your super · We schedule and meet inspections). Closing CTA.

## 12. Reviews (`/reviews`)
H1 "What neighbors and builders say"; summary tiles (Nextdoor; Google placeholder); filter tabs All · Homeowners · Builders; card grid of the five Nextdoor entries plus three placeholder builder reviews (quote, initials, city, source, date); "Leave a review" strip with outlined "Review on Google" and "Recommend on Nextdoor". Closing CTA.

## 13. Contact (`/contact`)
H1 "Get in touch"; line "Pick the fastest way for your situation."; four cards in a row (2×2 mobile): Emergency service / "Leak, no hot water, backed-up drain" / filled "Call Now"; Scheduled service / "Repairs, water heaters, remodels" / outlined "Book Online"; Send us a message / "We'll call you back the same day" / outlined "Message Us"; Request a bid / "Builders: plans, phase, and target date" / outlined "Request a Bid". Below: compact message form (Name · Phone · City · What's going on; filled "Send Message"), hours "Mon–Sat [hours] · Emergency line [confirm]", "Based in O'Fallon, MO", email, small map. No bare email anywhere else.

## 14. Style tile
Color swatches with hex; type scale (H1 52/32, H2 32, H3 22, body 18/16, small 14); button states (filled default/hover, outlined default/hover, white-outlined on charcoal); the eight service icons and four trust icons as one consistent outline set; the action-block component (label / helper / button) as a reusable pair.

## 15. Facts that are NOT confirmed (keep bracketed)
Years in the trade; company founding year; license number; hours; emergency/after-hours policy; bid turnaround; homes plumbed and builder partner counts; whether "same day" or "24/7" can be promised (do not write either); crew names, titles, and bios; Google rating and count; exact brand hex values.
