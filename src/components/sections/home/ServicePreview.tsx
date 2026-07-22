"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { servicesNavigation } from "@/lib/navigation";

const accentColors = [
  "text-brand",
  "text-accent-cyan",
  "text-accent-violet",
  "text-brand",
  "text-accent-cyan",
  "text-accent-violet",
];

/* ── Card-level animation wrapper — staggered fade-in + slide-up ── */
function CardReveal({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Tilt card wrapper with cursor-following gradient glow ── */
function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const MAX_TILT = 2.5; // degrees — subtle

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;   // 0 → 1
      const y = (e.clientY - rect.top) / rect.height;    // 0 → 1

      // Tilt: center of card is (0,0). Left/top → positive rotateY/rotateX
      const rotateX = (0.5 - y) * MAX_TILT * 2;
      const rotateY = (x - 0.5) * MAX_TILT * 2;

      setTiltStyle({ rotateX, rotateY });
      setGlowPos({ x: x * 100, y: y * 100 });
    },
    [MAX_TILT],
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTiltStyle({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tiltStyle.rotateX}deg) rotateY(${tiltStyle.rotateY}deg)`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
      }}
      className="relative h-full rounded-2xl"
    >
      {/* Cursor-following gradient glow — sits behind the card border */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, rgba(32,133,53,0.12), rgba(6,182,212,0.06) 40%, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

export function ServicePreview() {
  return (
    <section className="py-20 md:py-28 bg-background-subtle relative" aria-label="Our services">
      <Container>
        <SectionHeader
          label="Our Services"
          title="What We Build"
          description="Tailored web solutions built on leading platforms — enhanced with AI for smarter, more reliable performance."
          gradient
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesNavigation.map((service, i) => {
            const Icon = service.icon;
            return (
              <CardReveal key={service.href} index={i}>
                <TiltCard>
                  <Link href={service.href} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-2xl focus-visible:ring-offset-2">
                    <div className="group relative h-full rounded-2xl bg-white border border-black/[0.06] p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-shadow duration-300 hover:border-black/[0.10] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)]">
                      {/* Top accent line */}
                      <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-black/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <Icon size={28} className={`${accentColors[i]} mb-5 transition-transform duration-300 group-hover:-translate-y-1`} />

                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-brand transition-colors">
                        {service.label}
                      </h3>
                      <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="relative">
                          Learn more
                          <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                        </span>
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </CardReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
