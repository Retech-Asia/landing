"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState, useCallback } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { cn } from "@/lib/cn";

const faqItems = [
  {
    question: "What services does Retech Solutions offer?",
    answer:
      "We offer full-cycle software development services including custom web and mobile applications, CMS platforms (WordPress, Strapi, Webflow), CRM solutions (Salesforce, HubSpot integrations), ERP systems, AI-powered products, and dedicated development team services. Our expertise spans the entire lifecycle from business analysis and UI/UX design through development, testing, and deployment.",
  },
  {
    question: "How does the dedicated team model work?",
    answer:
      "Our dedicated team model provides you with a fully integrated extension of your in-house team. We assemble developers, designers, and project managers based on your tech stack and project requirements. The team works exclusively on your project, follows your processes, and reports directly to you. You retain full control over priorities and sprint planning while we handle recruitment, infrastructure, and HR.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "We work with a modern tech stack including React, Next.js, Vue.js, Node.js, Python, and TypeScript on the frontend and backend. For mobile, we use React Native and Flutter. Our CMS expertise covers WordPress, Strapi, and headless CMS architectures. We also have strong experience with cloud platforms (AWS, GCP, Azure), and we integrate AI/ML capabilities using frameworks like TensorFlow and OpenAI APIs.",
  },
  {
    question: "How do you handle communication and project management?",
    answer:
      "We use agile methodologies with regular sprint planning, daily standups, and retrospectives. Communication happens through your preferred channels — Slack, Microsoft Teams, or Zoom. You receive weekly progress reports and have direct access to the project manager and development team. We also use tools like Jira, Linear, or Notion for transparent task tracking, so you always know the status of your project.",
  },
  {
    question: "What are your pricing models?",
    answer:
      "We offer three flexible pricing models: (1) Fixed Price — ideal for projects with well-defined scope and requirements, giving you cost certainty upfront. (2) Time & Materials — best for evolving projects where flexibility is needed, billed hourly based on actual work. (3) Dedicated Team — a monthly retainer for ongoing collaboration with a dedicated team. We recommend the best model based on your project scope and business objectives during our initial consultation.",
  },
];

/* ── Staggered FAQ Accordion with smooth height animation ── */
function FAQAccordion({ items }: { items: typeof faqItems }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = (index + 1) % items.length;
        document.getElementById(`faq-trigger-${next}`)?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = (index - 1 + items.length) % items.length;
        document.getElementById(`faq-trigger-${prev}`)?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        document.getElementById("faq-trigger-0")?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        document.getElementById(`faq-trigger-${items.length - 1}`)?.focus();
      }
    },
    [items.length]
  );

  return (
    <div className="divide-y divide-black/[0.06]">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const itemNumber = String(index + 1).padStart(2, "0");
        const triggerId = `faq-trigger-${index}`;
        const panelId = `faq-panel-${index}`;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.45,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn(
              "group/item relative transition-colors duration-300",
              !isOpen && "hover:bg-black/[0.02]"
            )}
          >
            {/* Brand green left border that fades in when open */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-brand origin-top"
                />
              )}
            </AnimatePresence>

            <button
              id={triggerId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex items-center justify-between w-full py-5 text-left group cursor-pointer pl-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-inset"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              <div className="flex items-center gap-4 pr-4 min-w-0">
                <span
                  className={cn(
                    "text-xs font-mono font-medium tabular-nums shrink-0 transition-colors duration-300",
                    isOpen
                      ? "text-brand"
                      : "text-black/25 group-hover/item:text-black/40"
                  )}
                >
                  {itemNumber}
                </span>
                <span className="text-base font-medium text-foreground group-hover/item:text-brand transition-colors truncate">
                  {item.question}
                </span>
              </div>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="shrink-0"
              >
                <ChevronDown
                  size={18}
                  className={cn(
                    "transition-colors duration-300",
                    isOpen ? "text-brand" : "text-foreground-muted"
                  )}
                />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: {
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1],
                    },
                    opacity: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-sm text-foreground-secondary leading-relaxed pl-9">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export function HomeFAQ() {
  return (
    <section className="py-20 md:py-28 bg-background-subtle relative" aria-label="Frequently asked questions">
      <Container>
        <SectionHeader
          label="FAQ"
          title="Frequently Asked Questions"
          description="Get answers to common questions about working with Retech Solutions."
        />

        <AnimatedSection className="max-w-3xl mx-auto">
          <FAQAccordion items={faqItems} />
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="mt-8 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:gap-3 transition-all py-2 -my-2 px-1 -mx-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-sm"
          >
            View all FAQ
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </AnimatedSection>
      </Container>
    </section>
  );
}
