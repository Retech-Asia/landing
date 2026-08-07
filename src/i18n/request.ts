import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

/**
 * Server-side message loader. Called once per request (and at SSG build time
 * per locale). Messages live in `src/messages/<locale>.json` and are flat
 * namespaced (nav.*, hero.*, services.*, etc.).
 *
 * Adding a locale: drop a new JSON file alongside `en.json` / `vi.json` and
 * add the code to `routing.locales`.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = routing.locales.includes(requested as Locale)
    ? (requested as Locale)
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
