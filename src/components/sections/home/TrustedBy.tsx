"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

function IndustryPill({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-4 py-2 rounded-full border border-foreground/10 bg-card-bg select-none whitespace-nowrap text-sm font-medium text-foreground-secondary transition-colors duration-200 hover:border-foreground/20 hover:text-foreground">
      {name}
    </span>
  );
}

/**
 * Compact industries band under the hero. Static pills (the old two-row
 * counter-scrolling marquee read as filler and implied client logos we
 * don't show). The label stays honest: industries we serve, not clients.
 */
export function TrustedBy() {
  const t = useTranslations("home.trustedBy");
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
          {industries.map((industry) => (
            <IndustryPill key={industry} name={industry} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
