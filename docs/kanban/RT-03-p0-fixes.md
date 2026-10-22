# RT-03 — Reproduced fixes (DONE 2026-10-22)

Scope: fix only what the baseline reproduced. No design changes.

## Items + resolution (evidence in docs/enterprise-baseline-2026-10-22.md)
1. **F1 robots** — DONE: `allow` now lists `/_next/static/` + `/_next/image` for all
   UAs; explicit `OAI-SearchBot` rule added; training policy (GPTBot) unchanged.
   Verified in built robots.txt output.
2. **F2 homepage FAQ schema** — DONE: removed per reviewer ruling (placement is an
   RT-04/RT-05 decision; schema-only answers must not survive). Verified: no FAQPage
   in home HTML.
3. **F3 review schema** — DONE: review block emits only when quote+author exist, and
   carries NO rating (no verified rating records; stars never invented).
   Verified: no Review schema on case-study pages either locale.
4. **F4 sticky CTA on contact pages** — DONE: locale-stripped `usePathname()` from
   i18n navigation, reactive per route change; render gated on `!isContactPage`.
5. **F5 CTA tracking** — DONE: consent enforced at SEND time (mount-time gate
   removed) so accept-after-load measures; locale-aware regex for contact hrefs;
   anchor resolution via closest() covers buttons + icon children.
6. **F9 duplicate ProfessionalService** (consistency) — DONE: single enriched
   site-wide `#localbusiness` (postalCode, serviceType, parentOrganization, 6-entry
   data-driven catalog with LOCALIZED slugs — the old EN-slugs-under-/vi pattern
   would advertise 404s); contact page emits only ContactPage + breadcrumb.
7. **F10 VI hreflang mismatch** (consistency) — DONE: inspected rendered `/vi/*`
   pages (all genuinely Vietnamese) → sitemap was right; flipped `viReady: true` on
   9 stale static pages; heads now emit en+vi+x-default reciprocally.

## Validation (local production build + Playwright probe, `.tmp-audit/enterprise-baseline/validate-rt03.js`)
- 10/10 PASS: sticky absent on direct + client-nav `/{en,vi}/contact`, present on
  home, recovers after contact→services; tracker = 1 event/click (dedupe),
  0 before / 1 after consent granted post-load, 0 when declined, nested-icon
  click tracked.
- tsc clean, eslint clean on all changed files, `npx next build` pass.
- Static-output checks: robots allows, no FAQPage, no Review, exactly 1
  ProfessionalService per contact page, hreflang reciprocity, VI catalog slugs.

## Progress log
- 2026-10-22 ticket created, all items reproduced with evidence.
- 2026-10-22 all 7 items implemented + validated 10/10; pushed.
