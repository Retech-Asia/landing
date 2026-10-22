# RT-06 — Shared nav/typography/component system (P1, blocked by RT-05)

## Context
Extend the owner-chosen direction (Direction B editorial-enterprise, checkpoint
2026-10-22) into the shared system without breaking the existing 50-ui-primitive
inventory or theme system. Brand identity (green, software-engineering personality)
is preserved; B is the foundation, not a replacement.

## Acceptance criteria
- [x] Keyboard/touch/locale/theme behavior verified on restyled primitives.
- [x] Density + contrast pass at 375/768/1440 (EN+VI).
- [x] No new animation/framework dependency (zero added deps; Framer Motion untouched).

## Files changed (complete inventory)
| File | Change |
|---|---|
| `src/app/[locale]/layout.tsx` | Font system: Inter + Source Serif 4 via next/font/google; locale-split instantiation (EN latin-only / VI latin+vietnamese), ALL `preload:false` — fonts load via CSS unicode-range discovery (3 woff2 on EN, no duplicates) |
| `src/app/globals.css` | `--font-sans`/`--font-display` remapped to the two CSS variables; h1+h2 Source Serif 600; `.font-display-title` added; `--rule`/`--rule-soft` tokens |
| `src/components/ui/Button.tsx` | New `ink` variant (square, uppercase, foreground fill); `rounded-full` scoped to primary/secondary/ghost only |
| `src/components/ui/SectionHeader.tsx` | Optional `number` prop → editorial grid head (serif number+label, serif h2); centered path byte-identical |
| `src/components/ui/IndexRow.tsx` | NEW: ruled editorial index row + `IndexRowList` (renders as Link when `href` set) |
| `docs/rt06-migration-plan.md` | NEW: file-level migration map, non-changes, risk register, validation gate |

Deliberate non-changes: brand green, LitDunes (parked per checkpoint 3), Navbar/Footer
(RT-07 atomic launch), existing Button variants, all RT-03 fixes, all content/copy.

## Validation results (production build, `next start`, 2026-10-22)
- Gates: tsc clean, eslint clean, `npx next build` clean.
- Probe sweep (9 routes × 375/768/1440): no horizontal overflow anywhere; body=Inter +
  serif h1 on every route; VI diacritics render in webfont; mobile menu opens/Escape-closes
  both locales; nav CTA visible; ink/primary buttons keyboard-reachable.
- Regression triage — 3 apparent failures proven PRE-EXISTING (verified against live
  production build): sr-only home H1 (RT-07 swaps to visible Option A H1), /vi/services
  EN H1 "What We Build" (→ RT-08), skip-link-first-tab behind cookie modal + mobile-menu
  focus-not-moved-on-open (→ RT-13 / RT-07).

## Performance gate results (mobile, simulated, production build)
| Metric | Baseline (RT-01) | RT-06 EN | RT-06 VI | Gate | Status |
|---|---|---|---|---|---|
| Perf score | 49–80 | **95** | **92** | ≥90 | PASS |
| FCP | 5.0s | 1.6s | 1.9s | — | improved |
| LCP | 6.0s | **1.9s** | **2.2s** | ≤2.5s | PASS |
| TBT | — | 20ms | 20ms | — | fine |
| CLS | — | 0.001 | 0.006 | ≤0.1 | PASS |
| a11y / SEO | — | 99 / 92 | 99 / 92 | no regressions | PASS |

LCP root cause found AND fixed inside RT-06: with two instantiations per family
(EN + VI branches sharing one CSS variable), next/font emits a separate file copy
per instance — the emitted preload hrefs hashed to files the CSS never referenced,
so EN downloaded every face TWICE (preloaded copy unused + CSS-discovered copy);
under simulated mobile the wasted bytes pushed the font-swap repaint (the hero
tagline, the LCP element) to 6.3s. Fix: `preload: false` on all four
instantiations — discovery-only loading, the path VI already used (VI passed at
LCP 2.2s with the identical hero). EN font requests dropped 6 → 3 and LCP
6.3s → 1.9s. Documented in the layout.tsx preload-law comment.

Retest after fix: probe2 legs 23/24 (single FAIL = pre-existing cookie-modal focus
order, identical on production → RT-13); /en home serif-600 + Inter body confirmed.

## Pre-existing findings routed to owning tickets
- sr-only home H1, mobile-menu focus-on-open, nav launch → **RT-07**
- /vi/services EN H1 → **RT-08**
- skip-link/cookie-modal focus order → **RT-13**

## Commit note
LOCAL COMMIT ONLY — not pushed. Every push to `origin main` deploys production
(Vercel = retech-landing); checkpoint 7 requires owner review before deploy.

## Progress log
- 2026-10-22 created.
- 2026-10-22 implemented (5 source files + migration plan), validated, committed locally.
  Awaiting owner checkpoint review; RT-07 starts after approval.
