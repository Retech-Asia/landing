"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import {
  FileText,
  AddressBook,
  ChartBar,
  Code,
  PencilRuler,
  UsersThree,
  type Icon as PhosphorIconType,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CompositeSectionBackground } from "@/components/ui/SectionBackground";
import { servicesNavigation } from "@/lib/navigation";
import { localizeServiceHref } from "@/lib/services-data";

const accentColors = [
  "text-brand",
  "text-accent-cyan",
  "text-accent-violet",
  "text-brand",
  "text-accent-cyan",
  "text-accent-violet",
];

// Professional duotone icons (Phosphor) — replaces Lucide for marketing quality.
// Duotone weight has a secondary opacity layer giving depth/premium feel.
const PHOSPHOR_ICONS: Record<string, PhosphorIconType> = {
  "/services/cms-platforms": FileText,
  "/services/crm-systems": AddressBook,
  "/services/erp-solutions": ChartBar,
  "/services/web-development": Code,
  "/services/ui-ux-design": PencilRuler,
  "/services/dedicated-teams": UsersThree,
};

const iconBgs = [
  "bg-brand/8",
  "bg-accent-cyan/8",
  "bg-accent-violet/8",
  "bg-brand/8",
  "bg-accent-cyan/8",
  "bg-accent-violet/8",
];

// Featured bento cells: CMS and CRM are the two pillar services, so they
// get the large cells (2-col span + tinted background + bigger type).
const FEATURED_HREFS = ["/services/cms-platforms", "/services/crm-systems"];

/* ── Card-level animation wrapper — staggered fade-in + slide-up ── */
function CardReveal({
  children,
  index,
  className,
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
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
      className={className ? `h-full ${className}` : "h-full"}
    >
      {children}
    </motion.div>
  );
}

/* ── Tilt card wrapper with cursor-following gradient glow ── */
function TiltCard({
  children,
  maxTilt = 2.5,
}: {
  children: React.ReactNode;
  maxTilt?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card || prefersReducedMotion) return;

      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;   // 0 → 1
      const y = (e.clientY - rect.top) / rect.height;    // 0 → 1

      // Tilt: center of card is (0,0). Left/top → positive rotateY/rotateX
      const rotateX = (0.5 - y) * maxTilt * 2;
      const rotateY = (x - 0.5) * maxTilt * 2;

      setTiltStyle({ rotateX, rotateY });
      setGlowPos({ x: x * 100, y: y * 100 });
    },
    [maxTilt, prefersReducedMotion],
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
  const tHeader = useTranslations("home.servicesPreview");
  const tServices = useTranslations("nav.services");
  const locale = useLocale() as "en" | "vi";

  return (
    <section
      className="py-20 md:py-28 bg-background-subtle relative overflow-hidden"
      aria-label={tHeader("title")}
    >
      {/* Premium background: grid lines fading from center + aurora mesh */}
      <CompositeSectionBackground layers={["aurora", "grid-center"]} />
      <Container className="relative z-10">
        <SectionHeader
          label={tHeader("label")}
          title={tHeader("title")}
          description={tHeader("subtitle")}
          gradient
        />

        {/* Bento grid: 2 featured cells (CMS, CRM) + 4 standard cells.
            Cell-size variation replaces the old uniform 3x2 card grid,
            which repeated the same anatomy as three other sections. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mt-12">
          {servicesNavigation.map((service, i) => {
            const PhosphorIcon = PHOSPHOR_ICONS[service.href] ?? FileText;
            const featured = FEATURED_HREFS.includes(service.href);
            return (
              <CardReveal
                key={service.href}
                index={i}
                className={featured ? "md:col-span-2" : undefined}
              >
                <TiltCard maxTilt={featured ? 1.5 : 2.5}>
                  <Link
                    href={localizeServiceHref(service.href, locale)}
                    className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-2xl focus-visible:ring-offset-2"
                  >
                    <div
                      className={`group relative h-full overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:border-brand/20 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_12px_32px_rgba(32,133,53,0.06)] ${
                        featured
                          ? "border-brand/15 bg-gradient-to-br from-brand/[0.06] via-card-bg to-accent-cyan/[0.05] p-7 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(32,133,53,0.05)]"
                          : "bg-card-bg border-card-border shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]"
                      }`}
                    >
                      {/* Animated top accent — brand gradient, draws in on hover */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out bg-gradient-to-r from-brand via-accent-cyan to-accent-violet"
                      />

                      {/* Phosphor duotone icon in branded container */}
                      <div
                        className={`inline-flex items-center justify-center rounded-xl ${iconBgs[i]} mb-5 transition-transform duration-300 group-hover:-translate-y-1 ${
                          featured ? "w-14 h-14" : "w-12 h-12"
                        }`}
                      >
                        <PhosphorIcon
                          size={featured ? 32 : 28}
                          weight="duotone"
                          className={accentColors[i]}
                        />
                      </div>

                      <h3
                        className={`font-semibold text-foreground mb-2 group-hover:text-brand transition-colors ${
                          featured ? "text-xl md:text-2xl" : "text-lg"
                        }`}
                      >
                        {tServices(service.labelKey)}
                      </h3>
                      <p className="text-sm text-foreground-secondary leading-relaxed mb-5">
                        {tServices(service.descriptionKey)}
                      </p>

                      {/* Always-visible CTA — better discoverability than hover-only */}
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                        {tHeader("learnMore")}
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>

                      {/* Featured watermark — large duotone icon, low opacity,
                          anchors the big cells so they don't read as stretched
                          standard cards. */}
                      {featured && (
                        <PhosphorIcon
                          size={180}
                          weight="duotone"
                          className="absolute -right-8 -bottom-8 text-foreground/[0.05] pointer-events-none"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </Link>
                </TiltCard>
              </CardReveal>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="mt-10 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:gap-3 transition-all py-2 px-1 -mx-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 rounded-sm"
          >
            {tHeader("exploreAll")}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
