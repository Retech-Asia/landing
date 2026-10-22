# RT-18 — Wave 1 brand recovery (P0, owner corrections directive 2026-10-22)

## Context
Owner directive: restore LitDunes as the homepage hero's central visual identity
(removing it for Lighthouse was ruled the wrong trade-off), remove the worst generic
copy, enforce the green brand palette (no #1A1A2E-class large surfaces), drop
unverified satisfaction metrics. Reconciliation map: `docs/rt17-reconciliation-2026-10-22.md`.

## Acceptance criteria
- [x] LitDunes restored via the EXACT approved component (8e10775 byte-identical
      implementation, no recreation), with scrim + bottom fade + industries chips on
      the canvas; static SSR copy kept (Option A visible H1 stands, RT-06 ruling).
- [x] Static fallback for no-WebGL environments (always-rendered brand-wash layer,
      `.lit-dunes-fallback` light+dark) under the opaque canvas; reduced-motion
      static frame intact (probed).
- [x] Flagged eyebrow "Retech Solutions. Custom software from Ho Chi Minh City."
      removed EN+VI (geography stays in JsonLd/footer address only).
- [x] 98% satisfaction claim removed everywhere: dead STATS_BAR deleted, ABOUT_STATS
      entry + statLabels mapping removed, 2026 timeline milestone prose rewritten EN+VI.
- [x] Closing band bg-foreground (#1A1A2E) → bg-brand-dark (established brand-derived
      dark surface, same language as footer/services/faq bands); text opacities tuned
      to a11y 100 (4.5:1+).
- [x] Worst repeated copy lines rewritten EN+VI (technologies.description on services
      + industries, services CTA "craft" line).

## Files
`src/components/sections/home/Hero.tsx`, `LitDunes.tsx`, `HomeCTA.tsx`,
`src/app/globals.css`, `src/messages/{en,vi}.json`, `src/lib/constants.ts`,
`src/app/[locale]/about/page.tsx`, `src/app/[locale]/industries/[slug]/page.tsx`,
`src/app/[locale]/services/page.tsx`.

## Validation (2026-10-22, local build)
- Gates: tsc clean; eslint = 8 known pre-existing errors (untouched files);
  `npx next build` exit 0.
- Probes 26/26 (`.tmp-audit/rt18/probe.js`): EN+VI visible H1, eyebrow absent from
  hero, canvas in hero + sized/painting, fallback layer, chips on canvas, scrim,
  band = rgb(24,107,43), 98%/satisfaction absent, about clean, service line gone,
  reduced-motion static frame, console clean, no h-overflow 1440/375.
- Screenshots: `.tmp-audit/rt18/home-{en,vi}-*.png` (1440/768/375) + raw-dunes
  capture; dune visual parity vs `.tmp-audit/enterprise-baseline/home-1440.png`
  (component unchanged ⇒ same output; prototypes were more saturated experiments,
  not the shipped look).
- **Perf trade-off WITH dunes enabled (owner-mandated measurement):** mobile EN
  perf 81, a11y 100, SEO 92, LCP 5.16s, CLS 0.001, TBT 30ms. Versus dunes-off
  RT-07 state (96/1.9s). Versus the pre-RT-06 dunes baseline (perf 49, LCP 6.0s):
  the restore is 0.8s faster than the old dunes era due to the RT-06 font fix.
  No further tuning applied — identity first, per directive.

## Status
DONE locally 2026-10-22. **Held for owner checkpoint (deploy freeze).** Evidence
pack: `.tmp-audit/rt18/`. Hero copy (H1/standfirst wording), hero stats (50+/30+/5+
open items in evidence register), and any motion additions (rotator/counters) remain
Jay-gated and were NOT changed beyond the directive.
