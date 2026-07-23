"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const industries = [
  "Healthcare",
  "Finance",
  "E-commerce",
  "Logistics",
  "Education",
  "Real Estate",
  "SaaS",
  "Manufacturing",
];

function IndustryPill({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center mx-3 px-5 py-2.5 rounded-full border border-foreground/10 bg-white/70 select-none whitespace-nowrap text-base font-medium text-foreground-secondary transition-colors duration-200 hover:border-foreground/20 hover:text-foreground">
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
  return (
    <section className="py-16 md:py-20 relative overflow-hidden marquee-hover-pause" aria-label="Industries we serve">
      <Container>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center text-sm font-medium tracking-widest uppercase text-foreground-muted mb-10"
        >
          Serving industries worldwide
        </motion.p>
      </Container>

      <div className="flex flex-col gap-4">
        <MarqueeRow items={industries} />
        <MarqueeRow items={[...industries].reverse()} reverse />
      </div>
    </section>
  );
}
