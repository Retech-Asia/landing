# RT-13 — Responsive, a11y, performance validation (P1, blocked by RT-07..12)

## Context
Repo cadence (roadmap QA law) + plan §13: 375/768/1440, both locales, themes, keyboard,
reduced motion; scroll-through captures (NOT fullPage-only — whileInView sections render
blank in fullPage shots); before/after lab metrics under identical conditions; field CWV
targets LCP ≤2.5s / INP ≤200ms / CLS ≤0.1 where measurable.

## Acceptance criteria
- [ ] Scroll-through screenshot sets per page/width; overflow, sticky overlaps, long-VI text.
- [ ] Lighthouse/lab before-after recorded in `.tmp-audit/` (local-only).
- [ ] Keyboard nav + focus visible + forms errors reachable.

## Progress log
- 2026-10-22 created.
