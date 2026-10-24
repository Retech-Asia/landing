# Blog editorial handoff — ChatGPT (retech.asia)

Handed off: 2026-10-24. Division of labor per owner instruction: **ChatGPT**
owns market research, topic selection, and writing the 4–6 articles.
**Claude Code** owns integration (blog-data.ts, schema, hreflang, sitemap,
OG) and deployment. This document is self-contained; ChatGPT needs no repo
access, though the source repo is `Retech-Asia/retech-landing` (read-only).

## 1. Assignment

- Publish 4–6 genuinely valuable articles mixing (a) current AI/engineering
  developments from roughly **Sep 24 – Oct 24 2026** sourced from primary
  announcements (OpenAI, Anthropic, Google, Microsoft, GitHub) and (b)
  evergreen buyer-intent topics (custom software development in Vietnam,
  offshore development for California/US teams, MVP outsourcing, AI
  integration for small business, choosing a bilingual VN–EN partner).
- Topic selection, angles, titles, and all body copy are ChatGPT's call.
  The site's last post is dated 2026-09-04, so the fresh-development window
  is entirely open.
- Accuracy laws: accurate dates, verifiable primary sources only, no
  invented benchmarks, authors, quotes, outcomes, or client names. EN is
  primary (US buyer intent); VI translation optional (see §5).

## 2. Verified company facts (safe to cite)

- Legal name: **RETECH SOLUTIONS CO., LTD.** (tax ID 0318655079),
  288K8 Nam Ky Khoi Nghia, Vo Thi Sau Ward, Ho Chi Minh City, Vietnam.
- Contact: hello@retech.asia, (+84) 769 294 225, https://www.retech.asia.
- Bilingual EN/VI site; engineering team in HCMC serving US/international
  clients; working-hours overlap with US West Coast is a real operational
  practice (see existing post `vietnam-timezone-follow-the-sun-engineering-202608`).
- Services (10, each with a page under `/en/services/<slug>`):
  cms-platforms, crm-systems, erp-solutions, web-development, ui-ux-design,
  dedicated-teams, mobile-app-development, desktop-app-development,
  ai-development, it-consulting.
- Industries served (9 pages under `/en/industries/<slug>`): healthcare,
  finance, e-commerce, education, real-estate, logistics, manufacturing,
  technology, media-entertainment.
- Published case studies (5, `/en/case-studies/<slug>`): mining-analytics-platform,
  asset-management-platform, investment-intelligence-platform,
  fintech-card-marketing, ai-analysis-saas.
- **Hard bans (owner rulings, enforced site-wide):**
  - No numeric claims like "50+ projects", "30+ clients", "X years",
    "N countries", "24h response" — these were deliberately deleted from
    the site pending factual basis. Do not reintroduce them in articles.
  - No invented hourly rates, package prices, delivery-time guarantees,
    US office claims, or promised business outcomes.
  - No fabricated client names or testimonials.
  - Article author is always "Retech Solutions" (no personal bylines).

## 3. Editorial voice + conversion paths

- Voice matches the existing blog: practical, engineering-literate,
  decision-framing for US small/mid-size business owners and technical
  founders; no keyword stuffing, no AI-sounding filler, no clickbait.
- Every article should end with one natural CTA linking to `/contact`
  (and/or the estimate wizard `/estimate`) using inline link syntax (§5).
  Internal links may point to: service pages, industry pages, case studies,
  and related blog posts (see inventory §6) — cross-linking existing posts
  is encouraged.
- Never claim an internal link target that doesn't exist; use slugs from
  §2 and §6 only.

## 4. Content schema (exact fields the site renders)

Source of truth: `src/lib/blog-data.ts` → `interface BlogPost`. Deliver
per article:

| Field | Type | Rules |
| --- | --- | --- |
| `slug` | string | kebab-case, ASCII, unique; becomes `/en/blog/<slug>` |
| `title` | string | plain text, no markdown |
| `excerpt` | string | 1–3 sentences; used in listings + meta description |
| `content` | string[] | **Plain-text paragraphs.** Only inline syntax supported: `[link text](/internal/path)` or `[text](https://external)` — rendered as anchors. No bold/italic/heading markdown inside paragraphs. |
| `headings` | {id,text,level}[] | Section headings; `id` is the anchor + TOC entry; level 2 (3 allowed); every heading needs a stable ASCII id |
| `category` | string | One of: `Industry Insights`, `Guides`, `Technology` |
| `date` | string | ISO `YYYY-MM-DD`, honest publication date |
| `updatedAt` | string? | ISO, only if substantially revised |
| `author` | string | Always `Retech Solutions` |
| `readTime` | string | e.g. `7 min read` (realistic estimate) |
| `table` | object? | Optional comparison table: `{ afterParagraph: number, caption?: string, columns: string[], rows: string[][] }` — renders inline after the Nth content paragraph |

**Deliverable format:** one Markdown file per article, each opening with a
fenced JSON block containing exactly the fields above (content paragraphs as
a JSON string array), followed by the full article as readable Markdown for
review. Claude Code will transcribe into `blog-data.ts` verbatim — write
final copy, not drafts.

## 5. Vietnamese layer (optional but preferred for evergreen guides)

- `src/lib/blog-i18n.ts` supports per-post VI metadata: localized VI slug,
  title, excerpt, category (VI category strings in use: `Insight Ngành`,
  `Hướng dẫn`, `Công nghệ`). Body translation is optional; untranslated
  posts render the EN body under `/vi` with a notice — this is supported
  and SEO-safe (hreflang only declared where VI really renders).
- VI copy rule from the owner: plain, jargon-free business Vietnamese
  (e.g. avoid unexplained composite English terms; keep common industry
  terms where natural).
- For the AI-news articles, EN-only is fine (EN primary for US intent).

## 6. Existing blog inventory (49 posts — link targets)

Categories: Industry Insights, Guides, Technology. Sorted newest first.
Recent posts are the most valuable internal-link targets:

| Date | Slug | Category |
| --- | --- | --- |
| 2026-09-04 | ai-model-wave-2026-astra-fable-gemini-glm-acquisitions | Industry Insights |
| 2026-08-14 | nab-innovation-centre-vietnam-global-bank-tech-hub | Industry Insights |
| 2026-08-13 | vietnam-software-developer-rates-2026-complete-pricing-guide | Industry Insights |
| 2026-08-12 | nvidia-vietnam-expansion-ai-talent-pipeline | Technology |
| 2026-08-11 | odoo-vs-sap-business-one-2026-honest-comparison | Guides |
| 2026-08-10 | samsung-rd-vietnam-engineering-quality-standard | Industry Insights |
| 2026-08-10 | view-transitions-api-production-guide-202608 | Technology |
| 2026-08-09 | ai-agents-small-business-workflows-2026-practical-guide | Technology |
| 2026-08-08 | fpt-viettel-vng-vietnam-tech-champions-global | Industry Insights |
| 2026-08-06 | vietnam-semiconductor-industry-2026-chip-giants-expanding | Technology |
| 2026-08-03 | vietnam-timezone-follow-the-sun-engineering-202608 | Industry Insights |
| 2026-07-27 | pgvector-vector-search-production-patterns-2026 | Technology |
| 2026-07-26 | ai-agent-frameworks-comparison-2026-langchain-langgraph-crewai | Technology |
| 2026-07-26 | model-context-protocol-mcp-production-guide-2026 | Technology |
| 2026-07-26 | llm-pricing-comparison-2026-gpt5-claude-gemini-enterprise-costs | Technology |
| 2026-07-26 | rag-retrieval-augmented-generation-best-practices-2026 | Guides |
| 2026-07-26 | ai-code-generation-tools-2026-copilot-claude-code-cursor | Technology |
| 2026-05-18 | agentic-ai-autonomous-software-systems-2026 | Technology |
| 2026-05-18 | why-vietnam-smart-choice-it-outsourcing-2026 | Industry Insights |
| 2026-05-18 | how-choose-right-tech-stack-next-project | Guides |
| 2026-05-18 | from-legacy-to-cloud-native-practical-migration-guide | Technology |
| 2026-05-15 | how-small-businesses-leverage-ai-without-breaking-bank | Guides |
| 2026-05-15 | rise-of-edge-computing-what-it-means-for-web-applications | Technology |
| 2026-05-15 | why-typescript-became-default-enterprise-development | Industry Insights |
| 2026-05-15 | building-accessible-websites-practical-guide-2026 | Guides |
| 2026-05-15 | state-of-react-server-components-2026 | Technology |
| 2026-05-12 | why-vietnam-top-it-outsourcing-destination-2026 | Industry Insights |
| 2026-05-05 | erp-modernization-legacy-systems-migration-guide | Guides |
| 2026-05-01 | cloud-native-erp-microservices-architecture-future | Technology |
| 2026-04-28 | cms-vs-crm-choosing-right-system-business | Guides |
| 2026-04-22 | building-offshore-development-team-practical-guide | Industry Insights |
| 2026-04-15 | how-ai-transforming-custom-software-development | Technology |
| 2026-04-08 | nextjs-16-server-components-performance-guide | Technology |
| 2026-03-25 | low-code-vs-custom-development-when-to-choose | Guides |
| 2026-03-15 | rise-of-headless-cms-separating-content-from-presentation | Technology |
| 2026-03-10 | ai-governance-enterprise-software-compliance-2026 | Industry Insights |
| 2026-02-20 | evaluate-offshore-software-development-partner-checklist | Guides |
| 2026-02-05 | software-development-cost-comparison-vietnam-india-eastern-europe-2026 | Industry Insights |
| 2026-01-15 | offshore-software-development-complete-guide-2026 | Guides |
| 2025-12-10 | crm-vs-erp-understanding-differences-choosing-right-system | Guides |
| 2025-11-20 | custom-software-vs-off-the-shelf-how-to-choose | Guides |
| 2025-10-22 | how-build-dedicated-development-team-vietnam | Industry Insights |
| 2025-09-15 | role-of-ai-in-modern-business-software | Technology |
| 2025-07-10 | building-scalable-web-applications-technical-deep-dive | Technology |
| 2025-06-25 | ui-ux-design-principles-enterprise-software | Guides |
| 2025-03-18 | vietnam-digital-transformation-hub-2025 | Industry Insights |

Category listing pages: `/en/blog/category/technology`, `/guides`,
`/industry-insights`.

## 7. What Claude Code already handles (do NOT include in deliverables)

- BlogPosting + Breadcrumb structured data, canonical URLs, hreflang
  (EN/VI), Open Graph + Twitter cards, auto-generated OG images, sitemap
  entries (EN + VI slugs), robots.txt (GPTBot, OAI-SearchBot, ChatGPT-User,
  CCBot explicitly allowed), GA4/Clarity consent-gated analytics.
- Hero images: `src/lib/blog-images.ts` maps slugs to curated stock photos;
  if a new article needs a specific image, note the subject in one line and
  Claude will source/map it (owner asset-quality rules apply).

## 8. Search Console evidence

No GSC API access exists from the repo, so query-level evidence must come
from the owner's GSC UI (property `retech.asia`): Performance → Queries →
export last 3–6 months (CSV) and paste alongside the assignment. What is
verifiable from the repo/site today: sitemap live at
`https://www.retech.asia/sitemap.xml` (already submitted), all blog URLs
enumerated in it, and AI-crawler-friendly robots.txt. If no GSC export is
available, proceed on research + the inventory above; ChatGPT's keyword
strategy stands in for GSC evidence.
