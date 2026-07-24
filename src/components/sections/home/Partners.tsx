"use client";

// Plain <img> for SVG partner/tech logos — next/image blocks SVG.
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const partners = [
  { name: "AWS", category: "Cloud Platform", logo: "/images/partners/aws.svg" },
  { name: "Google Cloud", category: "Cloud Platform", logo: "/images/partners/googlecloud.svg" },
  { name: "Vercel", category: "Deployment", logo: "/images/tech/vercel.svg" },
  { name: "WordPress", category: "CMS", logo: "/images/partners/wordpress.svg" },
  { name: "Shopify", category: "E-commerce", logo: "/images/partners/shopify.svg" },
  { name: "Salesforce", category: "CRM", logo: "/images/partners/salesforce.svg" },
  { name: "HubSpot", category: "Marketing", logo: "/images/partners/hubspot.svg" },
  { name: "Stripe", category: "Payments", logo: "/images/partners/stripe.svg" },
  { name: "MongoDB", category: "Database", logo: "/images/tech/mongodb.svg" },
  { name: "Redis", category: "Cache", logo: "/images/tech/redis.svg" },
  { name: "Figma", category: "Design", logo: "/images/tech/figma.svg" },
  { name: "GitHub", category: "Version Control", logo: "/images/partners/github.svg" },
];

function PartnerCard({
  partner,
  animate,
  delay,
}: {
  partner: (typeof partners)[number];
  animate: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20, scale: 0.96 } : false}
      animate={animate ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex-shrink-0 w-44 md:w-52 rounded-2xl bg-white border border-black/[0.06] p-5 md:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-black/[0.10] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:scale-[1.02]"
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-black/[0.03] mb-4 transition-transform duration-300 group-hover:scale-110 overflow-hidden">
        <img
          src={partner.logo}
          alt={`${partner.name} logo`}
          width={24}
          height={24}
          className="w-6 h-6 object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-brand transition-colors duration-300">
        {partner.name}
      </h3>
      <p className="text-xs text-foreground-muted group-hover:text-brand transition-colors duration-300">
        {partner.category}
      </p>
    </motion.div>
  );
}

function useInViewOnce(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

function PartnerMarqueeRow({
  items,
  reverse = false,
  parallaxSpeed = 0,
}: {
  items: typeof partners;
  reverse?: boolean;
  parallaxSpeed?: number;
}) {
  const { ref, isInView } = useInViewOnce();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const staggerDelay = 0.07;

  // Parallax: offset based on scroll position relative to section
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [parallaxSpeed, -parallaxSpeed]);

  return (
    <div ref={parallaxRef} className={reverse ? "marquee-hover-pause" : "marquee-hover-pause"}>
      {/* Left fade edge */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 md:w-40 bg-gradient-to-r from-background-subtle to-transparent" />
      {/* Right fade edge */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 md:w-40 bg-gradient-to-l from-background-subtle to-transparent" />

      <motion.div
        ref={ref}
        style={{ y: parallaxY }}
        className={
          reverse
            ? "marquee-container-reverse flex gap-5 md:gap-6 w-max"
            : "marquee-container flex gap-5 md:gap-6 w-max"
        }
      >
        {items.map((partner, i) => (
          <PartnerCard
            key={partner.name}
            partner={partner}
            animate={isInView}
            delay={i * staggerDelay}
          />
        ))}
        {items.map((partner) => (
          <PartnerCard
            key={`${partner.name}-dup`}
            partner={partner}
            animate={false}
            delay={0}
          />
        ))}
      </motion.div>
    </div>
  );
}

export function Partners() {
  return (
    <section className="py-20 md:py-28 bg-background-subtle relative overflow-hidden">
      <Container>
        <AnimatedSection>
          <SectionHeader
            label="Integrations"
            title="Technologies We Work With"
            description="We build solutions using established platforms and technologies to deliver robust, scalable software for your business."
          />
        </AnimatedSection>
      </Container>

      {/* Marquee row — forward (parallax: moves slower) */}
      <div className="mt-12 md:mt-16 relative">
        <PartnerMarqueeRow items={partners} parallaxSpeed={20} />
      </div>

      {/* Marquee row — reverse (parallax: different speed for depth) */}
      <div className="mt-5 md:mt-6 relative">
        <PartnerMarqueeRow items={[...partners].reverse()} reverse parallaxSpeed={35} />
      </div>
    </section>
  );
}
