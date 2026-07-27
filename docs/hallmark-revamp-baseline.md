# Hallmark Revamp Baseline (Pre-Implementation Capture)

**Captured:** 2026-07-27
**Baseline commit:** `7560c6d888d64b5bfaf8e6b754fb657f38723f28` (feat(blog): unique per-post thumbnails — 35 WebP images)
**Working tree state at capture:** clean
**Scope:** 5 revamp items from the Hallmark audit

This doc captures the **current state** of every file the revamp will touch. If the implementation regresses or looks wrong, revert via the commands at the bottom. No file is deleted without first being captured here.

---

## How to revert (TL;DR)

**Full revert (nuclear option, if everything is wrong):**
```bash
export GIT_EXEC_PATH=/usr/share/git-core
git reset --hard 7560c6d888d64b5bfaf8e6b754fb657f38723f28
```

**Per-item revert (surgical, if only one item regressed):**
Each item section below has its own revert command. Find the item, run the command.

**Per-file revert (smallest scope):**
```bash
git checkout 7560c6d888d64b5bfaf8e6b754fb657f38723f28 -- <file-path>
```

---

## Item 1 — Kill the gradient headline

**Critical AI tell.** "into Solutions" span in hero h1 uses a 5-stop brand→cyan→brand gradient with `background-clip: text`.

### Files + current code

**`src/components/sections/home/Hero.tsx:136`**
```tsx
<span className="hero-gradient-headline">Solutions</span>
```

**`src/app/globals.css:803-817`**
```css
.hero-gradient-headline {
  background: linear-gradient(
    270deg,
    var(--brand) 0%,
    var(--brand-light) 20%,
    var(--accent-cyan) 50%,
    var(--brand-light) 80%,
    var(--brand) 100%
  );
  background-size: 300% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: hero-gradient-shift 6s ease-in-out infinite;
}
```

**`src/app/globals.css:784-801`** (related keyframe, may also be removed)
```css
@keyframes hero-gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

### Planned change

Replace the gradient-text fill with **solid accent colour** (`var(--brand)`) on the "Solutions" span. Keep the Instrument Serif at weight 400. Optionally use Instrument Serif **italic** for the accent word (the italic is genuinely beautiful and currently underused).

Delete the `.hero-gradient-headline` class + `@keyframes hero-gradient-shift` from globals.css.

### Revert

```bash
git checkout 7560c6d -- src/components/sections/home/Hero.tsx src/app/globals.css
```

---

## Item 2 — Cut the Three.js orbs

**Critical AI tell.** Decorative WebGL canvas (1429×900, zero pointer listeners) ships a ~150KB Three.js bundle for non-interactive ambient orbs. Cost: bundle + GPU draw every frame. Payoff: visual noise that pattern-matches as "AI tool".

### Files + current code

**Surface (single invocation):** `src/components/sections/home/Hero.tsx:112`
```tsx
<Hero3DBackground />
```

**Implementation files (full file each):**
- `src/components/three/Hero3DBackground.tsx` (~80 lines) — wrapper, deferred mount, reduced-motion + mobile gate
- `src/components/three/HeroScene.tsx` — actual Three.js scene with orbs, lighting, animation loop

**Dependencies in `package.json:14-29`:**
```json
"@react-three/drei": "^10.7.7",
"@react-three/fiber": "^9.6.1",
"three": "^0.185.1"
```

### Planned change (two-stage)

**Stage A (recommended first, easy revert):** Comment out the invocation only. Dependencies stay in package.json (no uninstall yet). Hero3DBackground.tsx and HeroScene.tsx stay on disk but unused.

```tsx
// Hero3DBackground removed per Hallmark audit — decorative WebGL tell.
// Captured baseline at docs/hallmark-revamp-baseline.md.
// <Hero3DBackground />
```

**Stage B (after user approves Stage A):** Delete the two files + uninstall the three packages. ~150KB JS saved on initial bundle.

### Revert

**Stage A:** `git checkout 7560c6d -- src/components/sections/home/Hero.tsx`
**Stage B:** `git checkout 7560c6d -- src/components/three/ package.json && npm install`

---

## Item 3 — Replace glassmorphism with opaque cards

**Major AI tell.** `glass-card` class ships `backdrop-blur` on cards sitting on solid section backgrounds — nothing behind them to blur through.

### Files + current code

**`src/app/globals.css:57-63`** (token definitions)
```css
--glass-card-bg: rgba(255, 255, 255, 0.70);
--glass-card-border: rgba(0, 0, 0, 0.06);
--glass-card-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03);
--glass-card-hover-bg: rgba(255, 255, 255, 0.85);
--glass-card-hover-border: rgba(0, 0, 0, 0.10);
--glass-card-hover-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.06);
```

(Dark mode variants at `globals.css:130-136`)

**Component files using `glass-card` class:**
- `src/components/ui/Card.tsx` (reusable primitive)
- `src/components/sections/home/WhyVietnam.tsx`
- `src/components/sections/home/WhyRetech.tsx`
- `src/components/sections/home/SuccessStories.tsx`
- `src/components/sections/home/Testimonials.tsx`

### Planned change

Replace `glass-card` class with opaque `bg-white` (light mode) / `bg-background-subtle` (dark mode). Keep the hairline border (`border border-black/[0.06]`). Keep the shadow lift on hover. Drop the `backdrop-blur`.

**Preserved:** legitimate `backdrop-blur` use cases — mobile menu, cookie consent, navbar scroll state, dropdown menus. These overlay real content and need the blur.

### Revert

```bash
git checkout 7560c6d -- src/app/globals.css src/components/ui/Card.tsx src/components/sections/home/WhyVietnam.tsx src/components/sections/home/WhyRetech.tsx src/components/sections/home/SuccessStories.tsx src/components/sections/home/Testimonials.tsx
```

---

## Item 4 — Halve AnimatedSection usage on below-fold sections

**Major AI tell.** `<AnimatedSection>` wraps most below-fold sections for entrance animations. The page never settles — every scroll trigger fires another orchestration.

### Files + current code

`AnimatedSection` is imported across **20 files** (full list below). The plan is to **halve** usage on below-fold sections, keeping it only on the strongest 2-3 (e.g. ProductShowcase, the visual break before SuccessStories).

**Files using AnimatedSection:**
```
src/app/about/page.tsx
src/app/blog/[slug]/page.tsx
src/app/blog/category/[category]/page.tsx
src/app/blog/page.tsx
src/app/case-studies/[slug]/page.tsx
src/app/case-studies/[slug]/CaseStudyClientComponents.tsx
src/app/case-studies/page.tsx
src/app/contact/page.tsx
src/app/careers/page.tsx
src/app/error.tsx
src/app/faq/faq-client.tsx
src/app/faq/page.tsx
src/app/industries/[slug]/page.tsx
src/app/industries/page.tsx
src/app/not-found.tsx
src/app/privacy-policy/page.tsx
src/app/services/[slug]/page.tsx
src/app/services/page.tsx
src/app/technologies/page.tsx
src/app/terms-of-service/page.tsx
```

The reusable primitive lives at `src/components/ui/AnimatedSection.tsx` and **stays untouched** — only its call sites change.

### Planned change

For below-fold sections where AnimatedSection wraps a section header or list, **remove the wrapper** and let content paint visible immediately. Keep AnimatedSection only on:
- Hero scroll-driven parallax (already motion.* not AnimatedSection — no change)
- ProductShowcase cards (one orchestrated entrance)
- One mid-page moment (the team-collaboration photo section)

For all other usages: remove the `<AnimatedSection>` wrapper, keep the children verbatim.

### Revert

```bash
# Per file (if only specific pages regress):
git checkout 7560c6d -- <file-path>

# All files at once:
git checkout 7560c6d -- src/app/
```

---

## Item 5 — Drop footer gradient bar + card-shimmer sweep

**Minor AI tells.** Decorative chrome that adds nothing.

### Files + current code

**`src/components/sections/Footer.tsx:50-57`** (gradient top-border)
```tsx
{/* Gradient top border */}
<div
  className="h-[2px]"
  style={{
    background: "linear-gradient(to right, #208535, #34d058, #06b6d4)",
  }}
/>
```

**`src/app/globals.css:674-695`** (`.card-shimmer` rules)
```css
.card-shimmer {
  position: relative;
  overflow: hidden;
}
.card-shimmer::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    transparent 30%,
    var(--shimmer-highlight) 50%,
    transparent 70%
  );
  transform: translateX(-100%) translateY(-100%);
  transition: none;
  pointer-events: none;
  z-index: 1;
}
.card-shimmer:hover::before {
  animation: shimmer 0.6s ease-out forwards;
}
```
(Reduced-motion override at `globals.css:1216-1217` — disable shimmer under `prefers-reduced-motion`.)

**Component files using `card-shimmer` class:**
- `src/components/ui/Card.tsx`
- `src/components/sections/home/WhyVietnam.tsx`
- `src/components/sections/home/WhyRetech.tsx`
- `src/components/sections/home/SuccessStories.tsx`
- `src/components/sections/home/Testimonials.tsx`

### Planned change

**Footer:** delete the 7-line gradient top-border `<div>`. The footer's `bg-brand-dark` already establishes the surface.

**Card-shimmer:** keep the hover-lift (translate-y + shadow) which is genuine interaction feedback. Drop only the shimmer-sweep pseudo-element (the moving highlight that crawls across the card on hover).

### Revert

```bash
git checkout 7560c6d -- src/components/sections/Footer.tsx src/app/globals.css src/components/ui/Card.tsx src/components/sections/home/WhyVietnam.tsx src/components/sections/home/WhyRetech.tsx src/components/sections/home/SuccessStories.tsx src/components/sections/home/Testimonials.tsx
```

---

## Implementation order (recommended)

1. **Item 1 (gradient headline)** — 5 minutes, single commit. Highest leverage.
2. **Item 2 Stage A (Three.js comment-out)** — 2 minutes, single commit. Easy revert.
3. **Item 5 (footer gradient + card-shimmer)** — 15 minutes. Cosmetic.
4. **Item 3 (glass-card → opaque)** — 30 minutes. Touches 6 files.
5. **Item 4 (halve AnimatedSection)** — 1 hour. Touches 10-15 files.

Each item ships as its own commit so any single item can be reverted without affecting the others.

---

## After implementation

If the result is good, ship to production. If not, run the per-item revert command above and try a different approach.

**Definition of "good":**
- Hero no longer reads as "AI tool template" at first glance
- LCP improves (Three.js deferral removed → ~150KB saved on hero load)
- Cards have crisper edges (no frosted blur on solid backgrounds)
- Page settles after first scroll (no continuous entrance animations)
- Footer still closes the page cleanly without decorative chrome

---

## Baseline metrics (for before/after comparison)

To be captured during implementation:

| Metric | Baseline (pre-revamp) | After revamp | Delta |
|---|---|---|---|
| Hero LCP (mobile, p75) | TBD | TBD | TBD |
| Initial JS bundle (Three.js removed?) | includes three/fiber/drei | TBD | TBD |
| Hero AI-tell count (gradient + orbs) | 2 critical | target 0 | -2 |
| Major AI-tell count | 4 | target ≤1 | TBD |
| Visual rhythm: page settles after scroll | no | target yes | TBD |

---

End of baseline capture.
