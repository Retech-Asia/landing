# Imagery replacement proposal (checkpoint 3, 2026-10-22)

Companion to `docs/imagery-asset-register.md`. This is a proposal only:
nothing is imported, replaced, or deleted until the owner approves specific
rows. All substitutions stay behind the Jay approval gate. The LitDunes hero
and all case-study product slots are out of scope here (case-study slots are
covered by `docs/authentic-imagery-inventory.md`).

## Ground rules (from the asset register, unchanged)

- Licensed sources only: Unsplash (free commercial use, no attribution
  required) and Pexels (free commercial use, record the photo ID).
- Source and photo ID are recorded per asset at import time, in the
  `blog-images.ts` pattern.
- Self-hosted WebP via sharp (fit: cover, attention crop), Next.js Image
  with explicit `sizes`. DPR-2 sharpness verified on Retina before ship.
- Criteria: muted or neutral backgrounds, single focal point, no
  smiling-at-laptop tropes, no dominant purple/navy washes, no AI-generated
  imagery, topic-matched to the surface.
- Candidate photo IDs below are curated candidates for owner review. Each is
  re-verified on the source site at import time (ID, license, resolution)
  before the WebP conversion. No sight-unseen imports.

## Candidate rows

Priority order: large banners first (about), then supporting surfaces.

### 1. About: workspace banner

- Surface: `/about` mission section (large banner, `modern-office.webp`)
- Assessment: generic glass-tower office lobby; reads as stock, weak match
  to an engineering company story.
- Proposed replacement: a quiet, light-filled engineering workspace with
  monitors showing real work context (code or terminal), shot from a slight
  distance, neutral palette with warm wood tones.
- Candidate source: Unsplash `photos/1497366216548-37526070297c`
  (architecture-digestible office interior, muted tones) or search
  "software office minimal desk monitors" filtered to Unsplash+license.
- Resolution: Unsplash originals are typically 4000px+ on the long edge;
  exported WebP at 2400px wide for the full-bleed slot.
- Responsive usage: `fill` + `sizes="100vw"`, object-cover, attention crop.
- Why better: matches the "experienced engineers at work" narrative without
  stock-photo gloss; neutral ground keeps the green identity in control.

### 2. About: office interior band

- Surface: `/about` mid-page band (`office-interior.webp`)
- Assessment: interchangeable corporate interior; no human presence or
  engineering signal.
- Proposed replacement: workspace detail shot (desk, second monitor,
  notebook, coffee) that implies ongoing work rather than staged space.
- Candidate source: Unsplash search "developer desk detail minimal"
  (candidates to shortlist at import: `photos/1593642532744-c3746f48d30f`
  family of desk setups).
- Resolution/export: 2000px wide WebP for the 100vw band.
- Responsive usage: `fill` + `sizes="100vw"`.
- Why better: editorial, calm, and honest; composes with the surrounding
  off-white sections instead of fighting them.

### 3. About: team portrait

- Surface: `/about` team section + reused on `/careers` (`team-portrait.webp`)
- Assessment: posed group photo, corporate-template framing.
- Proposed replacement: candid working session, two or three engineers at a
  screen, shot over the shoulder, natural light, faces not the subject.
- Candidate source: Unsplash `photos/1522071820081-009f0129c71c` (top-down
  team collaboration, muted desk) as primary candidate.
- Resolution/export: 2000px wide WebP.
- Responsive usage: `fill` + `sizes="(max-width: 768px) 100vw, 50vw"`.
- Why better: collaboration reads as practice, not marketing; the muted
  palette sits inside the light-surface system.

### 4. Contact: meeting photo

- Surface: `/contact` side panel (`team-meeting.webp`)
- Assessment: boardroom handshake framing; corporate-cliché for a first
  contact page.
- Proposed replacement: single engineer at work in a calm room, or a
  whiteboard mid-discussion (no direct gaze at camera).
- Candidate source: Unsplash `photos/1517245386807-bb43f82c33c4`
  (workshop/discussion room, neutral) or `photos/1552664730-d307ca884978`
  (small-team working meeting) — verify tone at import.
- Resolution/export: 1600px wide WebP (half-width panel).
- Responsive usage: `fill` + `sizes="(max-width: 1024px) 100vw, 40vw"`.
- Why better: supports "talk to engineers" rather than "talk to salesmen".

### 5. Process: collaboration image

- Surface: `/process` visual breaks (`brainstorming.webp`)
- Assessment: hands-and-sticky-notes stock trope.
- Proposed replacement: terminal or kanban board mid-sprint, implying the
  visible-progress practice the page describes.
- Candidate source: Unsplash search "kanban board sprint" or
  `photos/1555066931-4365d14bab8c` (dark editor screen; verify it does not
  read as a dark band on the light page).
- Resolution/export: 1600px wide WebP.
- Responsive usage: `fill` + `sizes="(max-width: 768px) 100vw, 50vw"`.
- Why better: matches the rebuilt editorial /process (sprints, artifacts)
  instead of generic brainstorm theater.

### 6. Services detail: hero supporting images

- Surface: `/services/[slug]` bands (`code-screen.webp`,
  `developer-workspace.webp`)
- Assessment: acceptable subject, but low-grade compression and stock
  lighting; repeated across pages they template the set.
- Proposed replacement: differentiate per service cluster: CRM/systems pages
  get data-adjacent subjects (clean tables, dashboards, terminals), web and
  mobile pages get device-on-desk subjects, AI pages get abstract-but-real
  hardware (circuit macro, GPU rack). One subject per cluster, no reuse
  across adjacent pages.
- Candidate source: Unsplash `photos/1518770660439-4636190af475` (circuit
  macro) for the AI cluster; per-cluster shortlists curated at import.
- Resolution/export: 1600px wide WebP.
- Responsive usage: existing `fill` slots and `sizes` stay as implemented.
- Why better: differentiation is the owner's stated test for the ten service
  pages; imagery should carry its share of that.

### 7. Industries detail: band image

- Surface: `/industries/[slug]` band (`analytics-dashboard.webp`, shared
  with the mining case-study slots)
- Assessment: same file on two surface types blurs the case-study/product
  boundary the governance draws.
- Proposed replacement: industry-neutral editorial subject per industry
  page (keep `analytics-dashboard.webp` exclusive to the mining study until
  authentic captures land).
- Candidate source: per-industry shortlist at import (one photo per
  industry page, topic-matched).
- Resolution/export: 1600px wide WebP.
- Responsive usage: existing band slot.
- Why better: keeps product imagery separate from editorial photography
  (owner directive, imagery section 6).

### 8. Blog body inline figures (low priority, RT-16 adjacency)

- Surface: blog post bodies (`typing-code.webp`, `cloud-tech.webp`,
  `ai-abstract.webp`, `code-screen.webp` reuse)
- Assessment: inside long-form posts these read as illustrations rather
  than claims; lowest urgency.
- Proposed replacement: fold into the RT-16 editorial audit, one pass, same
  criteria and licensing rules.
- Why better: keeps this proposal's scope on banners and shared surfaces.

## Register corrections found during this pass

- `stock/ux-design.webp` is no longer referenced by any source file. Add it
  to the register's orphan list (deletion remains an owner call, folding
  into the orphan pass once replacements land).
- `analytics-dashboard.webp` is dual-use (mining study + industries band);
  row 7 above resolves the industries half.

## Execution path after approval

1. Owner marks approved rows (or edits briefs).
2. Each approved row: verify photo page (ID, license, resolution), download
   original, sharp-convert to WebP with the standard crop, replace the file,
   record source + ID in a source map file next to `blog-images.ts`.
3. Retina spot-check (DPR 2 screenshots) for each replaced slot.
4. Orphan deletion pass in the same round, with the register updated.
