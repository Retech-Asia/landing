# Owner checkpoint report, 2026-10-22 (Waves 1b, 2, 3 + integrity)

Deploy stays frozen. Four new local commits since the last checkpoint:
`2f6f36e` (RT-19 Wave 2), `7ada0d7` (locale navigation integrity),
`c08d1f0` (RT-08b checks), `78b6bee` (RT-20). Earlier local commits:
RT-08 `1121b55`, RT-17 `631227c`, RT-18 `858433e`, RT-18b `ec04698`.
Nothing pushed.

## 1. LCP verdict (RT-18b, `docs/rt18b-lcp-investigation-2026-10-22.md`)

The LCP element is the SSR hero standfirst paragraph, observed at 153 to
191 ms in browser traces (FCP 58 ms). The 5.3 s Lighthouse figure is lantern
simulation of the localhost document on a modeled Moto G, not an observed
paint. Same-build A/B with WebGL disabled puts the LitDunes contribution at
0 ms both observed and simulated; a Metal GPU run ruled out SwiftShader.
Production models 3.7 to 6.4 s on the identical rig with a near-identical
document. The 2.5 s target is not reachable without restructuring the
approved hero. Recommendation stands: gate release on a Vercel preview
measurement at RT-14.

## 2. Wave 2: case studies + /process (RT-19)

- Vanity metric machinery deleted from the model and UI: `results` stat rows,
  `beforeAfter` tables, `AnimatedMetrics`, `BeforeAfter`, listing and
  industry stat grids. keyResults rewritten as qualitative capability
  statements, EN and VI.
- Verified tech chips replace stat chips on listing cards and industry
  cross-links. `clientCountry?` render gate added (Jay supplies values).
- Detail heroes carry "Illustrative visualization / Hình ảnh minh họa" until
  approved captures exist. Review schema stays suppressed.
- /process: 6 numbered phases became 4 editorial groups (understanding,
  decisions before code, visible sprints, launch and after), week ranges and
  the on-time-on-budget guarantee removed, deliverables reframed client-side.
- Probes 65/65 (`.tmp-audit/rt19/probe-run5.log`): vanity scans, narrative
  arc, schema suppression, overflow at 1440 and 375, console clean.
- Screenshots: `.tmp-audit/rt19/` (listing, mining detail, process; EN+VI;
  1440 fullPage + 375).

## 3. Bug class found by the probes: locale navigation (fixed, `7ada0d7`)

With per-locale slugs live, any locale-prefix swap produced hard 404s:
server confirmed `/en/case-studies/phan-tich-mining` returns 404. Three
sources: the LocaleSwitcher (fixed with `src/lib/localized-path.ts` slug
mapping), six files still importing plain `next/link` (VI listing card
clicks landed on EN 404s; swapped to the locale-aware Link), and the
industries service card pinning `.slug.en` plus EN copy on VI pages
(localized). Verified: switcher both directions, card click-through stays
VI, industries cross-links VI.

## 4. Integrity checks (RT-08b, `c08d1f0`)

- CRM copy is service-positioned (extend Salesforce/HubSpot or bespoke
  build); zero product claims.
- Canonical/sitemap/hreflang: 60 of 171 sitemap URLs checked, stratified
  across all collections in both locales: every URL 200, self-canonical
  exact, hreflang pairs slug-correct in both directions.
- Keyboard: 12/12 tab stops land on visible elements (cookie consent first).
- Mobile 375: hamburger menu opens and navigates, console clean.

## 5. Wave 3: imagery + light surfaces (RT-20, `78b6bee`)

- `docs/imagery-asset-register.md`: full inventory by surface, 21 orphan
  files listed for an owner deletion call, licensed curation plan
  (Unsplash/Pexels with source+ID notes, blog pipeline as the pattern).
  Case-study slots stay captioned and Jay-gated; nothing deleted or replaced
  unilaterally.
- HomeCTA comparison delivered: light (off-white ground, brand primary
  button) ships as default per the owner's surface preference; dark remains
  a one-prop alternative. Captures:
  `.tmp-audit/rt19/homecta-light-after.png`, `homecta-dark-before.png`.
- Copy sweep (about + industries, EN+VI): "empower/exceptional/go-to"
  mission and vision lines, "seamless" (9 instances) and "highest standards"
  rewritten concrete; zero matches remain on those surfaces. Blog copy
  belongs to the RT-16 queue and was left alone.

## Owner decision queue

1. Client country per study (5 values) and attestation that case-study
   narratives describe real Retech work.
2. HomeCTA: light or dark ground.
3. HomeCTA H2 "Let's Ship Your Product On Time, On Budget" carries the same
   guarantee claim family removed from /process, and the body repeats the
   50+ stat. Rewrite or keep, owner call. Footer also still says "50+
   projects delivered across 6 countries" (owner-gated, flagged in the
   evidence register).
4. Hero stats basis (50+/30+/5+, 98% satisfaction, 6 countries, 24h).
5. Orphan image deletion (21 files listed in the register) and licensed
   imagery picks for non-product surfaces.
6. Blog editorial queue (RT-16) for the remaining "seamless" instances in
   posts.

## Release recommendation

Hold the freeze through the checkpoint. After owner decisions above, the
release path is: push, confirm the Vercel preview, run the production
Lighthouse measurement against the preview URL (the RT-14 gate), then
release. All local gates green: tsc clean, eslint 0 errors (pre-existing
warnings only), next build exit 0, probes 65/65, integrity 60/60.
