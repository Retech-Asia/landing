# UI/UX Guidelines

Operational rules for layout, components, interactions, and accessibility on the Retech Solutions site. Read before touching any component or page.

## Layout primitives

- **`<Container>`** — wraps all page content. `max-w-7xl` with responsive padding (`px-4 sm:px-6 lg:px-8`). Never use raw `<div className="max-w-7xl">` — go through Container so padding is consistent.
- **`<SectionDivider>`** — between every home-page section. Variants: `default`, `subtle`. Don't invent new dividers.
- **Section rhythm** — vertical padding `py-20 md:py-28` for major sections; `py-14` for compact ones (newsletter strips, mid-page CTAs).
- **Full-width sections** are allowed for visual impact (Hero, StatsBar). Inner content still constrained by Container.

## Component inventory (use these — don't reinvent)

| Need | Use |
|---|---|
| Card surface | `<Card>` with `hover` + `padding` props |
| Primary/secondary CTA | `<Button>` with `variant` + `size` |
| Section heading + subtitle | `<SectionHeader>` |
| Page header | `<PageHero>` |
| Reveal on scroll | `<AnimatedSection variant="slideUp|slideLeft|slideRight|fade">` |
| Staggered grids | `<StaggerContainer>` + `<StaggerItem>` |
| Stat counter | `<AnimatedCounter>` (lands exactly on target value) |
| Tooltip | `<Tooltip>` |
| Form field | `<FormField>` |

If you need a new variant of an existing component, extend the component. Don't fork it.

## Interaction patterns (established — keep consistent)

- **Primary CTAs** in Hero and final CTA sections use `<Magnetic strength={5-6}>` wrapper for magnetic hover.
- **Case study cards** use `<TiltCard maxRotate={4}>` + `<SpotlightCard className="spotlight-hover">` together.
- **Service cards** on `/services` use the inline tilt implementation in `ServicePreview.tsx` — don't replace with a different tilt.
- **Magnetic, SpotlightCard, TiltCard** all respect `prefers-reduced-motion` and skip on touch pointers automatically. New interaction wrappers must do the same.

## Animation rules (non-negotiable)

1. **`prefers-reduced-motion: reduce`** MUST be respected by every animated component. Import `usePrefersReducedMotion` from `@/hooks/usePrefersReducedMotion` and short-circuit the animation when true.
2. **Transform/opacity only** — never animate `width`, `height`, `top`, `left`, `margin`, `padding`. Use `transform: translate/scale/rotate` and `opacity`. GPU-only.
3. **Progress bars** — the navbar already renders one (`Navbar.tsx` ~line 307) that hides with the navbar. Do NOT mount additional global progress bars. Blog posts use `<ReadingProgress>` only.
4. **Lazy-load below-fold heavy components** via `next/dynamic` with a `<Skeleton>` fallback.
5. **Stagger entrance animations** — use `staggerChildren: 0.1` or similar; don't fire all items at once.
6. **Framer Motion springs** — prefer `stiffness: 200, damping: 20` for hover; `stiffness: 100, damping: 30` for scroll-linked.

## Accessibility

- **Every interactive element must have a visible focus state.** Use Tailwind's `focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2`. Test by tabbing through the page.
- **Decorative icons** get `aria-hidden="true"`. **Number badges** in accordions get `aria-hidden="true"` (otherwise screen readers read "01Question text").
- **Form inputs** must have associated `<label>` (FormField component handles this). Never use bare `<input>`.
- **Buttons/links must have functional destinations** — no `href="#"`, no `javascript:void(0)`, no `onClick={(e) => e.preventDefault()}`. If there's no destination, the button shouldn't exist.
- **Alt text on images** must describe the content, not the file: `alt="Wellness Platform dashboard showing health metrics"` not `alt="dashboard"`.
- **Skip-link** to `#main-content` exists at `layout.tsx` — every page must have `<main id="main-content">`.
- **Colour contrast** — text on background must pass WCAG AA. Brand green on white passes; brand green on white/80 backdrop may not.
- **`lang` attribute** — set in `<html lang="en">`.

## Layout don'ts

- Don't create overlapping `fixed` elements at the same edge without coordinating `z-index` (caused the original progress-bar bug).
- Don't put two animation systems on the same element (e.g. Lenis + `window.scrollTo` — use `getLenis().scrollTo()`).
- Don't render the same UI twice (e.g. two progress bars).
- Don't apply `transform` to a parent of a `position: fixed` child — the child stops being truly fixed.

## Responsive breakpoints

Tailwind defaults: `sm 640, md 768, lg 1024, xl 1280, 2xl 1536`.

- Test every layout at **375px** (iPhone SE), **768px** (tablet), **1440px** (desktop).
- Mobile menu (`isMobileOpen`) must close on route change.
- Hide desktop-only decoration on mobile — heavy 3D / parallax can stay but should respect reduced-motion.

## What "done" looks like

A UI change is ready to merge when:
1. `npx tsc --noEmit` passes
2. `npm run build` passes
3. Console shows 0 errors on the affected route
4. The page is keyboard-navigable (tab through it)
5. The page renders correctly at 375 / 768 / 1440 widths
6. Animation respects `prefers-reduced-motion` (verify via DevTools rendering panel)
