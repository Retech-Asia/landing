# Website Overhaul Roadmap

**Owner:** Jay Pham · **Driver:** agent swarm (PM / UI-UX / 3D-Motion / Frontend / Marketing / SEO / QA)
**Status:** 2026-08-21: **Lit Dunes SHIPPED to the homepage hero — raw-WebGL port live, AURORA palette (Jay: "let's push aurora first"), LatticeField + the three.js/r3f stack deleted.** Component: `src/components/sections/home/LitDunes.tsx` (zero libraries, idle-armed mount, reduced-motion static t=47, theme via data-theme MutationObserver). QA clean: tsc, production build, both themes, mobile 375, reduced-motion static frame (0.2% diff = hero's rotating word, shader byte-identical), 0 console errors; idle 4-13%, cursor 8-24%. Cursor stays softened (lerp 0.010, mound 0.15, lamp 0.50, parallax 0.07/0.02 — do not raise). The M3 color lab's four identity-grounded alternates stay parked in lit-dunes-colors.html for a possible later swap. Round 5 L/N, Round 4 I/J/K, Aurora Sweep II moot for hero. Wave 1 + scene placement + hero port done, awaiting commit go-ahead.

## Wave 1: DONE (2026-08-20)

### Hero redesign: 3 rounds, verdicts in
`prototypes/hero/`: standalone HTML, real site copy + tokens, light/dark toggle, reduced-motion support. `index.html` links all rounds with verdicts.

Outcome after 3 rounds (A Blueprint, B Living Product, C Signal Field, D Aurora Sweep, E Lit Grid, F Tilt Plane, G Product Stack, H Code to Product) plus Round 4 + the D-II reopen:

- Aurora Sweep II (2026-08-21): Jay reopened D with "more colorful, more attractive, more effect on mouse". Upgraded in place; candidate to replace LatticeField if it wins his eye.
- Round 5 (2026-08-21): three fusion directions, all single-file fragment-shader WebGL, QA'd clean (console, idle liveliness 11-21%, cursor effect pixel-verified at the pointer, light/dark, mobile 375, reduced-motion static):
  - **L Aurora Grid** (`aurora-grid.html`): Lit Grid's lattice catching Aurora Sweep II's bands.
  - **M Lit Dunes** (`lit-dunes.html`): dune heightfield + topo contours under a 5-hue aurora wash; cursor is a lamp that raises a mound and pools glow. **The pick: Jay loves it.** Cursor softened twice on his call — pass 1 (lerp 0.028→0.018, mound 0.42→0.22, lamp 1.15→0.72, parallax 0.18→0.12), pass 2 after his "reduce the transition effect on mouse moving only" (lerp 0.010, mound 0.15 wider falloff 0.24, lamp 0.50 wider falloff 0.32, parallax 0.07/0.02 — lazy = slow trail AND gentle amplitude).
  - **M2 Lit Dunes Lab** (`lit-dunes-lab.html`): same scene + five independent feature toggles for his verdicts — wandering lamp (raises its own mound + glow, 11.9% measured effect), breathing horizon sun (11.5%), directional dune shading (25.2%, soft), wind streak lines (5.4%), meteor every ~14s in both themes. Fix after Jay's "i don't see anything change of horizon sun and meteor": the meteor was dark-mode-only + 22s-sparse, and the sun's pale tint was flattened to sky-gray by ACES tonemapping in light mode — both now render in both themes, pixel-verified with the new `?fixtime=<s>` deterministic-clock QA param. All-on idle 37.2% vs base 18-21% (streaks are the big adder). QA clean both themes, mobile 375, reduced motion, console. Scroll-descent idea (dunes rising as you scroll into the page) stays a production-phase item for the React port. **Verdict 2026-08-21: none of the five layers fold in — the base scene is the pick as-is; the cursor transition was softened instead.**
  - **N Warp Loom** (`warp-loom.html`): six woven light bands full-depth; cursor is a chromatic glass lens. Fixed two design bugs in QA: bands now span the near field (was bottom-45% dead black), and the unbounded `flow` drift that drained the field over minutes was replaced by bounded depth breathing.
  - **M3 Lit Dunes Color Lab** (`lit-dunes-colors.html`, 2026-08-21): on Jay's ask for a color pattern derived from company identity. Identity facts first: the logo mark is a single green (#30AB47, hexagon + R), the system palette is green/cyan/violet with zero warm hues, so the current aurora's pink/amber stops are the off-brand part. Five live palettes, identity-grounded: 0 Aurora (current, reference), 1 Brand Field (logo greens → system cyan/violet), 2 Retake Loop (name = "retake" + the site's green triple-gradient), 3 Mekong Dusk (HCMC dusk: brand greens under gold/violet), 4 Asia Signal (home green → azure → violet for retech.asia). QA'd all 5 × both themes with ?fixtime: strongest dark = aurora/retake, strongest light = aurora/brand; asia reads flattest in both (its hues cluster in the blue family); retake softens in light. **Verdict 2026-08-21: "let's push aurora first" — aurora ships (it already was lit-dunes.html's palette, so no fold step); the four alternates stay parked for a possible later swap.**

- Hero stays as-is: Stripe-style ambient LatticeField. Jay's call: the hero is capability/brand level, not a literal code scene.
- H "Code to Product" approved as a design, scoped to programming-topic surfaces. Shipped as `src/components/sections/CodeToProduct.tsx` (shared, reusable via `className="ctp-stage--inset"`); live on `/technologies` as a full-width band under the page hero.

### Bug fixes shipped
- **ServiceTOC + blog TableOfContents rewritten** (both shared the same 4 bugs):
  - Highlight drift on wrapped/2-line labels: now measured from real row geometry (verified: indicator Y == row offsetTop on 50px wrapped rows)
  - Scroll-spy freeze after click: lock auto-releases after 1.2s (verified: click FAQ → manual scroll → spy recovers)
  - Wrong section active when scrolling up: active = last heading that crossed the band, computed from live geometry
  - Flicker on every step: single persistent element moved via transform (no AnimatePresence key-swap)
  - Bonus: click-scroll now uses `getLenis().scrollTo()` (window.scrollTo was fighting Lenis), unified 112px offset, reduced-motion instant states, progress bars scaleX instead of width
- **ReadingProgress**: width → scaleX (GPU, no layout on scroll frames)
- **Services hero LCP violation**: h1/subtitle/CTAs were `AnimatedSection` opacity-0 (blank until hydration); now `page-hero-enter` CSS entrance (SSR-visible)
- **Homepage hero**: rotating word `initial={false}` (no more hydration flash), scrim z-[1] → z-tokens
- **Navbar**: missing `nav-active-text` on mega-menu service names (dark-mode contrast), raw `z-50` → `z-[var(--z-dropdown)]`
- **PageTransition hydration fix**: `useReducedMotion()` is null on the server but truthy on the client for reduced-motion users, so every page threw "Hydration failed" for them. Now gated on mount.
- **CodeToProduct reduced-motion fix**: the rAF tilt/particle loop was not gated on `reduced`, wiping the static particle pass every frame. Now skipped under reduced motion.

## Wave 2: hero port (done 2026-08-21, via Lit Dunes)

First resolved as no port (Code to Product placed on /technologies instead: full-width band, LCP-safe plain-DOM first paint, idle-armed motion, dark/light + mobile + reduced-motion QA'd clean). Then Round 5's Lit Dunes won Jay's eye, and after the M2/M3 verdicts (base scene as-is, aurora palette) it shipped to the homepage hero as `src/components/sections/home/LitDunes.tsx` — raw WebGL, one fullscreen triangle + one fragment shader, zero libraries. LatticeField.tsx + lattice-geometry.ts deleted (the old hero background pulled three.js + r3f + postprocessing for the same job); the grid-pattern hero overlay and lattice-mask CSS went with it (designed for the old flat gradient, not the dunes). LCP-safe idle mount, reduced-motion static t=47, theme via data-theme MutationObserver. QA: tsc, production build, both themes, mobile 375, reduced-motion static frame, 0 console errors.

## Wave 3: SEO quick wins (all additive, none destructive)

From the read-only SEO review (full report in chat, 2026-08-20):
- **A1** sitemap per-entity `lastmod` (currently one global date)
- **A2** BreadcrumbJsonLd on services/case-studies/industries/[slug] + category pages (only ~5 pages have it)
- **A4** feed.xml: per-item VI alternates
- **B1** RelatedPosts block on service pages (topical clusters, e.g. "custom CMS development Vietnam")
- **B2** Blog authors → Person schema (E-E-A-T) if real authors exist
- **B3** Re-encode >250KB webps (cs-ai-dashboard.webp is 430KB)
- Parked: VI category slugs (needs 301 plan), review schema (policy risk), speakable

## Wave 4: polish backlog
- Mobile nav "moment" for the hero
- Case-study pages: same TOC treatment if headings grow
- `middleware` → `proxy` file convention (Next.js 16 deprecation warning)
- QA cadence: tsc + build + 375/768/1440 + 0 console errors + keyboard nav + reduced motion (per ui-ux-guidelines "done" checklist)

## Ground rules (from memory + docs, enforced)
- Wix is NOT source anymore (cutover done); this repo is source of truth now
- No marketing superlatives; no dead buttons; no AI-aesthetic chips; no em dashes or `--` in content
- LCP: hero content SSR-visible, one background layer, idle-defer heavy libs
- Transform/opacity only; scaleX for progress; z-tokens; nav-active-text on brand text
- User's eye is final arbiter on visual calls (Hallmark rules need judgment)
