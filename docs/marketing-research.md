# Marketing Research: AI Messaging + Blog Image Diversification

**Author:** Marketing lead
**Date:** 2026-07-27
**Status:** Research + execution plan (not yet implemented)
**Companion doc:** Copy brief from PO agent (run in parallel)

---

## Task 1 — Competitor AI-Messaging Research

Research targets: Toptal, BairesDev, Clariontech (TLNT does not cover IT outsourcing — substituted with a representative IT-outsourcing blog), and Kyanon Digital (Vietnam).

### Toptal — toptal.com/services/technology-services/artificial-intelligence
- **Headline:** "Comprehensive AI Services for Every Business Need"
- **Subhead / positioning:** End-to-end delivery of ML solutions, prompt engineering guidance, image & vision analysis, forward-deployed engineering.
- **Top 3 messaging patterns:**
  1. "End-to-end ML delivery" (full pipeline: data annotation → deployment)
  2. "Top 3% AI talent" (elite-network framing)
  3. "Forward-deployed engineering" (consultative AI team embedded with client)
- **Image style:** Abstract editorial — geometric blue/purple gradients, no people. Diagrams of ML pipelines. No stock photography of developers.

### BairesDev — bairesdev.com/technologies/ai/
- **Headline:** "AI-powered solutions that go beyond experimentation. Our AI engineers help organizations integrate agentic AI."
- **Subhead:** "As a leading AI development company" + "Top 1% AI engineering talent"
- **Top 3 messaging patterns:**
  1. **"Beyond experimentation"** — production-ready AI vs. PoC (strongest wedge)
  2. **"Agentic AI integration"** — explicit agent/services language
  3. **"Forget gimmicks"** — anti-hype positioning (used in blog content)
- **Image style:** Photographic — diverse teams in modern offices, plus abstract gradient hero. Awards badges (Globee Gold).

### Clariontech (substitute for TLNT) — clariontech.com/blog/ai-is-shaping-the-future-of-software-development-outsourcing
- **Headline:** "AI Development Services Shaping Software Outsourcing"
- **Top 3 messaging patterns:**
  1. AI-augmented SDLC (smarter workflows, automation)
  2. Faster delivery + scalable solutions
  3. Outsourcing-as-AI-talent-pipeline
- **Image style:** Mixed — stock developer photos + abstract circuit graphics. More "blog-y" than landing page.

### Kyanon Digital (Vietnam) — kyanon.digital/development/artificial-intelligence/
- **Headline:** "Full-cycle AI consulting and engineering" / "Top AI development company in Vietnam"
- **Top 3 messaging patterns:**
  1. **"AI Agents as a Service"** — 2026 focus, blog-led
  2. **"AI-Driven Agile Teams"** — engineering + AI bundled
  3. **"AI/ML full lifecycle"** — model selection → training → deployment → optimization
- **Image style:** Vietnam-typical — modern HCMC office photography + abstract 3D renders. Cleaner than BairesDev.

### Patterns Retech should adopt
1. **"Beyond experimentation" framing** — production-ready AI wins over "we use Copilot."
2. **Agentic AI integration** as a named service line (matches our `agentic-ai-autonomous-software-systems-2026` post).
3. **Abstract + diagrammatic visuals**, not developer-in-hoodie stock photos.

**Sources:**
- [Toptal AI Services](https://www.toptal.com/services/technology-services/artificial-intelligence)
- [BairesDev AI Development](https://www.bairesdev.com/technologies/ai/)
- [Clariontech blog](https://www.clariontech.com/blog/ai-is-shaping-the-future-of-software-development-outsourcing)
- [Kyanon Digital AI](https://kyanon.digital/development/artificial-intelligence/)

---

## Task 2 — Blog Image Audit

Read `src/lib/blog-data.ts` (959 lines, 38 posts) and `src/lib/blog-images.ts` (57 lines).

| Metric | Value |
|---|---|
| **Total blog posts** | 38 |
| **Unique thumbnail assets in rotation** | 9 (`blog-ai-software`, `blog-analytics`, `blog-business`, `blog-circuit`, `blog-cloud`, `blog-enterprise`, `blog-startup`, `blog-team-coding`, `blog-vietnam-outsourcing`) |
| **Posts reusing a thumbnail** | **38 of 38** (100% reuse). The 9 images are shared across all 38 posts. |
| **Posts with inline content images** | **0 of 38** (0%). `content: string[]` arrays contain no markdown image tags. |
| **Posts that are text-only** | **38 of 38** (100%). |
| **Thumbnail source pattern** | Local static files in `/public/images/stock/blog-*.webp`. No Unsplash URLs at runtime. All downloaded from Unsplash (free commercial use) and committed to the repo. |
| **Mapping mechanism** | `getBlogImage(slug)` in `blog-images.ts` — falls back to `blog-business.webp` for unmapped slugs. |
| **Average posts per image** | **4.2** — heaviest reuse: `blog-team-coding.webp` (6 posts), `blog-circuit.webp` (4), `blog-vietnam-outsourcing.webp` (4). |
| **OG image generation** | Dynamic `opengraph-image.tsx` exists for `/blog/[slug]` but renders text-on-gradient (no topic imagery). Same visual treatment for every post — does not solve diversification. |

### Findings
- Visual diversity problem is severe: readers browsing `/blog` see 9 distinct images cycling across 38 cards. Adjacent posts in the same category (e.g. AI/ML) frequently share the same `blog-ai-software.webp`.
- Inline images are absent. Posts are 6-paragraph walls of text. This is the bigger readability issue than thumbnails.
- The dynamic OG generator at `/blog/[slug]/opengraph-image.tsx` already has the infra to render unique images per post but is underutilized.

---

## Task 3 — Image Diversification Plan

### Thumbnail strategy — three options ranked

#### **Option A: Download curated Unsplash images (one per post)** ⭐ Recommended
Download one unique topic-mapped Unsplash image per slug into `/public/images/stock/blog-{slug}.webp`. Update `BLOG_IMAGES` map 1-to-1.

| Attribute | Score |
|---|---|
| **Effort** | Medium — 38 image searches + downloads + WebP compression. ~1 day batch work. |
| **Maintenance cost** | Low — only when new posts ship (1 image/post, same workflow as today). |
| **Visual cohesion** | **5/10** — Unsplash photos vary widely in tone/color. Without a curation guide, the blog grid will look like a stock-photo collage. |
| **Pros** | Lowest technical risk. Real photography performs well on social shares. No new code. |
| **Cons** | Inconsistent aesthetic. Risk of "AI-generated stock photo" look (banned per `feedback_avoid_ai_aesthetic.md`). Hard to match Retech brand palette (#208535 green + cyan). |

**Mitigation:** Define a curation guide (see Task 4) — single-subject, low-saturation, dark background preferred. Apply a consistent subtle green tint overlay in CSS.

#### **Option B: Extend `opengraph-image.tsx` pattern to thumbnails** ⭐ High impact
Generate per-post hero images programmatically using the existing `next/og` `ImageResponse` pattern. Read post title + category at build time, render branded card with gradient + icon + title.

| Attribute | Score |
|---|---|
| **Effort** | Medium-high — refactor `blog-images.ts` to return a generated route instead of static asset. New file: `src/app/blog/[slug]/blog-image.tsx`. ~1.5 days. |
| **Maintenance cost** | **Zero** — every new post auto-generates its image. |
| **Visual cohesion** | **9/10** — identical brand template, varied by title + category icon. |
| **Pros** | Infinite scalability. Perfect brand consistency. No image binary management. Already proven by root OG image. |
| **Cons** | Looks like a "designed card," not photography — less native on social feeds. Requires Node runtime at build (already true). |

#### **Option C: Compose abstract gradients + topic icons programmatically**
Pure CSS/SVG composites (no `next/og`) — generate gradient + Lucide icon + title using a static build-time script that writes SVG/PNG files to `/public/images/blog/generated/`.

| Attribute | Score |
|---|---|
| **Effort** | High — new generation script, icon taxonomy, output optimization. ~2-3 days. |
| **Maintenance cost** | Low — re-run script when posts added. |
| **Visual cohesion** | **8/10** — fully controlled palette, but lacks typographic richness of Option B. |
| **Pros** | No runtime cost (static files). Smaller payload than `ImageResponse`. |
| **Cons** | Most engineering effort. Reinvents what `next/og` already does. |

### Recommendation
**Adopt Option B as primary** (scalable, on-brand, uses existing infra). **Supplement with Option A for 5-10 hero posts** where authentic photography adds editorial weight (e.g. the Vietnam-outsourcing flagship post). Treat Option C as fallback only.

### Inline image strategy for blog post bodies

**Placement:**
1. **After the intro paragraph** (one "scene-setter" image per post)
2. **Before each H2 section heading** (one diagram/photo per major section)
3. **Optional: full-width pull-quote treatment** between sections 3 and 4 to break visual rhythm

**Frequency:** ~1 image per 250-300 words. For a typical 6-paragraph post (~700 words), that means **2-3 inline images per post**.

**Image types by section:**
| Section type | Image type |
|---|---|
| Intro / scene-setter | Photographic (office, team, HCMC skyline) — establishes context |
| Conceptual H2 (e.g. "What is Agentic AI?") | **Abstract diagram** — boxes, arrows, flow. Generated in Figma or with `mermaid.ink`. |
| Technical H2 (e.g. "Streaming SSR and Suspense") | **Code screenshot** — use `carbon.now.sh` or Ray.so for 10-line snippets |
| Comparison H2 (e.g. "Vietnam vs India vs E. Europe") | **Data viz / table** — rendered chart, not stock image |
| Conclusion / CTA | No image — let the CTA card carry the visual weight |

**Source policy:**
- Prefer **original diagrams** over stock. Stock photos only for scene-setting.
- Code snippets use branded Carbon/Ray.so exports (matches `feedback_avoid_ai_aesthetic.md`).
- No AI-generated photoreal images (banned per internal feedback).
- All inline images stored at `/public/images/blog/{slug}/01.webp`, `02.webp`, etc. — not in `/stock/`.

---

## Task 4 — Recommended Unsplash Search Queries

If Option A is used (or for the 5-10 hero posts in the hybrid plan), here are curated queries filtered for the Retech aesthetic (dark, low-saturation, single subject):

### AI / Machine Learning (5 queries)
1. `neural network abstract dark`
2. `circuit board macro green`
3. `data visualization flowing particles`
4. `robot arm laboratory minimal`
5. `data center server blue light`

### Software development (5 queries)
1. `clean code editor dark theme` (for code screenshots if not using Carbon)
2. `developer workspace mechanical keyboard`
3. `pair programming laptops dark office`
4. `whiteboard architecture diagram markers`
5. `git branch visualization abstract`

### Outsourcing / business (5 queries)
1. `ho chi minh city skyline night`
2. `video conference meeting modern office`
3. `handshake business meeting minimal`
4. `global team video call grid`
5. `modern office glass meeting room`

### Curation rules (apply to every selection)
- **Aspect ratio:** 16:9 minimum (will be cropped to 1200x630 for OG).
- **Background:** Dark or muted — avoid bright white backgrounds (breaks card layout in dark mode).
- **Subject:** Single focal point. No busy collages.
- **People:** Only authentic, non-staged photography. No "smiling-at-laptop" stock tropes.
- **Color:** Prefer images with at least one channel aligned to brand palette (green/cyan/violet) — apply `mix-blend-mode: multiply` with brand green at 15% opacity if needed.

---

## Execution checklist (handoff to engineering)

1. **PO sync** — confirm copy brief covers "Beyond experimentation" + "Agentic AI integration" wedge language.
2. **Option B spike** (1 day) — prototype one generated blog card image using `next/og`. Review against `feedback_avoid_ai_aesthetic.md` rules.
3. **Hybrid pipeline** — if Option B spike passes review, migrate all 38 thumbnails to generated. Manually curate 5-10 Unsplash photos for hero posts only.
4. **Inline image pilot** — pick 3 high-traffic posts (e.g. `agentic-ai-autonomous-software-systems-2026`, `why-vietnam-top-it-outsourcing-destination-2026`, `how-ai-transforming-custom-software-development`) and add 2-3 inline images each. Measure engagement vs. control.
5. **Rollout** — if pilot wins, scale to all 38 posts over 2 sprints.

---

## Open questions for PO
- Does the copy brief explicitly call out "AI-augmented development" as a Retech service line, or do we keep AI framing project-scoped?
- Are we willing to add a "Beyond experimentation" or "Production AI" tagline to the homepage hero, or keep AI messaging confined to services + blog?
- For inline images in older posts: do we backfill, or only apply to posts published after 2026-08-01?
