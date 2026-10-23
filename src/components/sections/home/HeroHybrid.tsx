import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { LitDunes } from "@/components/sections/home/LitDunes";
import { TrustedBy } from "@/components/sections/home/TrustedBy";

/**
 * Hero hybrid — Concept C direction refined (owner checkpoint-1 ruling,
 * 2026-10-23): the approved LitDunes composition plus a LIGHT capability
 * quick-nav rail on desktop.
 *
 * Gates from the owner ruling, implemented here:
 *  - Scene untouched: same LitDunes mount, scrim, fade, fallback.
 *  - Copy untouched: the Jay-gated H1, standfirst, and CTA pair render
 *    exactly as the current hero (this component swaps nothing in them).
 *  - Rail is deliberately lighter than the section-01 explorer: six rows
 *    (CRM first + the five capabilities, same order and same verified
 *    strings from home.capabilities) showing title + one-line "fits" hint
 *    on hover/focus only. No photos, no tech pills, no panel — it must not
 *    read as a second Capabilities section.
 *  - Activation deep-links to /#capabilities-<service-id>; the explorer
 *    (ServicePreview) preselects that capability and scrolls clear of the
 *    sticky header.
 *  - Mobile keeps Concept A's simpler composition: no rail. One subtle
 *    "Explore our capabilities" link sits under the CTAs.
 *  - Accessibility: the rail is real links (keyboard reachable), hints are
 *    CSS-only reveals disabled under prefers-reduced-motion, focus-visible
 *    outlines preserved, and the rail is aria-labelled.
 *
 * Static SSR server component: zero client JS beyond the explorer's own
 * hash listener. LCP path identical to the current hero.
 */

interface RailHint {
  title: string;
  fits: string;
}

/** Row order must match ServicePreview PANEL_SERVICES (CRM first). */
const RAIL_SERVICES = [
  "crm-systems",
  "web-development",
  "mobile-app-development",
  "desktop-app-development",
  "ai-development",
  "it-consulting",
] as const;

export function HeroHybrid() {
  const t = useTranslations("home.hero");
  const tc = useTranslations("home.capabilities");

  const featured = {
    title: tc("featured.title"),
    fits: tc("featured.fits"),
  };
  const rows = tc.raw("rows") as RailHint[];
  const rail = [featured, ...rows];

  return (
    <section
      className="relative min-h-svh flex flex-col overflow-hidden pt-16"
      aria-label="Introduction"
    >
      {/* Lit Dunes — approved scene, untouched (idle-armed, static fallback
          for no-WebGL environments). */}
      <LitDunes />

      {/* Text scrim — same treatment as the live hero. */}
      <div
        className="absolute inset-0 z-[var(--z-base)] pointer-events-none hero-text-scrim"
        aria-hidden="true"
      />

      {/* Bottom fade — same hand-off to the next section as the live hero. */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-background-subtle/0 to-background-subtle/95 z-[var(--z-base)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full flex-1 flex items-center">
        <Container className="w-full py-8 md:py-10">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-8">
            {/* Copy column — identical composition to the live hero.
                md is full-width (rail drops out below lg): at 768 a 7/12
                column left ~407px for a 72px headline, wrapping VI/EN into
                a 4-line rag (P0 fix, 2026-10-23). */}
            <div className="hero-content-enter max-w-4xl md:col-span-12 lg:col-span-7">
              <h1 className="font-display-title mt-6 mb-6 text-balance text-[2.75rem] leading-[1.05] tracking-[-0.015em] text-foreground sm:text-6xl md:text-7xl lg:text-[4rem] xl:text-[5.25rem]">
                {t("h1Pre")}{" "}
                <br />
                {t("h1Into")}{" "}
                <em className="font-display italic text-brand">{t("h1Accent")}</em>
              </h1>

              <p className="max-w-2xl text-lg leading-relaxed text-foreground-secondary md:text-xl">
                {t("standfirst")}
              </p>

              <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Button href="/contact" size="lg" className="font-semibold w-full sm:w-auto">
                  {t("ctaPrimary")}
                </Button>
                <Button href="/services" variant="ghost" size="lg" className="w-full sm:w-auto">
                  {t("ctaSecondary")}
                </Button>
              </div>

              {/* Mobile-only: the single subtle hand-off to the explorer
                  (owner ruling: no rail underneath the buttons). */}
              <Link
                href="/#capabilities-crm-systems"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground-secondary underline-offset-4 transition-colors hover:text-brand hover:underline md:hidden motion-reduce:transition-none"
              >
                {t("hybrid.exploreLabel")}
                <span aria-hidden="true">&darr;</span>
              </Link>
            </div>

            {/* Capability quick-nav rail (desktop only). Lighter than the
                explorer: title + hover hint, hairline separators, no card. */}
            <nav
              aria-label={t("hybrid.railLabel")}
              className="hidden lg:block lg:col-span-4 lg:col-start-9"
            >
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                {t("hybrid.railLabel")}
              </p>
              <ul className="mt-2">
                {rail.map((item, i) => (
                  <li
                    key={RAIL_SERVICES[i]}
                    className="border-t border-rule-soft last:border-b"
                  >
                    <Link
                      href={`/#capabilities-${RAIL_SERVICES[i]}`}
                      className="group flex items-baseline gap-3 py-3.5 outline-offset-4 focus-visible:outline-2 focus-visible:outline-brand"
                    >
                      <span className="font-display text-xs text-foreground-muted tabular-nums">
                        {i + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="font-display-title block text-lg leading-snug text-foreground transition-colors group-hover:text-brand group-focus-visible:text-brand motion-reduce:transition-none">
                          {item.title}
                        </span>
                        <span className="block max-h-0 overflow-hidden text-sm leading-relaxed text-foreground-secondary opacity-0 transition-all duration-200 ease-out group-hover:max-h-16 group-hover:opacity-100 group-hover:pt-1 group-focus-visible:max-h-16 group-focus-visible:opacity-100 group-focus-visible:pt-1 motion-reduce:transition-none" aria-hidden="true">
                          {item.fits}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </div>

      {/* Industries strip — unchanged from the live hero. */}
      <TrustedBy />
    </section>
  );
}
