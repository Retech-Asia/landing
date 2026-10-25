# Product Showcase & Conversion Enhancement Program — Roadmap

Program start: 2026-10-25. Owner brief: "ReTech Landing — Product Showcase &
Conversion Enhancement Program" (+ Creative Ownership Update). This doc is the
durable progress record between sessions. Update after each wave.

## Objective

Turn retech.asia from descriptive services copy into a product-engineering
portfolio: visitors can inspect real, polished application interfaces (CRM,
ERP, CMS, AI, mobile) built as React/Tailwind demos with deterministic
synthetic fixtures — clearly labeled concept demonstrations, never presented
as delivered client work.

## Ownership split (binding, from the Creative Ownership Update)

- **ChatGPT owns:** UI/UX creative direction, visual compositions, icons/images,
  photography, EN/VI copy, demo content, synthetic sample data, editorial calls.
- **Claude Code owns:** implementation, reusable components, interactions,
  responsiveness, a11y, testing, optimization, deployment.

**Status 2026-10-25: no ChatGPT creative handoff exists yet** (checked repo docs
+ company knowledge tree; only `docs/blog-handoff-chatgpt.md` for the editorial
queue). Until it lands, Claude Code works strictly inside its lane:
`docs/product-showcase-roadmap.md` (this file), the Wave 1A content audit +
ChatGPT handoff request, and creative-neutral framework infrastructure. No demo
product identities, visual compositions, marketing copy, or sample data get
invented locally. Blocker is flagged, not worked around.

## Constraints (from brief + standing repo rules)

- Preserve existing URLs, SEO metadata, approved editorial copy. Do not restart
  completed metadata/branding audits (see `docs/evidence-register.md`).
- Case studies (verified delivered work) stay strictly separate from showcases
  (illustrative capabilities, labeled "Concept demonstration — sample data").
- No K&K Homes material (branding, workflows, screenshots, data) — separate
  authorization required, none granted.
- Approved ReTech green `#30AB47`, glass/frosted pictogram system per
  `docs/design-system.md`; no large new dependencies; no excessive animation.
- EN/VI via existing i18n architecture; crawlable content without client JS.
- Lazy-load heavy demos; protect Core Web Vitals (LCP baseline: mobile EN ~1.9s).
- All visible interactive controls function meaningfully or are clearly
  non-interactive; synthetic fixtures only; no invented outcomes/testimonials.
- Deploys: `main` = staging, `prod` branch = production (ship-on-green for
  non-homepage work). **Homepage UI (Wave 4) requires explicit owner approval
  before prod promotion.** Editorial publication gate for pending articles stays.
- QA per repo law: scripted Playwright captures at representative widths,
  deterministic assertions; no model-driven screenshot loops; captures stay
  local (never committed).

## Wave status

### Wave 1 — Content accuracy + flagship CRM showcase — IN PROGRESS

| Item | Status | Notes |
| --- | --- | --- |
| 1A Content audit (CRM/ERP/AI/industry copy) | IN PROGRESS 2026-10-25 | Audit + findings = Claude; copy fixes = ChatGPT handoff. Prior art: `docs/evidence-register.md` (stats/claims already swept 10/22; industries whyP2 "same business day" line flagged, untouched) |
| 1B Showcase framework (routing, fixture layer, lazy-load, capture harness) | BUILT 2026-10-25 | Ships inert (empty registry → routes statically 404). `src/lib/showcases/` (types + registry), `src/components/showcases/` (ConceptDemoLabel, ShowcaseDemoShell + ViewPanel, view-registry), routes `/[locale]/showcases` + `[product]` + `[product]/[view]` |
| 1C Flagship CRM demo (5 views: dashboard, leads, pipeline, customer 360, automation/reporting) | BLOCKED | Needs ChatGPT creative handoff (product identity, visual composition, demo data) |

### Wave 2 — Showcases across ERP / CMS / AI / mobile — NOT STARTED

Blocked on Wave 1 framework + per-showcase ChatGPT creative direction. Minimum
3 substantive views each; distinct product identity and IA per showcase; no
recolor-the-CRM shortcuts.

### Wave 3 — Visual and conversion refinement — NOT STARTED

Service-page consistency, photography, card rhythm, mobile touch, redundant
discovery tools, visitor journeys (service → demo → case study → contact).
Audit findings can start anytime; visual fixes ride the framework waves.

### Wave 4 — Homepage product showcase section — NOT STARTED

Design + staging validation only. **Production promotion gated on explicit
owner approval.** LitDunes hero, brand identity, nav/homepage structure preserved.

## Decisions log

- 2026-10-25 — Program opened. No ChatGPT creative handoff exists; Wave 1A audit
  + framework infra proceed in Claude's lane; CRM demo build blocked pending
  handoff. Flagged to owner in the wave report rather than self-authorizing
  visual design (Creative Ownership Update prohibits it).

## Session log

- 2026-10-25 — Session 1: roadmap created; Wave 1A audit done
  (`docs/showcase-content-audit-2026-10-25.md`, findings F1–F9, committed +
  pushed to main). Wave 1B framework built inert: registry ships empty until
  the ChatGPT handoff lands, so all showcase routes statically 404 (no visible
  pages, no sitemap impact). Wave 1C remains blocked on the creative handoff
  (see the audit doc's handoff request).
