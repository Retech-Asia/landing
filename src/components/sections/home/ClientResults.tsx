"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

const metrics = [
  { value: "94%", key: "onTime" },
  { value: "4.8/5", key: "satisfaction" },
  { value: "< 24h", key: "responseTime" },
  { value: "6", key: "markets" },
] as const;

/**
 * Client results strip. Pure typography, no cards: by this point the page
 * has shown bento, case tiles, and a split section, so the pre-CTA proof
 * band stays visually quiet. The old "Testimonials" section contained zero
 * actual testimonials (the repo has none on file) plus a process timeline
 * duplicating /process — both removed. Metric values carried over from the
 * previous shipped section, pending confirmation against real delivery data.
 */
export function ClientResults() {
  const t = useTranslations("home.clientResults.results");
  return (
    <section className="py-14" aria-label={t("title")}>
      <Container>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center text-sm font-medium tracking-widest uppercase text-brand mb-3"
        >
          {t("label")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-center text-2xl md:text-3xl font-bold text-foreground mb-10"
        >
          {t("title")}
        </motion.h2>

        <motion.dl
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10"
        >
          {metrics.map((metric, i) => (
            <div
              key={metric.key}
              className="relative flex flex-col items-center text-center px-4"
            >
              {/* Hairline dividers between metrics (desktop only) */}
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px bg-gradient-to-b from-transparent via-foreground-muted/20 to-transparent"
                />
              )}
              {/* dt first in DOM (valid dl order); value renders above via order */}
              <dt className="order-2 mt-2.5 text-sm text-foreground-muted font-medium max-w-[12rem]">
                {t(`metrics.${metric.key}`)}
              </dt>
              <dd className="order-1 text-3xl md:text-4xl font-bold gradient-text-brand leading-none">
                {metric.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}
