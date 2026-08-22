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
import { Container } from "@/components/ui/Container";
import { localizeIndustryHref } from "@/lib/industries-data";

/**
 * Industries band under the hero. Each chip is a real link to its
 * /industries page (every listed industry has one), so the band works
 * as navigation, not decoration. Order mirrors home.trustedBy.industries
 * in the message catalogs.
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
      className="group inline-flex items-center gap-2.5 rounded-full border border-foreground/10 bg-card-bg px-4 py-2 text-sm font-medium text-foreground-secondary select-none whitespace-nowrap transition-all duration-200 hover:border-brand/30 hover:bg-brand/[0.05] hover:text-foreground hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
    >
      <Icon
        size={15}
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
    <section className="py-14" aria-label={t("title")}>
      <Container>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center text-sm font-medium tracking-widest uppercase text-foreground-muted mb-8"
        >
          {t("title")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto"
        >
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
        </motion.div>
      </Container>
    </section>
  );
}
