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
| 1A Content audit (CRM/ERP/AI/industry copy) | DONE 2026-10-25 | Approved replacement copy EN+VI applied verbatim from handoff §5 (F1–F9): services-data.ts, industries-data.ts, industries hub + healthcare pages. Commits `a6df465` (main) / `e395337` (prod), deployed. Out-of-scope residuals flagged in the audit doc (other services' week labels, industries "40–60%" market-rate stat) |
| 1B Showcase framework (routing, fixture layer, lazy-load, capture harness) | BUILT 2026-10-25, ACTIVATED 2026-10-25 | `src/lib/showcases/` (types + registry), `src/components/showcases/` (ConceptDemoLabel, ShowcaseDemoShell + ViewPanel, view-registry), routes `/[locale]/showcases` + `[product]` + `[product]/[view]` (full-screen per-view exploration). Staged-unrouted pattern retired once content existed (soft-404 avoidance) |
| 1C Flagship CRM demo — "Northline CRM" | DONE 2026-10-25 | Creative handoff implemented verbatim: registry entry (id `crm`, slug `northline-crm`), deterministic fixtures (24 leads / 12 accounts / 8 opps = $346k derived / 30 activities / 10 tasks / 4 rules / 3 team, `DEMO_NOW` anchor), reducer store shared across views, scoped `--nl-*` palette, dependency-free SVG charts, 5 views (Overview, Leads, Pipeline, Customer 360°, Automation & Insights). Routes activated (`/showcases` + product + full-screen per-view), sitemap EN/VI hreflang, CRM service page preview (approved §1 copy/CTA + interactive embed). Verified: tsc + eslint clean, build green, deterministic Playwright 65/65 (view interactions, stage move $346k→$322k + Won 1 reflected on dashboard, search/drawer/assignment, EN/VI parity, 390/768/1440, no page errors, no external requests, genuine 404s, homepage demo-free) |

### Wave 2 — Showcases across ERP / CMS / AI / mobile — IN PROGRESS (2A of 4 done)

Creative handoff for all four concepts received 2026-10-25 (Status: Ready for
implementation). Sequential checkpoints: 2A ERP → 2B CMS → 2C AI → 2D Mobile;
each independently shippable to main + prod.

| Item | Status | Notes |
| --- | --- | --- |
| 2A ERP — "Meridian Operations" | DONE 2026-10-25 | Handoff §2A implemented verbatim: registry entry (id `erp`, slug `meridian-operations`), deterministic fixtures (2 warehouses / 4 suppliers / 12 POs PO-1042..1053 / 16 SKUs / 8 approvals / dated events; handoff anchor records exact: PO-1042 $7,200 awaiting, PO-1043 $10,000 approved, PO-1044 $8,000 in transit, FL-101 120 vs 150 low, PT-204 480 vs 200 healthy, NV-310 75 vs 100 low; `MERIDIAN_NOW` anchor), shared reducer store (approve/reject with confirmation + transfer-stock with availability validation + reset; events auto-logged, formatted currency), scoped `--md-*` precise-enterprise palette + squared primitives + original three-rectangle product mark, 4 views (Operations Overview with 4 derived KPIs + spend-by-request-day chart + warehouse health + stock alerts + inbound + event feed; Purchase Orders search/filter/sort + line-item drawer; Inventory Control facility switch + SKU detail drawer + validated transfer; Approval Center confirm-gated decisions + history). Service preview generalized into `ServiceShowcasePreview` (config-driven per service id; CRM copy preserved verbatim; ERP heading/copy/CTA verbatim; TOC entries for crm-systems + erp-solutions). Verified: tsc + eslint clean, build green, Meridian harness 92/92 (approve PO-1042 + reject PO-1051 reflected on overview KPIs 9/3/5/3,370 → 8/1/5/3,370, transfer NORTH→SOUTH moves stock + logs event, EN/VI parity, 390/768/1440, no page errors, no external requests) + Wave 1 CRM harness 65/65 regression. Commits `308d90c` (main) / `7d0adae` (prod), deployed and curl-verified on www.retech.asia |

Remaining checkpoints: 2B CMS "Forma Studio" → 2C AI "Citewell" → 2D Mobile
"Relay Field" (per-product handoff sections).

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
- 2026-10-25 — Wave 1 creative handoff received (approved): Northline CRM
  identity §1, scoped light palette §2, five screens §3, synthetic data §4
  (8 named people/companies, $346,000 derived pipeline), approved editorial
  corrections §5, integration §6, testing/deployment §7. Implemented verbatim.
- 2026-10-25 — Demo determinism: all fixtures keyed to a fixed `DEMO_NOW`
  constant + relative `daysAgo`/`dueInDays` fields, so renders are
  hydration-safe and test-stable; no clocks, no randomness.
- 2026-10-25 — Palette isolation: Northline uses scoped `--nl-*` CSS vars set
  on the shell root so the site's light/dark themes cannot bleed into the app
  canvas; the demo palette does NOT replace site tokens (handoff §2).
- 2026-10-25 — View locale contract: view components take
  `{ locale: "en" | "vi" }`; `view-registry` pre-wraps each in next/dynamic at
  module scope (stable identity, per-view chunk splitting, lint-clean); the
  shell threads the page locale through.
- 2026-10-25 — Wave 2 creative handoff received (approved): four product
  concepts with per-product palettes/marks/screens/data + approved service-page
  copy. Service previews generalized into one config-driven
  `ServiceShowcasePreview` (services-data ids → showcase id/slug/copy);
  per-showcase demo roots (`STORE_PROVIDERS`) keep shared state alive across
  shell tabs.

## Session log

- 2026-10-25 — Session 1: roadmap created; Wave 1A audit done
  (`docs/showcase-content-audit-2026-10-25.md`, findings F1–F9, committed +
  pushed to main). Wave 1B framework built inert: registry ships empty until
  the ChatGPT handoff lands, so all showcase routes statically 404 (no visible
  pages, no sitemap impact). Wave 1C remains blocked on the creative handoff
  (see the audit doc's handoff request).
- 2026-10-25 — Session 2: Wave 1 creative handoff received → Wave 1A applied
  (`a6df465` main / `e395337` prod, both deployed). Wave 1C built and shipped:
  Northline data layer + store + primitives + charts + shell + all 5 views
  (2 parallel FE agents for Leads/Pipeline and Customers/Automation); showcase
  routes activated; registry + view-registry populated (per-view next/dynamic
  chunks + per-showcase demo root so shared state survives tab switches);
  sitemap entries; CRM service page preview section. Verification:
  tsc/eslint clean (2 pre-existing warnings in services page untouched),
  build green, deterministic Playwright harness 65/65 at 390/768/1440
  (harness + captures local-only under agent/uiux-audit/showcase-verify-2026-10-25/).
- 2026-10-25 — Session 3: Wave 2A Meridian Operations shipped (checkpoint table
  above for scope + verification; harness `meridian-verify-2a.mjs` + captures
  local-only in agent/uiux-audit/showcase-verify-2026-10-25/). Fix found
  during verification: store approval-event summaries now use formatted
  currency ("$7,200 USD") instead of raw numbers.
