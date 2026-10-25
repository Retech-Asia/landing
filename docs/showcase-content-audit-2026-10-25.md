# Wave 1A — Content Audit: CRM / ERP / AI / Industry Copy (2026-10-25)

Scope: service pages (CRM, ERP, AI, CMS) + industry pages, per the Product
Showcase program brief. Cross-referenced against `docs/evidence-register.md`
(claims already swept/ruled 2026-10-22..25 — not restarted, only extended).
Claude audited; **copy fixes belong to ChatGPT** (Creative Ownership Update).
No copy was changed in this pass.

## Verdicts per page

| Page | State |
| --- | --- |
| `/services/ai-development` | **Clean.** Honest-fit positioning ("AI only when measurable, data ready, cost understood"), no numeric claims. Recent rewrite — preserve. |
| `/services/crm-systems` | Generic lead copy + 2 compliance/ROI claims + unaligned platform list. Needs ChatGPT rewrite (the brief's "focused on actual business problems and engineering capabilities"). |
| `/services/erp-solutions` | One hard unsupported numeric claim + capability-list overreach. |
| `/services/cms-platforms` | Template phrasing ("We build custom websites leveraging…"), mild; queue with CRM/ERP rewrite. |
| Industry pages (9) | One compliance-class claim (healthcare) + the already-flagged response-promise on the industries hub. Others pass. |

## Findings

| # | Class | Location | Issue | Recommended treatment |
| --- | --- | --- | --- | --- |
| F1 | Unsupported numeric outcome | `src/lib/services-data.ts:601` (EN) `:602` (VI) — ERP benefits "Operational Efficiency" | "reducing processing time by up to 60%" — no record. Same class the owner removed from case studies (RT-19) and stats (checkpoint 3). | Rewrite to qualitative capability statement. Highest-priority fix in this audit. |
| F2 | Compliance assertion | `src/lib/industries-data.ts:73` — Healthcare intro | "deep expertise in building HIPAA-compliant healthcare software that meets HIPAA security and reliability requirements… comply with HL7/FHIR standards" — none of the 5 case studies is healthcare; no HIPAA delivery record. | Reword as capability intent ("build to HIPAA-aligned requirements") or source evidence. Compliance claims are the riskiest class on the site. |
| F3 | Compliance assertion | `src/lib/services-data.ts:428` — CRM benefit "Compliance-Ready Data Handling" | "audit trails that meet GDPR and industry-specific regulations" — "meet GDPR" is a certification-class claim. | Reword to "support GDPR-aligned data handling" class. |
| F4 | Outcome promise | `src/lib/services-data.ts:501` — CRM FAQ (training) | "maximum ROI from your CRM investment". | Drop the ROI promise; keep adoption/training substance. |
| F5 | Response promise (already flagged) | `src/app/[locale]/industries/page.tsx:49` — hub whyP2 | "questions get answered the same business day" — flagged in evidence-register 2026-10-25, untouched. | Fold into the same editorial pass as the removed response-time cards. |
| F6 | Delivery-time ranges — consistency decision | `src/lib/services-data.ts:487` (CRM 4–10 / 8–20 weeks), `:702` (ERP 12–24 weeks) + timeline tables `:513-518`, `:728-733` | "typically"-qualified ranges; owner precedent removed 24h / same-day promises. Ranges are hedged and useful for conversion, unlike absolute promises. | **Owner/ChatGPT call:** keep hedged ranges (Claude recommendation — they are typical planning figures, not commitments) or soften for consistency with the response-promise removals. Do not remove silently. |
| F7 | Capability-list overreach + internal inconsistency | `src/lib/services-data.ts:480` (CRM FAQ: Salesforce, HubSpot, Zoho, Pipedrive vs technologies `:433` without Pipedrive); `:695` (ERP FAQ: Odoo, SAP, Microsoft Dynamics, NetSuite vs technologies `:648` Odoo/SAP) | Platform lists imply experience breadth with no delivered ERP/CRM case study to point at. | ChatGPT: align lists to what ReTech genuinely delivers (extend/integrate + bespoke builds) and keep FAQ ↔ technologies consistent. |
| F8 | Generic positioning (brief target) | `src/lib/services-data.ts:321,325` (CRM), `:529,533` (ERP), `:105-112` (CMS) | All lead with "We develop/build tailored websites integrated with X" — website-first framing that undersells platform engineering; the brief explicitly asks CRM messaging to lead with business problems + engineering capability. | ChatGPT rewrite, EN+VI, same structure/length class (SEO metadata + URLs preserved). |
| F9 | VI translation bug | `src/lib/services-data.ts:464,509` | "khử trùng lặp" for *deduplication* — literal mistranslation (reads as disinfection). | Objective fix: "loại bỏ trùng lặp". Small enough to fold into any copy pass; ChatGPT sign-off per ownership rule. |
| — | Reviewed, no action | `src/components/sections/CodeToProduct.tsx:294-303` | Decorative SVG mock-dashboard shows 98.7% / 2.4k / +38%. Illustrative product art, not a ReTech claim — same class as future showcase fixtures. | None. Noted as precedent: showcase fixtures will carry similar synthetic numbers under the "Concept demonstration — sample data" label. |
| — | Reviewed, no action | Careers page "within 3 business days" (`src/app/[locale]/careers/page.tsx:209`) | Recruitment-process promise, internal not client-facing. | Out of program scope; noted only. |

## ChatGPT handoff request (blocking Wave 1C)

Two artifacts needed from ChatGPT before the flagship CRM demo can be built:

1. **Wave 1A copy pass** — decisions + EN/VI rewrites for F1–F9 above.
2. **Wave 1C CRM showcase creative direction** — product identity (fictional
   brand name + what the business does), visual direction for 5 views
   (executive dashboard, lead management, sales pipeline, customer 360°,
   automation/reporting), synthetic dataset narrative, iconography/imagery
   choices, and the exact "concept demonstration" label treatment.

Repository constraints ChatGPT must design within: ReTech green `#30AB47`
(decorative-only law), glass/frosted system per `docs/design-system.md`,
existing EN/VI i18n + design tokens, no K&K Homes material, no real client
names/outcomes, lazy-loaded routes, crawlable non-JS fallback content.

## Evidence

All findings carry file:line references above, verified by direct read on
2026-10-25 (working tree `main` @ `892f601`). AI page read in full — clean.
Numeric-claim sweep covered `services-data.ts`, `industries-data.ts`,
`sections/`, `app/[locale]/industries/`.
