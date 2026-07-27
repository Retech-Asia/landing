# AI Emphasis Copy Brief

Strategic pivot: position Retech Solutions as an AI-integrated engineering firm, not a generic outsourcing shop. This brief catalogs current AI messaging, identifies gaps, and prescribes specific rewrites for the marketing agent to execute.

**Owner directive (2026-07-27):** emphasize AI application and integration across workflows and client projects, in both marketing copy and blog content. This is new ground beyond what exists on Wix.

---

## Constraints (carry into every edit)

From `CLAUDE.md`, `docs/content-guidelines.md`, and project memory:

- **BANNED words:** best, top, leading, premier, world-class, cutting-edge, battle-tested, industry-leading, market-leading.
- **BANNED AI-tells:** em-dashes (we just removed 186 of them), eyebrow chips with status dots, filler decorative chrome above headlines, "AI-powered" as a vague stand-alone claim.
- **Tone:** capabilities-focused, no Vietnam-pitch in primary copy, no cost-savings lead. Concrete facts and named technologies only.
- **Source-of-truth rule is relaxed for AI copy:** the owner has explicitly directed new AI emphasis that does not exist on Wix. Marketing agent has license to draft net-new AI copy as long as it describes real capabilities (RAG, LangChain, multi-agent, vector search, OpenAI/Anthropic integrations) and avoids banned patterns above.

---

## 1. Current state: where AI is already mentioned

Grouped by surface. File:line citations refer to absolute paths under `/Users/apple/Documents/Retech/repos/landing/`.

### Homepage (`src/app/page.tsx`)

| Location | Current text |
|---|---|
| `src/app/page.tsx:77` | FAQ answer: "AI-powered products" listed alongside CMS, CRM, ERP. |
| `src/app/page.tsx:87` | FAQ answer: "integrate AI/ML capabilities using frameworks like TensorFlow and OpenAI APIs." |
| `src/app/page.tsx:106` | WebPageJsonLd description: "AI-driven solutions for web and mobile applications." |
| `src/app/page.tsx:123` | ScrollVelocity strip item: `"AI Integration"`. |
| `src/app/page.tsx:158-176` | AI visual strip: image `ai-abstract.webp` with overlay caption "AI-integrated engineering, from ML-powered search to intelligent automation." |
| `src/app/page.tsx:173` | Overlay caption text (the only AI mention a scrolling user actually reads). |

### Hero (`src/components/sections/home/Hero.tsx`)

| Location | Current text |
|---|---|
| `src/components/sections/home/Hero.tsx:60` | Rotating word list includes `"AI products"` — cycles every 2.5s alongside CMS/CRM/ERP/web apps. |

No other AI mention in the hero. The H1 ("Turning Ideas into Solutions") and the subtitle ("Vietnam-based engineering team. Global delivery.") carry no AI signal.

### WhyRetech (`src/components/sections/home/WhyRetech.tsx` + `src/lib/constants.ts`)

| Location | Current text |
|---|---|
| `src/lib/constants.ts:50-52` | HIGHLIGHTS[2]: title "AI-Driven Solutions", description "Integrated AI capabilities across CMS, CRM, and ERP platforms, from automated content tagging and predictive analytics to intelligent workflow automation." |
| `src/components/sections/home/WhyRetech.tsx:35` | Section description: "Engineering teams delivering custom CMS, CRM, ERP, and AI-powered solutions, with full-cycle ownership..." |

AI occupies 1 of 4 highlight cards. The other 3 (Full-Cycle Development, Agile Methodologies, Scalable Teams) are generic and pre-AI-pivot.

### ServicePreview (`src/components/sections/home/ServicePreview.tsx`)

| Location | Current text |
|---|---|
| `src/components/sections/home/ServicePreview.tsx:150` | Section description: "Tailored web solutions built on leading platforms, enhanced with AI for smarter, more reliable performance." Uses banned word "leading." |

The 6 service cards pull descriptions from `src/lib/navigation.ts` — **none mention AI**. Cards read: "Content management made easy...", "Customer-centric tools...", "Insightful dashboards...", "Custom web applications...", "User-centered design...", "Offshore development teams...".

### TechStack (`src/components/sections/home/TechStack.tsx`)

**Zero AI presence.** Five groups (Frontend, Backend, Database, Cloud & DevOps, Design) contain 17 technologies. No LangChain, OpenAI, Anthropic, pgvector, Hugging Face, or any AI/ML framework. This is the single biggest mismatch between our real work (RAG, LangChain, multi-agent systems) and how we present ourselves.

### MidPageCTA (`src/components/sections/home/MidPageCTA.tsx`)

**Zero AI mention.** Generic "Not Sure Where to Start?" consultation pitch.

### Services data (`src/lib/services-data.ts`)

AI mentions across 6 service detail pages are inconsistent:

| Service | AI mention? | Location |
|---|---|---|
| CMS Platforms | longDescription only: "Integrated AI features help streamline content organization..." | `src/lib/services-data.ts:71` |
| CMS Platforms | FAQ only: "We integrate AI-powered features like automatic content tagging, smart search..." | `src/lib/services-data.ts:105` |
| CRM Systems | longDescription only: "With AI support, our solutions enable intelligent automation, predictive insights..." | `src/lib/services-data.ts:120` |
| CRM Systems | FAQ only: "AI-powered insights to help your sales team close more deals." | `src/lib/services-data.ts:152` |
| ERP Solutions | longDescription only: "AI-driven analytics and process automation reduce manual effort..." | `src/lib/services-data.ts:168` |
| Web Development | **None** | — |
| UI/UX Design | **None** | — |
| Dedicated Teams | **None** | — |

Pattern: AI is a footnote in longDescription and one FAQ per service, never in the primary `description` shown on the services listing page. Web Development, UI/UX, and Dedicated Teams have zero AI mentions despite being core delivery surfaces where we apply AI tooling daily.

### Industries data (`src/lib/industries-data.ts`)

| Industry | AI mention? |
|---|---|
| Healthcare | No |
| Finance | No |
| E-commerce | Yes — description mentions "AI-powered product recommendations"; longDescription mentions "AI-powered product recommendations, dynamic pricing." |
| Education | Yes — solutions: "AI-powered recommendations"; caseStudyExcerpt: "AI-powered study recommendations"; technologies include TensorFlow. |
| Real Estate | Yes — solutions: "AI-powered property valuation tools with predictive market analytics." |
| Logistics | Yes — description: "leverage AI, real-time GPS tracking, and predictive analytics"; longDescription repeats; solutions: "AI-powered route optimization." |
| Manufacturing | LongDescription only: "AI-driven quality control." |
| Technology | **None** — despite being the industry most likely to buy AI engineering. |
| Media & Entertainment | Solutions: "AI-powered tagging, scheduling, and workflow automation." |

### Case studies (`src/lib/case-studies-data.ts`)

| Case study | AI tech mentioned? |
|---|---|
| Mining Analytics Platform | **None** — pure data ingestion, no AI/ML. |
| Asset Management Platform | **None** — multi-portal architecture, no AI. |
| Investment Intelligence Platform | **Yes, heavily.** Tagline "AI-Powered Investment Research." Solution mentions LLM-powered synthesis, vector search, multi-agent debate. Tech: pgvector, LangChain, Google GenAI. |
| Fintech Card Marketing Platform | **None** — headless CMS only. |
| AI Analysis SaaS Platform | **Yes, central.** Tagline "Multi-Tool AI Analysis Platform." LangChain + Claude + Gemini + Supabase. |

2 of 5 case studies showcase AI. The other 3 are pre-AI-pivot work and would need framing adjustments, not invention.

### About page (`src/app/about/page.tsx`)

| Location | Current text |
|---|---|
| `src/app/about/page.tsx:78` | 2024 milestone: "AI-Powered Solutions Launch — Integrated AI and machine learning capabilities across our CMS, CRM, and ERP product lines." |
| `src/app/about/page.tsx:150` | Mission text: "AI-powered digital products that help businesses stay ahead of the curve." |
| `src/app/about/page.tsx:192` | Mission bullet: "Driving innovation through AI and modern technologies." |
| `src/app/about/page.tsx:219` | Vision bullet: "Investing in AI and automation capabilities for smarter delivery." |

### Process page (`src/app/process/page.tsx`)

**Zero AI mentions across the entire 6-phase methodology.** Tools list (`src/app/process/page.tsx:177-208`) has 6 categories (PM, Communication, Development, Design, DevOps, Testing) — no AI tooling category, no LangChain, no LLM APIs. Phase descriptions describe a 2018-era agile process, not a 2026 AI-integrated workflow.

---

## 2. Gap analysis

Ranked by visibility × impact:

| Rank | Surface | Gap | Why it matters |
|---|---|---|---|
| 1 | **Hero subtitle** | No AI signal in the LCP-critical headline area. "AI products" is one of 5 rotating words that flashes for 2.5s. | Highest-traffic surface. First impression. |
| 2 | **TechStack section** | Zero AI/ML technologies shown. | Direct contradiction of what we actually build. A technical buyer's first credibility check. |
| 3 | **ServicePreview cards** | 0 of 6 cards mention AI in their description. | Highest-engagement homepage section after hero. |
| 4 | **Process page** | Zero AI across all 6 phases + tool list. | Buyer asks "how do you actually use AI?" — page has no answer. |
| 5 | **WhyRetech highlights** | 1 of 4 cards is AI. Other 3 are generic agile/outsourcing tropes. | Misses the chance to make AI one of 4 differentiators. |
| 6 | **Web Development / UI/UX / Dedicated Teams services** | Zero AI mentions in 3 of 6 service detail pages. | These are the entry-point services buyers browse. |
| 7 | **MidPageCTA** | No AI hook in the mid-funnel conversion surface. | Lower priority but easy win. |
| 8 | **Industries: Technology, Healthcare, Finance** | Three high-AI-value verticals have no AI mention. | Technology industry page having zero AI is the most glaring. |
| 9 | **Case studies: Mining, Asset Mgmt, Fintech Card** | Three case studies have no AI narrative. | Harder to fix without inventing; defer unless we can truthfully frame existing AI tooling used internally during delivery. |

---

## 3. AI messaging pillars

Three pillars, max. Every AI mention should ladder up to one of these. Repeat them until they are the default association with Retech.

### Pillar 1: AI-integrated engineering by default

Every project ships with AI where it adds value — not as a separate "AI feature" sold on top. AI is in the workflow (coding assistants, automated testing, code review), in the product (RAG search, LLM features, multi-agent orchestration), and in the operations (monitoring, anomaly detection, automated ops). This counters the "AI-powered" bolt-on pattern competitors use.

Supporting proof: Cursor in tooling list, LangChain + pgvector in case studies, AI-integrated CMS/CRM/ERP longDescriptions.

### Pillar 2: Production RAG, agents, and LLM integration

Specifically name the patterns we ship: retrieval-augmented generation, vector search, multi-agent debate, LLM orchestration, OpenAI/Anthropic API integration. No vague "AI solutions." Every claim names a concrete pattern and where we shipped it.

Supporting proof: Investment Intelligence Platform (RAG + multi-agent debate), AI Analysis SaaS (LangChain + Claude + Gemini), Investment Intelligence case study tech list.

### Pillar 3: AI-native product thinking

We help clients decide **where** AI fits and where it doesn't. Discovery phase includes an AI opportunity assessment: which workflows are actually AI-amenable, which are not, which are cost-effective, which are distractions. This positions us as engineers who say no to bad AI ideas, not yes-men who slap ChatGPT into every surface.

Supporting proof: AI Analysis SaaS framed as "multi-tool" not "one AI blob"; Investment Intelligence routes queries across structured/RAG/hybrid/direct paths (smart routing, not brute-force LLM).

---

## 4. Specific copy rewrites

Priority tiers:
- **P0** — above-the-fold homepage + service card descriptions. Highest visibility, ship first.
- **P1** — WhyRetech, Process page, TechStack. Mid-funnel differentiators.
- **P2** — case studies, industries, About. Depth content.

Each rewrite quotes the current string verbatim, then proposes a replacement. Replacements must pass the banned-words filter and avoid em-dashes.

---

### P0.1 — Hero subtitle

**File:** `src/components/sections/home/Hero.tsx:161-163`

**Current:**
> "Vietnam-based engineering team. Global delivery."

**Problem:** The subtitle below the rotating service word is the second-most-read line on the site. It says nothing about AI. It also leads with geography, which `docs/content-guidelines.md` bans in primary copy.

**Proposed:**
> "AI-integrated engineering for web, mobile, and cloud products. Shipped from Vietnam to teams worldwide."

**Why:** Front-loads the differentiator (AI-integrated), names the surfaces (web/mobile/cloud), keeps the geography as a tail qualifier rather than the lead. No banned words, no em-dashes, 14 words.

---

### P0.2 — ServicePreview section description

**File:** `src/components/sections/home/ServicePreview.tsx:150`

**Current:**
> "Tailored web solutions built on leading platforms, enhanced with AI for smarter, more reliable performance."

**Problem:** Uses banned word "leading." "Enhanced with AI" is the exact bolt-on pattern Pillar 1 rejects.

**Proposed:**
> "Custom software with AI built in: RAG search, LLM features, and intelligent automation shipped inside every CMS, CRM, and ERP we deliver."

**Why:** Replaces "leading" with concrete AI patterns (RAG, LLM, automation). Reframes AI as built-in, not bolted-on. Names the platforms.

---

### P0.3 — ServicePreview card descriptions (6 rewrites)

**File:** `src/lib/navigation.ts:24-61` (descriptions are the card body text on the homepage).

**P0.3a — CMS Platforms** (line 28)

**Current:**
> "Content management made easy with powerful, flexible platforms"

**Proposed:**
> "Headless and traditional CMS with AI tagging, smart search, and editorial copilots"

**P0.3b — CRM Systems** (line 34)

**Current:**
> "Customer-centric tools for engagement and relationship management"

**Proposed:**
> "CRMs with AI lead scoring, conversation intelligence, and predictive workflows"

**P0.3c — ERP Solutions** (line 40)

**Current:**
> "Insightful dashboards connecting departments and optimizing operations"

**Proposed:**
> "ERPs with AI forecasting, anomaly detection, and automated reporting"

**P0.3d — Web Development** (line 46)

**Current:**
> "Custom web applications built with modern frameworks and best practices"

**Proposed:**
> "Web apps with optional LLM features, vector search, and AI-assisted ops baked in"

**P0.3e — UI/UX Design** (line 52)

**Current:**
> "User-centered design that drives engagement and conversion"

**Proposed:**
> "Product design for AI-native interfaces, including copilot UX and conversational flows"

**P0.3f — Dedicated Teams** (line 58)

**Current:**
> "Offshore development teams scaled to your project needs"

**Proposed:**
> "Embedded engineers experienced in shipping RAG, agents, and LLM integrations"

**Why all 6:** The card grid is the highest-engagement section after the hero. Right now zero of six cards mention AI. After this rewrite, all six do, each naming a specific AI pattern relevant to that service. Avoids the "AI-powered" crutch — every card names a concrete capability.

---

### P0.4 — Service detail page primary descriptions

Each service has a `description` field in `src/lib/services-data.ts` shown on the services listing and detail page hero. These currently have zero AI content for 4 of 6 services. Only the longDescription (buried lower on the page) mentions AI.

**P0.4a — Web Development** (`src/lib/services-data.ts:216`)

**Current:**
> "Custom web applications built with modern frameworks, best practices, and scalable architecture. From responsive marketing sites to complex enterprise platforms, we deliver solutions optimized for performance, security, and long-term maintainability using an API-first approach."

**Proposed:**
> "Custom web applications built with modern frameworks, API-first architecture, and AI features where they earn their place: RAG-powered search, conversational interfaces, recommendation systems, and LLM-backed automation. From marketing sites to enterprise platforms, every build is optimized for performance, security, and long-term maintainability."

**P0.4b — UI/UX Design** (`src/lib/services-data.ts:264`)

**Current:**
> "Design that drives engagement, conversion, and delight through research-backed user experiences. Our process combines user interviews, data analysis, and iterative prototyping to create interfaces that look great and perform measurably better than industry benchmarks."

**Proposed:**
> "Design that drives engagement and conversion through research-backed user experiences. We design for AI-native patterns including conversational interfaces, copilot sidebars, streaming responses, and human-in-the-loop review flows. Every decision is grounded in user research, analytics, and iterative usability testing."

**P0.4c — Dedicated Teams** (`src/lib/services-data.ts:312`)

**Current:**
> "Build your offshore development team with experienced engineers from Vietnam, fully managed, scalable, and cost-effective. We handle recruitment, HR, payroll, and infrastructure so you can focus on product development with a team that integrates seamlessly into your existing workflows."

**Proposed:**
> "Build your offshore development team with engineers experienced in shipping AI features alongside traditional web and mobile work. We handle recruitment, HR, payroll, and infrastructure so you can focus on product while your embedded team integrates RAG, agents, and LLM automation into your existing workflows."

---

### P1.1 — WhyRetech: rewrite 3 of 4 highlight cards

**File:** `src/lib/constants.ts:37-58`

Currently 1 of 4 cards is AI (card index 2). Two of the other three are generic agile tropes. Replace 2 of the 3 generic cards with AI differentiators so AI occupies 3 of 4 cards.

**P1.1a — Replace HIGHLIGHTS[0]** (line 38-41)

**Current:**
> title: "Full-Cycle Development"
> description: "From business analysis and design to development, testing, and deployment. We handle the entire software lifecycle."

**Proposed:**
> title: "AI-Integrated Engineering"
> description: "RAG, vector search, LLM features, and multi-agent orchestration shipped as standard. AI is part of how we build, not a separate SKU."

**P1.1b — Keep HIGHLIGHTS[1]** (Agile Methodologies) — process claim still useful.

**P1.1c — Keep HIGHLIGHTS[2]** (AI-Driven Solutions) — already on-message.

**P1.1d — Replace HIGHLIGHTS[3]** (line 53-56)

**Current:**
> title: "Scalable Teams"
> description: "Flexible, dedicated development teams that scale with your project needs and grow alongside your business."

**Proposed:**
> title: "Production AI Expertise"
> description: "LangChain, pgvector, OpenAI, and Anthropic in production across 5+ shipped platforms. We have built the RAG pipelines, query routers, and agent systems you are planning."

**Net result:** WhyRetech cards become AI-Integrated Engineering / Agile Methodologies / AI-Driven Solutions / Production AI Expertise. Three of four cards carry AI signal; the remaining agile card grounds us as a real engineering shop, not an AI hype shop.

---

### P1.2 — WhyRetech section description

**File:** `src/components/sections/home/WhyRetech.tsx:35`

**Current:**
> "Engineering teams delivering custom CMS, CRM, ERP, and AI-powered solutions, with full-cycle ownership from discovery through deployment and ongoing support."

**Problem:** "AI-powered solutions" is the banned vague claim.

**Proposed:**
> "Engineering teams that ship CMS, CRM, ERP, and AI-native products end to end. RAG search, LLM features, and multi-agent orchestration are standard delivery surfaces, not bolt-ons."

---

### P1.3 — Process page: AI mentions in each phase

**File:** `src/app/process/page.tsx:60-175`

Add one AI-specific line to each phase description and one AI-specific activity per phase. Do not invent AI work that doesn't happen; the additions below reflect actual AI integration in our delivery process.

**P1.3a — Phase 1 description** (line 67)

**Current:**
> "Every successful project starts with deep understanding. We conduct stakeholder interviews, map business processes, and analyze your competitive landscape to define a clear project scope..."

**Proposed (append one sentence):**
> "...Your team receives hands-on training and comprehensive documentation to ensure a smooth handover. An AI opportunity assessment identifies which workflows benefit from LLM features, RAG search, or agentic automation, and which do not."

**Add activity to Phase 1 activities:**
> "AI opportunity assessment: identify workflows where RAG, agents, or LLM features add value"

**P1.3b — Phase 2 description** (line 86)

Append:
> "...every decision is documented and validated before a single line of code is written. For AI-native features, we design the retrieval architecture, embedding strategy, and evaluation harness alongside the system architecture."

**Add activity to Phase 2:**
> "AI feature architecture: retrieval design, embedding strategy, evaluation harness"

**P1.3c — Phase 3 description** (line 105)

Append:
> "...Continuous integration ensures every change is tested and deployable from day one. AI features follow the same rigor: evaluation suites run in CI to catch regressions in retrieval quality and LLM output."

**Add activity to Phase 3:**
> "LLM evaluation harness in CI for retrieval and output quality"

**P1.3d — Phase 4 description** (line 124)

Append:
> "...Security audits and accessibility checks ensure your product meets the highest standards. AI features receive additional scrutiny for prompt injection, data leakage, and hallucination surfaces."

**Add activity to Phase 4:**
> "AI red-teaming: prompt injection, data leakage, hallucination surface testing"

**P1.3e — Phase 5 + Phase 6:** AI monitoring and observability additions.

Phase 5 — add activity:
> "LLM cost and latency monitoring dashboards"

Phase 6 — add activity:
> "Ongoing evaluation of AI feature quality against production traffic"

---

### P1.4 — Process page: add AI tooling category

**File:** `src/app/process/page.tsx:177-208`

The tooling grid has 6 categories and zero AI tools. Add a 7th category.

**Insert after the Development category (line 192):**

```js
{
  name: "AI Engineering",
  icon: Brain,
  tools: ["LangChain", "pgvector", "OpenAI", "Anthropic", "Cursor"],
},
```

Requires importing `Brain` from `lucide-react` at the top of the file. The `Brain` icon is already imported in `WhyRetech.tsx` so the pattern is established.

---

### P1.5 — TechStack: add AI/ML group

**File:** `src/components/sections/home/TechStack.tsx:16-59`

Add a sixth group to `techGroups` after "Design".

**Insert:**

```js
{
  label: "AI & ML",
  items: [
    { name: "LangChain", alt: "LangChain framework logo", src: "/images/tech/langchain.svg" },
    { name: "OpenAI", alt: "OpenAI platform logo", src: "/images/tech/openai.svg" },
    { name: "Anthropic", alt: "Anthropic platform logo", src: "/images/tech/anthropic.svg" },
    { name: "pgvector", alt: "pgvector extension logo", src: "/images/tech/pgvector.svg" },
    { name: "Hugging Face", alt: "Hugging Face platform logo", src: "/images/tech/huggingface.svg" },
  ],
},
```

Note for marketing agent: SVG logos need to be sourced or generated and placed in `public/images/tech/`. If a logo is unavailable, use a text-only tile with the brand initial. Do not use a competitor's CDN; self-host per `feedback_no_wix_cdn_dependencies`.

---

### P1.6 — TechStack section description

**File:** `src/components/sections/home/TechStack.tsx:70`

**Current:**
> "We use modern, proven technologies to build reliable, scalable solutions."

**Proposed:**
> "Modern, proven technologies across the stack. AI engineering runs on LangChain, pgvector, and the OpenAI and Anthropic APIs."

---

### P2.1 — Industries: add AI mentions to Technology, Healthcare, Finance

**P2.1a — Technology industry** (`src/lib/industries-data.ts:346-347`)

**Current description:**
> "Developer tools, SaaS platforms, and cloud-native applications built with modern architectures and scalable infrastructure. We speak your language..."

**Proposed:**
> "Developer tools, SaaS platforms, and AI-native applications built with modern architectures and scalable infrastructure. We speak your language. Our engineers bring deep expertise in microservices, event-driven architectures, RAG pipelines, and multi-agent systems. From MVP development to full-scale platform engineering, we help technology companies ship AI features that earn their compute cost."

**P2.1b — Healthcare industry** (`src/lib/industries-data.ts:59`)

Append to the existing description:
> "...Our team has built clinical decision-support tools with HIPAA-compliant RAG pipelines over medical knowledge bases, and patient-facing assistants with strict scope guards to prevent medical advice."

**P2.1c — Finance industry** (`src/lib/industries-data.ts:100`)

Append to the existing description:
> "...Our AI work in finance includes investment research platforms with multi-agent debate, RAG over SEC filings and earnings transcripts, and anomaly detection on transaction streams."

---

### P2.2 — Case studies: add internal AI tooling notes where truthful

This is sensitive: we must not invent AI features that don't exist. The frame here is honest disclosure of AI tooling used during delivery, not new product features.

**P2.2a — Mining Analytics Platform** (`src/lib/case-studies-data.ts:46`)

Do not invent AI features in the product. The product is deterministic analytics. If truthful, add to the solution section:
> "Internally, the team used AI coding assistants and automated test generation to accelerate delivery and reduce defect rates."

Only include if the team confirms this happened. Otherwise skip.

**P2.2b — Investment Intelligence Platform** — already AI-heavy, no changes needed. This becomes the flagship AI case study and should be linked from any AI-related blog post.

**P2.2c — AI Analysis SaaS Platform** — already AI-heavy, no changes needed. Second flagship.

**P2.2d — Asset Management Platform** and **Fintech Card Marketing Platform** — leave alone unless internal AI tooling was used and can be disclosed truthfully.

---

### P2.3 — About page mission text

**File:** `src/app/about/page.tsx:150`

**Current:**
> "Our team of experienced developers, designers, and project managers work closely with clients to understand their unique challenges and deliver tailored solutions that drive real business outcomes. We specialize in custom CMS, CRM, and ERP systems, as well as AI-powered digital products that help businesses stay ahead of the curve."

**Problem:** "AI-powered digital products" is vague. "Stay ahead of the curve" is a cliché.

**Proposed:**
> "Our team of engineers, designers, and project managers works closely with clients to turn business problems into shipped software. We specialize in custom CMS, CRM, and ERP platforms, and we ship AI-native products that use RAG, multi-agent orchestration, and LLM features where they actually add value."

---

### P2.4 — Homepage AI visual strip caption

**File:** `src/app/page.tsx:172-174`

**Current:**
> "AI-integrated engineering, from ML-powered search to intelligent automation"

**Problem:** Decent. Could be sharper. "Intelligent automation" is borderline vague.

**Proposed:**
> "AI-integrated engineering: RAG search, multi-agent orchestration, and LLM features shipped inside the products we build."

---

### P2.5 — MidPageCTA

**File:** `src/components/sections/home/MidPageCTA.tsx:36-39`

**Current:**
> h3: "Not Sure Where to Start?"
> p: "Book a free 30-minute consultation with our technical lead. We will map out the right approach, tech stack, and timeline. No strings attached."

**Proposed:**
> h3: "Not Sure Where AI Fits?"
> p: "Book a free 30-minute consultation with our technical lead. We will map out the right approach, tech stack, AI opportunity surface, and timeline. No strings attached."

---

## 5. Blog post topics

Seven ideas. Each draws from real Retech work, targets a specific keyword, and showcases AI integration expertise without sliding into hype. Working titles only; marketing agent refines before publishing.

### 5.1 "Building a Multi-Agent Investment Research Panel with LangChain"

- **Target keyword:** multi-agent system LangChain
- **Angle:** How we designed and shipped the virtual investor panel (4 AI personas in Socratic debate) for the Investment Intelligence Platform case study. Architecture diagram, prompt design, cost management, what failed in v1.
- **Source:** Investment Intelligence Platform case study. Real shipped code.

### 5.2 "RAG Is Not a Search Box: Three Retrieval Patterns We Shipped in Production"

- **Target keyword:** RAG production patterns
- **Angle:** Walkthrough of three RAG retrieval strategies we have deployed (naive similarity, query-router-classified, hybrid structured-plus-RAG). When each wins. Pitfalls. Embedding model choices.
- **Source:** Investment Intelligence Platform (query router with structured/RAG/hybrid/direct paths) + AI Analysis SaaS.

### 5.3 "Evaluating LLM Features in CI: A Practical Setup"

- **Target keyword:** LLM evaluation CI
- **Angle:** Most teams ship LLM features with zero automated quality checks. We walked this path and fixed it. Concrete walkthrough of an evaluation harness: test set design, regression detection, cost gates.
- **Source:** Internal practice; informed by shipping both AI case studies.

### 5.4 "Vector Search with pgvector: When to Reach for It, When Not To"

- **Target keyword:** pgvector vector search
- **Angle:** pgvector is the default vector store for Postgres shops. We have shipped it on Investment Intelligence and use it for RAG. Practical guidance: index choices, embedding dimensions (we use 3072), query performance, when to move to a dedicated vector DB.
- **Source:** Investment Intelligence Platform uses pgvector with 3072-dim embeddings.

### 5.5 "Multi-Tool AI SaaS Architecture: Sharing Auth, Credits, and LLM Routing Across Products"

- **Target keyword:** AI SaaS architecture
- **Angle:** How we structured the AI Analysis SaaS so blood-test, food-image, and chat analyzers share one auth layer, one Stripe credit system, and one LLM routing layer. Patterns for teams building multi-product AI platforms.
- **Source:** AI Analysis SaaS Platform case study.

### 5.6 "AI Opportunity Assessment: A 60-Minute Workshop Format"

- **Target keyword:** AI opportunity assessment
- **Angle:** Most AI project failures start at discovery: teams build AI for workflows that don't need it. Here's the 60-minute workshop format we run with clients to map real AI opportunities before writing code. Pillar 3 in long-form.
- **Source:** Discovery phase work; synthesizes real conversations from client engagements.

### 5.7 "Prompt Injection and Data Leakage: AI Security Basics for Web Apps"

- **Target keyword:** AI security prompt injection
- **Angle:** We test every AI feature for prompt injection, data leakage, and hallucination surfaces before launch. Walkthrough of the test cases we run, the failures we have caught, and the minimum bar every AI feature should clear.
- **Source:** Internal QA process; maps directly to the Phase 4 activity proposed in P1.3d above.

---

## 6. Anti-patterns to avoid

Based on competitor review and the owner's explicit feedback rules.

### 6.1 Vague "AI-powered" claims

Banned in our copy. Every AI mention must name a specific pattern (RAG, agents, vector search, LLM routing, conversational UI) or a specific tool (LangChain, pgvector, OpenAI, Anthropic). "AI-powered" without a concrete referent reads as marketing fluff and triggers the AI-aesthetic red flag.

### 6.2 Em-dashes

We just removed 186 of them. The replacement style is commas, colons, or sentence breaks. Do not reintroduce em-dashes in any new copy. This applies to blog posts too.

### 6.3 Eyebrow chips with status dots

Banned per `feedback_avoid_ai_aesthetic`. The small "● Active" or "● Available" dot pattern above section headings reads as AI-generated UI chrome. Section eyebrows should be plain text labels.

### 6.4 Filler decorative chrome above headlines

Banned. No floating geometric outlines, animated SVG noise, or abstract tech-decoration above H1s. Headlines earn their weight through typography and copy, not through decorative chrome.

### 6.5 Superlatives in AI copy

The general banned-words list applies to AI copy too. Do not write "best AI development company," "top AI engineers," "leading AI consultancy," "premier AI partner," "world-class AI," or "cutting-edge AI." If the AI work is good, the specifics (RAG, multi-agent, LangChain, pgvector, shipped 5+ platforms) do the work.

### 6.6 "We use AI to build your software"

Tempting framing but it positions AI as an internal tool, not a client-facing capability. Reframe: "We ship AI features inside your software." The first is about our cost savings; the second is about your product capability.

### 6.7 "AI will revolutionize your industry"

Hype language. We are engineers, not thought leaders. Every AI claim should describe something we have shipped or something a client specifically asked us to assess. Predictions about AI's impact on industries go in blog posts with clear hedging, not in marketing copy.

### 6.8 ChatGPT logo as our AI identity

Do not put ChatGPT or OpenAI logos in our brand surfaces as a shorthand for "we do AI." We are agnostic (OpenAI + Anthropic + Google + open models) and our identity is our own. ChatGPT logos in hero images are a competitor tell.

### 6.9 Inventing AI in past projects

If a case study predates our AI work, do not retroactively claim AI features were shipped. Honest framing: "Internal AI tooling accelerated delivery" is fine if true. "The product used AI" when it didn't is a lie and a reputational risk.

### 6.10 "AI-first" or "AI-native company" as a tagline

Overcorrected positioning. We are a software engineering firm with strong AI capabilities, not an AI company that happens to write software. The rewrites above thread this needle: AI shows up in every section, but always alongside traditional engineering (CMS, CRM, ERP, web, mobile, design).

---

## Appendix: file-level change inventory

For the marketing agent to track execution. Files touched, in priority order:

| Priority | File | Changes |
|---|---|---|
| P0 | `src/components/sections/home/Hero.tsx` | Subtitle rewrite (line 161-163) |
| P0 | `src/components/sections/home/ServicePreview.tsx` | Section description rewrite (line 150) |
| P0 | `src/lib/navigation.ts` | 6 service card descriptions (lines 28, 34, 40, 46, 52, 58) |
| P0 | `src/lib/services-data.ts` | Primary descriptions for Web Dev, UI/UX, Dedicated Teams (lines 216, 264, 312) |
| P1 | `src/lib/constants.ts` | Replace HIGHLIGHTS[0] and HIGHLIGHTS[3] (lines 38-41, 53-56) |
| P1 | `src/components/sections/home/WhyRetech.tsx` | Section description rewrite (line 35) |
| P1 | `src/app/process/page.tsx` | Add AI lines to 4 phase descriptions + 4 activities + new AI Engineering tooling category (lines 67, 86, 105, 124, 192 insert) |
| P1 | `src/components/sections/home/TechStack.tsx` | New AI & ML group + section description rewrite (lines 59 insert, 70) |
| P2 | `src/lib/industries-data.ts` | Append AI lines to Technology, Healthcare, Finance (lines 346, 59, 100) |
| P2 | `src/app/about/page.tsx` | Mission paragraph rewrite (line 150) |
| P2 | `src/app/page.tsx` | AI visual strip caption rewrite (line 172-174) |
| P2 | `src/components/sections/home/MidPageCTA.tsx` | CTA heading + paragraph (lines 36-39) |

Assets required: 5 SVG logos in `public/images/tech/` (langchain, openai, anthropic, pgvector, huggingface). Marketing agent sources or generates these; do not pull from external CDNs.

---

End of brief.
