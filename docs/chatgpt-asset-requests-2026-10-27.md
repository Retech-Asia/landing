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

## AR-4 — Custom CRM and business systems (panel 1, wide)

- **Placement:** homepage services gallery, panel 1 (`#capabilities-crm-systems`),
  wide span ~804×340 css px desktop (request 1920×812), full-width 16:10 on
  mobile — composition must survive both crops with the subject right-of-center
  (title overlays bottom-left).
- **Intended message:** a real business system in use — structured, operational
  software, not an abstract "tech" texture.
- **Composition:** a professional desktop CRM/BUSINESS-dashboard scene
  photographed over-the-shoulder or straight-on: believable module layout
  (list + record pane + pipeline), realistic SME data density, muted light
  room. No stock-smiling-user trope, no floating UI, no logos, no readable
  real brand names.
- **Replaces:** `/images/photo/photo-crm-laptop.webp` (current placeholder:
  generic laptop dashboards — too generic, reads as stock).

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
