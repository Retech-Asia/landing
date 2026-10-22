# RT-19 — Wave 2: case-study rebuild + /process editorial (owner checkpoint 2)

## Context
Checkpoint 2 §2/§C directives: case studies rebuilt around challenge → solution →
impact → verified tech → client country with vanity metrics removed, real
screenshots only where approved (never private-system capture); /process rebuilt
editorial with no timeline and a client-experience focus.

## Part B — Case studies (DONE)

### Acceptance criteria
- [x] Vanity metric machinery removed from the model: `results` stat rows,
      `beforeAfter` tables, `BeforeAfterMetric` interface, `AnimatedMetrics` and
      `BeforeAfter` components (deleted; were single-consumer), detail-page
      "Measurable Impact" + "Before & After" sections, listing + industry-page
      stat grids. Numbers carried no business record (e.g. "60% efficiency",
      "99.7% accuracy", "8.5s→1.4s", "35%→89% adoption", "47 DB migrations").
- [x] `keyResults` rewritten EN+VI as qualitative capability statements that
      trace to what was built; impact prose rewrites where numbers/superlatives
      lived ("60% improvement freed the team", "optimal accuracy",
      "converts at a higher rate", "institutional-grade").
- [x] Verified tech replaces stat chips on the listing cards and industry
      cross-links (owner arc: verified tech over vanity numbers).
- [x] `clientCountry?` field added to the model + Project Details render gate
      (client market card) — values are Jay-gated; renders only once set.
- [x] Imagery honesty: detail hero carries an "Illustrative visualization" /
      "Hình ảnh minh họa" caption until approved captures exist; mining study's
      mismatched cs-wellness-* images replaced with analytics-dashboard.webp.
- [x] Review schema stays suppressed (empty testimonials; F3 law holds).
- [x] EN/VI parity on every rewritten string.

### Jay-gated follow-ups (not done, listed for checkpoint)
- Client country per study (5 values).
- Attestation that each study's narrative facts describe real Retech work
  (evidence-register row stands).
- Wave 3D: licensed imagery replacing the cs-* stock sets.

## Part C — /process rebuild (DONE)

### Acceptance criteria
- [x] Timeline machinery removed: 6 numbered phases → 4 editorial groups
      (01 Start with understanding / 02 Decisions made together, before code /
      03 Sprints you can see, quality you can check / 04 Launch day, and the
      days after), client-experience voice, EN+VI.
- [x] Week ranges, progress rail, step markers, pulse/bounce theatrics, zigzag
      connectors, phase icons, spinning gear all removed.
- [x] Claims fixed: "50+ successful projects" dropped from hero lead (stat is
      owner-gated in the evidence register), "ensures on time, on budget, and
      to the highest quality standards" CTA guarantee rewritten to the
      canonical 24h-estimate line.
- [x] Tools grid + FAQ retained (transparency + client experience).
- [x] Deliverables reframed client-side ("What you will see" / "Bạn sẽ thấy gì").

## Files
`src/lib/case-studies-data.ts`, `src/app/[locale]/case-studies/[slug]/page.tsx`,
`src/app/[locale]/case-studies/[slug]/CaseStudyClientComponents.tsx`,
`src/app/[locale]/case-studies/page.tsx`, `src/app/[locale]/industries/[slug]/page.tsx`,
`src/components/case-studies/AnimatedMetrics.tsx` (deleted),
`src/components/case-studies/BeforeAfter.tsx` (deleted),
`src/app/[locale]/process/page.tsx`, `docs/evidence-register.md`.

## Validation (2026-10-22, local build)
- tsc clean; eslint 0 errors (only pre-existing unused-import warnings, count
  reduced on process page 4→2 and listing page unchanged).
- `npx next build` exit 0. Probes: 65/65 pass (`.tmp-audit/rt19/probe-run5.log`)
  — vanity-string scans listing + 5 details × EN/VI, narrative arc, reviewRating
  suppression, illustrative caption, process groups, h-overflow 1440/375,
  console + HTTP clean.
- Screenshots (1440 fullPage + 375, EN+VI): `.tmp-audit/rt19/*-{en,vi}-*.png`.
- Listing + industries pages additionally swapped plain `next/link` to the
  locale-aware Link (see progress log — same probe sweep surfaced it).

## Progress log
- 2026-10-22: Parts B + C implemented after Wave-2 audit (metric inventory,
  consumer map: results/beforeAfter/mobile-image consumers identified before
  deletion; JsonLd review block already suppressed).
- 2026-10-22: Probe triage surfaced a real bug class outside the ticket scope —
  locale-navigation 404s. (1) LocaleSwitcher swapped only the locale prefix, so
  with per-locale slugs live (case studies/services/industries) switching EN↔VI
  on any detail page 404'd; fixed with `src/lib/localized-path.ts` slug-map
  helper wired into the switcher. (2) Six files still used plain `next/link`
  with unprefixed hrefs, which under `localePrefix: "always"` resolve to the EN
  default: VI listing card clicks landed `/en/case-studies/<vi-slug>` → 404
  (server + click-through confirmed; the probe's "console 404" was these card
  prefetches). Swapped to `@/i18n/navigation` Link in case-studies listing,
  industries detail, blog category ×2, contact, render-content (blog body).
  (3) Industries service cross-link pinned `.slug.en` + EN title/subtitle/CTA
  on the VI page — localized. Verified: card click-through stays VI, switcher
  EN↔VI both directions, industries cross-links VI, 65/65 probes.
