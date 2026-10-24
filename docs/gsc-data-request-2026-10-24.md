# Search Console data request (2026-10-24)

No Google Search Console access exists in this environment: no verification
artifact in the repo (no `google-site-verification` meta tag or record file),
no service credential. Verification may exist on the owner's Google account
(via DNS on Cloudflare) — only the owner can check.

To ground ranking/indexing work in evidence, export the following from the
GSC property for `retech.asia` (Domain property preferred). Each export is a
CSV/Sheets download from the named report; none contain secrets.

## 1. Performance — Pages (last 6 months, Web + Image)
Search Results → Performance → Pages tab → export.
Needed to identify which service, case-study, and blog URLs actually get
impressions/clicks vs which priority pages get none.

## 2. Performance — Queries (last 6 months)
Same report, Queries tab → export.
Needed to see whether US/California buyer-intent queries (crm development,
custom business software, vietnam outsourcing, mvp development, ai
integration) associate with any Retech URL today.

## 3. Page indexing report
Indexing → Pages → export ("Why pages aren't indexed" table).
Needed to separate "not indexed" from "crawled, currently not indexed" and
"duplicate without user-selected canonical" per priority URL.

## 4. Sitemaps status
Indexing → Sitemaps — a screenshot or note of the submitted sitemap URL,
its status, and "discovered URLs" count is enough.

## 5. (Optional) Links report
Links → Top linked pages + Top linking sites → export.
Needed before any off-site/backlink suggestion; not required for the
current on-site round.

## Acceptance
If an export shows a priority page (5 focus services, 5 case studies, the
California/US posts) with zero impressions or an indexing problem, that
page becomes the next concrete work item with before/after measurable in
the next export. No ranking or visibility claims will be made without
this data.
