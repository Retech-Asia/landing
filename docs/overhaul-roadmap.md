# Website Overhaul Roadmap

**Owner:** Jay Pham · **Driver:** agent swarm (PM / UI-UX / 3D-Motion / Frontend / Marketing / SEO / QA)
**Status:** 2026-08-23: **hero polish round shipped on Jay's three critiques** — (1) hero now fits one viewport (`min-h-svh` flex-column, stats compacted; grows instead of clipping on short/mobile), (2) palette swapped AURORA → **Brand Field** (parked lab palette 1) so first paint reads brand-green-led (Jay: "make it more our primary color at first"; phase 0.16, drift t*0.03; follow-up same day — light mode's tint branch lifted violet to ~25%, Jay confirmed green-led there too, upper ramp now blends back to brand green in light only, ~50/32/15 green/cyan/violet). Follow-up 2026-08-24 on Jay's next pass: (a) the viewport-fit compaction overshot — stats shrunk to 4xl and spacing tightened until the block read as a small centered card; original sizes/rhythm restored (5xl stats, mb-10/mb-14, h-12 dividers, py-20/28) and it still fits one 900px viewport above the strip; (b) the terrain's old `smoothstep(-3.4, 0.6, p.x)` left-edge fade left the left ~20% of the screen flat/unlit — removed, wash + contours + rim now run edge-to-edge ("fully display in horizontal"), readability stays the scrim's job). Fit needed two follow-up tunes after measuring at a true 900px viewport: Container py-8/10 (py-28 overshot to 1037px with the strip aboard) and the strip's pb-4 (VI wraps one line longer, was 9px over; both locales now fit exactly), (3) the standalone "Serving industries worldwide" band folded into the hero bottom — translucent backdrop-blur chips sitting on the dune canvas (Jay: the old band "looks very lower our quality of effort"). TrustedBy.tsx renders inside Hero.tsx now. QA clean: 1440 dark+light EN, 768 + 375 light EN, 1440 dark VI, 0 console errors. 2026-08-22: **Wave 3 SEO quick wins closed** (A4 feed VI alternates, B3 webp re-encodes, A1 lastmod bump; A2/B1/B2 verified already shipped; B1 carried a real VI-404 bug, fixed). Wave 1 + Wave 2 (hero: Lit Dunes) shipped 2026-08-21 — raw-WebGL port live, aurora first (superseded 2026-08-23 by Brand Field), LatticeField + the three.js/r3f stack deleted. Component: `src/components/sections/home/LitDunes.tsx` (zero libraries, idle-armed mount, reduced-motion static t=47, theme via data-theme MutationObserver). QA clean: tsc, production build, both themes, mobile 375, reduced-motion static frame (0.2% diff = hero's rotating word, shader byte-identical), 0 console errors; idle 4-13%, cursor 8-24%. Cursor stays softened (lerp 0.010, mound 0.15, lamp 0.50, parallax 0.07/0.02 — do not raise). The M3 color lab's four identity-grounded alternates stay parked in lit-dunes-colors.html for a possible later swap. Wave 4 = next.

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

## Wave 3: SEO quick wins — DONE (2026-08-22)

From the read-only SEO review (full report in chat, 2026-08-20):
- **A1** sitemap per-entity `lastmod` — resolved: blog was already per-entity (`updatedAt ?? date`); services/case-studies/industries have no per-entity dates in their data (fabricating them = no), so the global stamp is correct for them. `CONTENT_LAST_UPDATED` bumped 2026-07-28 → 2026-08-21 per its own revision policy.
- **A2** BreadcrumbJsonLd on detail + category pages — was already shipped (found live in JsonLd.tsx + detail pages)
- **A4** feed.xml: per-item VI alternates — shipped, same policy as the sitemap (VI alternate only when a real translation renders)
- **B1** RelatedPosts on service pages — was already shipped; this pass fixed a real i18n bug found in it: VI service + case-study related-post cards linked EN slugs under /vi, which hard-404 for translated posts (blog generateStaticParams only enumerates VI slugs, dynamicParams=false). Now locale-aware via `getBlogMeta(post, loc)` on both templates.
- **B2** Blog authors → Person schema — resolved as no-change: all posts are authored "Retech Solutions" (org), and BlogPostingJsonLd already links author to `#organization` via `@id` — correct E-E-A-T shape for an org author; fake Person personas would violate the no-hallucination rule.
- **B3** Re-encode >250KB webps — shipped: cs-ai-dashboard.webp 430K→233K (q46 m6), cs-ai-hero.webp 321K→143K (q72), blog-enterprise.webp 262K→119K (q72). Dimensions unchanged, visual QA passed. Note: cs-ai-dashboard + blog-enterprise are currently unreferenced — candidates for deletion (Jay's call).
- Parked: VI category slugs (needs 301 plan), review schema (policy risk), speakable

## Wave 4: polish backlog
- Mobile nav "moment" for the hero
- Case-study pages: same TOC treatment if headings grow
- ~~`middleware` → `proxy` file convention~~ DONE (2026-08-22): src/proxy.ts, function `proxy`, redirect parity verified locally + on production (308 /→/en, unprefixed→/en/…, /vi direct, matcher exclusions intact, NEXT_LOCALE cookie preserved)
- QA cadence: tsc + build + 375/768/1440 + 0 console errors + keyboard nav + reduced motion (per ui-ux-guidelines "done" checklist)

## Ground rules (from memory + docs, enforced)
- Wix is NOT source anymore (cutover done); this repo is source of truth now
- No marketing superlatives; no dead buttons; no AI-aesthetic chips; no em dashes or `--` in content
- LCP: hero content SSR-visible, one background layer, idle-defer heavy libs
- Transform/opacity only; scaleX for progress; z-tokens; nav-active-text on brand text
- User's eye is final arbiter on visual calls (Hallmark rules need judgment)
