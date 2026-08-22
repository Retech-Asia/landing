import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/**
 * Locale negotiation proxy (Next.js 16 `proxy` file convention, the
 * successor of `middleware.ts`). Runs on every navigable request.
 *
 * Matcher excludes:
 *  - Next internals (`/_next`, `/_vercel`)
 *  - API handlers (`/api`)
 *  - Static metadata files at the root (`sitemap.xml`, `robots.txt`,
 *    `manifest.webmanifest`, `feed.xml`, favicon files,
 *    `opengraph-image` for the root)
 *  - File-convention icon routes. Next serves `apple-icon.tsx` /
 *    `icon.svg` at their literal paths (`/apple-icon`, `/icon.svg`) —
 *    matched WITHOUT extension so the proxy doesn't 307 them to
 *    `/en/apple-icon` (which 404s, since the route files live outside
 *    `[locale]`).
 *  - Public assets (`/images`, `/fonts`)
 *
 * `localeDetection: false` in routing.ts means we never auto-redirect on
 * Accept-Language; the proxy only handles `/` → `/en` and `/en/...` ↔
 * `/vi/...` path resolution.
 *
 * next-intl issues its prefix redirects as 307 (temporary) — its API offers
 * no status override. These redirects are permanent by nature (the `/en` +
 * `/vi` prefix structure is the canonical URL shape, and legacy backlinks
 * pointing at unprefixed paths like `/about` should pass full SEO juice).
 * So we upgrade any redirect next-intl returns to a 308 before sending it.
 */
export default function proxy(request: NextRequest) {
  const response = intlMiddleware(request);

  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("location");
    if (location) {
      const permanent = NextResponse.redirect(
        new URL(location, request.url),
        308,
      );
      // Preserve headers next-intl set on its response (Set-Cookie for
      // NEXT_LOCALE, Link alternates) — only the status changes.
      response.headers.forEach((value, key) => {
        if (key !== "location") permanent.headers.set(key, value);
      });
      return permanent;
    }
  }
  return response;
}

export const config = {
  // Skip Next internals, API, static files, and known root metadata routes.
  matcher: [
    "/((?!_next|_vercel|api|images|fonts|sitemap\\.xml|robots\\.txt|manifest\\.webmanifest|feed\\.xml|icon|apple-icon|opengraph-image|favicon).*)",
  ],
};
