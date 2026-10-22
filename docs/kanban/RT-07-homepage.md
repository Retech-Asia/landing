# RT-07 — Homepage implementation (P1, blocked by RT-02/04/06)

## Context
Implement the approved direction on `src/app/[locale]/page.tsx` + `sections/home/`.
Keep: SSR-visible hero content (LCP law), lazy below-fold, idle-armed WebGL.

## Acceptance criteria
- [x] Visible H1 (Option A "Turning Ideas into Solutions"); no FAQ (policy facts pending, stays out); approved proof only (5 verified case studies, canonical stats).
- [x] Functional CTAs (no dead buttons; IndexRow locale-aware Link fix; only existing pages linked); EN/VI parity (all copy in both catalogs).
- [x] Responsive QA 375/768/1440 + reduced motion + 0 console errors (36/36 probe legs).

## What shipped
- **Hero** — rewritten as a static server component: eyebrow, visible serif H1
  (Option A; sr-only seoH1 retired), CRM-core standfirst, green primary + ghost
  secondary, canonical STATS as static SSR grid, industries strip on flat canvas.
  LitDunes parked (checkpoint 3, file preserved); rotator + scroll-fade + counters
  removed with it (B is static-editorial; LCP repaint source gone).
- **ProofStrip** (new) — early proof band linking #work.
- **ServicePreview** → Capabilities: featured CRM card + 5 ruled IndexRows
  (1.1-1.5); only web-development links (page exists); RT-08 wires the rest.
- **OurWork** → Selected work: 5 case-study IndexRows (localized slugs) + hub link.
- **DeliverySection / AiApproach / Engagement** (new) — sections 03/04/05 per the
  approved B/RT-04 sequence; no invented numbers, cost drivers without prices.
- **HomeCTA** — restyled onto the dark ink band; keys/hrefs preserved.
- **Retired from homepage (files + namespaces deleted, git history keeps them):**
  WhyRetech, TechStack, ClientResults, MidPageCTA. FAQ stays out (visible-FAQ
  decision deferred to Jay; schema only returns with a visible section).
- **Navbar** — mobile menu now moves focus into the dialog on open (rAF-deferred
  for the AnimatePresence mount); Escape still returns focus to the toggle.
- **Footer** — column headings h4→h3 (heading-order fix, no visual change).
- **IndexRow/IndexRowList** — locale-aware Link (i18n navigation) so row hrefs
  carry the locale prefix; list role removed (children are not listitems).

## Validation (production build, 2026-10-22)
- Gates: tsc clean; eslint 0 errors (6 pre-existing unused-var warnings in
  Footer/Navbar, untouched lines); `npx next build` clean.
- Probes 36/36: EN+VI × 375/768/1440 — no h-overflow, visible Option A H1 both
  locales, 8 sections, 5 localized case links per locale, localized web-dev link,
  console clean, reduced-motion static branch, keyboard path clean.
- Lighthouse mobile: EN perf 96 / a11y 100 / SEO 92 / LCP 1.9s / CLS 0.001;
  VI perf 95 / a11y 100 / SEO 92 / LCP 1.8s / CLS 0.001.
- A11y regressions found mid-round and fixed same-round: aria-required-children
  (list role), color-contrast (brand-green 4.49:1 small numbers → ink, matching
  the B prototype), heading-order (footer h3s). Focus-on-open fix verified with
  the deferred consent banner handled (banner mounts after networkidle and grabs
  focus on mount — correct modal behavior, belongs to RT-13 documentation).

## Deliberate differences from prototype B
- Hero primary CTA stays the brand-green pill (checkpoint 1: keep green identity);
  ink carries section CTAs and the closing band.
- Stats row = 3 canonical STATS (prototype showed 6; constants are canonical).
- Industries strip kept below the hero (existing working navigation, Jay 2026-08-23).
- FAQ section omitted (checkpoint 5: no pending FAQ topics as policy).

## Notes
- VI copy drafted this round, native review pending (RT-04 rule).
- `localizeServiceHref` keeps VI service slugs correct; case-study hrefs localize
  via the i18n Link.
- Pre-existing: eslint warnings listed above; consent-banner focus grab → RT-13.

## Progress log
- 2026-10-22 created.
- 2026-10-22 implemented, validated (gates + 36/36 probes + Lighthouse), committed
  locally. LOCAL COMMIT ONLY pending owner review; push = production deploy.
