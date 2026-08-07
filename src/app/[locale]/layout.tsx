import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Instrument_Serif } from "next/font/google";
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
import {
  SITE_URL as SITE_URL_CONST,
  SITE_NAME as SITE_NAME_CONST,
  CONTACT,
} from "@/lib/constants";
import { routing, type Locale } from "@/i18n/routing";

import "../globals.css";
import { ConsentAwareAnalytics } from "@/components/ui/Analytics";

// Font system — see notes in original layout. Body: General Sans (self-hosted).
// Display headlines: Instrument Serif (one woff2 via next/font/google).
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  adjustFontFallback: true,
});

const generalSans = localFont({
  src: [
    { path: "../../../public/fonts/general-sans-400.woff2", weight: "400", style: "normal" },
    { path: "../../../public/fonts/general-sans-500.woff2", weight: "500", style: "normal" },
    { path: "../../../public/fonts/general-sans-600.woff2", weight: "600", style: "normal" },
    { path: "../../../public/fonts/general-sans-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "swap",
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
      className={`${generalSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
