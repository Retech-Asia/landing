"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Smartphone,
  Building2,
  BrainCircuit,
  Layers,
  ChevronRight,
  ArrowLeft,
  Users,
  CalendarRange,
  DollarSign,
  Mail,
  Sparkles,
  RotateCcw,
  Check,
  Zap,
  Clock,
  TrendingUp,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
// CONTACT import removed — no longer needed since mailto was replaced with API POST

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ProjectType = "web-app" | "mobile-app" | "cms-crm-erp" | "ai-ml" | "other";
type Scope = "mvp" | "medium" | "large" | "enterprise";
type TeamSize = "small" | "medium" | "large" | "xl";

interface StepOption {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  borderColor: string;
}

// ---------------------------------------------------------------------------
// Step configurations
// ---------------------------------------------------------------------------

const projectTypes: StepOption[] = [
  {
    id: "web-app",
    label: "Web App",
    description: "SaaS platforms, portals, custom web applications",
    icon: Globe,
    color: "text-brand",
    bg: "bg-brand/10",
    borderColor: "border-brand/30",
  },
  {
    id: "mobile-app",
    label: "Mobile App",
    description: "iOS, Android, cross-platform (React Native / Flutter)",
    icon: Smartphone,
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
    borderColor: "border-accent-cyan/30",
  },
  {
    id: "cms-crm-erp",
    label: "CMS / CRM / ERP",
    description: "Content management, CRM, business automation systems",
    icon: Building2,
    color: "text-accent-violet",
    bg: "bg-accent-violet/10",
    borderColor: "border-accent-violet/30",
  },
  {
    id: "ai-ml",
    label: "AI / ML Solution",
    description: "Machine learning, NLP, computer vision, AI-powered tools",
    icon: BrainCircuit,
    color: "text-brand",
    bg: "bg-brand/10",
    borderColor: "border-brand/30",
  },
  {
    id: "other",
    label: "Other",
    description: "Custom projects, consulting, or something unique",
    icon: Layers,
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
    borderColor: "border-accent-cyan/30",
  },
];

const scopes: StepOption[] = [
  {
    id: "mvp",
    label: "MVP",
    description: "2 - 4 weeks",
    icon: Zap,
    color: "text-brand",
    bg: "bg-brand/10",
    borderColor: "border-brand/30",
  },
  {
    id: "medium",
    label: "Medium",
    description: "1 - 3 months",
    icon: Clock,
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
    borderColor: "border-accent-cyan/30",
  },
  {
    id: "large",
    label: "Large",
    description: "3 - 6 months",
    icon: TrendingUp,
    color: "text-accent-violet",
    bg: "bg-accent-violet/10",
    borderColor: "border-accent-violet/30",
  },
  {
    id: "enterprise",
    label: "Enterprise",
    description: "6+ months",
    icon: CalendarRange,
    color: "text-brand",
    bg: "bg-brand/10",
    borderColor: "border-brand/30",
  },
];

const teamSizes: StepOption[] = [
  {
    id: "small",
    label: "1 - 2 developers",
    description: "Lean, focused delivery",
    icon: Users,
    color: "text-brand",
    bg: "bg-brand/10",
    borderColor: "border-brand/30",
  },
  {
    id: "medium",
    label: "3 - 5 team",
    description: "Balanced team with mixed roles",
    icon: Users,
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
    borderColor: "border-accent-cyan/30",
  },
  {
    id: "large",
    label: "5 - 10 team",
    description: "Full squad, multi-discipline",
    icon: Users,
    color: "text-accent-violet",
    bg: "bg-accent-violet/10",
    borderColor: "border-accent-violet/30",
  },
  {
    id: "xl",
    label: "10+ team",
    description: "Large-scale delivery organization",
    icon: Users,
    color: "text-brand",
    bg: "bg-brand/10",
    borderColor: "border-brand/30",
  },
];

// ---------------------------------------------------------------------------
// Pricing logic
// ---------------------------------------------------------------------------

const basePrices: Record<Scope, { min: number; max: number }> = {
  mvp: { min: 10_000, max: 25_000 },
  medium: { min: 25_000, max: 75_000 },
  large: { min: 75_000, max: 150_000 },
  enterprise: { min: 150_000, max: 300_000 },
};

const teamMultipliers: Record<TeamSize, number> = {
  small: 1,
  medium: 1.5,
  large: 2,
  xl: 2.5,
};

function formatCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `$${Math.round(value / 1_000)}K`;
  }
  return `$${value.toLocaleString()}`;
}

function getEstimate(scope: Scope, teamSize: TeamSize) {
  const base = basePrices[scope];
  const factor = teamMultipliers[teamSize];
  const min = Math.round(base.min * factor);
  const max = Math.round(base.max * factor);
  return {
    min,
    max,
    label:
      scope === "enterprise" && teamSize === "xl"
        ? "Enterprise-Scale Project"
        : scope === "enterprise"
          ? "Enterprise Project"
          : scope === "large" && (teamSize === "large" || teamSize === "xl")
            ? "Large-Scale Project"
            : "Project Estimate",
    range: `${formatCurrency(min)} - ${formatCurrency(max)}`,
  };
}

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const customEase: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: customEase },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.25, ease: customEase },
  }),
};

const resultVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: customEase },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.35, ease: "easeOut" as const },
  }),
};

// ---------------------------------------------------------------------------
// Step labels & meta
// ---------------------------------------------------------------------------

const steps = [
  { label: "Project Type", shortLabel: "Type" },
  { label: "Project Scope", shortLabel: "Scope" },
  { label: "Team Size", shortLabel: "Team" },
];

const stepHeadings: Record<number, { title: string; subtitle: string }> = {
  0: {
    title: "What type of project?",
    subtitle: "Select the category that best describes your project.",
  },
  1: {
    title: "What's the project scope?",
    subtitle: "How long do you expect the engagement to last?",
  },
  2: {
    title: "Team size needed?",
    subtitle: "How large a team do you envision for this project?",
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ProjectEstimator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selections, setSelections] = useState<{
    projectType?: ProjectType;
    scope?: Scope;
    teamSize?: TeamSize;
  }>({});

  // Lead capture form state — revealed when user clicks "Get a Detailed Quote".
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadInfo, setLeadInfo] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmitLead(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    // Basic validation
    if (!leadInfo.name.trim() || leadInfo.name.trim().length < 2) {
      setSubmitError("Please enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadInfo.email)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadInfo.name.trim(),
          email: leadInfo.email.trim(),
          // Honeypot — grab from hidden field
          website: (document.querySelector('input[name="estimator-website"]') as HTMLInputElement)?.value || undefined,
          company: leadInfo.company.trim() || undefined,
          phone: leadInfo.phone.trim() || undefined,
          notes: leadInfo.notes.trim() || undefined,
          projectType: selections.projectType,
          projectTypeLabel: projectTypes.find((p) => p.id === selections.projectType)?.label,
          scope: selections.scope,
          scopeLabel: scLabel?.label,
          scopeDescription: scLabel?.description,
          teamSize: selections.teamSize,
          teamSizeLabel: tsLabel?.label,
          teamSizeDescription: tsLabel?.description,
          estimateLabel: estimate?.label,
          estimateRange: estimate?.range,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        setSubmitError(
          (typeof data.error === "string" && data.error) ||
            "Something went wrong. Please try again or email us directly.",
        );
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Network error — please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const isComplete = currentStep === 3;

  const handleSelect = useCallback(
    (step: number, value: string) => {
      if (step === 0) setSelections((prev) => ({ ...prev, projectType: value as ProjectType }));
      if (step === 1) setSelections((prev) => ({ ...prev, scope: value as Scope }));
      if (step === 2) setSelections((prev) => ({ ...prev, teamSize: value as TeamSize }));
      setDirection(1);
      setCurrentStep(step + 1);
    },
    [],
  );

  const handleBack = useCallback(() => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(0, prev - 1));
  }, []);

  const handleReset = useCallback(() => {
    setDirection(-1);
    setCurrentStep(0);
    setSelections({});
  }, []);

  const getStepOptions = (step: number): StepOption[] => {
    if (step === 0) return projectTypes;
    if (step === 1) return scopes;
    return teamSizes;
  };

  const getSelectedValue = (step: number): string | undefined => {
    if (step === 0) return selections.projectType;
    if (step === 1) return selections.scope;
    return selections.teamSize;
  };

  const estimate =
    selections.scope && selections.teamSize
      ? getEstimate(selections.scope, selections.teamSize)
      : null;

  // Lead capture form labels — used by /api/estimate when the user submits.
  const scLabel = scopes.find((s) => s.id === selections.scope);
  const tsLabel = teamSizes.find((t) => t.id === selections.teamSize);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* ---------------------------------------------------------------- */}
      {/* Step indicators — numbered circles connected by lines            */}
      {/* ---------------------------------------------------------------- */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {steps.map((step, i) => {
            const isCompleted = i < currentStep;
            const isActive = i === currentStep;
            const isPending = i > currentStep;

            return (
              <div key={step.label} className="flex items-center">
                {/* Step circle + label */}
                <div className="flex flex-col items-center gap-1.5">
                  <motion.div
                    className={cn(
                      "relative w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300",
                      isCompleted && "bg-brand text-white",
                      isActive && "bg-foreground text-white ring-4 ring-foreground/10",
                      isPending && "bg-black/[0.06] text-foreground-muted",
                    )}
                    animate={
                      isActive
                        ? { scale: [1, 1.08, 1], transition: { duration: 0.4 } }
                        : undefined
                    }
                  >
                    {isCompleted ? (
                      <Check size={14} strokeWidth={3} />
                    ) : (
                      i + 1
                    )}
                  </motion.div>
                  <span
                    className={cn(
                      "text-[11px] font-medium transition-colors duration-300 hidden sm:block",
                      isCompleted && "text-brand",
                      isActive && "text-foreground",
                      isPending && "text-foreground-muted",
                    )}
                  >
                    {step.shortLabel}
                  </span>
                </div>

                {/* Connector line between circles */}
                {i < steps.length - 1 && (
                  <div className="relative w-12 sm:w-20 h-0.5 mx-1.5 sm:mx-3 rounded-full bg-black/[0.06] overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand to-accent-cyan rounded-full"
                      initial={{ width: "0%" }}
                      animate={{
                        width: i < currentStep ? "100%" : i === currentStep ? "50%" : "0%",
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Step content card                                                */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
        {/* Subtle top gradient accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent"
          aria-hidden="true"
        />

        <AnimatePresence mode="wait" custom={direction}>
          {!isComplete ? (
            /* ============================================================ */
            /* FORM STEPS                                                    */
            /* ============================================================ */
            <motion.div
              key={`step-${currentStep}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="p-6 md:p-8"
            >
              {/* Step heading */}
              <div className="mb-6">
                <motion.h3
                  className="text-lg font-semibold text-foreground mb-1"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {stepHeadings[currentStep]?.title}
                </motion.h3>
                <motion.p
                  className="text-sm text-foreground-secondary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  {stepHeadings[currentStep]?.subtitle}
                </motion.p>
              </div>

              {/* Options grid */}
              <div
                className={cn(
                  "grid gap-3",
                  currentStep === 0
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2",
                )}
              >
                {getStepOptions(currentStep).map((option, idx) => {
                  const isSelected = getSelectedValue(currentStep) === option.id;
                  const Icon = option.icon;
                  return (
                    <motion.button
                      key={option.id}
                      type="button"
                      onClick={() => handleSelect(currentStep, option.id)}
                      custom={idx}
                      variants={staggerItem}
                      initial="hidden"
                      animate="visible"
                      className={cn(
                        "group relative flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer",
                        "hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                        isSelected
                          ? `${option.borderColor} bg-brand/[0.03] shadow-[0_2px_12px_rgba(32,133,53,0.08)]`
                          : "border-card-border bg-card-bg hover:border-black/[0.12]",
                      )}
                    >
                      <div
                        className={cn(
                          "p-2 rounded-lg shrink-0 transition-transform duration-200 group-hover:scale-105",
                          option.bg,
                        )}
                      >
                        <Icon size={18} className={option.color} strokeWidth={1.75} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground mb-0.5">
                          {option.label}
                        </p>
                        <p className="text-xs text-foreground-secondary leading-relaxed">
                          {option.description}
                        </p>
                      </div>
                      <ChevronRight
                        size={14}
                        className={cn(
                          "shrink-0 mt-0.5 transition-all duration-200",
                          isSelected
                            ? "text-brand translate-x-0 opacity-100"
                            : "text-foreground-muted -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                        )}
                      />

                      {/* Selected checkmark badge */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={cn(
                            "absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center",
                            option.bg,
                          )}
                        >
                          <Check size={10} className={option.color} strokeWidth={3} />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Back button */}
              {currentStep > 0 && (
                <motion.button
                  type="button"
                  onClick={handleBack}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-1.5 mt-5 text-sm text-foreground-secondary hover:text-foreground transition-colors cursor-pointer focus-visible:outline-none focus-visible:underline"
                >
                  <ArrowLeft size={14} />
                  Back
                </motion.button>
              )}
            </motion.div>
          ) : (
            /* ============================================================ */
            /* RESULT STEP                                                   */
            /* ============================================================ */
            <motion.div
              key="result"
              variants={resultVariants}
              initial="hidden"
              animate="visible"
              className="p-6 md:p-8"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand/10 mb-4"
                >
                  <Sparkles size={24} className="text-brand" strokeWidth={1.75} />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg font-semibold text-foreground mb-1"
                >
                  Your Estimated Budget
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-sm text-foreground-secondary"
                >
                  Based on your selections, here&apos;s a ballpark estimate.
                </motion.p>
              </div>

              {/* Selection summary cards */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-3 gap-3 mb-8"
              >
                {/* Project Type summary */}
                <div className="flex flex-col items-center p-3.5 rounded-xl bg-black/[0.02] border border-black/[0.04]">
                  {(() => {
                    const pt = projectTypes.find((p) => p.id === selections.projectType);
                    if (!pt) return null;
                    const Icon = pt.icon;
                    return (
                      <>
                        <div className={cn("p-1.5 rounded-md mb-2", pt.bg)}>
                          <Icon size={14} className={pt.color} strokeWidth={1.75} />
                        </div>
                        <p className="text-xs font-semibold text-foreground text-center leading-tight">
                          {pt.label}
                        </p>
                      </>
                    );
                  })()}
                </div>

                {/* Scope summary */}
                <div className="flex flex-col items-center p-3.5 rounded-xl bg-black/[0.02] border border-black/[0.04]">
                  {(() => {
                    const sc = scopes.find((s) => s.id === selections.scope);
                    if (!sc) return null;
                    const Icon = sc.icon;
                    return (
                      <>
                        <div className={cn("p-1.5 rounded-md mb-2", sc.bg)}>
                          <Icon size={14} className={sc.color} strokeWidth={1.75} />
                        </div>
                        <p className="text-xs font-semibold text-foreground text-center leading-tight">
                          {sc.label}
                        </p>
                        <p className="text-[10px] text-foreground-muted mt-0.5">{sc.description}</p>
                      </>
                    );
                  })()}
                </div>

                {/* Team size summary */}
                <div className="flex flex-col items-center p-3.5 rounded-xl bg-black/[0.02] border border-black/[0.04]">
                  {(() => {
                    const ts = teamSizes.find((t) => t.id === selections.teamSize);
                    if (!ts) return null;
                    return (
                      <>
                        <div className={cn("p-1.5 rounded-md mb-2", ts.bg)}>
                          <Users size={14} className={ts.color} strokeWidth={1.75} />
                        </div>
                        <p className="text-xs font-semibold text-foreground text-center leading-tight">
                          {ts.label}
                        </p>
                        <p className="text-[10px] text-foreground-muted mt-0.5">{ts.description}</p>
                      </>
                    );
                  })()}
                </div>
              </motion.div>

              {/* Price range — hero display */}
              {estimate && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 180, damping: 14 }}
                  className="relative flex items-center justify-center gap-3 p-6 rounded-xl bg-gradient-to-r from-brand/[0.04] via-accent-cyan/[0.03] to-accent-violet/[0.04] border border-brand/10 mb-4 overflow-hidden"
                >
                  {/* Decorative background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.02] to-accent-cyan/[0.02] pointer-events-none" />
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-accent-cyan/5 rounded-full blur-2xl pointer-events-none" />

                  <div className="relative flex items-center gap-3">
                    <DollarSign size={22} className="text-brand shrink-0" strokeWidth={1.75} />
                    <div>
                      <p className="text-xs text-foreground-secondary mb-0.5">{estimate.label}</p>
                      <p className="text-2xl md:text-3xl font-bold gradient-text-brand">
                        {estimate.range}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Disclaimer */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs text-foreground-muted text-center mb-6 leading-relaxed max-w-md mx-auto"
              >
                This is a rough estimate based on typical project parameters using offshore rates.
                Actual costs may vary depending on specific requirements, complexity, and technology
                choices.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3"
              >
                <button
                  type="button"
                  onClick={() => {
                    setShowLeadForm(true);
                    setSubmitError(null);
                  }}
                  className="group/btn inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-full bg-gradient-to-r from-brand to-accent-cyan text-white transition-all duration-300 hover:shadow-[0_4px_20px_rgba(32,133,53,0.25)] hover:shadow-brand/25 btn-shimmer active:scale-[0.97]"
                >
                  <Mail size={16} />
                  Get a Detailed Quote
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
                  />
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-3 text-sm font-medium rounded-full text-foreground-secondary hover:text-foreground hover:bg-black/[0.04] transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  <RotateCcw size={14} />
                  Start Over
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lead capture form — revealed when user clicks "Get a Detailed Quote".
            Replaces the old mailto link. Submits to /api/estimate which sends
            an email via Resend. */}
        <AnimatePresence>
          {showLeadForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              {submitted ? (
                <div
                  role="status"
                  className="mt-6 p-6 rounded-2xl bg-brand/[0.06] border border-brand/15 text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand/15 text-brand mb-3">
                    <Check size={24} strokeWidth={2.5} />
                  </div>
                  <h4 className="text-base font-semibold text-foreground mb-1">
                    Thanks — request received
                  </h4>
                  <p className="text-sm text-foreground-secondary max-w-md mx-auto">
                    We&apos;ll review your project details and reply within 24
                    hours with a tailored quote.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setShowLeadForm(false);
                      handleReset();
                    }}
                    className="mt-4 text-xs font-medium text-brand hover:text-brand-dark transition-colors cursor-pointer"
                  >
                    Estimate another project
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmitLead}
                  className="mt-6 p-5 sm:p-6 rounded-2xl bg-white border border-black/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] space-y-4"
                  noValidate
                >
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="estimator-website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-9999px", opacity: 0, width: 1, height: 1 }}
                  />
                  <div>
                    <h4 className="text-base font-semibold text-foreground">
                      Get your detailed quote
                    </h4>
                    <p className="text-sm text-foreground-muted mt-1">
                      We&apos;ll send a tailored proposal within 24 hours.
                      Based on: <span className="font-medium text-foreground-secondary">{estimate?.range}</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="block text-xs font-medium text-foreground-secondary mb-1.5">
                        Name <span className="text-brand">*</span>
                      </span>
                      <input
                        type="text"
                        required
                        autoComplete="name"
                        value={leadInfo.name}
                        onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                        className="w-full h-11 px-3.5 text-base rounded-lg border border-black/[0.10] bg-white text-foreground placeholder:text-foreground-muted/60 focus:border-brand/40 focus:ring-2 focus:ring-brand/10 focus:outline-none transition-all"
                        placeholder="Your name"
                      />
                    </label>
                    <label className="block">
                      <span className="block text-xs font-medium text-foreground-secondary mb-1.5">
                        Email <span className="text-brand">*</span>
                      </span>
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        value={leadInfo.email}
                        onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                        className="w-full h-11 px-3.5 text-base rounded-lg border border-black/[0.10] bg-white text-foreground placeholder:text-foreground-muted/60 focus:border-brand/40 focus:ring-2 focus:ring-brand/10 focus:outline-none transition-all"
                        placeholder="you@company.com"
                      />
                    </label>
                    <label className="block">
                      <span className="block text-xs font-medium text-foreground-secondary mb-1.5">
                        Company <span className="text-foreground-muted">(optional)</span>
                      </span>
                      <input
                        type="text"
                        autoComplete="organization"
                        value={leadInfo.company}
                        onChange={(e) => setLeadInfo({ ...leadInfo, company: e.target.value })}
                        className="w-full h-11 px-3.5 text-base rounded-lg border border-black/[0.10] bg-white text-foreground placeholder:text-foreground-muted/60 focus:border-brand/40 focus:ring-2 focus:ring-brand/10 focus:outline-none transition-all"
                        placeholder="Company name"
                      />
                    </label>
                    <label className="block">
                      <span className="block text-xs font-medium text-foreground-secondary mb-1.5">
                        Phone <span className="text-foreground-muted">(optional)</span>
                      </span>
                      <input
                        type="tel"
                        autoComplete="tel"
                        value={leadInfo.phone}
                        onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                        className="w-full h-11 px-3.5 text-base rounded-lg border border-black/[0.10] bg-white text-foreground placeholder:text-foreground-muted/60 focus:border-brand/40 focus:ring-2 focus:ring-brand/10 focus:outline-none transition-all"
                        placeholder="+84…"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="block text-xs font-medium text-foreground-secondary mb-1.5">
                      Project notes <span className="text-foreground-muted">(optional)</span>
                    </span>
                    <textarea
                      rows={3}
                      value={leadInfo.notes}
                      onChange={(e) => setLeadInfo({ ...leadInfo, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-base rounded-lg border border-black/[0.10] bg-white text-foreground placeholder:text-foreground-muted/60 focus:border-brand/40 focus:ring-2 focus:ring-brand/10 focus:outline-none transition-all resize-y"
                      placeholder="Tell us anything specific about your project, timeline, or constraints."
                    />
                  </label>

                  {submitError && (
                    <div
                      role="alert"
                      className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700"
                    >
                      {submitError}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-brand text-white hover:bg-brand-light active:scale-[0.97] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Mail size={14} />
                          Request Quote
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowLeadForm(false)}
                      disabled={submitting}
                      className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-full text-foreground-secondary hover:text-foreground hover:bg-black/[0.04] transition-all disabled:opacity-60 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
