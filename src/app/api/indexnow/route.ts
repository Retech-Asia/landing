import { NextRequest, NextResponse } from "next/server";
import { pingIndexNow, getIndexNowKey } from "@/lib/indexnow";

// Always run on Node (not Edge) so we can call fetch with no time limits.
export const runtime = "nodejs";
// Allow cached POST — IndexNow should be idempotent and resilient.
export const dynamic = "force-dynamic";

/**
 * POST /api/indexnow
 * Body: { urls?: string[], sitemap?: boolean }
 *
 * - If `urls` provided: ping IndexNow with that exact list.
 * - If `sitemap: true`: ping IndexNow pointing at the sitemap (single URL
 *   pointing to /sitemap.xml — Bing will then fetch + process it).
 * - Empty body: ping the homepage only (smoke-test mode).
 *
 * Auth: shared-secret token via `x-indexnow-token` header matching
 * process.env.INDEXNOW_PING_TOKEN. Without this, anyone could drain
 * quota by hitting the endpoint.
 */
export async function POST(req: NextRequest) {
  const expectedToken = process.env.INDEXNOW_PING_TOKEN;
  if (expectedToken) {
    const received = req.headers.get("x-indexnow-token");
    if (received !== expectedToken) {
      return NextResponse.json(
        { ok: false, error: "unauthorized" },
        { status: 401 }
      );
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.retech.asia";

  let body: { urls?: string[]; sitemap?: boolean } = {};
  try {
    const text = await req.text();
    if (text) body = JSON.parse(text);
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid-json" },
      { status: 400 }
    );
  }

  let urls: string[];
  if (body.urls && Array.isArray(body.urls) && body.urls.length > 0) {
    // Sanitize — only accept URLs on our own host (prevent open-redirect abuse).
    const ourHost = new URL(siteUrl).host;
    urls = body.urls
      .filter((u) => {
        try {
          const parsed = new URL(u);
          return parsed.host === ourHost;
        } catch {
          return false;
        }
      })
      .slice(0, 10000);
  } else if (body.sitemap) {
    urls = [`${siteUrl}/sitemap.xml`];
  } else {
    urls = [siteUrl];
  }

  if (urls.length === 0) {
    return NextResponse.json(
      { ok: false, error: "no-valid-urls" },
      { status: 400 }
    );
  }

  const result = await pingIndexNow(urls);
  return NextResponse.json({ ...result, urls }, { status: result.ok ? 200 : 502 });
}

/**
 * GET /api/indexnow — smoke test. Returns the key location without pinging.
 * Useful for verifying setup from Bing Webmaster Tools.
 */
export async function GET() {
  const key = getIndexNowKey();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.retech.asia";
  return NextResponse.json({
    ok: true,
    keyLocation: `${siteUrl}/${key}.txt`,
    keyPrefix: key.slice(0, 8) + "…",
    endpoint: "/api/indexnow",
    docs: "https://www.indexnow.org/documentation",
  });
}
