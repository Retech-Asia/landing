# RT-17 — Owner corrections reconciliation (2026-10-22)

Owner directive 2026-10-22 governs this round. It supersedes conflicting RT-04/RT-05
consultant calls. This document maps each directive to the current tree (HEAD 1121b55,
production = 9cf43da) and the correction plan. Waves: RT-18 (brand recovery) →
RT-19 (work + process) → RT-20 (imagery + consistency). **No production deploy until
the next owner checkpoint.**

## 1. Hero — what was removed from the approved design, and the restore

- **Approved scene (2026-08-21 → 2026-10-21):** `LitDunes` — raw-WebGL dune heightfield
  under the Brand Field wash (deep green, #208535, #30AB47, cyan #06b6d4, violet
  #8b5cf6; palette swapped to primary colors on Jay's 2026-08-23 call), contour lines,
  rim light, horizon curtain, cursor-as-lazy-lamp (lerp 0.010 — softened twice on
  Jay's call, do not raise). Zero libraries (one fullscreen triangle + fragment
  shader). Idle-deferred mount (rIC, 2s cap) so it never blocks hero copy. Reduced
  motion = static frame t=47.
- **Iteration history:** b21e220 (Lit Dunes replaces LatticeField) → a7b6ba4 (viewport
  fit, Brand Field palette) → 649202f (composition restored, terrain edge-to-edge) →
  6fc2e56 (padding) → 8e10775 (final approved composition: dunes full-bleed, text
  scrim, bottom fade, industries chips on the canvas).
- **What RT-07 (9cf43da) changed:** unmounted `<LitDunes />` (file PRESERVED, still in
  tree at `src/components/sections/home/LitDunes.tsx`, 330 lines, unmodified), dropped
  the text scrim + bottom fade, replaced the composition with a flat static hero.
  Driver: Lighthouse LCP repaint mechanic under simulated throttling.
- **Owner ruling:** wrong trade-off. Lighthouse is not the sole design authority.
- **Restore plan (RT-18):** re-mount the exact approved `LitDunes` (no recreation),
  restore scrim + bottom fade + industries-on-canvas composition, keep the Option A
  visible H1 (RT-06 owner ruling stands), keep static SSR copy. Remove the generic
  hero eyebrow (below). Verify WebGL-unavailable fallback exists in the component;
  add a brand-gradient static fallback if missing. Measure perf WITH the dunes
  enabled and report trade-offs transparently; do not tune by removing the scene.

## 2. Generic / AI-pattern copy (audit result)

- **P0, owner-flagged verbatim:** hero eyebrow `"Retech Solutions. Custom software
  from Ho Chi Minh City."` — `home.hero.eyebrow` in BOTH `en.json` and `vi.json`.
  Action (RT-18): remove (owner authorized; the old approved composition had no
  eyebrow). Location references stay confined to About/contact surfaces.
- **Sweep hits to correct in RT-18/RT-20 (mechanical de-templating, EN + VI):**
  - `serviceDetail.technologies.description` + industries equivalents: "The tools and
    frameworks we leverage to deliver robust, scalable solutions" (repeated per
    industry — restates its own section title).
  - about `WhatSetsUsApart`: "seamless integration with your team".
  - about `CultureValues`: "...the craft of building software that lasts" (keep only
    if Jay wants it; flag).
  - about mission: "To empower businesses worldwide...".
  - technologies `TechListing` (Vercel entry): "seamless Git integration".
  - industries hub `whyP2`: "...making real-time collaboration seamless".
  - services CTA: "Our team will craft a tailored solution...".
  - process design step: "...designers craft intuitive interfaces that users love".
  - `metadata.keywords` "digital transformation" (harmless but template-ish).
- Copy that restates section titles and repetitive heading patterns get a full pass in
  RT-20; hero-adjacent + repeated-per-page strings first (RT-18).

## 3. Project metrics in promotional UI

- **98% client satisfaction** (`STATS_BAR`, `ABOUT_STATS`) — evidence register already
  says "recommend removal without basis". Action (RT-18): remove from all surfaces.
- **Case-study results metrics** (`case-studies-data.ts` `results[].numericValue`,
  e.g. "4 pools + market", "Cross-pool") — small numbers presented as impact.
  Action (RT-19): replace the metric-card presentation with the owner's narrative
  structure (challenge → approach → delivered → technology), keeping verified facts
  as prose, not numeric hero-cards. No new numbers.
- **Hero canonical stats 50+/30+/5+** — owner-classified claims with "cite record or
  downgrade wording" still open. These are Jay-gated hero copy: NOT touched in
  RT-18; listed for the checkpoint alongside the LitDunes restore.
- Homepage work rows (OurWork) currently show no metrics — compliant; visual
  redesign per owner's presentation spec lands in RT-19.

## 4. Non-brand large-area surfaces

- **`HomeCTA` closing band = `bg-foreground` (#1A1A2E)** — the exact hex the owner
  flagged, used as a full-width section background by RT-07. Action (RT-18): re-derive
  onto the established dark-brand surface (`bg-brand-dark` #186B2B, already the CTA
  band language on services/faq/industries/process/contact/footer).
- `globals.css` `.prose-custom pre` background #1a1a2e (blog code blocks) — small
  content area; action (RT-20): move to a neutral token.
- Dark-mode base #0A0A14 and light-mode foreground #1A1A2E: foreground is text ink,
  not a surface (retained); dark-mode base reviewed in RT-20 for navy cast.
- `bg-brand-dark` bands site-wide: brand-derived, compliant with the directive.
- No other navy/purple section surfaces found in `src/` (WhatsApp green #25D366 is
  vendor-brand, scoped to that widget; map tooltip #0d1b2a is a map chrome micro-
  surface — RT-20 review).

## 5. /process — preserve vs replace

- Current: hero + 8-step vertical timeline (Discovery→Design→Development→QA→
  Deployment→Support + collaboration/tools group) + FAQ + dark CTA band.
- Worth preserving (content truths): timeline honesty (8-14 weeks MVP / 4-6 months
  enterprise, stated with range framing), QA/testing specifics, communication and
  ownership practices, "no contractual cadence implied" framing.
- Replace (RT-19): the vertical milestone rail itself → owner's editorial structure:
  delivery philosophy intro + 3-4 asymmetric editorial groups (understand/scope →
  design+engineer → deliver working software → refine/launch/support), each written
  around client-visible artifacts, not internal phases.

## 6. Imagery audit (feeds RT-20)

- **Case-study visuals are stock posing as product UI:** all five case studies use
  `/images/stock/cs-*-hero|dashboard|mobile.webp` (1200×800-1600×1140). Owner: prefer
  real product screenshots; never imply stock depicts a real client product. Action:
  RT-19 asks Jay for real screenshots per case study (or approves honest treatment);
  RT-20 implements whatever is supplied. No invented substitutes.
- **People/team stock** (`team-portrait`, `team-meeting`, `team-collaboration`,
  `modern-office`, `office-interior`) on about/careers/contact — implied-employee risk;
  replace with curated Unsplash/Pexels (license-recorded, locally hosted) per the
  owner's creative direction.
- **Resolution:** stock banners are 1200×800 (1.5× at 800px display) — marginal on
  retina; blog covers similar. RT-20 re-sources at ≥2× display size with proper
  `sizes`/`srcset` and per-breakpoint crops.
- **No asset register exists.** RT-20 creates one (usage, source URL, creator,
  license, verification date, resolution, exported variants).
- `next/image` is already used site-wide; the work is sourcing + art direction, not
  pipeline replacement.

## 7. Shared components / tokens

- Type system, IndexRow, ink buttons, SectionHeader (RT-06) — not contested by the
  directive; retained.
- `hero-text-scrim` CSS: verify it survived RT-07 in globals.css (used by restore).
- New work goes through existing tokens; no parallel design system.

## Execution order

| Wave | Ticket | Scope |
| --- | --- | --- |
| 1 | RT-18 | LitDunes restore + scrim composition; eyebrow removal; 98% removal; HomeCTA band → brand-dark; worst repeated copy lines |
| 2 | RT-19 | Case-study presentation rebuild (narrative, no metric cards) + /process editorial rebuild |
| 3 | RT-20 | Photography curation + asset register + resolution/crops + copy consistency sweep |

Each wave: gates + probes + EN/VI visual evidence (375/768/1440) → owner checkpoint
→ only then deploy.
