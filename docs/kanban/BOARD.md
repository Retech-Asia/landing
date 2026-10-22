# Landing kanban board

Round 2026-10-22: **Enterprise upgrade** (owner-approved plan:
`agent/retech-enterprise-upgrade-plan.md`; Codex draft discarded — do not use as source).
Baseline audit evidence: `docs/enterprise-baseline-2026-10-22.md` (findings F1-F12).
Claims classification: `docs/evidence-register.md`.

One file per ticket (`RT-##-*.md`) with Context, AC, Files, Progress log.
Rule: update BOTH the ticket file and this board row in the same edit.

| ID | P | Work | Depends | Status |
| --- | --- | --- | --- | --- |
| RT-00 | P0 | Workspace/remote validation | — | DONE (board note) |
| RT-01 | P0 | Baseline audit (routes/SEO/UX/perf) | RT-00 | DONE (baseline doc + local captures) |
| RT-02 | P0 | Claims + asset evidence register | RT-00 | DONE as register; owner confirmations OPEN |
| RT-03 | P0 | Reproduced crawl/schema/tracking fixes | RT-01 | DONE 2026-10-22 (10/10 probe PASS; F9/F10 resolved as consistency fixes) |
| RT-04 | P1 | Buyer positioning + homepage copy + service IA | RT-01, RT-02 | Copy plan drafted (`docs/rt04-positioning-copy-plan.md`); hero options await Jay |
| RT-05 | P1 | Two design directions + recommendation | RT-04 | Prototypes + 7-axis comparison done (`docs/rt05-design-comparison.md`: B system, hero wording decoupled); STOPPED for owner checkpoint |
| RT-06 | P1 | Shared nav/typography/component system | RT-05 | DONE locally (Inter + Source Serif 4, ink button, IndexRow, editorial chrome; Lighthouse mobile EN 95 / VI 92, LCP 1.9/2.2s — font double-download root cause fixed). LOCAL COMMIT ONLY; awaiting owner checkpoint before push/deploy |
| RT-07 | P1 | Homepage implementation | RT-02, RT-04, RT-06 | DONE locally (Option A hero, B sections 01-05 + proof strip + ink closing band, retired 4 sections, menu focus fix, footer h3s; Lighthouse mobile EN 96/VI 95, a11y 100, LCP 1.9/1.8s, probes 36/36). LOCAL COMMIT ONLY, awaiting owner review |
| RT-08 | P1 | Service hub + CRM depth + new service pages | RT-04, RT-06 | blocked |
| RT-09 | P1 | Case-study proof + template upgrades | RT-02, RT-06 | blocked |
| RT-10 | P1 | About + approach + engagement/pricing presentation | RT-02, RT-06 | blocked |
| RT-11 | P1 | Contact flow + consent-aware instrumentation | RT-01, RT-06 | blocked |
| RT-12 | P1 | Site-wide SEO/locale/rendering regression pass | RT-03, RT-07-11 | blocked |
| RT-13 | P1 | Responsive/a11y/performance validation | RT-07-12 | blocked |
| RT-14 | P1 | Vercel preview + release package | RT-13 | blocked |
| RT-15 | P2 | Identity reconciliation (owner-executed) | RT-02 | owner items open |
| RT-16 | P2 | Editorial queue + measurement baseline | RT-01, RT-04 | blocked |

## Notes

- **Deployment mapping (confirmed 2026-10-22):** Vercel is connected to
  `Retech-Asia/retech-landing`; `Retech-Asia/landing` has no Vercel integration.
  The local remote pushes to BOTH URLs → every `git push origin main` deploys
  production. Treat pushes as releases.
- Build law: while working unpublished routes, use `npx next build` (NOT `npm run build`,
  whose postbuild pings IndexNow).
- Standing repo ground rules (`docs/overhaul-roadmap.md`): owner's eye is final on visual
  calls; no superlatives; no dead buttons; no em dashes in content; LCP = SSR-visible hero.
- Lab perf baseline recorded (baseline doc): home mobile perf 49 / LCP 6.0s / TBT 2,000ms —
  RT-05/RT-07 directions must beat it. Local QA evidence stays in gitignored
  `.tmp-audit/` — never committed.
