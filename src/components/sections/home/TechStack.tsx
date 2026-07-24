"use client";

// Plain <img> used for tech logos (all SVGs). next/image blocks SVG without
// dangerouslyAllowSVG config (security: SVG can carry <script>). Vectors
// don't need optimization — they're already tiny and resolution-independent.
// Plain <img> is the Next.js-recommended approach for self-hosted SVGs.
import { Container } from "@/components/ui/Container";
import { CompositeSectionBackground } from "@/components/ui/SectionBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";

const techGroups = [
  {
    label: "Frontend",
    items: [
      { name: "React", alt: "React framework logo", src: "/images/tech/react.svg" },
      { name: "Next.js", alt: "Next.js framework logo", src: "/images/tech/nextdotjs.svg" },
      { name: "TypeScript", alt: "TypeScript language logo", src: "/images/tech/typescript.svg" },
      { name: "Tailwind CSS", alt: "Tailwind CSS framework logo", src: "/images/tech/tailwindcss.svg" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", alt: "Node.js runtime logo", src: "/images/tech/nodedotjs.svg" },
      { name: "Python", alt: "Python language logo", src: "/images/tech/python.svg" },
      { name: "Go", alt: "Go language logo", src: "/images/tech/go.svg" },
      { name: "GraphQL", alt: "GraphQL query language logo", src: "/images/tech/graphql.svg" },
    ],
  },
  {
    label: "Database",
    items: [
      { name: "PostgreSQL", alt: "PostgreSQL database logo", src: "/images/tech/postgresql.svg" },
      { name: "MongoDB", alt: "MongoDB database logo", src: "/images/tech/mongodb.svg" },
      { name: "Redis", alt: "Redis database logo", src: "/images/tech/redis.svg" },
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      { name: "Docker", alt: "Docker container platform logo", src: "/images/tech/docker.svg" },
      { name: "Kubernetes", alt: "Kubernetes orchestration logo", src: "/images/tech/kubernetes.svg" },
      { name: "AWS", alt: "Amazon Web Services cloud logo", src: "/images/tech/amazonaws.svg" },
      { name: "Vercel", alt: "Vercel deployment platform logo", src: "/images/tech/vercel.svg" },
    ],
  },
  {
    label: "Design",
    items: [
      { name: "Figma", alt: "Figma design tool logo", src: "/images/tech/figma.svg" },
      { name: "Storybook", alt: "Storybook component library logo", src: "/images/tech/storybook.svg" },
    ],
  },
];

export function TechStack() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-background-subtle">
      <CompositeSectionBackground layers={["dots", "spotlight-cyan"]} />
      <Container className="relative z-10">
        <AnimatedSection>
          <SectionHeader
            label="Tech Stack"
            title="Our Technology Stack"
            description="We use modern, proven technologies to build reliable, scalable solutions."
          />
        </AnimatedSection>

        <StaggerContainer className="space-y-8 max-w-4xl mx-auto">
          {techGroups.map((group) => (
            <StaggerItem key={group.label}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <p className="text-xs font-medium tracking-wider uppercase text-foreground-muted sm:w-36 shrink-0">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-4">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center justify-center w-11 h-11 rounded-xl border border-card-border bg-white p-2.5 transition-all duration-300 hover:border-brand/30 hover:shadow-[0_2px_8px_rgba(32,133,53,0.08)] hover:scale-105"
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        width={24}
                        height={24}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                      {/* Tech name tooltip */}
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-brand-dark px-2 py-0.5 text-[10px] font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
