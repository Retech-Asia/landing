# Retech design system (design.md)

Status: LOCKED 2026-10-26. Sources: `agent/uiux-audit/hallmark-sitewide-audit-2026-10-26.md`
(accepted baseline) and `agent/uiux-audit/hallmark-creative-supplement-2026-10-26.md`
(approved with corrections, including hero Concept II). This file is the single
authoritative design reference. It supersedes `docs/design-system.md` and
`docs/ui-ux-guidelines.md` where they conflict. Amendments require owner approval.

## Identity

One art-directed system, creative direction "Engineering in Motion": dark atmospheric
world inherited from the hero, ink foreground, green brand voice, restrained cyan as
the only secondary accent. Evidence over decoration: product interfaces and real
working scenes lead, text supports.

## Colors

- Brand action and text: `--brand` `#208535` (AA with white), hover `--brand-dark`
  `#186B2B`, active `--brand-light`. Never raw hex in components.
- Decorative brand `#30AB47`: glass borders, glow, focus outlines only (existing law).
- Cyan `--accent-cyan`: controlled secondary. Data-viz strokes, diagram lines,
  selection and focus accents. Never in text gradients, never a third gradient stop.
- Violet `--accent-violet`: RETIRED. No new usage anywhere. Remaining token exists
  only until references reach zero, then it is deleted.
- Gradient headlines: RETIRED. `.gradient-text` is deleted. Headings carry emphasis
  with weight or the brand voice color. `.gradient-text-brand` (brand to cyan) survives
  on numeric counters and the velocity marquee only; not for headlines.
- Surfaces: `--background` `#FAFAF8`, `--background-subtle`, `--background-muted`,
  cards `--card-bg`, glass tokens, hairlines `--rule` / `--rule-soft`.

## Typography

- Geist Sans: body and UI. Headings 600/700, roman only. No italic headings anywhere
  except the locked exception below.
- Geist Mono: meta labels, stack tags, step indices, data values, captions.
  `text-xs` to `text-sm`, `tabular-nums`.
- Source Serif 4 (`font-display`, `font-display-title`): editorial statements, ghost
  numerals, family intros. Roman. LOCKED EXCEPTION: the homepage hero accent word
  "Solutions" renders in italic serif with the green treatment. Nothing else may be
  italic serif.
- Scale: homepage hero h1 exactly "Turning Ideas into Solutions" at `text-4xl..7xl`;
  page h1 `text-4xl md:text-5xl lg:text-6xl`; section h2 `text-3xl md:text-4xl`
  (numbered variant `lg:text-[2.7rem]`); card h3 `text-xl`; lead `text-lg`, body
  `text-base`. Display uses `leading-[1.1] tracking-tight text-balance`.
- Eyebrow ban: no decorative uppercase labels above h1/h2. `SectionHeader` renders no
  eyebrow mode. The only permitted label is the numbered editorial head
  (`01 Capabilities` pattern).

## Layout and rhythm

- Container `max-w-7xl px-4 sm:px-6 lg:px-8`. Major sections `py-20 md:py-28`,
  compact `py-16 md:py-20`. Services index uses the major rhythm.
- Grids: 12-column desktop compositions; image tracks `minmax(0, 1fr)`; Tailwind
  arbitrary tracks use underscores, never commas.
- Numbered editorial head: `md:grid-cols-[180px_minmax(0,1fr)]`, serif numeral plus
  muted label, h2 in the content column. Default head for major sections.

## Section boundaries

- P1 rule seam: `border-t border-rule` between sibling sections on the same surface.
  Site-wide default. No gradient fades between sections.
- P2 surface step: `bg-background-subtle` band with `border-y border-rule-soft` for
  alternating rhythm (data strips, proof, FAQ).
- P3 cinematic dock: homepage hero only. The hero surface resolves into the next
  section with one controlled transition plus a hairline at the seam. The Concept II
  scroll transition (below) is the full expression of P3.
- Photo bands: black scrim `from-black/70 via-black/20` is the only photo overlay.

## Imagery

- Product interfaces (showcase captures, dashboards) are the primary visual class:
  hairline-ruled figures or full-bleed bands with scrim, mono captions. Fictional
  product surfaces carry the mono label "Product concept". Verified delivered work is
  unlabeled.
- Photography: real workspaces and working sessions, dark-keyed, desaturated toward
  ink; no stock handshakes, no generic server-room cliches. Provenance registry
  `src/lib/photography.ts` stays complete (zero null provenance).
- Diagrams: ruled SVG, ink strokes, green path emphasis, cyan annotations.
- Icon tiles: glass kit allowlist only; plain Lucide `size={28}` in ruled lists.
- Sanitization law: no real client names, logos, identities, or sensitive project
  details in any public visual. Authentic captures are sanitized before publication.
- Asset ownership: ChatGPT owns art direction, imagery concepts, generation, final
  selection. Claude Code owns integration, responsive delivery, interactive
  interfaces, animation, a11y, performance. New visual needs are issued as per-asset
  specs (placement, aspect, composition, integration) and fulfilled one at a time;
  never generate images locally, never introduce generic stock. Missing assets never
  block implementation; existing approved visuals stand in as placeholders.

## Statistics law

Suppressed until evidenced: 50+ projects, 40-60% savings, 50K+ IT graduates,
six countries, and any similar counter. No invented replacement counters, ever.
Replace with factual context lines (what the platform does, who it serves).
Verified case-study outcomes are unaffected.

## CTA law

- Primary verb, site-wide: "Discuss Your Project" (VI "Thảo luận dự án").
- Estimator context only: "Get a Project Estimate" (VI "Nhận báo giá dự án").
- "Free Consultation" and "free consultation" messaging: RETIRED site-wide.
- One primary button per view (brand solid), one secondary (frosted/outline),
  text links with arrow as tertiary.

## Motion

- Entrance: fade plus 8px rise, 500ms ease-out, 60ms stagger, `once: true`
  (AnimatedSection). The only site-wide entrance.
- Scroll-linked cinematic motion: homepage hero transition and How We Work drift only.
- Lenis retained. `prefers-reduced-motion`: spatial motion collapses to opacity;
  cinematic sequences render static compositions with hard cuts.
- Progress via `scaleX` transform. All 8 states on interactive components.

## Homepage composition (approved)

1. Hero: Concept II "Signal to System", dark engineering volume, H1 exactly
   "Turning Ideas into Solutions" with the green italic-serif "Solutions", primary CTA
   "Discuss Your Project". Ends on the triptych of three "Product concept" surfaces.
2. Scroll transition (one sticky region, target about 200vh desktop, 140-160vh
   mobile): surfaces flatten to the schematic plane, camera converges to a single
   vanishing point, match-cut into the AR-1 workshop photograph (blur-to-sharp,
   dark-cool to warm exposure ramp), canvas unmounts, discovery section rises.
   Performance guards: native scroll only, R3F loop paused off-screen or unmounted,
   at most one live interface at a time (hero surfaces go static after beat 1),
   region shortened if mobile scroll feel suffers.
3. Discovery section: "We start with how your business works", immersive, AR-1 as
   permanent backdrop. Its own section, not merged into the Services gallery.
4. Services gallery: six families as large image-led editorial panels (not a card
   grid). CMS and ERP tagged inside business systems; UI/UX tagged as a Web
   capability; Dedicated Teams lives in Engagement. Deep links and aria contract
   from the existing explorer are preserved.
5. ProofStrip: names plus mono context line, no counters.
6. Selected work: editorial rows led by real interface captures of delivered
   platforms. No concept labels here.
7. How We Work: panoramic band, Discover / Design / Build / Release as one
   composition with matched photography and mono markers. This four-stage spine is
   THE process vocabulary site-wide.
8. Product concepts showcase: premium desktop and mobile presentations, functional
   interfaces with ChatGPT imagery, hairline frames (no fake device chrome), mono
   "Product concept" labels.
9. AI honestly applied, Engagement (Dedicated Teams folded in as ongoing model),
   final CTA "Discuss Your Project".

## Page families

Shared system, different bodies: Services directory is a visual catalog of six
families; service detail is one IA (product-first hero, problem ledger, four-stage
build story, interface embeds, ruled capabilities, FAQ, single CTA) repeated across
families with CMS/ERP as tagged specialist pages; case studies are premium editorial
proof (full-bleed capture header, ruled ledger, verified outcomes only); Process
tells the delivery story in four chapters; About/Careers are human and factual;
Technologies is a layered architecture diagram plus curated notes; Blog is a quiet
reading surface; Contact is a single consultation path with zero decoration.

## Responsive and parity

- Breakpoints `sm 640 / md 768 / lg 1024`. No horizontal scroll (`overflow-x: clip`
  on html and body), no two-line clickable text, single-column section heads on
  mobile, product figures 16:10 crops. Mobile has a defined vertical equivalent for
  every cinematic act; no scroll trapping.
- EN/VI parity through the message files; every new string pairs in both locales.
- Existing routes, URLs, SEO surface, schema, hreflang: preserved untouched.

## Approved exceptions register

1. Hero italic serif accent word "Solutions" (homepage only, locked).
2. `#30AB47` decorative glass vocabulary per the color law.
3. Direction B pre-approved patterns: ledger, ruled timeline, stack manifest,
   ghost numerals, numbered editorial head.
4. `.gradient-text-brand` on numeric counters and the velocity marquee.

## Implementation safeguards

Pushes to `main` deploy to staging. Production deploys are owner-gated. Every batch
ends in the standard gate (tsc, eslint, one build, EN/VI parity check) and evidence
stays local-only.
