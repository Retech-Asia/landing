# Imagery asset register (RT-20, Wave 3)

Statuses: **in-use licensed** (provenance recorded) · **in-use unverified**
(needs provenance or caption) · **illustrative** (captioned, awaits real
capture) · **orphan** (no source reference; deletion is an owner decision).
Nothing is deleted or replaced without an owner call.

Checkpoint 3 companions (2026-10-22): per-candidate replacement proposal in
`docs/imagery-replacement-proposal.md`; per-study authentic-capture audit in
`docs/authentic-imagery-inventory.md`. This register remains the inventory
of record.

## Rules

- No stock image is presented as a product capture. Case-study slots carry the
  "Illustrative visualization / Hình ảnh minh họa" caption until Jay approves
  real captures (evidence register, case-studies section).
- No private-system screenshots, ever.
- Self-hosted only (`public/images/**`), WebP, sharp-converted
  (fit: cover, attention crop) — the blog pipeline is the working pattern.
- Licensed sources: Unsplash (free commercial use, no attribution required)
  and Pexels (free commercial use; record the photo ID, e.g. "Pexels #4508751"
  as `blog-images.ts` already does). Record source + ID per asset at import
  time.

## In-use inventory by surface

| Surface | Files (`public/images/stock/`) | Status | Treatment |
| --- | --- | --- | --- |
| Case-study detail + listing cards (5 studies) | `cs-{asset,intel,fintech,ai}-hero.webp`, `cs-{asset,intel,fintech,ai}-mobile.webp`, `analytics-dashboard.webp` (mining, both slots) | illustrative | Captioned; replace with Jay-approved captures (Wave 3D). Mining reuses one file in both slots — split when real captures arrive. |
| Blog thumbnails (34 posts) | `public/images/blog/{slug}.webp` + fallback `stock/blog-business.webp` | in-use licensed | Unsplash/Pexels IDs recorded per asset in `src/lib/blog-images.ts` (Pexels #4508751 documented; extend ID recording to the whole set during RT-16 audit). |
| About page | `modern-office.webp`, `office-interior.webp`, `team-portrait.webp` | in-use unverified | Confirm provenance or re-curate from licensed sources; alt text already names them as workspace/team imagery. |
| Careers, contact, process, services, industries, blog-post bodies | `team-meeting.webp`, `developer-workspace.webp`, `brainstorming.webp`, `typing-code.webp`, `ux-design.webp`, `code-screen.webp`, `cloud-tech.webp`, `ai-abstract.webp` and per-page picks | in-use unverified | Same treatment: record existing provenance where known, else re-curate licensed replacements. |
| Partner/tech logos | `public/images/partners/*.svg`, `public/images/tech/*.svg` | in-use unverified | Brand marks used referentially (technologies we work with) — confirm each name+mark matches an actual engagement claim before any "partners" wording (evidence register: no client-logo strip without permission). |

## Orphans (no source reference; owner decides deletion)

`stock/blog-{ai-software,analytics,circuit,cloud,enterprise,finance,fintech,
healthcare,startup,team-coding,vietnam-outsourcing}.webp` (10 — superseded by
the per-slug blog set; only `blog-business.webp` remains live as fallback),
`cs-{ai,asset,fintech,intel}-dashboard.webp` (4 — superseded by the `-hero`
files in the dashboard slot), `cs-wellness-{hero,dashboard,mobile}.webp`
(3 — belonged to no study; mining now uses `analytics-dashboard.webp`),
`mobile-dev.webp`, `server-infrastructure.webp`, `team-collaboration.webp`,
`vietnam-cityscape.webp` (4), `ux-design.webp` (1 — checkpoint 3 correction:
no source file references it).

## Wave 3D curation plan (owner-gated)

1. Jay supplies real product captures per study → replaces cs-* slots, caption
   removed per slot.
2. Non-product surfaces (about/careers/process/services) re-curated from
   Unsplash/Pexels with per-asset source+ID notes, following the blog-image
   criteria (muted backgrounds, single focal point, no smiling-at-laptop
   tropes, topic-matched). Specific picks need owner eyes — do not import
   sight-unseen.
3. Orphan files deleted in the same pass once the replacement set lands.

## Light-surface coherence (owner comparison delivered 2026-10-22)

`HomeCTA` ships `variant="light"` (off-white ground, brand primary button) as
the default per the owner's surface preference; `variant="dark"` (bg-brand-dark
band) remains a one-prop alternative. Comparison captures:
`.tmp-audit/rt19/homecta-dark-before.png` / `homecta-light-after.png`.

Pending owner copy decisions surfaced by this pass (not changed unilaterally):

- HomeCTA H2 "Let's Ship Your Product On Time, On Budget" carries the same
  delivery-guarantee claim family rewritten out of /process (RT-19); body adds
  "we have done it 50+ times" (owner-gated stat). Both await an owner call.
