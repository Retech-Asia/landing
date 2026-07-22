# Design System

Visual identity, tokens, and asset conventions for the Retech Solutions site.

## Brand colour tokens

Defined as CSS custom properties in `src/app/globals.css`. Use these — never raw hex.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--brand` | `#208535` | `#2EA043` | Primary actions, links, accents |
| `--brand-dark` | `#186B2B` | `#238636` | Hover states |
| `--brand-light` | `#2EA043` | `#3FB950` | Active states |
| `--accent-cyan` | `#06b6d4` | `#22D3EE` | Gradient stops, secondary accents |
| `--accent-violet` | `#8b5cf6` | `#A78BFA` | Gradient stops, tertiary accents |
| `--foreground` | near-black | near-white | Body text |
| `--foreground-secondary` | `#525252` | `#A3A3A3` | Subhead, supporting copy |
| `--foreground-muted` | `#737373` | `#737373` | Captions, meta text |
| `--background` | `#FAFAF8` | `#0A0A0A` | Page background |
| `--background-subtle` | `#F5F5F4` | `#171717` | Card surfaces, inset blocks |

Tailwind classes: `bg-brand`, `text-brand`, `text-foreground-secondary`, etc. don't write `text-[#208535]`.

## Gradient usage

- **Brand gradient**: `linear-gradient(90deg, #208535, #06b6d4)` — primary accents, progress bars.
- **Triple gradient**: `linear-gradient(to right, #208535, #34d058, #06b6d4)` — footer top border.
- **Mesh blobs** (hero background): 5 layered radial-gradients with blur — see Hero.tsx layer 4.
- Don't use gradients as background for text containers without a solid fallback — readability first.

## Typography

- **Sans**: Geist Sans (`--font-geist-sans`) via `next/font/google` — body, headings, UI.
- **Mono**: Geist Mono (`--font-geist-mono`) — accents, code, stats if emphasised.

### Type scale (Tailwind defaults)

| Use | Class | Size |
|---|---|---|
| Hero H1 | `text-4xl sm:text-5xl md:text-6xl lg:text-7xl` | responsive |
| Page H2 | `text-3xl md:text-4xl` | responsive |
| Section H2 | `text-2xl md:text-3xl` | responsive |
| Card H3 | `text-xl` | 20px |
| Body L | `text-lg` | 18px |
| Body | `text-base` | 16px |
| Small | `text-sm` | 14px |
| Micro | `text-xs` | 12px |

### Font weights

- Headings: `font-bold` (700) or `font-semibold` (600)
- Body: default (400)
- Buttons/labels: `font-medium` (500)

### Line heights

- Headlines: `leading-[1.1]` + `tracking-tight` + `text-balance`
- Body: `leading-relaxed` (1.625)
- Tight copy: `leading-snug` (1.375)

## Spacing & layout

- **Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Section vertical rhythm**: `py-20 md:py-28` major, `py-14` compact
- **Grid gaps**: `gap-6 md:gap-8`
- **Card padding**: `p-6 md:p-8` standard, `p-5` compact

## Border radius

- `rounded-full` — buttons, pills, badges
- `rounded-2xl` — cards, panels
- `rounded-xl` — inset elements (badges, tags)
- `rounded-lg` — images inside cards

## Shadows

Don't invent ad-hoc box-shadows. Use:
- Cards: `shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]` (default) → `shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)]` on hover
- Buttons (primary): `hover:shadow-[0_4px_20px_rgba(32,133,53,0.25)]`

## Glassmorphism card spec

```css
background: rgba(255, 255, 255, 0.7);     /* or theme-aware via --card-bg */
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.2);
```
Tailwind: `bg-card-bg border border-card-border backdrop-blur-md`. Hover adds `.card-shimmer` for the moving highlight.

## Logo treatment

- **Navbar**: `public/images/og-image.png` rendered via `next/image` at `h-8 sm:h-9 md:h-10 w-auto` (natural aspect 8.2:1). No plain-text company name alongside.
- **Footer**: same `og-image.png` at `h-6 md:h-7 w-auto`.
- **Favicon / icon**: `src/app/icon.tsx` and `src/app/apple-icon.tsx` (generated).
- **OG image (social share)**: `src/app/opengraph-image.tsx` (default) + per-route overrides for blog/services/case-studies.

Decision history: Jay explicitly chose `og-image.png` over `logo.svg` for the navbar — see project memory.

## Image conventions

- All images live in `public/images/`. Nothing in repo root.
- Subfolders:
  - `public/images/partners/` — partner logo SVGs (AWS, Shopify, etc.)
  - `public/images/tech/` — tech stack SVGs
- Case study images prefixed by project: `wellness-dashboard.png`, `asset-mgmt-dashboard.png` (NOT client brand names).
- Always use `<Image>` from `next/image` — never raw `<img>` (the only exceptions are documented with `eslint-disable`).
- Provide `width`, `height`, `alt`, and `sizes` for responsive images.
- For lazy-loaded below-fold images, use `loading="lazy"` (default) and a `BLUR_DATA_URL` placeholder from `@/lib/image-placeholders`.

## Iconography

- **Lucide React** for all UI icons.
- Import the `LucideIcon` type when typing icon props: `icon: LucideIcon` (NOT `React.ElementType` — causes `never` prop inference under React 19 strict types).
- Standard icon sizes: `size={14}` inline text, `size={20}` buttons, `size={28}` feature cards.

## Theme system

- Light + dark mode with `prefers-color-scheme` detection.
- Theme toggle in `<ThemeToggle>` (mounted-state guarded to avoid hydration mismatch).
- Token override happens in `globals.css` via `:root` and `.dark` selectors.
- Never hard-code colours that don't have a dark-mode counterpart.

## What NOT to introduce

- New CSS frameworks (we use Tailwind v4 only).
- New icon libraries (Lucide only).
- New font families (Geist Sans + Geist Mono only).
- New colour values outside the token set.
- Heavy dependencies for things achievable with framer-motion + Tailwind.
