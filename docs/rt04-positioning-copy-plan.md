# RT-04 — Positioning + homepage copy plan (DRAFT for owner review)

Status: copy plan only; no site copy changes yet. Hero wording changes require
Jay's explicit sign-off (content-guidelines "Hero copy (canonical)"). VI lines are
drafts pending native review at implementation.

## Positioning statement (drives all copy)

Retech builds custom CRM and business software, with web, mobile, and desktop
engineering, applied AI, and IT consulting around it. Two AI messages stay
separate: AI-assisted development (engineers accountable) and AI inside products
(only when the use case justifies it). No superlatives, no invented numbers, no
savings percentages.

## Hero (decision needed from Jay)

| Option | Change | Trade-off |
| --- | --- | --- |
| A (recommended first checkpoint) | The existing visible tagline "Turning Ideas into Solutions" becomes the real `<h1>`; the `sr-only` seoH1 is dropped and its keyword content moves to the subhead + metadata. Zero canon violation, fixes heading semantics. | H1 is brand voice, not keyword-led; SEO relies on title/subhead. |
| B | New visible H1 naming the offer: "Custom software for your business operations" (VI: "Phần mềm tùy chỉnh cho hoạt động doanh nghiệp của bạn") with the tagline demoted to intro line. | Buyer-clearer, but replaces canonical hero copy (needs Jay). |

Both options keep: subhead pattern (concrete capabilities, rotating slot may stay
or simplify per RT-05 motion ruling), primary CTA "Get Free Consultation",
secondary "Explore Services", stats row (canonical constants).

## Homepage section sequence + copy intents

| # | Section | Copy intent (EN anchor lines; VI drafted at implementation) |
| --- | --- | --- |
| 1 | Hero | Per hero decision above. Stats unchanged (constants). |
| 2 | Early proof (NEW, compact) | One-line strip: "50+ projects delivered for operators in mining, finance, and asset management" linking to Selected work. Uses canonical stats only; no logo strip, no client names. |
| 3 | Capabilities | Two tiers, not six equal tiles: featured "Custom CRM and business systems" (workflow fit, roles, integrations, migration); then web applications, mobile apps, desktop apps, applied AI, IT consulting as five compact entries. Each entry: one sentence what it is + one sentence who it fits. |
| 4 | Selected work | Existing 5 case studies unchanged (problem, scope, responsibility, solution, qualitative outcomes). No new metrics. Imagery labeled per RT-09 outcome. |
| 5 | Delivery and quality | Discovery, UX/architecture, incremental delivery with reviews, acceptance, launch, handover. Mirrors /process; adds what the client sees at each step. No fixed-duration promises. |
| 6 | Practical AI approach | Two short blocks: "How we build with AI" (assistance + human accountability) and "AI inside your product" (justified by use case, data readiness, evaluation, operating cost). No tool-name name-dropping beyond what case studies already claim. |
| 7 | Engagement and cost | Three engagement shapes: discovery, scoped project, ongoing engineering. Cost drivers list (scope, platforms, integrations, roles, third-party costs). NO numbers until owner-approved ranges exist. |
| 8 | FAQ (visible if kept) | Candidate questions: what drives cost; who owns the code (PENDING policy fact); can you migrate our current system; how do we communicate; what happens after launch; when does AI make sense. Schema returns only with the visible section. Answers marked PENDING stay out until RT-02 confirms policy. |
| 9 | Closing contact | Existing HomeCTA; identity from CONTACT constants only. |

Length control: sections 2+3 and 6+7 can combine; target total scroll depth at or
below current homepage.

## Service map decision (feeds RT-08)

- Keep 6 existing services + their localized slugs (verified live).
- Add 4 new per plan §7: `mobile-app-development`, `desktop-app-development`,
  `ai-development`, `it-consulting`. VI slugs following the existing convention
  (`/vi/services/...`): `ung-dung-mobile`, `ung-dung-desktop`, `phat-trien-ai`,
  `tu-van-it`.
- Every consumer updated in one round (navigation, footer, ServicePreview, hub,
  comparisons/calculators, related content, sitemap, OG, locale switching).

## Docs drift noticed (not fixed in this round)

- content-guidelines "Case study naming" table describes 2 studies (Signsbeat,
  Dune) but the data model has 5 with different slugs; the wellness-platform slug
  does not exist. Guidelines predate the case-study data rework.
- content-guidelines requires em dashes; roadmap ground rules ban them in
  content. This plan avoids em dashes; the docs conflict needs an owner ruling.
- content-guidelines names Wix as copy source of truth; roadmap (2026-08-23)
  says Wix is no longer source. Roadmap is later; treating this repo as source.
