import type { Metadata } from "next";
import { SITE_URL } from "./constants";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

/**
 * Build per-page Metadata with self-canonical + bidirectional hreflang.
 *
 * WHY THIS EXISTS
 * Without it, every static page (about, contact, faq, etc.) inherits the
 * root layout's `canonical: /en` (or `/vi`). When Google crawls `/vi/about`
 * and sees `canonical: /vi` (homepage), it classifies the page as duplicate
 * or "page with redirect". This helper ensures every page emits its own
 * self-canonical.
 *
 * USAGE
 *   export async function generateMetadata({ params }) {
 *     const { locale } = await params;
 *     return buildPageMetadata({ locale, path: "/about", namespace: "pages.about" });
 *   }
 *
 * `path` is the locale-stripped URL path (e.g. "/about", "/contact",
 * "/services"). The helper prepends `/${locale}` to build canonical URLs.
 *
 * `namespace` is the messages namespace holding `title` + `description`.
 *
 * `viReady` controls whether hreflang alternates include VI. Set false when
 * the page content is still English under `/vi/...` to avoid declaring a
 * Vietnamese page that doesn't actually render Vietnamese copy.
 */
export async function buildPageMetadata({
  locale,
  path,
  namespace,
  viReady = false,
}: {
  locale: string;
  path: string;
  namespace: string;
  viReady?: boolean;
}): Promise<Metadata> {
  const loc = locale as Locale;
  const isEn = loc === "en";
  const t = await getTranslations({ locale, namespace });
  const title = t("title");
  const description = t("description");

  const enUrl = `${SITE_URL}/en${path === "/" ? "" : path}`;
  const viUrl = `${SITE_URL}/vi${path === "/" ? "" : path}`;
  const canonical = isEn ? enUrl : viUrl;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: viReady
        ? { en: enUrl, vi: viUrl, "x-default": enUrl }
        : { en: enUrl, "x-default": enUrl },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      locale: isEn ? "en_US" : "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
