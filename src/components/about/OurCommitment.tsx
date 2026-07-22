"use client";

import {
  Code2,
  MessageSquare,
  Clock,
  Handshake,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";

interface CommitmentItem {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const commitments: CommitmentItem[] = [
  {
    icon: Code2,
    title: "Quality Code",
    description:
      "Clean, maintainable, and well-tested code that follows industry best practices. We write software that is built to last and easy for any team to extend.",
    color: "text-brand",
    bgColor: "bg-brand/10",
  },
  {
    icon: MessageSquare,
    title: "Transparent Communication",
    description:
      "Regular updates, clear timelines, and direct access to the team working on your project. No middlemen, no surprises — just honest, open dialogue.",
    color: "text-accent-cyan",
    bgColor: "bg-accent-cyan/10",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description:
      "Realistic timelines set from the start, with proactive risk management and milestone tracking. We deliver when we say we will.",
    color: "text-accent-violet",
    bgColor: "bg-accent-violet/10",
  },
  {
    icon: Handshake,
    title: "Long-term Partnership",
    description:
      "We grow with our clients. From initial build through scaling and evolution, we invest in relationships that deliver lasting value for years to come.",
    color: "text-brand",
    bgColor: "bg-brand/10",
  },
];

export function OurCommitment() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <Container>
        <SectionHeader
          label="Our Commitment"
          title="What We Guarantee"
          description="Principles we hold ourselves to on every project, with every client."
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {commitments.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <div className="group relative h-full rounded-2xl bg-white border border-black/[0.06] p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-brand/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
                  <div
                    className={`w-10 h-10 rounded-xl ${item.bgColor} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon
                      size={20}
                      className={item.color}
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Container>
    </section>
  );
}
