import { defineRouting } from "next-intl/routing";

/**
 * Locale routing for retech.asia.
 *
 * Pattern: `/en/...` + `/vi/...` (localePrefix: "always"). Root `/` is 308'd
 * to `/en` by the middleware. Existing backlinks pointing at `/about` etc.
 * are handled by `INTERNAL_REDIRECTS` in `next.config.ts`, which we've updated
 * to point at `/en/...` directly (single hop).
 *
 * Adding a locale: append to `locales` and to `src/messages/<locale>.json`.
 * Remove the `as-needed` temptation — we committed to prefix-both for clean
 * symmetric hreflang.
 */
export const routing = defineRouting({
  locales: ["en", "vi"],
  defaultLocale: "en",
  localePrefix: "always",
  // Don't auto-redirect based on Accept-Language — let users land where they
  // linked. Avoids surprising redirects for English-speaking VN visitors and
  // keeps crawl behaviour predictable.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;
