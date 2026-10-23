import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-dynamic";

/**
 * Host-aware robots.txt (deployment split, 2026-10-23).
 *
 * Production hosts (retech.asia) get the full crawl rules. Everything else
 * — the staging domain, *.vercel.app preview and branch deployments — gets
 * `Disallow: /` with no sitemap, so a push to `main` (the staging branch
 * since the Vercel production branch moved to `prod`) can never get
 * crawled or indexed.
 *
 * Second line of defense alongside canonicals, which already point every
 * page at www.retech.asia regardless of serving host.
 */

const PROD_HOSTS = new Set(["retech.asia", "www.retech.asia"]);

const CRAWL_RULES = [
  // Explicit rule for Bingbot — ensures full crawl access for
  // Bing Webmaster Tools + CoPilot/ChatGPT search indexing.
  {
    userAgent: "bingbot",
    allow: ["/", "/_next/static/", "/_next/image"],
    disallow: ["/api/", "/_next/", "/_vercel"],
  },
  {
    userAgent: "BingPreview",
    allow: ["/", "/_next/static/", "/_next/image"],
    disallow: ["/api/", "/_next/", "/_vercel"],
  },
  // OpenAI crawlers (ChatGPT search, etc.) — explicitly welcomed.
  // OAI-SearchBot is the search crawler; GPTBot is the training crawler.
  // Rendering assets under /_next/static and /_next/image must stay
  // crawlable or pages can't render for crawlers.
  {
    userAgent: "OAI-SearchBot",
    allow: ["/", "/_next/static/", "/_next/image"],
    disallow: ["/api/", "/_next/", "/_vercel"],
  },
  {
    userAgent: "GPTBot",
    allow: ["/", "/_next/static/", "/_next/image"],
    disallow: ["/api/", "/_next/", "/_vercel"],
  },
  {
    userAgent: "ChatGPT-User",
    allow: ["/", "/_next/static/", "/_next/image"],
    disallow: ["/api/", "/_next/", "/_vercel"],
  },
  {
    userAgent: "CCBot",
    allow: ["/", "/_next/static/", "/_next/image"],
    disallow: ["/api/", "/_next/", "/_vercel"],
  },
  // Default — everything else (incl. Googlebot).
  {
    userAgent: "*",
    allow: ["/", "/_next/static/", "/_next/image"],
    disallow: ["/api/", "/_next/", "/_vercel"],
  },
];

function renderRules(): string {
  const lines: string[] = [];
  for (const rule of CRAWL_RULES) {
    lines.push(`User-agent: ${rule.userAgent}`);
    for (const a of rule.allow) lines.push(`Allow: ${a}`);
    for (const d of rule.disallow) lines.push(`Disallow: ${d}`);
    lines.push("");
  }
  lines.push(`Sitemap: ${SITE_URL}/sitemap.xml`);
  return lines.join("\n");
}

export function GET(request: Request): Response {
  const host = (request.headers.get("host") || "").toLowerCase();
  const isProd = PROD_HOSTS.has(host);

  const body = isProd
    ? renderRules()
    : "User-agent: *\nDisallow: /\n";

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": isProd ? "all" : "noindex",
    },
  });
}
