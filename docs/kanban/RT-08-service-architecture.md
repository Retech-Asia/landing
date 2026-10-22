# RT-08 — Service hub, CRM depth, new service pages (P1, blocked by RT-04/06)

## Context
Plan §7 table. New pages only where the RT-04 map approves: candidates
`mobile-app-development`, `desktop-app-development`, `ai-development`, `it-consulting`.
Reuse the existing localized-slug data model (`services-data.ts`); do NOT build a
second service system. VI counterparts complete + reciprocal hreflang; follow the
existing per-locale slug convention.

## Acceptance criteria
- [x] Audit EVERY consumer when adding services: navigation, footer, ServicePreview,
      hub, comparisons/quizzes/calculators, related content, sitemap, OG routes,
      locale switching — no hardcoded 6-service assumptions left.
- [x] Each page: intro, suitable/not-suitable, deliverables, process, proof, cost
      drivers, FAQs, CTA. Tech names distinguish real experience from options.
- [x] EN/VI content parity; no advertised translation that does not render.

## Files
`src/lib/services-data.ts`, `src/app/[locale]/services/`, `src/lib/navigation.ts`,
quizzes/comparisons/calculators consumers, `sitemap.ts`.

## Progress log
- 2026-10-22 created.
- 2026-10-22 DONE (LOCAL COMMIT — not pushed; owner corrections directive
  2026-10-22 froze production deploys until the next owner checkpoint).
  - 4 new services-data entries (fe agent): mobile-app-development
    (`ung-dung-mobile`), desktop-app-development (`ung-dung-desktop`),
    ai-development (`phat-trien-ai`), it-consulting (`tu-van-it`); appended
    after dedicated-teams. Tech lists restricted to the verified claims pool
    (React Native, Flutter, TypeScript, iOS, Android, Node.js, React,
    PostgreSQL, REST APIs, Docker, LangChain, pgvector, OpenAI, Anthropic,
    Python, AWS); no Electron/Firebase/TensorFlow (unclaimed).
  - Consumer audit + wiring (orchestrator): nav catalog keys EN+VI +
    4 servicesNavigation entries; hub comparisonFeatures re-based to 10-wide
    positional rows + 4 meta/JsonLd description strings; slug-page
    serviceChecklists (10 items each EN+VI), serviceCaseStudyMap (mobile →
    fintech-card-marketing, ai → investment-intelligence-platform),
    serviceBlogMap (ai + consulting); ServiceQuiz hardcoded 6-service list
    replaced with services-data-derived briefs + recommendation slugs for all
    4 new services; ServiceExplorer Mobile App project leads with
    mobile-app-development (+ VI reason); sitemap/ItemList/blog-slice/
    next-service modulo verified auto-adapting; nav dropdown = 2-col grid,
    10 items clean. faq-data is self-contained (no per-service iteration).
  - ServicePreview: rows 1.2-1.5 now link via localizeServiceHref + featured
    CRM link (fe agent).
  - Validation: tsc clean; eslint errors = 8 known pre-existing (6× faq-client
    `<a>`, 2× HeroScene immutability), none from RT-08; `npx next build` exit 0
    (20 service SSG paths = 10 × 2 locales). Probes 46/46 (`.tmp-audit/rt08/
    probe.js`): 10 pages × EN/VI 200+h1; hub matrix 11 cols both locales;
    nav dropdown ≥10; new-page deliverables/case-links/hreflang-VI; quiz flow
    (Mobile App → mobile-app-development in results); explorer flow; homepage
    links all 4 new services; console clean; no h-overflow at 375.
  - Lighthouse mobile (hub EN, mobile-app-development EN): perf 85/83, a11y 100,
    SEO 92, CLS 0; LCP 4.4/4.7s = 90% render delay (font-swap repaint, pre-
    existing RT-06-era mechanic on untouched hero path; baseline build for a
    pre-round comparison failed on a Turbopack/worktree cache error — no
    LCP-path file is in the RT-08 diff, so no regression is attributable to
    this round). Service-page perf lift remains open for RT-12/RT-13; owner
    corrections directive now deprioritizes Lighthouse vs brand identity.
