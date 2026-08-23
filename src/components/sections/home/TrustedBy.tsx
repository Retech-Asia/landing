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

/**
 * Industries strip at the bottom of the hero. Renders INSIDE the hero
 * section, sitting on the Lit Dunes canvas, so it inherits the ambient
 * motion instead of dropping to a flat band after the hero (Jay's call,
 * 2026-08-23). Each chip is a real link to its /industries page (every
 * listed industry has one), so the strip works as navigation, not
 * decoration. Order mirrors home.trustedBy.industries in the catalogs.
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
}: {
  name: string;
  href: string;
  Icon: LucideIcon;
  locale: "en" | "vi";
}) {
  return (
    <Link
      href={localizeIndustryHref(href, locale)}
      className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card-bg/60 backdrop-blur-sm px-3.5 py-1.5 text-[13px] font-medium text-foreground-secondary select-none whitespace-nowrap transition-all duration-200 hover:border-brand/40 hover:bg-brand/10 hover:text-foreground hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
    >
      <Icon
        size={14}
        className="text-brand shrink-0 transition-transform duration-200 group-hover:scale-110"
        aria-hidden="true"
      />
      {name}
    </Link>
  );
}

export function TrustedBy() {
  const t = useTranslations("home.trustedBy");
  const locale = useLocale() as "en" | "vi";
  const industries = t.raw("industries") as string[];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
      className="relative z-10 pb-5 md:pb-7"
    >
      <p className="text-center text-[11px] font-medium tracking-[0.18em] uppercase text-foreground-muted mb-3.5">
        {t("title")}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto px-4">
        {industries.map((industry, i) => {
          const link = INDUSTRY_LINKS[i];
          if (!link) return null;
          return (
            <IndustryChip
              key={link.href}
              name={industry}
              href={link.href}
              Icon={link.Icon}
              locale={locale}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
