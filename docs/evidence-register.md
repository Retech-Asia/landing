# Claim and asset evidence register

Statuses: **verified** (record seen) · **owner** (owner confirmation needed) ·
**illustrative** (must be labeled) · **remove/rewrite**. Nothing here is an accusation;
existing copy is pending classification, not presumed false. Owner = Vu Pham.

## Company identity

| Claim / fact | Location | Status | Treatment |
| --- | --- | --- | --- |
| Legal name "RETECH SOLUTIONS CO., LTD.", tax ID 0318655079 | `src/lib/constants.ts` | owner | Confirm matches current license before wider use in schema |
| Address 288K8 Nam Ky Khoi Nghia, Vo Thi Sau Ward, HCMC | `constants.ts` | owner | Confirm current |
| Phone +84 769 294 225 (tel links) | `constants.ts` | owner | Is this the intended sales line? |
| WhatsApp +84 90 642 6802 (wa.me link) | `Footer.tsx:95` | owner | Different number from phone — intentional channel or stale? |
| Email hello@retech.asia (public contact everywhere) | `constants.ts` | owner DECIDED 2026-10-24 | Owner moved the public email off gmail to hello@retech.asia (Cloudflare email forward); constants.ts updated site-wide |
| Stats: 50+ projects, 30+ engineers, 5+ years | was `constants.ts` STATS + hero strip, ABOUT_STATS, about milestones, FAQ, CultureValues, LeadershipTeam | REMOVE DONE 2026-10-22 (checkpoint 3) | Owner ruled: unverified numbers stop displaying. Hero strip + both stat constants deleted; about numeric grid replaced by capability cards; FAQ/about/bio de-numbered |
| 98% client satisfaction | was STATS_BAR, FAQ answer, OG image | REMOVE DONE 2026-10-22 | Last two hiding spots (FAQ, OG image) removed; must not return |
| 6 countries served | was ABOUT_STATS + about milestone + FAQ + footer | REMOVE DONE 2026-10-22 | Footer line rewritten to industries; milestone de-numbered; markets list still wanted from owner for future use |
| 24h average response time | was ABOUT_STATS + HomeCTA/process/services/contact/estimator copy + FAQ SLA answer | REMOVE DONE 2026-10-22 | Response-time commitments now deferred to per-project SLA wording |
| "5+ shipped AI platforms", "LangChain/pgvector/OpenAI/Anthropic in production", "multi-agent orchestration shipped as standard" | was `constants.ts` HIGHLIGHTS | REMOVE DONE 2026-10-22 | HIGHLIGHTS had no consumers (dead constant); deleted with its flagged copy |

## Case studies (5: mining, asset-mgmt, investment-intel, fintech-card, ai-saas)

| Item | Location | Status | Treatment |
| --- | --- | --- | --- |
| Narrative facts (stacks, integrations, outcomes) | `src/lib/case-studies-data.ts` | owner | Owner attests each describes real RETECH work |
| Stat rows (`results`) + before/after tables (`beforeAfter`) | were `case-studies-data.ts` | REMOVE/rewrite | DONE 2026-10-22 (RT-19): model fields + sections + AnimatedMetrics/BeforeAfter components deleted; numbers had no record |
| keyResults | `case-studies-data.ts` | rewrite DONE 2026-10-22 | Qualitative capability statements only (no %, x-multipliers, accuracy claims) |
| impact prose numbers ("60% improvement", "optimal accuracy") | `case-studies-data.ts` | rewrite DONE 2026-10-22 | Qualitative rewrites EN+VI |
| Client country per study (owner arc) | `clientCountry?` field, rendered when set | owner | Jay supplies market per study; render-gated until then |
| Testimonials | all 5 are empty strings | verified (empty) | Keep empty; review schema already suppressed (F3) |
| Imagery `cs-*.webp` in `public/images/stock/` | hero images + detail pages | owner / illustrative | "Illustrative visualization" caption shipped on detail hero; mining study's mismatched cs-wellness-* replaced with analytics-dashboard.webp; full inventory + licensed curation plan in `docs/imagery-asset-register.md` (Wave 3D replacements Jay-gated) |
| Named third parties (F2Pool, ViaBTC, CoinGecko, Stripe…) | case-study text | owner | Confirm these describe real integrations |

## Testimonials / reviews / ratings

| Item | Status | Treatment |
| --- | --- | --- |
| Review schema 5-star on case studies | remove/rewrite | F3: no numeric rating without a record; suppress review schema while testimonials are empty |
| Any client logo usage | owner | No logo strip claims without permission (current TrustedBy strip lists industries, not client logos — keep it that way unless permission exists) |

## Blog

| Item | Status | Treatment |
| --- | --- | --- |
| 29 posts' technical accuracy + authorship (org author) | owner | RT-16 audit queue; no new posts until audited |

## Rules applied

- Never manufacture numeric ratings, prices, or client names from positive material.
- Unverifiable claims stay visible but flagged here; removal/rewrite only by owner decision or plan rule (no superlatives per `docs/content-guidelines.md`).
- Private contracts, budgets, client data are never published as evidence.
