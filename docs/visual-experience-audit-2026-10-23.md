# Visual experience audit + improvement map (2026-10-23)

Input directive: owner "ReTech Website — Visual Experience & Interaction
Enhancement" (photography art direction, interactive homepage, project
enrichment, hero concepts). Companions: `docs/imagery-asset-register.md`
(RT-20 inventory of record), `docs/imagery-replacement-proposal.md`
(8 owner-marked rows). This doc is the page-by-page improvement map and
the duplication/quality findings for the new round. Commit-bank only;
production release stays frozen (main = staging).

## A. Findings

### A1. Duplication map (by file, all locales share assets)

| File | Used on | Refs | Verdict |
| --- | --- | --- | --- |
| `stock/analytics-dashboard.webp` | every `/industries/[slug]` band (6 pages) + mining case study dashboard+mobile slots + blog inline figure | 4 | Worst offender: one dashboard photo carries 3 surface types and 8 URLs. Splits into per-industry bands + mining-only product slot. |
| `stock/code-screen.webp` | all 10 `/services/[slug]` pages (CTA band) + blog inline figure | 2 surfaces × 10 URLs | Services all share one identity. |
| `stock/developer-workspace.webp` | all 10 `/services/[slug]` pages (secondary band) + blog inline | 2 surfaces × 10 URLs | Same templating problem. |
| `stock/team-portrait.webp` | `/about` team section + `/careers` | 2 | About/careers share a posed group shot. |
| `stock/blog-business.webp` | fallback thumbnail for any blog slug without a dedicated image | 1 | By design; OK. |
| `cs-{asset,intel,fintech,ai}-{hero,mobile}.webp` | their own case study (listing card + detail hero/mobile) | — | Intentional reuse across listing/detail (semantically the same project cover). Allowed. |
| mining study | `analytics-dashboard.webp` in BOTH hero and mobile slots | 2 | One photo playing two product roles; needs distinct treatment when real captures land. |

Duplication is by identical file reuse, not near-duplicates: the site has
43 stock files, all visually distinct (no resized re-uploads found by
dimension scan — every file is 1200×800/801).

### A2. Quality findings

1. **Resolution ceiling.** Every `public/images/stock/*.webp` is 1200×800.
   Full-bleed and 50vw band slots render up to ~1400 CSS px (2800 device px
   on retina) from a 1200px source — soft on Retina at the exact sizes the
   new direction wants (large, cinematic). New imports: 2000–2400px wide
   sources, sharp-converted per slot.
2. **Homepage has zero photography.** Sections 01–05 are text-only; 4 of 5
   use the identical `IndexRow` ruled-list pattern (01, 02, 05 as lists, 03
   as a 2-col text checklist, 04 as two text cards). Visual rhythm is
   monotone: hero → text → text → text → text → text → CTA.
3. **Style split between homepage and inner pages.** Homepage (Direction B,
   RT-08) is ruled-editorial: hairline borders, square corners, no
   gradients. Inner pages (`/case-studies`, `/about`, `/services`) still
   run the older language: gradient mesh backgrounds, grid/dot patterns,
   `rounded-2xl` TiltCard/SpotlightCard, cyan/violet gradient placeholders.
   Two design systems on one site.
4. **Case-study presentation is repetitive.** Listing = 5 identical
   alternating 50/50 split cards (same height, same radius, same layout,
   only zig-zag order differs). No per-project character, no
   challenge/solution preview, no editorial proportion changes.
5. **`/services` listing has no imagery at all** (icon + text cards); ten
   services are visually interchangeable.
6. **Orphans still on disk.** The 22 files listed in the asset register
   (`blog-ai-software` … `ux-design.webp`) remain in `public/images/stock/`.
   Deletion stays an owner call; no new page references them.
7. **Case-study product slots are captioned illustrative stock** (correct
   per governance) — real captures remain the Jay-gated Wave 3D item. The
   new round adds *contextual* imagery around them, clearly distinct from
   product claims.

### A3. What already works (keep)

- LitDunes hero + idle-arm pattern (protected; Phase D explores around it).
- Blog thumbnail pipeline: 34 unique per-slug images, source+ID recorded in
  `src/lib/blog-images.ts` — the provenance pattern to extend site-wide.
- IndexRow editorial language and SectionHeader numbering are distinctive;
  the fix is rhythm variety, not abandoning the system.
- Light-surface preference + green identity (owner-ruled).

## B. Improvement map (page by page)

Priority order follows the directive: homepage first, then services/work,
then supporting pages. Hero = Phase D, separate.

### B1. Homepage — section 01 Capabilities → interactive explorer

Rebuild `ServicePreview` as a client capability explorer:

- **Desktop (md+):** left = capability index (CRM pillar + 5 capabilities),
  right = content panel that swaps per selection: problem domain, what we
  build (from verified service data), technologies, and a contextual
  photograph per capability + link to the full service page. Clicking the
  open capability again collapses it back to the CRM-pillar default view.
- **Mobile:** accessible accordion (button + region pattern), same content,
  image sized to the flow; no horizontal scroll.
- **A11y/motion:** `aria-expanded`/`aria-controls`, full keyboard operation
  (tabs-like arrow-key nav on the index), `usePrefersReducedMotion` gates
  transitions, focus-visible rings.
- Content source: verified `home.capabilities` messages + `services-data`
  (no invented capabilities). CRM keeps the featured emphasis.

### B2. Homepage — section 02 Selected work → cinematic editorial index

- Keep the five verified studies and all facts; change the presentation
  from five identical rows to an editorial rhythm: first study large
  (full-width cinematic cover with overlay title), remaining four in
  varied-width rows, each with a distinct contextual cover image.
- Add challenge/solution one-line preview (from existing `challenge` /
  `solution` fields, trimmed), industry meta, verified tech count — no
  metrics revival.
- Hover/focus: image reveal treatment (scale + scrim shift), respecting
  reduced motion.

### B3. Homepage — section 03 Delivery → engineering-activity imagery

- Keep the six-phase checklist and its artifacts (no timeline reversion).
- Add a full-height contextual photograph column (engineering work in
  progress) so the section stops reading as pure text; phase rows keep
  their numbering and "You see:" artifacts.

### B4. Homepage — section 04 AI approach → differentiated treatment

- Keep the a/b lettered structure (it's content-correct). Give the section
  a distinct visual identity: full-bleed band with one strong image
  (data/AI research setting) and the two blocks as editorial columns over
  it — differentiates it from 01/03 without adding motion gimmicks.

### B5. Homepage — section 05 Engagement + conversion

- Keep three shapes; tighten into a decision-oriented composition: each
  shape gets a "best when" framing from existing copy, plus one clear CTA
  line pointing at /contact (conversion opportunity per directive).

### B6. /services + /services/[slug]

- Listing: give each of the 10 services a distinct contextual image card
  (clustered: CRM/CMS/ERP systems, web, mobile, desktop, AI, consulting)
  instead of icon-only cards.
- Detail pages: replace the two shared bands with per-cluster imagery
  (proposal row 6): data-adjacent subjects for CRM/systems, device-on-desk
  for web/mobile, hardware macro for AI, workshop/whiteboard for
  consulting. One subject per cluster, no adjacent-page reuse.

### B7. /case-studies + /case-studies/[slug]

- Listing: break the identical 50/50 alternation — first study full-width
  cinematic, others varied editorial rows; per-project contextual cover;
  challenge/solution preview; keep "Illustrative visualization" captions
  on product-derived slots.
- Detail: add a contextual photography band (illustrative, captioned)
  between narrative sections; keep all product slots honest.

### B8. /industries/[slug]

- Replace the shared `analytics-dashboard.webp` band with one
  industry-matched editorial photo per industry page (proposal row 7);
  `analytics-dashboard.webp` returns to mining-study-exclusive.

### B9. /about, /careers, /process, /contact

- About: implement proposal rows 1–3 (workspace banner, desk-detail band,
  candid collaboration portrait) at 2000–2400px sources.
- Careers: stop reusing `team-portrait.webp`; distinct workshop/team image.
- Process: implement row 5 (kanban/terminal mid-sprint subject).
- Contact: implement row 4 (calm engineer-at-work or whiteboard discussion).

### B10. Asset registry + provenance (extends RT-20)

- New directory `public/images/photo/` for the new round's assets;
  `src/lib/photography.ts` records per asset: source (Unsplash/Pexels),
  photo ID/page URL, license note, import date, original resolution,
  delivered crops, intended surfaces, and role (contextual vs product).
- Every import visually reviewed before delivery (no sight-unseen imports);
  Unsplash License / Pexels License confirmed per photo page.
- Old `stock/` files not referenced after this round move to the register's
  orphan list (deletion = owner call, same as before).

## C. Execution order

1. Photography curation + import (blocks B2/B3/B4/B6–B9 imagery).
2. B1 Capabilities explorer (independent of photography, but its panel
   consumes the same per-capability images — implement together).
3. B2–B5 homepage sections.
4. B6–B9 inner pages.
5. Phase D hero concepts (isolated prototypes, owner selection).
6. Phase E validation: EN/VI, 375/768/1440/1920 screenshots, interaction
   tests, a11y pass, build + bundle check. Staging push via main only.
