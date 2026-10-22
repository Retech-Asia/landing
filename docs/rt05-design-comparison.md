# RT-05 — Design direction comparison (evidence + recommendation)

Status: prototypes only; no site code changed. Screenshots (local, gitignored):
`.tmp-audit/rt05/shots/` (28 captures: hero + services + work at 375/768/1440,
plus process/AI/engagement/FAQ/contact at 1440, per direction).

- Direction A: `prototypes/enterprise/direction-a.html` — product-led, CRM-first,
  preserves established brand (GeneralSans + Instrument Serif + brand green +
  LitDunes WebGL hero). Hero wording: Option A (canonical "Turning Ideas into
  Solutions" as visible H1).
- Direction B: `prototypes/enterprise/direction-b.html` — editorial enterprise
  consultancy (Source Serif 4 display + Inter, rules, numbered sections,
  near-monochrome). Hero wording: Option B ("Custom software for your business
  operations") shown as its hero variant.

Both carry the identical RT-04 content architecture: visible-H1 hero with stats,
early-proof strip, featured CRM tier + 5 compact capabilities, the 5 unchanged
case studies (verified titles/taglines/industries from `case-studies-data.ts`),
6-step delivery with "you see" lines, two separate AI messages, three engagement
shapes + cost drivers (no numbers), a visible FAQ (code-ownership question
excluded as PENDING), closing contact from CONTACT constants. No superlatives,
no invented metrics, no decorative chips, no gradients in B; A's only gradient
is the hero scrim.

## Axis comparison

### 1. Commercial clarity

| | A | B |
| --- | --- | --- |
| Hero names the offer? | No: brand tagline; offer arrives via rotator + proof strip | Yes: H1 names the offer; standfirst bolds "custom CRM and business systems at the core" |
| Time to "what do they sell" | ~1.5 screens (hero rotator → proof → featured CRM) | < 1 screen |

Evidence: `direction-b-hero-1440.png` vs `direction-a-hero-1440.png`. B's hero
states category, buyer, and product in one line; A's hero states a brand promise
and relies on the rotating slot for the category. **B wins.**

### 2. Enterprise trust

| | A | B |
| --- | --- | --- |
| Proof surface | 3-stat row; "Typical scope" panel in featured CRM card | 6 canonical stats in hero; numbered sections; "You see:" deliverable per delivery phase |
| Register | Tech-studio (aurora terrain, rounded cards) | Consultancy dossier (serif, rules, restrained ink) |

Evidence: `direction-a-services-1440.png` (scope panel) vs
`direction-b-process-1440.png` / `direction-b-engagement-1440.png`. B's
delivery/engagement presentation reads as an accountable operating document,
which is what a CRM buyer's procurement side wants. A's trust cues are real but
softer. **B wins, clearly on delivery/engagement presentation.**

### 3. Brand consistency and distinctiveness

| | A | B |
| --- | --- | --- |
| Continuity with live site + approved assets | Full: GeneralSans, #208535, Instrument Serif accent, Jay-approved LitDunes hero shader | Partial: same tokens for color/background, but a new typographic voice |
| Distinctiveness vs the generic AI-agency look | High (LitDunes is hard to copy) | Medium-high (editorial serif is distinctive but a known enterprise pattern) |

Evidence: `direction-a-hero-1440.png` vs `direction-b-hero-1440.png`. **A wins.**
LitDunes is the single most ownable visual asset the brand has.

### 4. Navigation and IA

Both prototypes implement the same RT-04 IA (nav: Services, Work, Process,
Contact; page: proof → capabilities → work → delivery → AI → engagement → FAQ →
contact). Section-by-section they are informationally identical; the difference
is chrome only (A: alternating band backgrounds + cards; B: numbered section
heads + ruled index rows). Both keep a compact footer. **Tie.** Note for RT-06:
B's numbered-section chrome maps to one reusable section-header component;
A's needs per-band background variants. Neutral either way.

### 5. Mobile usability

| | A (375) | B (375) |
| --- | --- | --- |
| Readability | Good, but body text and CTAs sit over animated terrain; scrim must constantly win | Text on flat paper; contrast is structural, not managed |
| Runtime cost | WebGL at DPR ≤ 1.5, paused off-viewport, static frame under reduced motion; still the main jank/battery risk on low-end Android | Zero raster/JS cost beyond fonts |

Evidence: `direction-a-hero-375.png` (pink terrain band behind CTA/stats) vs
`direction-b-hero-375.png` / `direction-b-services-375.png`. Mitigations make A
acceptable, but B is categorically safer. **B wins.**

### 6. CTA hierarchy and conversion path

Both: "Get Free Consultation" primary + "Explore Services" secondary in hero,
nav, and closing band; identical hrefs (#contact anchors here; real routes at
implementation). A's solid-green buttons are the loudest conversion element on
every screen; B's ink-block buttons are quieter but consistently the strongest
element in their section, and the closing band inverts to keep them dominant.
A's hero CTA lacks an offer-named promise directly above it (axis 1 leak); B's
CTA sits under an offer-named H1. **Slight edge B** (context beats color), with
A's button styling arguably stronger in isolation.

### 7. Implementation complexity and maintainability

| | A | B |
| --- | --- | --- |
| Hero runtime | WebGL shader (production `LitDunes.tsx` exists and can be reused) + rotator | Static type, zero JS |
| Perf law risk | High: lab baseline home mobile perf 49 / LCP 6.0s / TBT 2,000ms must be beaten; a WebGL hero is exactly the pattern that produced that number | Low: hero is SSR-visible text |
| Component system | Band + card + panel variants; GPU fallbacks, reduced-motion, no-WebGL paths to build and QA | Section chrome + ruled rows; no runtime branches |
| QA surface | 3 viewport widths × GPU/no-GPU/reduced-motion | 3 viewport widths |

**B wins decisively.** A's counterweight: LitDunes already exists as a
production component, so its build cost is sunk; but the perf-law risk and QA
surface recur for every future page that reuses it.

## Lab performance (mobile, Lighthouse, local static prototypes)

| Prototype | Perf score | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- |
| A (LitDunes hero) | 92 | 2.6s | 2.6s | 0ms | 0.001 |
| B (editorial) | 99 | 1.7s | 1.7s | 0ms | 0.023 |
| Baseline to beat (live home, lab) | 49 | | 6.0s | 2,000ms | |

Caveat: prototype numbers are indicative only (static HTML, no Next.js
hydration layer, no framework JS); they measure the design's intrinsic cost,
not the shipped page. A still beats the 49 baseline on this rig, but its TBT
is 0ms only because there is no hydration here; in production the shader's
rAF loop competes with hydration on the main thread, which is precisely the
pattern that produced the live site's 2,000ms TBT. The A-vs-B gap (92 vs 99,
LCP 2.6s vs 1.7s on identical static rigs) is the meaningful signal and it
holds in production conditions for B; for A it widens.

## Recommendation

**Adopt Direction B's design system as the implementation baseline, with the
hero-wording decision decoupled from the design decision:**

1. **Design system: B.** It wins 4 of 7 axes outright (commercial clarity,
   enterprise trust, mobile usability, implementation complexity), edges CTA
   context, ties nav/IA, and loses only brand-distinctiveness. The deciding
   evidence is structural, not stylistic: the perf law (SSR-visible hero,
   beat mobile 49) and the buyer-clarity goal both point the same way.
2. **Hero wording: Option A by default** ("Turning Ideas into Solutions" as the
   visible H1, keyword content in eyebrow + metadata). B's system does not
   depend on Option B's wording; the standfirst pattern carries the offer
   naming either way. Option B's H1 remains available and is one string per
   locale if Jay approves it.
3. **LitDunes is not discarded.** If Jay wants it, it slots into B as a
   contained accent (e.g., case-study headers or the closing band) where it
   carries no LCP obligation. Decision parked for the checkpoint, not part of
   this recommendation.

What B's system costs us: the live site's personality is quieter. The
counter-proposal (A) keeps personality but re-enters the exact runtime pattern
that produced the 49-perf baseline, and its clarity gap is measurable in the
hero captures above.

## Decision needed at the checkpoint

- [ ] Confirm design system B as RT-06 baseline (or overrule with A).
- [ ] Hero wording: Option A default (no Jay-gated change) vs Option B (Jay-gated).
- [ ] LitDunes: park, or slot as non-LCP accent in B.
- [ ] Direction B typography: Source Serif 4 + Inter are proposed fonts; swap is
      one CSS block if Jay prefers different faces.
