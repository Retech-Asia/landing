# RT-03 — Reproduced P0 fixes (READY)

Scope: fix only what the baseline reproduced. No design changes.

## Items (evidence in docs/enterprise-baseline-2026-10-22.md)
1. **F1 robots**: allow `/_next/static` + `/_next/image` (keep `/api/`, `/_vercel`,
   internal routes disallowed). Add explicit `OAI-SearchBot` entry (optional clarity).
2. **F2 homepage FAQ schema**: render the 5 FAQs visibly (accessible, expandable OK)
   OR remove `FAQJsonLd` from `src/app/[locale]/page.tsx`. Decide with RT-04 direction;
   schema-only answers must not survive either way.
3. **F3 review schema**: in `CaseStudyJsonLd`, suppress the `review` block when
   `testimonial.quote` is empty; never emit a numeric rating without a record.
4. **F4 sticky CTA on contact pages**: locale-aware guard (strip `/{locale}` prefix or
   use `usePathname()` from i18n navigation) in `MobileStickyCTA.tsx:31`.
5. **F5 CTA tracking**: match locale-prefixed contact hrefs (endsWith `/contact` after
   locale handling) in `EngagementTracker.tsx:53-58`.
6. **F9 duplicate ProfessionalService** on contact pages: emit once.
7. **F10 VI hreflang mismatch**: verify whether `/vi/about` + `/vi/contact` render real
   VI content; align sitemap `viReady` flags and page-head alternates to the truth.

## Exclusions
No copy rewrites, no new pages, no pricing/schema additions.

## Acceptance criteria
- [ ] `npx next build` passes; robots.txt live output shows static assets crawlable.
- [ ] Case-study pages emit no Review schema (while testimonials are empty).
- [ ] Sticky CTA absent on `/en/contact` + `/vi/contact`, present on other pages (375px probe).
- [ ] Contact-page ProfessionalService appears once in both locales.
- [ ] Sitemap + head hreflang consistent for every static route.

## Progress log
- 2026-10-22 ticket created, all 7 items reproduced with evidence.
