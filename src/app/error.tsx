"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Home, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { buildMailtoErrorLink } from "@/lib/error-report";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const reportLink = useMemo(() => buildMailtoErrorLink(error), [error]);

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
      <motion.div
        className="absolute bottom-0 left-1/3 w-[500px] h-[350px] radial-glow-violet pointer-events-none z-0"
        aria-hidden="true"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <Container className="relative z-10 py-20">
        <div className="max-w-2xl mx-auto">
          {/* Breadcrumb */}
          <AnimatedSection variant="fadeIn" delay={0}>
            <BreadcrumbNav
              items={[
                { label: "Home", href: "/" },
                { label: "Error" },
              ]}
            />
          </AnimatedSection>

          {/* Animated illustration */}
          <AnimatedSection variant="scale" delay={0.1}>
            <div className="flex justify-center mb-8">
              <svg
                viewBox="0 0 200 200"
                className="w-40 h-40 sm:w-48 sm:h-48"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="errGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#208535" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>

                {/* Outer rotating ring */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="url(#errGrad)"
                  strokeWidth="2"
                  strokeDasharray="12 8"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "100px 100px" }}
                />

                {/* Inner pulsing ring */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#208535"
                  strokeWidth="1.5"
                  initial={{ scale: 0.9, opacity: 0.3 }}
                  animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.3, 0.15, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "100px 100px" }}
                />

                {/* Warning triangle */}
                <motion.path
                  d="M100 45 L145 125 L55 125 Z"
                  fill="none"
                  stroke="url(#errGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />

                {/* Exclamation mark */}
                <motion.line
                  x1="100"
                  y1="75"
                  x2="100"
                  y2="100"
                  stroke="url(#errGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 1 }}
                />
                <motion.circle
                  cx="100"
                  cy="112"
                  r="2.5"
                  fill="#208535"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.2 }}
                />

                {/* Floating accent dots */}
                <motion.circle
                  cx="30"
                  cy="60"
                  r="3"
                  fill="#06b6d4"
                  opacity="0.3"
                  animate={{ y: [0, -6, 0], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0 }}
                />
                <motion.circle
                  cx="170"
                  cy="50"
                  r="2.5"
                  fill="#8b5cf6"
                  opacity="0.3"
                  animate={{ y: [0, -8, 0], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                />
                <motion.circle
                  cx="160"
                  cy="160"
                  r="2"
                  fill="#208535"
                  opacity="0.25"
                  animate={{ y: [0, -5, 0], opacity: [0.25, 0.4, 0.25] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                />
              </svg>
            </div>
          </AnimatedSection>

          {/* Heading & message */}
          <AnimatedSection variant="slideUp" delay={0.3}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center mb-3">
              Something went wrong
            </h1>
          </AnimatedSection>

          <AnimatedSection variant="slideUp" delay={0.4}>
            <p className="text-base md:text-lg text-foreground-secondary leading-relaxed text-center max-w-md mx-auto mb-10">
              An unexpected error occurred. Don&apos;t worry &mdash; try again or head
              back to the homepage.
            </p>
          </AnimatedSection>

          {/* Action buttons */}
          <AnimatedSection variant="slideUp" delay={0.5}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button onClick={() => reset()} variant="primary" size="lg">
                <RotateCcw className="w-4 h-4" />
                Try Again
              </Button>
              <Button href="/" variant="secondary" size="lg">
                <Home className="w-4 h-4" />
                Go Home
              </Button>
              <Button onClick={() => { if (typeof window !== "undefined") window.history.back(); }} variant="ghost" size="lg">
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
            </div>
          </AnimatedSection>

          {/* Report issue link */}
          <AnimatedSection variant="fadeIn" delay={0.6}>
            <div className="flex justify-center mt-6">
              <a
                href={reportLink}
                className="inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-sm"
              >
                <Mail className="w-4 h-4" />
                Report this issue
              </a>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
