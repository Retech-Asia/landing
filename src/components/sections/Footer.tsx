"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { services } from "@/lib/services-data";
import { Container } from "@/components/ui/Container";
import { localizeServiceHref } from "@/lib/services-data";

/**
 * Site footer — full redesign 2026-10-27 (owner visual-refinement directive):
 * typographic editorial composition on the established bg-brand-dark surface.
 * Six approved service families (the ServicesGallery set — not the legacy
 * ten-service list), no geographic labels/flags/physical address, no icon
 * lists or badges. Positioning copy is the owner's exact wording (EN) with a
 * faithful VI rendering, pending ChatGPT editorial review.
 * Revert: git checkout 6fb7ab1 -- src/components/sections/Footer.tsx
 */

const FOOTER_SERVICE_IDS = [
  "crm-systems",
  "web-development",
  "mobile-app-development",
  "desktop-app-development",
  "ai-development",
  "it-consulting",
] as const;

const COMPANY_LINKS = [
  { labelKey: "home", href: "/" },
  { labelKey: "about", href: "/about" },
  { labelKey: "process", href: "/process" },
  { labelKey: "industries", href: "/industries" },
  { labelKey: "caseStudies", href: "/case-studies" },
  { labelKey: "blog", href: "/blog" },
] as const;

const RESOURCE_LINKS = [
  { labelKey: "faq", href: "/faq" },
  { labelKey: "technologies", href: "/technologies" },
  { labelKey: "careers", href: "/careers" },
] as const;

const linkClass =
  "text-sm text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm";

const headerClass =
  "text-[11px] font-medium uppercase tracking-[0.18em] text-white/50";

export function Footer() {
  const t = useTranslations("nav.footer");
  const locale = useLocale() as "en" | "vi";

  const familyLinks = FOOTER_SERVICE_IDS.map((id) =>
    services.find((s) => s.id === id),
  ).filter((s): s is (typeof services)[number] => Boolean(s));

  return (
    <footer role="contentinfo" aria-label="Site footer" className="bg-brand-dark text-white">
      <Container className="pt-16 pb-12 md:pt-20">
        {/* Wordmark + owner positioning copy */}
        <div className="max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm"
            aria-label="Retech Solutions home"
          >
            <Image
              src="/images/logo-lockup.webp"
              alt="Retech Solutions"
              width={284}
              height={33}
              sizes="238px"
              decoding="async"
              className="h-7 md:h-8 w-auto opacity-90 footer-logo-silhouette"
            />
          </Link>
          <h2 className="font-display-title mt-8 text-balance text-3xl leading-[1.12] tracking-tight text-white md:text-5xl">
            {t("positioning")}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
            {t("positioningSub")}
          </p>
        </div>

        {/* Ruled link columns */}
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/10 pt-10 md:mt-16 md:grid-cols-4">
          <nav aria-label={t("servicesHeader")}>
            <h3 className={headerClass}>{t("servicesHeader")}</h3>
            <ul className="mt-4 space-y-2.5">
              {familyLinks.map((service) => (
                <li key={service.id}>
                  <Link
                    href={localizeServiceHref(`/services/${service.slug[locale]}`, locale)}
                    className={linkClass}
                  >
                    {service.title[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("company")}>
            <h3 className={headerClass}>{t("company")}</h3>
            <ul className="mt-4 space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("resources")}>
            <h3 className={headerClass}>{t("resources")}</h3>
            <ul className="mt-4 space-y-2.5">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className={headerClass}>{t("contact")}</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={CONTACT.emailHref} className={linkClass}>
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/84906426802?text=Hi%20Retech%20Solutions%2C%20I%27d%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {t("chatWhatsApp")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom bar: copyright + legal + back to top */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/60">
            &copy; {new Date().getFullYear()} {CONTACT.businessName}
          </p>
          <div className="flex items-center gap-5 text-xs text-white/60">
            <Link href="/privacy-policy" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm">
              {t("privacy")}
            </Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm">
              {t("terms")}
            </Link>
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label={t("backToTop")}
            className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm"
          >
            {t("backToTop")}
            <ArrowUp size={12} aria-hidden="true" />
          </button>
        </Container>
      </div>
    </footer>
  );
}
