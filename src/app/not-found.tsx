"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Compass, Briefcase, BookOpen, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";

const popularPages = [
  { label: "Services", href: "/services", icon: Briefcase, description: "What we do" },
  { label: "Case Studies", href: "/case-studies", icon: Compass, description: "Our work" },
  { label: "Blog", href: "/blog", icon: BookOpen, description: "Insights & news" },
  { label: "Contact", href: "/contact", icon: Mail, description: "Get in touch" },
];

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background decorations */}
      <div
        className="absolute inset-0 grid-pattern pointer-events-none z-0"
        style={{ opacity: 0.5 }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 dot-pattern pointer-events-none z-0"
        style={{ opacity: 0.3 }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -top-20 left-1/4 w-[700px] h-[500px] radial-glow-brand pointer-events-none z-0"
        aria-hidden="true"
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-20 w-[600px] h-[400px] radial-glow-cyan pointer-events-none z-0"
        aria-hidden="true"
        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.04, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <Container className="relative z-10 py-20">
        <div className="max-w-2xl mx-auto">
          {/* Breadcrumb */}
          <AnimatedSection variant="fadeIn" delay={0}>
            <BreadcrumbNav
              items={[
                { label: "Home", href: "/" },
                { label: "Page Not Found" },
              ]}
            />
          </AnimatedSection>

          {/* Animated 404 illustration */}
          <AnimatedSection variant="scale" delay={0.1}>
            <div className="relative flex items-center justify-center mb-6">
              {/* Floating geometric decorations */}
              <div
                className="absolute -top-4 -left-6 w-5 h-5 rounded-sm bg-brand/10 animate-geo-1"
                aria-hidden="true"
              />
              <div
                className="absolute top-2 -right-8 w-3 h-3 rounded-full bg-accent-cyan/15 animate-geo-2"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-3 left-1/4 w-4 h-4 rotate-45 bg-accent-violet/10 animate-geo-3"
                aria-hidden="true"
              />

              {/* Main 404 SVG illustration */}
              <svg
                viewBox="0 0 400 180"
                className="w-full max-w-md"
                aria-hidden="true"
              >
                {/* Soft background glow */}
                <defs>
                  <radialGradient id="glow404" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#208535" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#208535" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="grad404" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#208535" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <ellipse cx="200" cy="140" rx="160" ry="30" fill="url(#glow404)" />

                {/* Animated "4" (left) */}
                <motion.text
                  x="60"
                  y="130"
                  fontSize="120"
                  fontWeight="700"
                  fill="url(#grad404)"
                  fontFamily="system-ui, sans-serif"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  4
                </motion.text>

                {/* Animated "0" with pulse ring */}
                <motion.circle
                  cx="200"
                  cy="95"
                  r="45"
                  fill="none"
                  stroke="url(#grad404)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.6, 0.3] }}
                  transition={{ duration: 1.5, delay: 0.4 }}
                />
                <motion.circle
                  cx="200"
                  cy="95"
                  r="55"
                  fill="none"
                  stroke="#208535"
                  strokeWidth="1"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />
                <motion.text
                  x="175"
                  y="115"
                  fontSize="72"
                  fontWeight="700"
                  fill="url(#grad404)"
                  fontFamily="system-ui, sans-serif"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                >
                  0
                </motion.text>

                {/* Animated "4" (right) */}
                <motion.text
                  x="280"
                  y="130"
                  fontSize="120"
                  fontWeight="700"
                  fill="url(#grad404)"
                  fontFamily="system-ui, sans-serif"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  4
                </motion.text>

                {/* Small orbiting dot */}
                <motion.circle
                  cx="200"
                  cy="95"
                  r="5"
                  fill="#208535"
                  initial={false}
                  animate={{
                    cx: [200, 245, 200, 155, 200],
                    cy: [50, 95, 140, 95, 50],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </svg>
            </div>
          </AnimatedSection>

          {/* Heading & message */}
          <AnimatedSection variant="slideUp" delay={0.3}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center mb-3">
              Looks like this page took a vacation
            </h1>
          </AnimatedSection>

          <AnimatedSection variant="slideUp" delay={0.4}>
            <p className="text-base md:text-lg text-foreground-secondary leading-relaxed text-center max-w-md mx-auto mb-10">
              We searched everywhere, but couldn&apos;t find the page you&apos;re looking for.
              Maybe one of these will help?
            </p>
          </AnimatedSection>

          {/* Popular page links */}
          <AnimatedSection variant="slideUp" delay={0.5}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {popularPages.map((page) => {
                const Icon = page.icon;
                return (
                  <a
                    key={page.href}
                    href={page.href}
                    className="group flex flex-col items-center gap-2 p-4 rounded-2xl glass-card transition-all duration-300 text-center"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center group-hover:bg-brand/15 transition-colors">
                      <Icon className="w-5 h-5 text-brand" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {page.label}
                    </span>
                    <span className="text-xs text-foreground-muted">
                      {page.description}
                    </span>
                  </a>
                );
              })}
            </div>
          </AnimatedSection>

          {/* CTA button */}
          <AnimatedSection variant="slideUp" delay={0.6}>
            <div className="flex justify-center">
              <Button href="/" variant="primary" size="lg">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
