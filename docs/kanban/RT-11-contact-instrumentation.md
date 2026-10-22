# RT-11 — Contact flow + consent-aware instrumentation (P1, blocked by RT-01/06)

## Context
Short accessible form (name, business email, service type, description, optional
budget/timeline), what-happens-next explainer. Extends RT-03's tracking fixes to full
conversion instrumentation: consent timing, locale-prefixed routes, post-navigation
state.

## Acceptance criteria
- [ ] Form validation/loading/error/duplicate-submission states verified in a test env.
- [ ] Delivery tested with agreed test data; environment limits reported. No unsolicited mail.
- [ ] Sensitive input never sent to analytics; consent granted-after-load path verified.

## Files
`src/app/[locale]/contact/`, `src/app/api/contact/`, `src/lib/email.ts`, `analytics.ts`, consent utils.

## Progress log
- 2026-10-22 created.
