# RT-08 — Service hub, CRM depth, new service pages (P1, blocked by RT-04/06)

## Context
Plan §7 table. New pages only where the RT-04 map approves: candidates
`mobile-app-development`, `desktop-app-development`, `ai-development`, `it-consulting`.
Reuse the existing localized-slug data model (`services-data.ts`); do NOT build a
second service system. VI counterparts complete + reciprocal hreflang; follow the
existing per-locale slug convention.

## Acceptance criteria
- [ ] Audit EVERY consumer when adding services: navigation, footer, ServicePreview,
      hub, comparisons/quizzes/calculators, related content, sitemap, OG routes,
      locale switching — no hardcoded 6-service assumptions left.
- [ ] Each page: intro, suitable/not-suitable, deliverables, process, proof, cost
      drivers, FAQs, CTA. Tech names distinguish real experience from options.
- [ ] EN/VI content parity; no advertised translation that does not render.

## Files
`src/lib/services-data.ts`, `src/app/[locale]/services/`, `src/lib/navigation.ts`,
quizzes/comparisons/calculators consumers, `sitemap.ts`.

## Progress log
- 2026-10-22 created.
