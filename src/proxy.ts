import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { PROD_HOSTS } from "./lib/constants";
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
 *  - Public assets (`/images`, `/fonts`, `/retech-glass` kit SVGs)
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
/**
 * next-intl emits the HTTP `Link: rel="alternate"` header with x-default
 * pointing at the UN-prefixed default-locale path (e.g. `https://…/` for the
 * root). Under `localePrefix: "always"` that bare path is a 308 redirect, not
 * a page — while the HTML hreflang and the sitemap both declare x-default =
 * the /en URL. Google reads all three signals, so the header must agree:
 * rewrite any x-default entry whose path lacks a locale prefix onto `/en`.
 * (Search Console "Page with redirect" round, 2026-10-26.)
 */
function withFixedXDefault<T extends { headers: Headers }>(response: T): T {
  const link = response.headers.get("link");
  const match = link?.match(
    /<([^>]+)>;\s*rel="alternate";\s*hreflang="x-default"/,
  );
  if (!match) return response;
  try {
    const url = new URL(match[1]);
    if (/^\/(en|vi)(\/|$)/.test(url.pathname)) return response;
    url.pathname = `/en${url.pathname === "/" ? "" : url.pathname}`;
    response.headers.set(
      "link",
      link!.replace(
        match[0],
        `<${url.toString()}>; rel="alternate"; hreflang="x-default"`,
      ),
    );
  } catch {
    // Malformed header from next-intl — leave it untouched.
  }
  return response;
}

export default function proxy(request: NextRequest) {
  const response = intlMiddleware(request);

  // Non-prod hosts must never be indexed. The `X-Robots-Tag` header wins
  // over the `index, follow` meta in the HTML (most restrictive directive
  // applies) and is honored on page responses AND the 308 locale redirects
  // — the robots.txt `Disallow: /` alone can't de-index a URL that gets
  // linked from elsewhere (Google would list it URL-only, never crawling
  // to see the canonical). Staging noindex round, 2026-10-26.
  const host = (request.headers.get("host") || "").toLowerCase();
  if (!PROD_HOSTS.has(host)) {
    response.headers.set("x-robots-tag", "noindex");
  }

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
      return withFixedXDefault(permanent);
    }
  }
  return withFixedXDefault(response);
}

export const config = {
  // Skip Next internals, API, static files, and known root metadata routes.
  matcher: [
    "/((?!_next|_vercel|api|images|fonts|retech-glass|sitemap\\.xml|robots\\.txt|manifest\\.webmanifest|feed\\.xml|icon|apple-icon|opengraph-image|favicon).*)",
  ],
};
