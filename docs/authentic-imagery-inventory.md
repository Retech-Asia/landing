# Authentic imagery inventory (checkpoint 3, 2026-10-22)

Per the owner directive: audit each case study for available authentic
materials, and prepare the exact approval or material needed for each. No
private client systems are captured, no confidential data exposed, and no
third-party assets republished without permission. Until a row's material
arrives, the slot keeps the "Illustrative visualization / Hình ảnh minh họa"
caption.

Status values: **available** (material exists and can be used pending
approval) · **needs approval** (capture exists or is easy, permission is the
gate) · **needs material** (nothing suitable exists yet, a specific capture
is required).

## 1. Mining analytics platform (`/case-studies/mining-analytics-platform`)

- Narrative facts: multi-pool ingestion (F2Pool, ViaBTC), CoinGecko pricing
  cache, mempool difficulty projections, operator and admin dashboards,
  audit workflow. Stack: Next.js, NestJS, Prisma, PostgreSQL, Redis.
- Authentic capture that would substantiate it: the unified operator
  dashboard (hashrate and worker health views) with all client-identifying
  data redacted or replaced with synthetic series.
- What is needed and from whom: written client permission to screenshot and
  publish, plus a redacted or demo-data staging login. Requested from the
  mining study client via the owner.
- Status: needs approval + material.
- Current slot: `analytics-dashboard.webp` (illustrative, both slots).

## 2. Asset management platform (`/case-studies/asset-management-platform`)

- Narrative facts: portfolio and asset workflow platform, NestJS + Prisma
  backend, FastAPI service, AWS deployment.
- Authentic capture: portfolio overview screen with synthetic holdings.
- What is needed and from whom: client permission and a demo-data
  environment. If the client declines, a "representative interface" build
  (a non-public demo shell reusing the real design system) is the fallback,
  labeled as illustrative.
- Status: needs approval.
- Current slot: `cs-asset-hero.webp`, `cs-asset-mobile.webp` (illustrative).

## 3. Investment intelligence platform (`/case-studies/investment-intelligence-platform`)

- Narrative facts: RAG research pipeline (pgvector, LangChain), FastAPI,
  Terraform, AWS.
- Authentic capture: research query flow with cited sources, synthetic
  corpus only.
- What is needed and from whom: client permission plus a sanitized demo
  corpus. The RAG answer view with citations is the single most credible
  shot for this study.
- Status: needs approval + material.
- Current slot: `cs-intel-hero.webp`, `cs-intel-mobile.webp` (illustrative).

## 4. Fintech card marketing site (`/case-studies/fintech-card-marketing`)

- Narrative facts: public-facing marketing site (Prismic CMS, Tailwind,
  Framer Motion, GSAP).
- Authentic capture: this is the strongest candidate in the set. If the
  site is public, screenshots of public pages need only client permission
  (and a credit line if requested), no redaction.
- What is needed and from whom: owner confirms the engagement is public,
  then requests written permission for capture + publication.
- Status: available pending approval.
- Current slot: `cs-fintech-hero.webp`, `cs-fintech-mobile.webp`
  (illustrative).

## 5. AI analysis SaaS (`/case-studies/ai-analysis-saas`)

- Narrative facts: credit-based multi-tool AI product (blood test analyzer,
  nutrition scanner, chat, Stripe credits), Supabase auth, Claude and
  Gemini integration.
- Authentic capture: the authenticated tool grid and one analyzer flow with
  a synthetic report; payment screens excluded.
- What is needed and from whom: client permission and a demo account. The
  product's own marketing pages, if public, may offer a permitted
  alternative.
- Status: needs approval + material.
- Current slot: `cs-ai-hero.webp`, `cs-ai-mobile.webp` (illustrative).

## Standing rules applied

- No private-system screenshots, ever. All captures happen in staging or
  demo environments with synthetic data.
- Client names appear only with permission; otherwise the studies stay
  anonymous as written.
- Nothing is captured or republished until the owner forwards written
  approval. The Jay gate on public imagery is unchanged.

## Recommendation

Start with study 4 (fintech card marketing): lowest approval friction, most
credible result. Then study 1 (mining), where a redacted dashboard demo is
high-value because the narrative is the most technical. Studies 2, 3, 5
follow the same template. When the first real capture lands for a study,
both slots get the capture (mobile slot gets a responsive crop), the
illustrative caption is removed for that study, and the mining study stops
reusing one file in two slots.
