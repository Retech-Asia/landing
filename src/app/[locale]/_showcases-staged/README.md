# Staged showcase routes (router-ignored)

`_`-prefixed directories are excluded from the Next.js App Router, so these
pages are compiled/typechecked but NOT routed — `/en/showcases` and children
do not exist while the registry in `src/lib/showcases/registry.ts` is empty.

Why staged instead of routed-with-notFound(): on 2026-10-25 a prerendered
static route with `notFound()` in the body produced a soft-404 (not-found UI
under HTTP 200) on this Next 16 build. Rather than fight streaming semantics,
the routes stay out of the router until they have real content — the same
"never ship an empty surface" rule as the mock-labeling law.

## To activate (Wave 1C, once the ChatGPT creative handoff lands)

1. `mv "src/app/[locale]/_showcases-staged/showcases" "src/app/[locale]/showcases"`
   and delete this README.
2. Register the showcase definition in `src/lib/showcases/registry.ts` and
   view components in `src/components/showcases/view-registry.tsx`.
3. Wire sitemap entries (EN + VI, hreflang alternates) in `src/app/sitemap.ts`.
4. Verify: build, then curl `/en/showcases` (200 + ConceptDemoLabel present),
   unknown product/view slugs (genuine 404 status), and `/vi/...` parity.
