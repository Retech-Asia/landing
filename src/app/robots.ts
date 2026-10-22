import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
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
      // OAI-SearchBot is the search crawler (was previously covered only by
      // the wildcard rule); GPTBot is the training crawler and its existing
      // access policy is preserved. Rendering assets under /_next/static and
      // /_next/image must stay crawlable or pages can't render for crawlers.
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
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
