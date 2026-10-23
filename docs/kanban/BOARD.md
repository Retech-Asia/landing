# Landing kanban board

Round 2026-10-22: **Enterprise upgrade** (owner-approved plan:
`agent/retech-enterprise-upgrade-plan.md`; Codex draft discarded — do not use as source).
Baseline audit evidence: `docs/enterprise-baseline-2026-10-22.md` (findings F1-F12).
Claims classification: `docs/evidence-register.md`.

**Owner corrections directive (2026-10-22, supersedes conflicting RT-04/RT-05 calls):**
LitDunes hero must be restored (P0); no template/AI-sounding copy; no weak project
metrics in promotional UI; green brand palette enforced (no #1A1A2E-class surfaces);
/process rebuilt editorial; photography overhauled. Waves: RT-18 → RT-19 → RT-20,
each gated by RT-17 reconciliation + owner-visible evidence.
**DEPLOY FREEZE: no production push until the next owner checkpoint** (overrides the
ship-on-green standing rule for this corrections round; RT-08 lands as a local commit).
**Checkpoint 3 (2026-10-22, second corrections round):** HomeCTA light decided; hero
stats removed site-wide; preview-only deployment authorized and verified safe (branch
pushes = Preview env, production = main only). Branch `preview/checkpoint3` pushed;
preview blocked by Vercel SSO protection (see `docs/release-readiness-2026-10-22.md`
section 4 for unblock options). RT-14 gate runs on the preview once access exists.
**RELEASED 2026-10-22:** owner authorized pushing main (`9cf43da..cd0998c`); Vercel
Production deployment succeeded; new copy verified live on /en and /vi, old stat lines
gone, VI slugs 200. RT-14 measurement re-targeted at live production.

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
| RT-08 | P1 | Service hub + CRM depth + new service pages | RT-04, RT-06 | DONE 2026-10-22 (10 service pages EN+VI; probes 46/46, a11y 100, CLS 0). LOCAL COMMIT ONLY — deploy frozen by owner corrections directive |
| RT-09 | P1 | Case-study proof + template upgrades | RT-02, RT-06 | blocked |
| RT-10 | P1 | About + approach + engagement/pricing presentation | RT-02, RT-06 | blocked |
| RT-11 | P1 | Contact flow + consent-aware instrumentation | RT-01, RT-06 | blocked |
| RT-12 | P1 | Site-wide SEO/locale/rendering regression pass | RT-03, RT-07-11 | blocked |
| RT-13 | P1 | Responsive/a11y/performance validation | RT-07-12 | blocked |
| RT-14 | P1 | Vercel preview + release package | RT-13 | Preview branch `preview/checkpoint3` deployed (36db777, Preview env verified, production untouched). BLOCKED: Vercel SSO deployment protection blocks external measurement; owner to unblock (bypass secret or public preview). Local production-build measurements recorded in `docs/release-readiness-2026-10-22.md` |
| RT-15 | P2 | Identity reconciliation (owner-executed) | RT-02 | owner items open |
| RT-16 | P2 | Editorial queue + measurement baseline | RT-01, RT-04 | blocked |
| RT-17 | P0 | Owner corrections: reconciliation audit (hero/copy/metrics/palette/process/images) | — | DONE 2026-10-22 (`docs/rt17-reconciliation-2026-10-22.md`) |
| RT-18 | P0 | Wave 1 brand recovery: LitDunes hero + palette + worst generic copy | RT-17 | DONE locally 2026-10-22 (dunes restored, probes 26/26, a11y 100) + RT-18b LCP investigation DONE (dunes exonerated by same-build A/B; `docs/rt18b-lcp-investigation-2026-10-22.md`). HELD for owner checkpoint |
| RT-19 | P0 | Wave 2: project presentation + /process rebuild | RT-18 | DONE locally 2026-10-22 (vanity machinery deleted; narrative rebuild EN+VI; /process 4 editorial groups; probes 65/65; screenshots `.tmp-audit/rt19/`). Surfaced + fixed locale-navigation 404s (switcher slug map, plain next/link swaps, industries EN-pinned card). HELD for owner checkpoint |
| RT-20 | P1 | Wave 3: imagery overhaul + site-wide consistency | RT-19 | DONE locally 2026-10-22 (`docs/imagery-asset-register.md`: inventory + orphans + licensed curation plan, Jay-gated replacements; HomeCTA light default + dark one-prop alternative, comparison shots `.tmp-audit/rt19/homecta-*.png`; about/industries seamless-empower copy sweep EN+VI). HELD for owner checkpoint |

## Notes

- **Deployment split (2026-10-23):** `prod` branch = retech.asia production
  only; `main` = staging. Pushed: `prod` at `b06dc02` (identical to released
  main). Owner Vercel steps (pending): (1) project Settings → Git →
  Production Branch: `main` → `prod`; (2) Domains → add staging domain
  (e.g. staging.retech.asia) assigned to Git Branch `main` + DNS CNAME;
  (3) Deployment Protection → disable Standard Protection so the staging
  domain is publicly viewable. Safety rails already in code: host-aware
  robots.txt (non-prod hosts get `Disallow: /` + noindex header) and the
  IndexNow ping stays gated on VERCEL_ENV=production. Until step 1 lands,
  pushes to main still deploy retech.asia — treat as production until
  confirmed flipped.
- **Deployment mapping (confirmed 2026-10-22):** Vercel is connected to
  `Retech-Asia/retech-landing`; `Retech-Asia/landing` has no Vercel integration.
  The local remote pushes to BOTH URLs → every push updates both repos; the
  PRODUCTION BRANCH (main until the flip, `prod` after) deploys retech.asia.
- Build law: while working unpublished routes, use `npx next build` (NOT `npm run build`,
  whose postbuild pings IndexNow).
- Standing repo ground rules (`docs/overhaul-roadmap.md`): owner's eye is final on visual
  calls; no superlatives; no dead buttons; no em dashes in content; LCP = SSR-visible hero.
- Lab perf baseline recorded (baseline doc): home mobile perf 49 / LCP 6.0s / TBT 2,000ms —
  RT-05/RT-07 directions must beat it. Local QA evidence stays in gitignored
  `.tmp-audit/` — never committed.
