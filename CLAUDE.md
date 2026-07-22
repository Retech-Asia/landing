# Retech Solutions Website

## Internal documentation (read these first)

Before any UI/UX, design, or content change, consult the relevant doc:

- **[`docs/ui-ux-guidelines.md`](docs/ui-ux-guidelines.md)** — layout primitives, component inventory, animation rules, accessibility requirements, "what done looks like" checklist
- **[`docs/design-system.md`](docs/design-system.md)** — colour tokens, typography, spacing, shadows, logo treatment, image conventions, theme system
- **[`docs/content-guidelines.md`](docs/content-guidelines.md)** — tone of voice, source of truth (Wix), banned superlatives, case-study naming, stat consistency, button labels
- **[`CUTOVER.md`](CUTOVER.md)** — Wix→Vercel migration runbook (DNS cutover checklist, GBP preservation, rollback plan)

These are the canonical reference for consistency. If a doc contradicts something in CLAUDE.md, the doc wins.

## Project Overview
Next.js website for Retech Solutions (retech.asia) — an IT outsourcing company based in Vietnam specializing in custom software development, CMS/CRM/ERP solutions, and AI-powered digital products. The site has 111+ statically generated pages covering services, industries, case studies, blog, careers, and more.

## Tech Stack
- **Framework:** Next.js 16 (App Router, TypeScript, Turbopack)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Smooth Scrolling:** Lenis
- **Icons:** Lucide React
- **Fonts:** Geist Sans + Geist Mono (via next/font/google)

## Project Structure
```
src/
  app/                          → Routes, layout, global styles
    about/                      → About page (+ loading.tsx skeleton)
    blog/                       → Blog listing + [slug] posts + category/[category] (+ loading.tsx)
    careers/                    → Careers listing (+ loading.tsx)
    case-studies/               → Case studies listing + [slug] detail (+ loading.tsx)
    contact/                    → Contact page with form and project estimator (+ loading.tsx)
    faq/                        → FAQ accordion page (+ loading.tsx)
    industries/                 → Industry listing + [slug] detail (+ loading.tsx)
    process/                    → Development process page (+ loading.tsx)
    services/                   → Services listing + [slug] detail (+ loading.tsx)
    technologies/               → Tech stack showcase (+ loading.tsx)
    privacy-policy/             → Privacy policy
    terms-of-service/           → Terms of service
    feed.xml/                   → RSS feed (route.ts)
    api/                        → Analytics and health check API routes
    loading.tsx                 → Root loading skeleton (hero, stats, service cards)
    error.tsx                   → Error boundary
    global-error.tsx            → Global error boundary
    not-found.tsx               → 404 page
    opengraph-image.tsx         → Default OG image generation
    manifest.ts, robots.ts, sitemap.ts, icon.tsx, apple-icon.tsx
  components/
    ui/                         → 50 reusable UI primitives (see below)
    sections/                   → Navbar, Footer, 14 home page sections
      home/                     → Hero, StatsBar, ServicePreview, ProductShowcase, TechStack,
                                → Testimonials, SuccessStories, TrustedBy, Partners, WhyRetech,
                                → WhyVietnam, HomeFAQ, MidPageCTA, HomeCTA
    about/                      → ParallaxHero, AnimatedTimeline, LeadershipTeam, CultureValues,
                                → WhatSetsUsApart, GlobalReach, OurCommitment, ParallaxDivider
    blog/                       → FeedbackWidget, RelatedServicesSidebar, ShareButtons
    case-studies/               → AnimatedMetrics, BeforeAfter, ProjectTimeline
    seo/                        → JsonLd, BreadcrumbJsonLd
    services/                   → ServiceHeroIcon, ServiceTOC, ServiceTimeline, TechBadges,
                                → AnimatedChecklist
  hooks/                        → usePrefersReducedMotion, useScrollProgress
  lib/                          → Data files and utilities
                                → cn, constants, navigation, blog-data, careers-data,
                                → case-studies-data, industries-data, services-data,
                                → faq-data, testimonials-data, analytics, cookie-consent,
                                → error-report, image-placeholders, render-content
public/images/                  → Static assets
```

## Design System
- **Theme:** Light and dark mode with system preference detection; CSS custom properties for tokens
- **Brand color:** Green (#208535) with light (#2EA043) and dark (#186B2B) variants
- **Accent colors:** Cyan (#06b6d4) and violet (#8b5cf6) for gradients and highlights
- **Cards:** Glassmorphism (backdrop-blur, semi-transparent borders) with `.card-shimmer` hover effect
- **Typography:** Geist Sans for headings/body, Geist Mono for accents
- **Animations:** Framer Motion — fade-in, slide-up, scale, stagger children
- **Skeleton loading:** Custom `<Skeleton>` component with shimmer keyframe animation; page-level `loading.tsx` on 11 routes
- **Smooth scroll:** Lenis for polished scroll behavior
- **Scrollbar:** Styled thin scrollbar with theme-aware `scrollbar-color`
- **Layout:** Full-width sections, max-w-7xl content, responsive grid
- **Core UI components:** AnimatedSection, Card, Button, Container, SectionHeader, PageHero, Skeleton

## Key Pages
- **/** — Homepage with hero, stats, services preview, testimonials, CTA
- **/about** — Company story, timeline, leadership, culture
- **/services** & **/services/[slug]** — Service listing and detail pages (CMS, CRM, ERP, etc.)
- **/industries** & **/industries/[slug]** — Industry verticals
- **/case-studies** & **/case-studies/[slug]** — Project showcases (Signsbeat, Dune)
- **/blog** & **/blog/[slug]** & **/blog/category/[category]** — Blog with 29 posts
- **/careers** — Job listings
- **/contact** — Contact form with project estimator
- **/technologies** — Tech stack showcase
- **/process** — Development process
- **/faq** — FAQ page
- **/feed.xml** — RSS feed

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — ESLint check

## Code Quality Notes
- **Import order:** React/Next -> third-party -> local components -> local utilities
- **Hydration safety:** Client components use mounted-state guards (`useMounted` pattern) for theme-dependent rendering (ThemeToggle, CookieConsent, etc.)
- **Progress bars:** Use `scaleX` with `transform-origin: left` (not width animation) for GPU-accelerated progress indicators (ScrollProgress, ReadingProgress)
- **Shared hooks:** `usePrefersReducedMotion` in `src/hooks/` — used by CursorSpotlight, NoiseOverlay, CountUp
- **Lazy loading:** Heavy below-fold components use `next/dynamic` with skeleton fallbacks
- **Loading skeletons:** 11 routes have dedicated `loading.tsx` files using the `<Skeleton>` component
- **SEO:** All pages have proper metadata, dynamic Open Graph images (4 routes), JSON-LD structured data, RSS feed, sitemap, and robots.txt
- **Error handling:** `error.tsx`, `global-error.tsx`, and `not-found.tsx` boundary pages
- **Performance:** 111+ static pages, optimized images, lazy-loaded sections
- **Analytics:** Consent-aware analytics with cookie consent banner (GA4/Vercel Analytics integration)

## Skills & Mindset
- **Internet-first:** Always search the web for the latest best practices before implementing
- **High-quality bar:** Research before coding — understand the "why" behind every pattern
- **Iterative refinement:** Build, test visually, refine animations and copy
- **Performance matters:** Optimize images, lazy-load below-fold content, minimize JS
- **Copy accuracy:** All company info, product descriptions, and services text must match retech.asia source
