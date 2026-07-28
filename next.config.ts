import type { NextConfig } from "next";
import { WIX_REDIRECTS, INTERNAL_REDIRECTS } from "./src/lib/wix-redirect-map";

const nextConfig: NextConfig = {
  images: {
    // AVIF first = best compression + quality. WebP fallback for older browsers.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Allow opting into higher-quality variants per-image (default stays 75).
    // Use <Image quality={90} /> for hero/feature images where visual fidelity
    // matters more than byte size (case study dashboards, hero stock photos).
    qualities: [75, 85, 90],
    // All images are static (under /public/images/). They never change between
    // deploys, so cache aggressively — 1 day instead of the default 60s.
    minimumCacheTTL: 86400,
  },

  // Enable stricter compression for better Core Web Vitals
  compress: true,

  // 308 (permanent) redirects from legacy Wix URLs -> new Next.js paths.
  // Critical for SEO continuity during the Wix -> Vercel migration.
  // Source: https://www.retech.asia/sitemap.xml (captured 2026-07-20).
  async redirects() {
    return [...WIX_REDIRECTS, ...INTERNAL_REDIRECTS].map((r) => ({
      source: r.source,
      destination: r.destination,
      permanent: r.permanent,
    }));
  },

  // Security headers and caching for SEO
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // When NEXT_PUBLIC_GA_MEASUREMENT_ID is set, allow Google's
              // gtag.js loader + GA4 collection endpoints. Otherwise the
              // policy stays stricter (no third-party script origins).
              ...(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
                ? [
                    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://www.googletagmanager.com",
                    "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com",
                  ]
                : [
                    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
                    "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
                  ]),
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob:",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self' mailto:",
            ].join("; "),
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache font files
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
