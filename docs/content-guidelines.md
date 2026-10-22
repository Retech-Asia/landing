# Content Guidelines

Tone of voice, source of truth, naming conventions, and banned patterns for site copy.

## Source of truth

**This Next.js repository is the canonical source for company copy.** It is delivered
via Vercel to https://www.retech.asia (Vercel is connected to `Retech-Asia/retech-landing`).

Historical note: before the 2026-08-23 overhaul, the Wix site was the canonical source
(copy was captured from Wix on 2026-07-21 during migration). Wix is retired as a
reference; do not fetch it for baselines.

Do not invent copy. If something is missing or ambiguous, ask Jay — don't fill gaps
with hallucinated content.

## Tone of voice

The site reads like a **technical solutions company**, not an offshore outsourcing pitch.

**Do:**
- Lead with capabilities (what we do, how we work)
- Use concrete facts (project counts, team size, years, technologies)
- Keep sentences under 25 words where possible
- Use active voice
- Name specific technologies when relevant (React, Next.js, AWS, etc.)

**Don't:**
- Lead with geography ("Vietnam-based…") in primary copy — that belongs in the dedicated `WhyVietnam` section, not the hero
- Lead with cost savings ("Save 40-60%!") — fine deeper in the funnel, never in the hero
- Stack company self-descriptions — one tight value prop per section
- Use British spelling (American English only)

## Hero copy (canonical)

```
H1:       Turning Ideas into Solutions
Subhead:  Full-cycle software development — from business analysis and design
          to deployment. Agile methodologies, modern technologies, and
          AI-driven solutions built for scalability, performance, and user
          experience.
Primary CTA:  Get Free Consultation
Secondary:   Explore Services
```

This is canonical hero copy (originally captured from Wix, 2026-07-21). Don't change without Jay's input. RT-04/RT-05 may change the H1 semantics (visible vs sr-only) but the wording itself stays Jay-gated.

## Banned phrases (superlatives + marketing fluff)

| Don't write | Write instead |
|---|---|
| best, top, top-tier, leading, premier | (delete the adjective) |
| world-class | great, exceptional, or delete |
| cutting-edge | modern |
| battle-tested | proven |
| industry-leading | established |
| market-leading | successful, competitive |
| #1 in Vietnam | (delete entirely) |
| "Save 40-60%!" in primary copy | factual cost comparison deeper in funnel |

Apply this filter to every user-facing string. **Blog posts are exempt** — they may use richer language including superlatives when contextually appropriate.

## Case study naming

Client brand names are NEVER used. Each case study carries a generic project-purpose
descriptor. The five verified case studies (single source:
`src/lib/case-studies-data.ts`) are:

| Study (EN title) | Industry | Slug (EN) | Slug (VI) |
|---|---|---|---|
| Mining Analytics Platform | Blockchain & Crypto | `mining-analytics-platform` | `phan-tich-mining` |
| Asset Management Platform | Finance | `asset-management-platform` | `quan-ly-tai-san` |
| Investment Intelligence Platform | Financial Research | `investment-intelligence-platform` | `tri-tue-dau-tu` |
| Fintech Card Marketing Platform | Consumer Fintech | `fintech-card-marketing` | `marketing-the-fintech` |
| AI Analysis SaaS Platform | AI / SaaS | `ai-analysis-saas` | `ai-analysis-saas` |

This table is the baseline (ruling 2026-10-22). Do not rename existing studies;
earlier docs referencing "Wellness Platform" (`/case-studies/wellness-platform`) or
a Signsbeat/Dune slug pair are stale — those slugs do not exist in the data model.

## Stat consistency

All stats must match `src/lib/constants.ts`. Don't introduce new numbers elsewhere without updating the constants file.

**Current canonical stats** (do not contradict):
- 50+ Projects Delivered
- 30+ Expert Engineers
- 5+ Years of Experience
- 98% Client Satisfaction
- 6 Countries Served
- <24h Average Response Time

If the About-page timeline or any case study needs a different number, it must reference the same source. Tuan Le's bio "20+ developers across distributed teams" refers to his PRIOR role, not Retech's current size — that's fine.

## Page title format

Layout template in `src/app/layout.tsx`: `title.template = "%s | Retech Solutions"`.

Per-page titles must NOT include "Retech Solutions" in the string — the template appends it automatically. Wrong: `title: "About Us | Retech Solutions"`. Right: `title: "About Us"`.

Result in browser tab: `About Us | Retech Solutions`.

## Button + CTA labels

| Label | When to use |
|---|---|
| Get Free Consultation | Primary CTA in hero + closing CTA sections |
| Explore Services | Secondary CTA pointing at `/services` |
| View Our Work | CTA pointing at `/case-studies` |
| Read more / Read article | Blog card links |
| Start Your Project | Avoid — replaced by "Get Free Consultation" |

Dead buttons are forbidden. Every button must lead somewhere real. No `href="#"`, no `javascript:void(0)`, no `onClick preventDefault`.

## Contact information

Single source: `src/lib/constants.ts` `CONTACT` object.

- Phone: `(+84) 769 294 225`
- Email: `retechasia@gmail.com`
- Address: `288K8 Nam Ky Khoi Nghia, Vo Thi Sau Ward, HCMC, Vietnam`
- Tax ID: `0318655079`
- Business name: `RETECH SOLUTIONS CO., LTD.`

The `<noscript>` fallback in `layout.tsx` pulls from `CONTACT`. Anywhere else that hardcodes contact info must be migrated to use the constants — never duplicate.

## Spelling + grammar

- **American English**: customize (not customise), organize (not organise), color (not colour).
- **Oxford comma**: yes (CMS, CRM, and ERP systems).
- **Sentence case** for headings, NOT Title Case For Every Word.
- **Em dashes** (`—`) with no surrounding spaces for parenthetical breaks: `full-cycle development — from design to deployment`.
- Governance note (ruling 2026-10-22): this document governs public site copy
  punctuation until a consolidated ruling. `docs/overhaul-roadmap.md` bans em dashes
  more broadly; until resolved, follow THIS rule for site copy and avoid em dashes
  in non-copy docs.
- No double spaces after periods.

## Blog post conventions

- Each post has auto-generated OG image at `/blog/[slug]/opengraph-image` (branded, with title + category badge).
- Blog listing cards display the OG image as the thumbnail — no manual cover art required.
- Categories: `Industry Insights`, `Guides`, `Technology`. Map via `CATEGORY_SLUG_MAP` in `blog-data.ts`.
- Read time format: `"5 min read"`.
- Date format in listings: `"May 12, 2026"`. In ISO form for `date` field: `"2026-05-12"`.

## Structured data (JSON-LD)

Every page must have at minimum a `<WebPageJsonLd>` and `<BreadcrumbJsonLd>`. Specific schemas:
- Blog posts → `<BlogPostingJsonLd>`
- FAQ page → `<FAQJsonLd>`
- Case studies → `<SoftwareApplicationJsonLd>` or `<CreativeWork>` depending on type

These live in `src/components/seo/JsonLd.tsx`. Don't invent new schema types — extend the existing component.

## Image alt text

Alt text describes the content for someone who can't see it:

- Good: `alt="Wellness Platform dashboard showing health metrics and analytics charts"`
- Bad: `alt="dashboard"` or `alt="image"`

For purely decorative images (backgrounds, gradients), use `alt=""` (empty) so screen readers skip them.

## What to do when you don't know the answer

- Check this repo first (it is the source of truth)
- Check `src/lib/constants.ts` for stats
- Ask Jay — don't guess
- Save the answer to memory so the question doesn't recur
