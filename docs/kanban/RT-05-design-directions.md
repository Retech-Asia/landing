# RT-05 — Two design directions + recommendation (P1, READY for checkpoint)

## Context
Plan §6: direction A "product-led engineering partner" (recommended), direction B
"editorial technical consultancy". Same content + real assets in both. Preserve logo/
brand recognizability. Evaluate LitDunes hero (owner-approved 2026-08-21, 3 refinement
rounds — retain by default; simplify only with cause). Add motion only when it aids
comprehension; never stack tilt + cursor glow + parallax + text rotation together.

Reviewer constraints (2026-10-22): Hero Option A wording as provisional baseline,
Option B retained as genuine alternative; two clearly differentiated standalone
prototypes; identical RT-04 factual content; no generic AI patterns/decorative
chips/gradients/unsupported claims; captures at 375/768/1440; 7-axis comparison;
STOP before site-wide extension.

## Acceptance criteria
- [x] Two working homepage directions (full RT-04 section sequence, not just hero),
      desktop + mobile captures each. `prototypes/enterprise/direction-{a,b}.html`;
      28 captures in `.tmp-audit/rt05/shots/` (local, gitignored).
- [x] Recommendation with readability/trust/conversion/performance reasons.
      `docs/rt05-design-comparison.md` (7 axes + mobile Lighthouse: A 92 /
      LCP 2.6s, B 99 / LCP 1.7s vs baseline 49; same-rig gap is the signal).
- [ ] Owner verdict recorded before any site-wide extension.

## Recommendation (from comparison doc)
Adopt B's design system as RT-06 baseline; decouple hero wording from the design
decision (Option A default = no Jay-gated change; Option B one string per locale
if approved); LitDunes parkable as a non-LCP accent (case-study headers / closing
band) if Jay wants it retained.

## Progress log
- 2026-10-22 created; gated behind owner review of RT-04 copy plan.
- 2026-10-22 built both prototypes, captured 375/768/1440 (hero/services/work +
  5 lower sections each), visual look-pass fixed 2 capture artifacts (rotator
  mid-swap blank; sticky header over element shots). 7-axis comparison +
  recommendation written. Docs-drift ruling 6 applied to content-guidelines
  (source of truth → this repo + Vercel; case-study table → 5 verified
  identities; em-dash governance note). STOPPED for owner checkpoint.
