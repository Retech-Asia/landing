"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

export function MidPageCTA() {
  const t = useTranslations("home.midCta");
  return (
    <section className="py-16 md:py-20 relative" aria-label={t("title")}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative rounded-2xl bg-gradient-to-r from-brand/[0.06] via-accent-cyan/[0.04] to-brand/[0.06] border border-brand/[0.10] p-8 md:p-10 lg:p-12 overflow-hidden"
        >
          {/* Subtle decorative background */}
          <div
            className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(32,133,53,0.06) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              {/* Eyebrow text only — no icon box above it (user flagged that
                  pattern as AI-generated-feeling). */}
              <span className="block text-xs font-medium tracking-widest uppercase text-brand mb-3">
                {t("eyebrow")}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                {t("title")}
              </h2>
              <p className="text-sm md:text-base text-foreground-secondary leading-relaxed max-w-lg">
                {t("body")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-brand-light hover:shadow-[0_4px_20px_rgba(32,133,53,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
              >
                {t("cta")}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-card-bg text-foreground border border-foreground/10 px-6 py-3 text-sm font-medium transition-all duration-300 hover:border-foreground/20 hover:shadow-[0_2px_12px_rgba(0,0,0,0.08)] shadow-[0_1px_3px_rgba(0,0,0,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
              >
                {t("secondary")}
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
