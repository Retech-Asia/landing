# RT-01 — Baseline audit (DONE, evidence recorded)

## Context
Reproducible before-state from the actual project before any redesign work.

## Result (2026-10-22)
Findings F1-F12 with file:line + live-probe evidence recorded in
`docs/enterprise-baseline-2026-10-22.md`. Raw artifacts (18 full-page screenshots
1440/768/375 × home/services-hub/crm-detail/case-study/about/contact both-language
EN set + report.json + probes) in gitignored `.tmp-audit/enterprise-baseline/`.

Key live-verified numbers: 18/18 loads 200, 0 console errors, 0 failed requests;
FAQPage schema on homepage with faqDomCount=0; sticky CTA present on /en/contact
and /vi/contact at 375px.

## Outstanding (belongs to later tickets)
- Lab perf metrics + scroll-through captures → RT-13.
- VI page content verification (F10) → RT-03.

## Progress log
- 2026-10-22 audit executed; server stopped, no repo changes besides docs.
