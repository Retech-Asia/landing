"use client";

// Plain <img> used for tech logos (all SVGs). next/image blocks SVG without
// dangerouslyAllowSVG config (security: SVG can carry <script>). Vectors
// don't need optimization — they're already tiny and resolution-independent.
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

/**
 * Compact logo cloud. The old category-row layout duplicated /technologies
 * (which has the full filterable listing); the homepage only needs the
 * credibility signal. Grayscale at rest, brand colors on hover.
 */
const logos = [
  { name: "React", src: "/images/tech/react.svg" },
  { name: "Next.js", src: "/images/tech/nextdotjs.svg" },
  { name: "TypeScript", src: "/images/tech/typescript.svg" },
  { name: "Node.js", src: "/images/tech/nodedotjs.svg" },
  { name: "Python", src: "/images/tech/python.svg" },
  { name: "Go", src: "/images/tech/go.svg" },
  { name: "PostgreSQL", src: "/images/tech/postgresql.svg" },
  { name: "MongoDB", src: "/images/tech/mongodb.svg" },
  { name: "Docker", src: "/images/tech/docker.svg" },
  { name: "Kubernetes", src: "/images/tech/kubernetes.svg" },
  { name: "AWS", src: "/images/tech/amazonaws.svg" },
  { name: "Vercel", src: "/images/tech/vercel.svg" },
  { name: "OpenAI", src: "/images/tech/openai.svg" },
  { name: "LangChain", src: "/images/tech/langchain.svg" },
];

export function TechStack() {
  const t = useTranslations("home.techStack");
  return (
    <section className="py-14 bg-background-subtle relative overflow-hidden">
      <Container className="relative z-10">
        <SectionHeader
          label={t("label")}
          title={t("title")}
          description={t("description")}
        />

        <AnimatedSection className="mt-10">
          <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {logos.map((logo) => (
              <li
                key={logo.name}
                className="flex items-center justify-center w-12 h-12 rounded-xl border border-card-border bg-card-bg p-2.5 opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 hover:border-brand/30 hover:scale-105"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  width={28}
                  height={28}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </li>
            ))}
          </ul>
        </AnimatedSection>

        <AnimatedSection className="mt-8 text-center">
          <Link
            href="/technologies"
            className="inline-flex items-center gap-2 rounded-full border border-card-border bg-card-bg px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:border-brand/30 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
          >
            {t("explore")}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </AnimatedSection>
      </Container>
    </section>
  );
}
