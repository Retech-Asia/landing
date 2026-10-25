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

### Wave 2 — Showcases across ERP / CMS / AI / mobile — IN PROGRESS (2C of 4 done)

Creative handoff for all four concepts received 2026-10-25 (Status: Ready for
implementation). Sequential checkpoints: 2A ERP → 2B CMS → 2C AI → 2D Mobile;
each independently shippable to main + prod.

| Item | Status | Notes |
| --- | --- | --- |
| 2A ERP — "Meridian Operations" | DONE 2026-10-25 | Handoff §2A implemented verbatim: registry entry (id `erp`, slug `meridian-operations`), deterministic fixtures (2 warehouses / 4 suppliers / 12 POs PO-1042..1053 / 16 SKUs / 8 approvals / dated events; handoff anchor records exact: PO-1042 $7,200 awaiting, PO-1043 $10,000 approved, PO-1044 $8,000 in transit, FL-101 120 vs 150 low, PT-204 480 vs 200 healthy, NV-310 75 vs 100 low; `MERIDIAN_NOW` anchor), shared reducer store (approve/reject with confirmation + transfer-stock with availability validation + reset; events auto-logged, formatted currency), scoped `--md-*` precise-enterprise palette + squared primitives + original three-rectangle product mark, 4 views (Operations Overview with 4 derived KPIs + spend-by-request-day chart + warehouse health + stock alerts + inbound + event feed; Purchase Orders search/filter/sort + line-item drawer; Inventory Control facility switch + SKU detail drawer + validated transfer; Approval Center confirm-gated decisions + history). Service preview generalized into `ServiceShowcasePreview` (config-driven per service id; CRM copy preserved verbatim; ERP heading/copy/CTA verbatim; TOC entries for crm-systems + erp-solutions). Verified: tsc + eslint clean, build green, Meridian harness 92/92 (approve PO-1042 + reject PO-1051 reflected on overview KPIs 9/3/5/3,370 → 8/1/5/3,370, transfer NORTH→SOUTH moves stock + logs event, EN/VI parity, 390/768/1440, no page errors, no external requests) + Wave 1 CRM harness 65/65 regression. Commits `308d90c` (main) / `7d0adae` (prod), deployed and curl-verified on www.retech.asia |
| 2B CMS — "Forma Studio" | DONE 2026-10-25 | Handoff §2B implemented verbatim: registry entry (id `cms`, slug `forma-studio`, verbatim tagline/description + 4 view titles/summaries EN+VI), deterministic fixtures (8 articles art-01..08 from the handoff seed titles incl. verbatim "The Materials Issue" lead + natural VI translations, 4 staff, 3 collections with hue-driven covers, 3 destinations; first 3 articles carry editable 3-paragraph bodies; `FORMA_NOW` anchor 2026-10-26T09:00), shared reducer store (per-locale edit-draft/save-draft with saved-state tracking + confirm-gated set-status + reset; every mutation lands in the editorial event history), scoped `--fs-*` editorial palette (canvas #FAF9F6, ink #242735, accent #625CA7) + rounded-full primitives + serif voice + geometric-F product mark, 4 views (Editorial Desk status cards 3/2/2/1 + featured drafts + assignments; Content Editor split workspace with live reader preview + word count + unsaved/saved state + confirm-gated schedule/publish; Publishing Calendar reference-dated production schedule with derived upcoming count 2 and per-story confirm-gated status moves; Asset Library with handoff-mandated color-and-type editorial cover cards, collection/status filters + detail drawer — no stock photography). Service integration: cms-platforms config in `ServiceShowcasePreview` (verbatim heading/copy/CTA) + "Interactive CMS demo" TOC entry; FormaApp added to the DEMOS map. Verified: tsc + eslint clean, build green, Forma harness 81/81 (desk counts 3/2/2/1, live preview mirrors edits + draft persists across shell tabs, calendar art-08 schedule confirm moves upcoming 2→3 and desk scheduled 2→3 cross-view, library 8 covers → col-tech filter 3 → drawer open/close, reload restores seed, EN/VI parity, 390/768/1440, no page errors, no external requests) + Wave 1 CRM harness 65/65 regression. Hallmark static lint (quota pilot, see below) ran on 2A Meridian: 0 genuine defects. Commit `1f3e5b5` (main); prod = cherry-pick of `1f3e5b5` |

| 2C AI — "Citewell" | DONE 2026-10-25 | Handoff §2C implemented verbatim: registry entry (id `ai`, slug `citewell`, verbatim tagline "Answers connected to evidence." + description + 4 view titles/summaries EN+VI), deterministic fixtures (5 source docs with version/category/owner/bilingual section excerpts; 6 curated QA pairs — 5 cited + qa-parental-leave "insufficient" that declines without manufacturing an answer; review queue 3 pending; 4 deterministic quality cases 3 pass / qc-completeness flagged; 4 seeded events; `CITEWELL_NOW` anchor 2026-10-26T09:00+07:00), shared reducer store (confirm-gated approve/reject overrides the seeded queue across views, every decision lands in the event history, reload returns to seed), scoped `--cw-*` analytical palette (canvas #F5F8FA, ink #193047, accent #2C668B) + squared primitives + quotation-mark product mark, 4 views (Answer Workspace with simulated-answer marker + verbatim flagship answer + citation drawers highlighting the exact evidence passage; Source Library with category filter + search + per-doc section drawers; Human Review confirm-gated decisions + decision history; Quality Checks 3 pass / 1 flagged). Service integration: ai-development config in `ServiceShowcasePreview` (verbatim heading/copy/CTA) + "Interactive AI demo" TOC entry; CitewellDemo added to the DEMOS map. Drawer primitive aligned to the proven Forma pattern during verification (fixed overlay + Escape close + sticky header; flagship citation passage made contiguous in fixtures so the highlight is exact). Verified: tsc + eslint clean, build green, Citewell harness 81/81 (flagship verbatim answer + citation→highlighted passage, insufficient decline, review 3→2 confirm-gated + history + cross-view "Review rejected" chip, quality 3/1 counts, sources 5 → Operations filter 1 → Travel search 1 → 3-section drawer, reload restores seed, EN/VI parity, 390/768/1440, no page errors, no external requests) + Wave 1 CRM harness 65/65 regression. Shipped in the commit carrying this row; prod = cherry-pick of it |

Remaining checkpoints: 2D Mobile "Relay Field" (per-product handoff section).

**Hallmark pilot (2026-10-25, closed — static-lint only per owner quota ruling).**
Owner directive: Hallmark may run its deterministic static lint where useful; no
rendered audits, fresh-context reviewer subagents, autonomous redesign, or
iterative screenshot critique (visual judgment goes to ChatGPT via small
screenshot sets; Playwright scripts stay the verification harness). Pilot ran
`sloplint.mjs --scope app` on the Meridian dirs: 31 FAIL / 3 REFLEX, all
triaged and dismissed — 28× uppercase micro-labels are the handoff-approved
precise-enterprise style (creative owner outranks the generic rule), 3×
`:disabled`/`:active` are false positives (Tailwind `disabled:` variants exist,
primitives.tsx:141), 1× dash is a data separator inside an `<option>`, 4×
colour literals are token-hygiene notes with no visual impact. 0 genuine
defects, 0 fixes, no re-verification needed. Skill installed project-scoped at
`.agents/skills/hallmark/` (untracked); future use = static lint only, one
pass per checkpoint at most, findings triaged against the approved handoff.

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
