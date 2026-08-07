import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Locale negotiation middleware. Runs on every navigable request.
 *
 * Matcher excludes:
 *  - Next internals (`/_next`, `/_vercel`)
 *  - API handlers (`/api`)
 *  - Static metadata files at the root (`sitemap.xml`, `robots.txt`,
 *    `manifest.webmanifest`, `feed.xml`, `icon.svg`, favicon files,
 *    `opengraph-image` for the root)
 *  - Public assets (`/images`, `/fonts`)
 *
 * `localeDetection: false` in routing.ts means we never auto-redirect on
 * Accept-Language; the middleware only handles `/` → `/en` and `/en/...` ↔
 * `/vi/...` path resolution.
 */
export default createMiddleware(routing);

export const config = {
  // Skip Next internals, API, static files, and known root metadata routes.
  matcher: [
    "/((?!_next|_vercel|api|images|fonts|sitemap\\.xml|robots\\.txt|manifest\\.webmanifest|feed\\.xml|icon\\.svg|icon\\.png|apple-icon\\.png|opengraph-image|favicon).*)",
  ],
};
