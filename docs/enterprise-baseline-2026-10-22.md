# Enterprise upgrade — baseline audit (2026-10-22)

Audited at `main` @ `9781146` (clean except `.mcp.json`, preserved). Local production
build (`npx next build`, Turbopack, no postbuild) + `next start` + Playwright probe.
Raw evidence is local-only (gitignored): `.tmp-audit/enterprise-baseline/`
(18 full-page screenshots at 1440/768/375, `report.json`, probe scripts).

Reproduction status per the planning handoff (`agent/retech-enterprise-upgrade-plan.md` §4).
The discarded Codex draft was not used as source; each finding was re-derived here.

## Confirmed findings (live + source evidence)

| # | Finding | Evidence | Severity |
| --- | --- | --- | --- |
| F1 | `robots.txt` disallows `/_next/` for every UA incl. Googlebot → CSS/JS and `/_next/image` optimized images are uncrawlable | `src/app/robots.ts:12` + live `curl /robots.txt` | P0 |
| F2 | Homepage emits FAQPage schema with 5 Q&As; no visible FAQ section exists (HomeFAQ removed deliberately, comment preserved) | `src/app/[locale]/page.tsx:47-71` (comment line 43); live `ldTypes` includes FAQPage, `faqDomCount=0` | P0 |
| F3 | Every case study ships a Review schema with `ratingValue: "5"` while ALL 5 case-study testimonials are empty strings (blank author/body/role/company) | `src/components/seo/JsonLd.tsx:652-669` (no empty guard); `src/lib/case-studies-data.ts:138,223,286,349,412` | P0 |
| F4 | MobileStickyCTA renders ON the contact page: guard `pathname.startsWith("/contact")` never matches `/en/contact` or `/vi/contact` | `src/components/ui/MobileStickyCTA.tsx:31`; live probe: fixed "Get Free Consultation" present on both locale contact pages at 375px, 60% scroll | P0 |
| F5 | EngagementTracker CTA-click detection compares `href === "/contact"` but real DOM hrefs are locale-prefixed (`/en/contact`) → CTA clicks never tracked | `src/components/ui/EngagementTracker.tsx:53-58`; live hrefs from F4 probe | P0 |
| F6 | Visible H1 is `sr-only` (`seoH1`); visible tagline "Turning Ideas into Solutions" is `aria-hidden` — heading exists for crawlers/SR only | `src/components/sections/home/Hero.tsx:108-125` | P1 (design decision, Phase B) |
| F7 | Only 6 services (cms-platforms, crm-systems, erp-solutions, web-development, ui-ux-design, dedicated-teams); no mobile / desktop / applied-AI / IT-consulting destinations | `src/lib/services-data.ts` ids at lines 80/288/489/697/898/1099 | P1 (Phase C) |
| F8 | All case-study imagery lives in `public/images/stock/` (`cs-*-hero/dashboard/mobile.webp`); no separate provenance record | directory listing; `case-studies-data.ts` image srcs | P1 (register + owner) |
| F9 | Duplicate `ProfessionalService` JSON-LD on both contact pages | live `ldTypes` = `ProfessionalService,ProfessionalService,ContactPage` (both locales) | P2 |
| F10 | Sitemap declares VI alternates for ALL static pages (`viReady: true`) but `/en/about` and `/en/contact` heads emit no `vi` hreflang — sitemap and page head disagree about VI readiness | `src/app/sitemap.ts:32-46` vs live head hreflang `[en, x-default]` | P1 (verify which is true) |
| F11 | Phone vs WhatsApp numbers differ: `CONTACT.phone` +84 769 294 225 vs footer WhatsApp `wa.me/84906426802` | `src/lib/constants.ts:10-19`; `src/components/sections/Footer.tsx:95` | Owner fact (do not unify blindly) |
| F12 | `SoftwareProductJsonLd` (price "0", USD) is DEAD CODE — defined, never called; the zero-price Product schema does not actually emit | `JsonLd.tsx:689-710`; zero call sites | P2 (delete or leave; not a live defect) |

## Baseline facts (healthy, no action)

- 18/18 page loads: HTTP 200, **zero console errors, zero failed requests**, both locales, 3 widths.
- Canonicals self-referencing and correct on all sampled pages; hreflang reciprocals where declared.
- Root `/` → 308 → `/en`; unknown slug → real 404 (no soft 404).
- Sitemap: stable `lastmod` via `CONTENT_LAST_UPDATED` (already the plan's required pattern); Wix 308 redirect map intact in `next.config.ts`.
- Service pages carry visible FAQs (`faqDomCount=1` on CRM detail) — their FAQPage schema is legitimate.
- Build: plain `npx next build` passes (224-page-class output); fonts resolve normally on this network. `npm run build` additionally fires the IndexNow ping — avoid during unpublished-route work.
- Full-page screenshots show blank stretches between above-the-fold sections: known `whileInView` + fullPage-capture artifact, not verified as a rendering defect. Scroll-through capture belongs to RT-13.

## What was NOT established

- No Lighthouse/lab metric run in this pass (RT-13); no field CWV data.
- No claim verification against company records (RT-02 owner items).
- No live production probes (production unchanged; local build only).
