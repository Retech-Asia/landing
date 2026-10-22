# RT-12 — Site-wide SEO/locale/rendering regression pass (P1, blocked by RT-03 + RT-07..11)

## Context
After content/template rounds: canonicals, hreflang reciprocity, redirect map untouched,
sitemap truthfulness (stable lastmod policy), social previews, schema facts, preview
noindex on Vercel (do NOT globally noindex the domain).

## Acceptance criteria
- [ ] Representative EN/VI pages: title/description/H hierarchy/canonical/hreflang correct.
- [ ] No soft 404s, redirect chains, duplicate locale variants.
- [ ] robots + sitemap + rendered output all consistent (extends RT-03).
- [ ] Staging/preview noindex verified; production indexing preserved.

## Progress log
- 2026-10-22 created.
