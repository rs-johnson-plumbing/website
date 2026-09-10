# Concept 2 — photography shot list

Concept 2 is photographic where Concept 1 is illustrative. Six slots carry the
whole design. Three of them currently hold crops lifted from the design mockup
(marked **stand-in**); they are low resolution and are labeled "Illustrative
photo" on the page until real files replace them. The other three render a
labeled navy panel at exactly the final crop, so nothing shifts when a photo
lands.

## How to drop a photo in

1. Save the file to the path in the **File** column below.
2. Open `content/concept-two.json`, find the slot under `"photos"`, and set
   `"src"` to that path. Remove `"note"`. Remove `"illustrative": true` once
   the picture is a real R.S. Johnson photograph rather than a stand-in.
3. Update `"alt"` if the picture shows something different from the
   description here. Alt text is read aloud to people using screen readers, so
   describe what is in the frame.

JPG or WebP, sRGB, quality 80. Nothing needs to be wider than 2400px. Any
extension works as long as `"src"` matches the file you added; the three
stand-ins currently in the repo are `.webp`.

Concept 2 serves these files as they are, with no image optimizer in front of
them (`unoptimized` in `C2Photo`), so keep them under about 300 KB each.

## The shots

### 1. Homepage hero — `homeHero` (stand-in in place)
**File:** `public/images/concept-two/hero-plumber-van.jpg`
**Shape:** landscape, at least 2400 x 1400.

A plumber in R.S. Johnson gear (navy hoodie or tee, cap) standing in front of a
marked company van, in the driveway or at the curb of a nice suburban house.
Shot from chest height, subject roughly life-size, arms crossed or relaxed, a
real smile. The van's logo should be readable behind them. Bright overcast or
open shade — no harsh midday shadows on the face.

This is the one shot where the framing matters more than the subject. The
photograph runs behind the headline and its left edge dissolves into the page,
so **the left 40% of the frame has to be house, driveway and planting — no
subject, nothing that matters**. The plumber stands right of centre, cap to
waist, with the van filling the right edge. Leave headroom above the cap.

The phone view has no hero photograph for the same reason. The board's mobile
panel shows the house as a soft backdrop behind the headline; a portrait frame
of the crew member has no such corner to crop, so the phone hero is
typographic until a landscape frame exists.

The stand-in is now cropped from the photographic mobile authority rather than
the desktop one, which frames the same scene wider: the whole torso with the
arms crossed, the house behind, and headroom above the cap. It is still
portrait, so on a wide window the band has to grow to keep him whole, and the
photograph never spreads across the page the way a landscape frame would.

If this is Ryan, say so and we will name him in the alt text. If it is a crew
member, we will keep the alt text generic — we never present a stand-in as Ryan.

### 2. Builder band and builders hero — `builderFraming` (stand-in in place)
**File:** `public/images/concept-two/builder-framing.jpg`
**Shape:** landscape, at least 2000 x 1100.

New-construction wood framing on a clear day: the stud walls and roof trusses of
a house that is framed but not yet sheathed, sun on the lumber, blue sky behind.
Shot from the ground, wide, showing the scale of the structure. An R.S. Johnson
truck or a crew member in the frame is a bonus, not a requirement.

The left third sits under a navy panel on desktop, so keep the subject right of
centre and leave that side expendable.

### 3. Remodel feature — `bathRemodel` (stand-in in place)
**File:** `public/images/concept-two/bath-remodel.jpg`
**Shape:** landscape, at least 2000 x 1200.

A finished bathroom remodel: freestanding tub, glass shower, tile, modern
fixtures (matte black or brushed nickel), daylight from a window. Styled and
clean — this is the aspirational picture on the page. A real job of ours is
much better than a stock bathroom if we have one.

### 4. For Homeowners hero — `homeownerHero` (needed)
**File:** `public/images/concept-two/homeowner-service.jpg`
**Shape:** portrait-ish, about 3:4, at least 1600 x 2000.

A plumber at work inside a customer's home: kneeling under a bathroom vanity
with a wrench on a supply line, or at a water heater in a utility room. Shot
over the shoulder or from the side so the work is visible, tools laid out neatly
on a cloth, the room tidy. Warm interior light. Company shirt visible.

The point of this picture is "a professional in my house, not making a mess."
Same crop rules as the homepage hero: headroom on top, nothing critical on the
left.

### 5. Builders rough-in — `builderHero` (needed, optional)
**File:** `public/images/concept-two/builder-roughin.jpg`
**Shape:** landscape, at least 2000 x 1200.

Inside the framing of a house at rough-in: PEX or copper supply lines and PVC
drain lines run through the studs, drilled plates, a plumber working or a clean
finished run. This is the shot that tells a builder we know the work. Currently
the builders page reuses the framing photo; this would replace it.

### 6. Services hero — `servicesHero` (needed)
**File:** `public/images/concept-two/services-hands.jpg`
**Shape:** portrait-ish, about 3:4, at least 1400 x 1800.

A close crop on a plumber's hands fitting a valve or a fitting onto a copper or
PEX line, shallow depth of field, the background falling away. No faces needed.
Clean hands, clean pipe, good light.

### 7. Crew group — `crewGroup` (needed)
**File:** `public/images/concept-two/crew-group.jpg`
**Shape:** landscape, at least 2000 x 1200.

The whole crew in front of two marked trucks, waist up, company shirts, outdoors
on an overcast day or in open shade. Everyone looking at the camera. This is the
About page hero and the proof behind "the same crew every time."

### 8. Ryan portrait — `ownerPortrait` (needed)
**File:** `public/images/concept-two/ryan-portrait.jpg`
**Shape:** portrait, about 4:5, at least 1400 x 1750.

Ryan, head and shoulders to mid-chest, company gear, outdoors or against a
plain wall, natural expression. This one has to be Ryan — it sits under his name
and bio.

## Notes

- No photograph should show a street address, a house number, or a license
  plate we do not own.
- If a shot is taken on a customer's property, get their okay first.
- The three stand-ins were cropped out of the design mockup. They are good
  enough to judge the layout and not good enough to launch on.
