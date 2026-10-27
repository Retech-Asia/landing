# ChatGPT asset requests — 2026-10-27 (services gallery round 2)

Owner directive: the visual treatments for the CRM, Desktop Applications and
Applied AI panels in the homepage services gallery remain unsatisfactory.
Per the asset-ownership law these three requests go to ChatGPT one at a time;
the existing registry captures below stay in place as placeholders until an
approved replacement lands. Nothing is sourced or generated locally.

Panels live in `src/components/sections/home/ServicesGallery.tsx`
(`PANELS`), rendered on a 6-column editorial grid, `auto-rows-[340px]`,
full-bleed image under a black scrim with the panel title bottom-left.
Mobile renders each panel full-width at 16:10. Deliver WebP, self-hosted
(`public/images/photo/`), sharp-converted, DPR-2 resolution targets.

---

## AR-4 — Custom CRM and business systems (panel 1, wide) — FULL PLACEMENT SPEC (owner-requested 10/27, produce this one first)

**Verified geometry** (`ServicesGallery.tsx`, Container max-w-7xl = 1280px,
px-8 at lg → 1216px content; 6-col grid, 20px gaps):

- **Desktop render box:** panel 1 spans 4 of 6 columns = **804×340 css px**
  (aspect 2.36:1). Shown at DPR-2 → **1608×680** delivered pixels.
- **Mobile render box (≤767px):** full-width 16:10 — **358×224 css px** at a
  390px viewport (DPR-2 → 716×448). Same file, `object-cover` CENTER crop:
  from the 2.36:1 master, mobile keeps the **central ~68% of the frame
  width** (x 16%→84%), full height.
- **Master to produce:** **2400×1016 px** landscape (gives ~1.5× headroom
  over DPR-2 + the 1.02 hover scale). Claude integrates via sharp → WebP
  q90 as `public/images/photo/photo-crm-dashboard.webp`.

**Safe zones (both crops must work from the one master):**

- **Subject zone:** the primary screen/people content belongs right-of-center,
  x ≈ 55–80%, y ≈ 15–75% — visible in the desktop full frame AND inside the
  mobile central 68% band.
- **Text zone (keep clean, low-detail):** bottom-left ≈ 55% width × 40%
  height of the frame. A black scrim (from-black/80 → via-black/25 →
  transparent at top) sits over the whole panel and the panel title
  (white serif, ~30px), a 2-line description (white/70, ~14px, max-width
  448px), and an "Explore" mono link render on top of it. Busy detail under
  that region turns the copy unreadable.
- **Edges:** no critical content in the outer 4% — the panel has
  `rounded-lg` corners and a hairline border.

**Intended message:** a real business system in use — structured,
operational software, not an abstract "tech" texture.

**Composition:** a professional desktop CRM/business-dashboard scene
photographed over-the-shoulder or straight-on: believable module layout
(list + record pane + pipeline), realistic SME data density, muted light
room. No stock-smiling-user trope, no floating UI, no logos, no readable
real brand names.

**Replaces:** `/images/photo/photo-crm-laptop.webp` (current placeholder:
generic laptop dashboards — too generic, reads as stock). Placeholder stays
live until the produced asset is approved.

## AR-5 — Desktop applications (panel 4)

- **Placement:** panel 4 (`#capabilities-desktop-app-development`),
  ~598×340 css px desktop (request 1600×910), 16:10 mobile crop.
- **Intended message:** professional desktop software — depth, density, and
  craft of a real workstation-class application.
- **Composition:** a multi-monitor professional desktop application in active
  use (IDE + running app, or a native desktop tool with panels/inspectors),
  dim studio lighting, screen content sharp and believable. No circuit
  boards, no abstract glows.
- **Replaces:** `/images/photo/photo-desktop-workstation.webp` (current
  placeholder: engineer-at-desk stock angle — does not communicate the
  capability).

## AR-6 — Applied AI (panel 5)

- **Placement:** panel 5 (`#capabilities-ai-development`), ~392×340 css px
  desktop (request 1200×1040, near-square), 16:10 mobile crop — center-safe
  composition required (tightest panel).
- **Intended message:** applied AI inside a product — grounded, purposeful
  (retrieval, review, tool use), not sci-fi.
- **Composition:** a product interface moment where AI assists real work —
  e.g. an answer panel with source citations beside a document, or a review
  queue with model suggestions. Calm, editorial, believable SME context.
  No brains/circuits/particle abstractions.
- **Replaces:** `/images/photo/photo-ai-circuit.webp` (current placeholder:
  circuit-board macro — exactly the cliché the owner rejected).
