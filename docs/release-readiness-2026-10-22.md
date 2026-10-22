# Release-readiness report, 2026-10-22 (checkpoint 3)

Scope of this round: unverified stat removal + capability replacements,
HomeCTA light confirmation, imagery proposal and authentic-capture inventory,
preview deployment isolation and push, visual quality pass. Commit
`36db777` on `main`, mirrored to branch `preview/checkpoint3` (pushed).
Production `www.retech.asia` verified untouched: the frozen site still serves
the previous copy.

## 1. Decision queue, all six items, with dispositions

**Item 1.** "Client country per study (5 values) and attestation that
case-study narratives describe real Retech work."
Disposition: OPEN, owner + Jay. `clientCountry?` stays render-gated. The
per-study audit of what authentic material exists and exactly what approval
or capture is needed is now written: `docs/authentic-imagery-inventory.md`.
Recommended starting point: the fintech card marketing study (public site,
lowest approval friction).

**Item 2.** "HomeCTA: light or dark ground."
Disposition: DECIDED by the owner, light. Light ships as default; the dark
variant remains a one-prop alternative, unused.

**Item 3.** "HomeCTA H2 "Let's Ship Your Product On Time, On Budget" carries
the same guarantee claim family removed from /process, and the body repeats
the 50+ stat. Rewrite or keep, owner call. Footer also still says "50+
projects delivered across 6 countries" (owner-gated, flagged in the evidence
register)."
Disposition: RESOLVED under decision 4 (no unverified claims). H2 rewritten
to "Let's Build Your Product / From First Call to Release" (VI: "Hãy Xây
dựng Sản phẩm của Bạn / Từ Cuộc gọi Đầu tiên đến Ra mắt"). Body: 24-hour and
"50+ times" claims dropped; now a scoped-plan and written-estimate promise.
Footer line rewritten to "Serving operators in mining, finance, and asset
management" (grounded in the published case studies). Trust chip "Estimate
within 24 hours" became "Detailed written estimate". Final wording goes to
Jay with the rest of the copy pass.

**Item 4.** "Hero stats basis (50+/30+/5+, 98% satisfaction, 6 countries,
24h)."
Disposition: DECIDED by the owner, remove. The hero stat strip is deleted
from the DOM; `STATS` and `ABOUT_STATS` constants are gone from the
codebase; the about page numeric grid (including AnimatedCounter) is
replaced by a four-card qualitative capability presentation. The 98%
satisfaction claim is removed from every surface that still carried it,
including the /process FAQ answers and the social OG image. The 24-hour
response claim is removed from process, services, contact metadata,
case-study CTAs, and the estimator post-submit copy. The about milestone
timeline and mission prose are de-numbered (no 5 engineers, 15+, 6
countries, 50+, 8 industries, 30+). Team bio "20+ developers" removed.
Replacement hero copy proposal, Jay-gated, EN: "Full-cycle delivery, applied
AI, and long-term support, from a single team." VI: "Bàn giao trọn vòng đời,
AI ứng dụng và hỗ trợ lâu dài, từ một đội ngũ duy nhất." Until approved, the
hero stands on H1 + standfirst + CTAs + industries chips, which the visual
pass confirms holds the composition.

**Item 5.** "Orphan image deletion (21 files listed in the register) and
licensed imagery picks for non-product surfaces."
Disposition: PARTIALLY RESOLVED, owner rows pending. The curated per-candidate
replacement proposal is written (`docs/imagery-replacement-proposal.md`, 8
rows with surface, current file, assessment, replacement brief, candidate
sources, resolution and responsive usage). Nothing imported. Orphan deletion
now lists 22 files (`ux-design.webp` added after this pass found it
unreferenced) and stays gated, folded into the execution pass.

**Item 6.** "Blog editorial queue (RT-16) for the remaining "seamless"
instances in posts."
Disposition: OPEN work queue, not an approval. Blog bodies also carry
"30+ specialists" and "30+ tech experts" (2 EN posts + VI mirrors); added
to the RT-16 list. Blog stays out of promotional-UI scope per the
established queue boundary.

## 2. Still-pending Jay approvals

1. Hero replacement line (EN+VI) and the about capability-card copy.
2. HomeCTA H2/body and footer line final wording (rewritten this round).
3. Imagery replacement rows (mark approved rows in the proposal doc).
4. Authentic captures per study (written client permissions, per the
   inventory doc).
5. Case-study client countries (5 values) + narrative attestation.

## 3. Remaining visual and imagery gaps

- Inner-page closing CTA bands on /process, /services, and /case-studies
  are still large dark-green sections. Recommendation: align them to the
  light HomeCTA treatment in a follow-up pass, per the owner's light-surface
  preference. Not executed this round because a multi-page band conversion
  is a visual scope change deserving its own owner call and comparison
  captures.
- About page top band uses a dark photo-scrim hero treatment; candidate for
  the light treatment during the imagery pass.
- Ten service pages: differentiation is copy-complete but partly
  imagery-driven; proposal row 6 assigns one subject per service cluster.
- Stock photos on about, careers, contact, process, services, and the
  industries band remain in place until the owner approves proposal rows.
- LitDunes: hero balance confirmed good after stats removal, EN+VI, desktop
  and mobile. No empty-hero problem. Rotators and counters stay retired.

## 4. Deployed-preview performance and functional validation

Deployment isolation (verified before push, as required):

- `origin` has two push URLs: Retech-Asia/landing (zero Vercel deployments
  ever, no integration) and Retech-Asia/retech-landing (the Vercel
  project). A push to origin updates both repositories.
- retech-landing: production branch is `main`; the 40 most recent Vercel
  deployments are all environment "Production", all on main SHAs. No
  non-main ref has ever produced a deployment.
- Pushed branch `preview/checkpoint3` (commit 36db777) produced a GitHub
  deployment with environment "Preview" (id 7252970945) and an
  X-Robots-Tag: noindex response. Production domain untouched, verified by
  content check.
- Preview URL: https://retech-landing-or833u2c5-retechsolutions.vercel.app
  Vercel build succeeded (all routes prerendered EN+VI).

Blocker found: Vercel Deployment Protection (SSO) gates the preview. The
URL redirects to Vercel login, so no external measurement tool (Lighthouse,
Playwright) can reach it, and this machine has no Vercel CLI or token.
Owner unblock options: (a) project Settings, Deployment Protection, add a
"Protection Bypass for Automation" secret and share it; (b) allow public
access for preview deployments; or (c) run the Lighthouse measurement from
the Vercel dashboard directly. The RT-14 gate script and median-of-runs
methodology are ready to execute the moment access exists.

Production-equivalent measurements taken meanwhile (local server running
the identical production build, real Chromium):

- Observed LCP (PerformanceObserver, unthrottled): EN desktop 232 ms
  (element: hero H1), EN mobile 132 ms (hero standfirst), VI desktop
  144 ms, VI mobile 132 ms. CLS 0 to 0.001. One hydration long task per
  load, 113 to 232 ms.
- Lighthouse mobile, emulated Moto G, three runs on the same build:
  performance 79 / 85 / 80 (median 80), modeled LCP 5.4 / 4.3 / 5.2 s
  (median 5.2, spread 1.1 s on an identical build and machine, confirming
  the lantern-simulation variance documented in RT-18b), FCP 1.4 s
  (stable), TBT 90 / 50 / 10 ms, CLS 0, render-blocking savings 0 ms.
  Lighthouse's modeled LCP element is the same hero standfirst paragraph.
- Verdict unchanged from RT-18b: the hero text paints in 130 to 230 ms
  observed; the simulated 4 to 6 s figures are model outputs dominated by
  emulation assumptions, and the honest mobile-LCP number requires the
  deployed preview (or production) measurement once accessible.
- WebGL on representative mobile hardware: still not verifiable from this
  machine. LitDunes remains exonerated for LCP by the same-build A/B
  (RT-18b); its behavior on low-end mobile GPUs is the one open
  verification, pending preview access.

Functional validation (curl-level, this build): / and /vi 200 with the new
HomeCTA copy in both languages; /en/about serves the capability grid;
/vi/case-studies/phan-tich-mining 200 (locale-aware slugs intact). Vercel
prerendered all routes EN+VI without errors. Gates: tsc clean, eslint 0
errors (35 pre-existing warnings), next build exit 0.

## 5. Ready for production?

Not yet. Exactly what remains:

1. Owner unblocks preview access (one dashboard toggle or bypass secret),
   then the RT-14 gate runs against the deployed preview: Lighthouse
   mobile, median of 3+ runs with variability, LCP element, loading
   phases, key network requests, long tasks and flash checks.
2. Jay approvals in section 2 (copy wording, imagery rows, captures,
   client countries).
3. Owner call on aligning inner-page dark CTA bands to the light treatment
   (can ship before or after release; the current dark bands are consistent
   and not broken, just heavier than the stated preference).

No code or content blockers remain from the checkpoint 3 directive. After
items 1 and 2, production is a push of `main` (which then also becomes the
production deploy through Vercel).
