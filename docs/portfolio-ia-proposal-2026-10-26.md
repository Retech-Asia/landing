# Portfolio IA proposal — 2026-10-26

Owner decision (2026-10-26): replace the featured mining analytics / asset
management-style case studies with exceptionally designed, SME-relevant
product concepts. This document is the required pre-change inventory and the
proposed information architecture. **No implementation yet** — concept
selection, storytelling, and editorial approval belong to ChatGPT; Claude
Code implements after that handoff.

## 1. Current inventory

### 1.1 Homepage — OurWork section (`#work`)

- `src/components/sections/home/OurWork.tsx`: lead study as full-width
  cinematic cover + four asymmetric editorial rows (7/5, 5/7), contextual
  photography covers with an honesty note, tech chips, one link per study
  to its case-study page.
- Data: `src/lib/case-studies-data.ts` — five delivered-work studies:

| id | slug (en / vi) |
| --- | --- |
| mining-analytics-platform | mining-analytics-platform / phan-tich-mining |
| asset-management-platform | asset-management-platform / quan-ly-tai-san |
| investment-intelligence-platform | investment-intelligence-platform / tri-tue-dau-tu |
| fintech-card-marketing | fintech-card-marketing / marketing-the-fintech |
| ai-analysis-saas | ai-analysis-saas / ai-analysis-saas |

### 1.2 Case-study pages

- `/case-studies` index + `/case-studies/[slug]` per study, EN + VI
  (localized slugs above). Verified narratives, per-study ArchitectureStack
  chips, captioned illustrative product captures. These are the
  delivered-work proof surface and the only thing the homepage currently
  features.

### 1.3 Showcase routes (product concepts — live since Wave 2)

- `/showcases` index + `/showcases/[product]` + `/showcases/[product]/[view]`.
- Registry `src/lib/showcases/registry.ts` — content verbatim from the
  approved Wave 1 creative handoff (docs/product-showcase-roadmap.md):

| family id | product | slug |
| --- | --- | --- |
| crm | Northline CRM | northline-crm |
| erp | Meridian Operations | meridian-operations |
| cms | Forma Studio | forma-studio |
| citewell | Citewell | citewell |
| relay | Relay Field | relay-field |

- All fictional, sample-data interfaces. Staging verified: index 200,
  `/en/showcases/northline-crm` 200.

### 1.4 Service-page embeds

- `ServiceShowcasePreview` (`src/components/showcases/`) is wired on
  `/services/[slug]` (page.tsx:1045): config-driven per service id
  (e.g. `crm-systems` → Northline CRM embed), code-split, concept-labeled.

### 1.5 Relationships and gaps

- Homepage → case studies: linked (OurWork, ProofStrip → `#work`).
- Homepage → showcases: **no link anywhere** — the five concepts are
  discoverable only via service-page embeds and direct URLs.
- Two parallel proof surfaces with different honesty modes (delivered work
  vs labeled product concepts) that never reference each other.

## 2. Proposed information architecture

1. **Two named surfaces, both kept:**
   - "Case Studies" (`/case-studies` + all five slugs): unchanged URLs,
     metadata, and content — the delivered-work record. No redirects, no
     silent edits; any re-framing is a separate approved decision.
   - "Product Concepts" (`/showcases` + per-product pages): the SME-relevant
     concept gallery, every surface carrying the "Product concept" label.
2. **Homepage `#work` swaps from case studies to featured product concepts.**
   The section links into `/showcases/[product]`; a small "Delivered work"
   hand-off line links to `/case-studies` so the real engagements stay
   one click from the homepage.
3. **Featured concepts mapped to the owner's five priority directions:**

| Priority direction | Coverage today |
| --- | --- |
| Real estate CRM / property management | gap — new concept (Northline is generic CRM) |
| Healthcare mobile app | gap — new concept, mobile-first (visual diversity anchor) |
| Enterprise operations | **Meridian Operations exists** |
| Logistics / field service | **Relay Field exists** |
| Practical AI business applications | Citewell may fit — ChatGPT judges; else new concept |

   Reuse first, extend or add only where a direction is genuinely missing;
   Northline CRM and Forma Studio stay available in the gallery even if not
   featured.
4. **Visual diversity rule:** the featured set must mix at least one
   mobile-first product, one ops/suite product, and one AI-forward product —
   no "five dashboards" outcome.
5. **Discovery wiring:** featured concepts appear in the homepage section;
   `/showcases` becomes the gallery index for all of them; ServicesGallery
   panels may reference their family concept (already the design intent).
6. **Integrity laws carried over:** no invented clients, testimonials, or
   verified outcomes; SME-scale sample numbers only inside fictional
   interfaces; realistic, believable workflows.

## 3. What ChatGPT owns next (handoff queue)

1. Concept selection per direction + which existing showcases to keep,
   extend, or retire from the featured set.
2. Functional storytelling + editorial copy per featured concept.
3. Mock-data direction + imagery concepts/generation per placement
   (requested individually as designs become ready).

## 4. Open decisions for the owner

- Whether `/case-studies` stays in the main nav unchanged (recommended yes —
  delivered-work proof matters to enterprise buyers) once concepts lead the
  homepage.
- Whether the homepage section keeps the name "Selected work" or becomes
  "Product concepts" (copy decision inside the ChatGPT handoff).
