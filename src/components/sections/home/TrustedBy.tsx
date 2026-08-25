"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  Building2,
  Cpu,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  ShoppingCart,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { localizeIndustryHref } from "@/lib/industries-data";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Industries strip at the bottom of the hero. Renders INSIDE the hero
 * section, sitting on the Lit Dunes canvas, so it inherits the ambient
 * motion instead of dropping to a flat band after the hero (Jay's call,
 * 2026-08-23). Redesigned 2026-08-25 from a static chip wrap into a slow
 * drifting marquee (Jay: the strip was "the most basic section" on the
 * homepage) — single fixed row in every locale, edges masked into the
 * dunes, chips pause on hover/focus. Each chip is a real link to its
 * /industries page (every listed industry has one), so the strip works
 * as navigation, not decoration. Reduced motion falls back to the static
 * wrapped row. Order mirrors home.trustedBy.industries in the catalogs.
 */
const INDUSTRY_LINKS: { href: string; Icon: LucideIcon }[] = [
  { href: "/industries/healthcare", Icon: HeartPulse },
  { href: "/industries/finance", Icon: Landmark },
  { href: "/industries/e-commerce", Icon: ShoppingCart },
  { href: "/industries/logistics", Icon: Truck },
  { href: "/industries/education", Icon: GraduationCap },
  { href: "/industries/real-estate", Icon: Building2 },
  { href: "/industries/technology", Icon: Cpu },
  { href: "/industries/manufacturing", Icon: Factory },
];

function IndustryChip({
  name,
  href,
  Icon,
  locale,
  decorative = false,
}: {
  name: string;
  href: string;
  Icon: LucideIcon;
  locale: "en" | "vi";
  /** Clone in the looping copy of the marquee: unfocusable, hidden from a11y tree. */
  decorative?: boolean;
}) {
  return (
    <Link
      href={localizeIndustryHref(href, locale)}
      tabIndex={decorative ? -1 : undefined}
      aria-hidden={decorative || undefined}
      className="group inline-flex items-center gap-2.5 rounded-full border border-foreground/10 bg-card-bg/70 backdrop-blur-md pl-1.5 pr-4 py-1.5 text-[13px] font-medium text-foreground-secondary select-none whitespace-nowrap shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-brand/40 hover:bg-brand/10 hover:text-foreground hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08),0_8px_24px_rgba(32,133,53,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
    >
      <span
        className="inline-flex items-center justify-center rounded-full bg-brand/10 p-1.5 transition-colors duration-200 group-hover:bg-brand/20"
        aria-hidden="true"
      >
        <Icon
          size={13}
          className="text-brand transition-transform duration-200 group-hover:scale-110"
        />
      </span>
      {name}
    </Link>
  );
}

export function TrustedBy() {
  const t = useTranslations("home.trustedBy");
  const locale = useLocale() as "en" | "vi";
  const reducedMotion = usePrefersReducedMotion();
  const industries = t.raw("industries") as string[];

  const items = industries.flatMap((name, i) => {
    const link = INDUSTRY_LINKS[i];
    return link ? [{ name, href: link.href, Icon: link.Icon }] : [];
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
      className="relative z-10 pb-4"
    >
      <p className="text-center text-[11px] font-medium tracking-[0.18em] uppercase text-foreground-muted mb-4">
        {t("title")}
      </p>

      {reducedMotion ? (
        /* Reduced motion: static centered row, no drift */
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto px-4">
          {items.map((item) => (
            <IndustryChip key={item.href} {...item} locale={locale} />
          ))}
        </div>
      ) : (
        /* Marquee: full-bleed drifting row, masked into the dunes at both
           edges. Two identical copies on one w-max track make the -50%
           translate loop seamless (each half carries pr-2.5 so the seam
           gap matches the internal gap). Pauses on hover and on keyboard
           focus so a moving chip is always clickable. */
        <div className="marquee-hover-pause relative overflow-hidden px-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee-container flex w-max">
            <div className="flex items-center gap-2.5 pr-2.5">
              {items.map((item) => (
                <IndustryChip key={item.href} {...item} locale={locale} />
              ))}
            </div>
            <div className="flex items-center gap-2.5 pr-2.5" aria-hidden="true">
              {items.map((item) => (
                <IndustryChip key={item.href} {...item} locale={locale} decorative />
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
