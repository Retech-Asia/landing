import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Explicit rule for Bingbot — ensures full crawl access for
      // Bing Webmaster Tools + CoPilot/ChatGPT search indexing.
      {
        userAgent: "bingbot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/_vercel"],
      },
      {
        userAgent: "BingPreview",
        allow: "/",
        disallow: ["/api/", "/_next/", "/_vercel"],
      },
      // Open AI crawlers (ChatGPT search, etc.) — explicitly welcomed,
      // but still disallowed from internal/api/static-asset paths so they
      // don't waste crawl budget on non-content routes.
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/_vercel"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/_next/", "/_vercel"],
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/_vercel"],
      },
      // Default — everything else.
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/_vercel"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
