# ReTech Visual QA — reusable evidence capture

Established 2026-10-23 (owner-approved workflow). Playwright-based capture of
reproducible browser evidence for design review: screenshots, short
interaction recordings, states, content inventory, and a metadata block that
makes every finding reproducible.

## Run

Prerequisite (once): `npx playwright-core install ffmpeg` — video recording
needs the Playwright ffmpeg binary (playwright-core does not bundle it).

```bash
# against the local prod rig (build first: npm run build && npx next start -p 3312)
node visual-qa/capture.mjs

# against staging (recommended for review packages)
node visual-qa/capture.mjs --base https://staging.retech.asia

# subsets
node visual-qa/capture.mjs --batches 01-home,03-work
node visual-qa/capture.mjs --locales en
node visual-qa/capture.mjs --quick   # sanity pass, home EN 1440 only
```

## Output (LOCAL ONLY — never commit)

`visual-qa/out/<date>-<commit-short>/<batch>/`

- `page-<name>.<locale>.<viewport>.png` — full-page screenshots
  (EN: 1440/1920/768/375; VI: 1440 + 375; overflow check runs on all four for both locales)
- `vid-*.webm` — short interaction recordings (explorer swap, glass hover,
  mobile accordion, nav menu, card hovers, contact step 1 — never submits)
- `state-*.png`, `focus-*.png` — expanded/collapsed/keyboard-focus states
- `inventory-*.json` — per-page content inventory: headings, nav labels,
  forms+fields, image counts + broken-image flag, glass chip/control counts,
  video/iframe presence, overflow numbers
- `run-metadata.json` — base URL, commit hash, browser version, viewports,
  locales, timestamp, global overflow findings

## Coverage (batches)

| Batch | Pages |
|---|---|
| 01-home | `/` (LitDunes hero, explorer, delivery, work, engagement) EN+VI |
| 02-services | `/services`, `/services/crm-systems`, `/services/it-consulting` |
| 03-work | `/case-studies` + all five detail slugs |
| 04-process | `/process` |
| 05-unique | `/about`, `/technologies`, `/contact` |

## Workflow rules (owner, 2026-10-23)

1. Audit-first: this harness produces evidence; findings go into a
   prioritized visual-quality audit. No wholesale redesign.
2. Genuine weaknesses only — no long cosmetic lists. Prioritize by visitor
   impact, distinctiveness, engineering effort.
3. Approved improvements ship in focused batches with before/after evidence
   (re-run this harness against the same base + new commit).
4. Independent design review (ChatGPT) consumes the batch + audit; Claude
   Code implements only what survives review.
5. Preserve: LitDunes hero, `#30AB47`/`#208535` color law, factual integrity
   (no unevidenced technology-role claims), EN/VI, the approved glass system.
6. Production deployment is separate from design acceptance (`main` = staging,
   `prod` = retech.asia, release = FF merge).
7. Evidence is local-only (`visual-qa/out/` is gitignored); commit only the
   harness itself.

## Trademark + factual rules for recommendations

Provider logos/markings must follow each provider's brand guidelines; do not
claim a technology filled a role in a project without evidence from
`src/lib/case-studies-data.ts` (the inventory of record).
