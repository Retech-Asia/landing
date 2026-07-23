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
      // Open AI crawlers (ChatGPT search, etc.) — explicitly welcomed.
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "CCBot",
        allow: "/",
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
