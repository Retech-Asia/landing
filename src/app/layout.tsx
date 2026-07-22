import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteJsonLd } from "@/components/seo/JsonLd";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { ReducedMotionProvider } from "@/components/ui/ReducedMotionProvider";
import { ClientOnlyWidgets } from "@/components/ui/ClientOnlyWidgets";
import { DeferredProviders } from "@/components/ui/DeferredProviders";
import { DeferredPageTransition } from "@/components/ui/DeferredPageTransition";
import { SITE_URL as SITE_URL_CONST, SITE_NAME as SITE_NAME_CONST, CONTACT } from "@/lib/constants";

import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const SITE_URL = SITE_URL_CONST;
const SITE_NAME = SITE_NAME_CONST;
const SITE_DESCRIPTION =
  "Vietnam-based software development company delivering custom CMS, CRM, ERP & AI-powered solutions. Free consultation.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#208535",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "Retech Solutions | Software Development & IT Outsourcing",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "IT outsourcing Vietnam",
    "software development Vietnam",
    "custom software development",
    "offshore development team",
    "CMS development",
    "CRM systems",
    "ERP solutions",
    "AI-powered solutions",
    "web application development",
    "mobile app development",
    "IT consulting Vietnam",
    "software outsourcing company",
    "Vietnam IT company",
    "Retech Solutions",
    "Retech Asia",
    "digital transformation",
    "software development outsourcing",
  ],
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
    canonical: SITE_URL,
    languages: {
      "en": SITE_URL,
      "x-default": SITE_URL,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title:
      "Retech Solutions | Software Development & IT Outsourcing",
    description:
      "Vietnam-based software development: custom CMS, CRM, ERP & AI solutions. Free consultation available.",
    // Image intentionally omitted — Next.js auto-uses src/app/opengraph-image.tsx
    // which generates a properly-dimensioned 1200x630 branded OG image. The
    // public/images/og-image.png file is a 2500x305 banner used only as the
    // navbar logo, not suitable for social share cards.
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Retech Solutions | Software Development & IT Outsourcing",
    description:
      "Custom CMS, CRM, ERP & AI-powered software. Full-cycle development from discovery to deployment. Free consultation.",
    // Same as openGraph — let Next.js's twitter-image route handle it.
  },

  verification: {
    google: "EsgT0_yO6zLaAXGgi39ZFUxKQhTV2tkhLNHbA1-l_r8",
  },

  category: "technology",
  classification: "IT Services",
  formatDetection: {
    telephone: false,
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://va.vercel-scripts.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <meta name="apple-mobile-web-app-title" content="Retech Solutions" />
        {/* Logo preload intentionally removed — the Navbar uses next/image with
            priority={true}, which handles LCP preloading automatically. The old
            manual preload pointed at logo.svg which isn't used in the chrome. */}
        <link rel="alternate" type="application/rss+xml" title="Retech Solutions Blog" href="/feed.xml" />
        <SiteJsonLd />
      </head>
      <body id="top" className="min-h-full flex flex-col bg-background">
        <noscript>
          <div style={{ padding: '32px 20px', textAlign: 'center', fontFamily: 'system-ui, sans-serif', maxWidth: '640px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>{SITE_NAME}</h1>
            <p style={{ marginBottom: '0.5rem', lineHeight: 1.6 }}>Vietnam-based software development company delivering custom CMS, CRM, ERP and AI-powered solutions.</p>
            <p style={{ marginBottom: '1rem', lineHeight: 1.6 }}>Please enable JavaScript for the full interactive experience, or contact us directly:</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.375rem' }}><strong>Email:</strong> <a href={CONTACT.emailHref} style={{ color: '#208535' }}>{CONTACT.email}</a></li>
              <li style={{ marginBottom: '0.375rem' }}><strong>Phone:</strong> <a href={CONTACT.phoneHref} style={{ color: '#208535' }}>{CONTACT.phone}</a></li>
              <li><strong>Website:</strong> <a href={SITE_URL} style={{ color: '#208535' }}>retech.asia</a></li>
            </ul>
          </div>
        </noscript>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-brand focus:text-white focus:outline-none"
        >
          Skip to main content
        </a>
        <SmoothScrollProvider>
        {/* Reduced-motion: respect OS-level setting globally for ALL framer-motion
            components. With reducedMotion="user", animations that would transform
            or fade are automatically reduced to instant changes. This is the WCAG
            2.3.3 fix without needing to add usePrefersReducedMotion to every component. */}
        <ReducedMotionProvider>
          <ClientOnlyWidgets />
          <DeferredProviders />
          <header role="banner">
          <Navbar />
          </header>
          <main id="main-content" className="flex-1 overflow-x-hidden">
            <DeferredPageTransition>{children}</DeferredPageTransition>
          </main>
          <Footer />
        </ReducedMotionProvider>
        </SmoothScrollProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
