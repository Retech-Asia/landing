# RT-06 — File-level migration plan (Direction B system into Next.js)

Status: approved baseline = Direction B (`prototypes/enterprise/direction-b.html`),
owner checkpoints 1-7 (2026-10-22) applied. Principle: incremental, additive,
no wholesale rewrite. Existing pages keep rendering throughout; page-level
re-skins happen in RT-07..RT-11, not here.

## Key architectural fact

The entire typography system hangs on TWO CSS custom properties set by
next/font on `<html>`: `--font-general-sans` (body/UI) and
`--font-instrument-serif` (display). Only `globals.css` consumes them; no
component references them directly (verified by grep). The current EN/VI swap
(GeneralSans→Be Vietnam Pro, Instrument Serif→Playfair Display) exists because
those faces lack Vietnamese subsets.

**Inter and Source Serif 4 both ship `vietnamese` subsets** on Google Fonts.
Swapping the two variables therefore simplifies the locale machinery instead of
complicating it: one font pair for EN+VI, four font instantiations become two,
and the VI preload traps disappear.

## File-level map

| Prototype element | Target file | Change |
| --- | --- | --- |
| Inter body/UI | `src/app/[locale]/layout.tsx` | Replace 4 font instantiations (GeneralSans localFont, Instrument_Serif, Be_Vietnam_Pro, Playfair_Display) with Inter 400/500/600/700 + Source Serif 4 400/600 + italic, both `subsets: ["latin","vietnamese"]`, variables `--font-inter` / `--font-source-serif`. `<html>` className: same pair for both locales. GeneralSans woff2 files stay in `public/fonts/` (preserved, unused). |
| Type consumption | `src/app/globals.css` | Update `--font-sans`/`--font-display` theme mappings + body/h1/h2/h3-h6/.font-display rules to the new variables. h1 AND h2 → Source Serif (600); h3-h6 stay sans (keeps the software-engineering register; avoids over-traditional look). |
| Rules/hairlines | `src/app/globals.css` | New tokens `--rule` / `--rule-soft` (light + dark) + `@theme` color mappings. B's ruled-section language without touching components. |
| Ink-block button | `src/components/ui/Button.tsx` | NEW variant `ink` (bg-foreground text-background, squared, uppercase tracking, green hover). Existing `primary`/`secondary`/`ghost` untouched — live pages keep their buttons; RT-07+ pages opt into `ink`. |
| Numbered section head | `src/components/ui/SectionHeader.tsx` | Optional `number` prop renders B's editorial sec-no chrome (`01 Label` above serif h2). Backward compatible: existing call sites unchanged. |
| Ruled index rows | NEW `src/components/ui/IndexRow.tsx` | B's ruled row (number / serif title / description slot) for capabilities, work, and engagement lists in RT-07..RT-10. No existing consumer. |
| Navbar | `src/components/sections/Navbar.tsx` | NO change in RT-06. Behavior (focus trap, scroll lock, dropdowns, locale switcher) is load-bearing. Its B-language restyle (tracked uppercase links, ink CTA) ships atomically with the RT-07 homepage so chrome and page launch together, never half-migrated. |
| Footer | `src/components/sections/Footer.tsx` | NO change in RT-06 (same reasoning as Navbar). |
| Page layouts | `src/app/[locale]/**` | NO change in RT-06. Pages adopt the system in RT-07..RT-11. |

## What deliberately does NOT change

- Brand green `#208535` family and dark-mode brand rules (checkpoint 1: keep
  recognizable identity).
- LitDunes (`src/components/sections/home/LitDunes.tsx`, `prototypes/hero/`):
  preserved untouched; not in the hero path (checkpoint 3); future accent use
  needs its own perf/a11y/reduced-motion validation.
- Existing Button variants, all route files, all 10 RT-03 fixes.
- ThemeToggle/dark mode: B tokens get dark-mode counterparts so the toggle
  keeps working.

## Risk register

| Risk | Mitigation |
| --- | --- |
| Font metrics shift breaks layouts site-wide (h1/h2 serif + Inter vs GeneralSans) | Inter is metric-similar to General Sans (neutral grotesque); probes at 375/768/1440 × EN/VI on key routes before any commit; CLS gate ≤0.1 on production build |
| Vietnamese diacritics render in fallback | Both faces declare `vietnamese` subset; probe asserts rendered diacritics use the webfont (computed font check + visual) |
| Half-migrated look (new type, old chrome) | Accepted and bounded: type swap is invisible-enough per page; chrome restyle deferred to RT-07 atomic launch |
| next/font downloads at build need network | Same mechanism the repo already uses for 3 Google families; `npx next build` gate proves it |

## Validation gate (before commit)

`tsc` + `eslint` + `npx next build` (never npm build), then production server
(`next start`) probes: home/services/case-studies/about/contact × en/vi ×
375/768/1440 — H1 visible, no clipped text, mobile menu, keyboard nav,
reduced-motion, VI diacritics on webfont. Lighthouse mobile on production
build: perf ≥90, LCP ≤2.5s, CLS ≤0.1. Evidence in gitignored `.tmp-audit/rt06/`.

**Push gate: RT-06 commits stay LOCAL.** Every push deploys production (dual
remote); checkpoint 7 requires owner review before deploy. Deviation from the
push-every-round law is deliberate and reviewer-ordered; flagged on BOARD.md.
