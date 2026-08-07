"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

function IndustryPill({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center mx-3 px-5 py-2.5 rounded-full border border-foreground/10 bg-card-bg select-none whitespace-nowrap text-base font-medium text-foreground-secondary transition-colors duration-200 hover:border-foreground/20 hover:text-foreground">
      {name}
    </span>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        className={`flex ${
          reverse ? "marquee-container-reverse" : "marquee-container"
        }`}
      >
        <div className="flex shrink-0 items-center marquee-track">
          {doubled.map((item, i) => (
            <IndustryPill key={`a-${i}`} name={item} />
          ))}
        </div>
        <div
          className="flex shrink-0 items-center marquee-track"
          aria-hidden="true"
        >
          {doubled.map((item, i) => (
            <IndustryPill key={`b-${i}`} name={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TrustedBy() {
  const t = useTranslations("home.trustedBy");
  const industries = t.raw("industries") as string[];
  return (
    <section className="py-16 md:py-20 relative overflow-hidden marquee-hover-pause" aria-label={t("title")}>
      <Container>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center text-sm font-medium tracking-widest uppercase text-foreground-muted mb-10"
        >
          {t("title")}
        </motion.p>
      </Container>

      <div className="flex flex-col gap-4">
        <MarqueeRow items={industries} />
        <MarqueeRow items={[...industries].reverse()} reverse />
      </div>
    </section>
  );
}
