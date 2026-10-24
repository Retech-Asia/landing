import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { SiteJsonLd } from "@/components/seo/JsonLd";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ReducedMotionProvider } from "@/components/ui/ReducedMotionProvider";
import { ClientOnlyWidgets } from "@/components/ui/ClientOnlyWidgets";
import { DeferredProviders } from "@/components/ui/DeferredProviders";
import { DeferredPageTransition } from "@/components/ui/DeferredPageTransition";
import { GA4 } from "@/components/ui/GA4";
import { Clarity } from "@/components/ui/Clarity";
import {
  SITE_URL as SITE_URL_CONST,
  SITE_NAME as SITE_NAME_CONST,
  CONTACT,
} from "@/lib/constants";
import { routing, type Locale } from "@/i18n/routing";

import "../globals.css";
import { ConsentAwareAnalytics } from "@/components/ui/Analytics";

// Font system (RT-06, Direction B baseline). Body/UI: Inter. Editorial display
// (h1/h2 + .font-display): Source Serif 4. Both faces ship `vietnamese`
// subsets, so the SAME families serve EN and VI (the old per-locale family
// swap GeneralSans→Be Vietnam Pro / Instrument Serif→Playfair Display, which
// existed because those faces were latin-only, is retired). next/font
// self-hosts both at build time (no runtime Google Fonts requests).
//
// Preload law (perf audit 2026-10-22, RT-06 gate): next/font emits preload
// links for every file of every family instantiated here. With
// ["latin","vietnamese"] on one shared instantiation, EN pages preloaded both
// subsets (~189KB / 6 woff2 on the LCP path, Lighthouse LCP 5.5s). So the
// 2026-08-25 locale-split pattern returns, now split by SUBSET instead of by
// family: EN pages get latin-only instantiations; VI pages get
// latin+vietnamese. All four instantiations run preload:false and fonts are
// discovered via CSS unicode-range (downloaded only for glyphs rendered).
// Why no preloads: with two instantiations per family (EN + VI) the same
// variable name makes next/font emit SEPARATE file copies per instance — the
// preload hrefs hashed to files the CSS never referenced, so EN downloaded
// every face twice (preloaded copy unused + CSS-discovered copy) while the
// font-swap repaint landed late. Discovery-only is the measured-fast path:
// VI (always discovery-only) hit Lighthouse mobile LCP 2.2s / perf 92 with
// the identical hero (2026-10-22). Same CSS variable names in both branches —
// no component or CSS changes needed.
const interEn = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

const sourceSerifEn = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

const interVi = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

const sourceSerifVi = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

const SITE_URL = SITE_URL_CONST;
const SITE_NAME = SITE_NAME_CONST;

function extractBingToken(raw: string): string {
  const trimmed = raw.trim();
  const match = trimmed.match(/content\s*=\s*["']([^"']+)["']/i);
  return match ? match[1].trim() : trimmed;
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#208535",
};

// Prerender both locales statically.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const title = t("title");
  const description = t("description");
  const canonicalEn = `${SITE_URL}/en`;
  const canonicalVi = `${SITE_URL}/vi`;

  // Per-locale canonical: EN canonical at /en, VI canonical at /vi.
  // hreflang is symmetric — every page declares both locales + x-default.
  const isEn = locale === "en";
  const canonical = isEn ? canonicalEn : canonicalVi;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    keywords: t.raw("keywords") as string[],
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical,
      languages: {
        en: canonicalEn,
        vi: canonicalVi,
        "x-default": canonicalEn,
      },
    },
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "vi_VN",
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    verification: {
      ...(process.env.GOOGLE_SITE_VERIFICATION
        ? { google: process.env.GOOGLE_SITE_VERIFICATION }
        : {}),
      other: {
        ...(process.env.BING_SITE_VERIFICATION
          ? { "msvalidate.01": extractBingToken(process.env.BING_SITE_VERIFICATION) }
          : {}),
      },
    },
    category: "technology",
    classification: "IT Services",
    formatDetection: { telephone: false },
    other: {
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "mobile-web-app-capable": "yes",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Runtime guard — any unmatched locale 404s.
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`h-full antialiased ${
        locale === "vi"
          ? `${interVi.variable} ${sourceSerifVi.variable}`
          : `${interEn.variable} ${sourceSerifEn.variable}`
      }`}
    >
      <head>
        <link rel="preconnect" href="https://va.vercel-scripts.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <meta name="apple-mobile-web-app-title" content="Retech Solutions" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Retech Solutions Blog"
          href="/feed.xml"
        />
        <SiteJsonLd locale={locale as Locale} />
        <GA4 />
        <Clarity />
      </head>
      <body
        id="top"
        className="min-h-full flex flex-col bg-background"
        suppressHydrationWarning
      >
        <noscript>
          <div
            style={{
              padding: "32px 20px",
              textAlign: "center",
              fontFamily: "system-ui, sans-serif",
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>
              {SITE_NAME}
            </h1>
            <p style={{ marginBottom: "0.5rem", lineHeight: 1.6 }}>
              {locale === "vi"
                ? "Công ty phát triển phần mềm tại Việt Nam cung cấp các giải pháp CMS, CRM, ERP và tích hợp AI theo yêu cầu."
                : "Vietnam-based software development company delivering custom CMS, CRM, ERP and AI-powered solutions."}
            </p>
            <p style={{ marginBottom: "1rem", lineHeight: 1.6 }}>
              {locale === "vi"
                ? "Vui lòng bật JavaScript để trải nghiệm đầy đủ, hoặc liên hệ trực tiếp:"
                : "Please enable JavaScript for the full interactive experience, or contact us directly:"}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: "0.375rem" }}>
                <strong>{locale === "vi" ? "Email" : "Email"}:</strong>{" "}
                <a href={CONTACT.emailHref} style={{ color: "#208535" }}>
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <strong>{locale === "vi" ? "Website" : "Website"}:</strong>{" "}
                <a href={SITE_URL} style={{ color: "#208535" }}>
                  retech.asia
                </a>
              </li>
            </ul>
          </div>
        </noscript>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[var(--z-navbar)] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-brand focus:text-white focus:outline-none"
        >
          {locale === "vi" ? "Bỏ qua tới nội dung chính" : "Skip to main content"}
        </a>
        <NextIntlClientProvider messages={messages}>
          <ReducedMotionProvider>
            <ClientOnlyWidgets />
            <DeferredProviders />
            <header role="banner">
              <Navbar />
            </header>
            <main id="main-content" className="flex-1 overflow-x-clip">
              <DeferredPageTransition>{children}</DeferredPageTransition>
            </main>
            <Footer />
          </ReducedMotionProvider>
          <ConsentAwareAnalytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
