"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  Users,
  Clock,
  ArrowRight,
  Mail,
  CheckCircle2,
  BarChart3,
  PiggyBank,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { CONTACT } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

type TeamSize = "small" | "medium" | "large" | "enterprise";
type Region = "us" | "eu" | "australia";
type ProjectionYear = 1 | 3 | 5;

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const teamSizeConfig: Record<
  TeamSize,
  { label: string; devs: number; description: string }
> = {
  small: { label: "Small Team", devs: 3, description: "3 developers" },
  medium: { label: "Medium Team", devs: 5, description: "5 developers" },
  large: { label: "Large Team", devs: 8, description: "8 developers" },
  enterprise: {
    label: "Enterprise",
    devs: 15,
    description: "15 developers",
  },
};

const regionConfig: Record<
  Region,
  { label: string; flag: string; avgRate: number }
> = {
  us: { label: "United States", flag: "US", avgRate: 12000 },
  eu: { label: "Western Europe", flag: "EU", avgRate: 10000 },
  australia: { label: "Australia", flag: "AU", avgRate: 11000 },
};

const VIETNAM_RATE = 4000; // Average monthly cost per developer

const projectionYears: { value: ProjectionYear; label: string }[] = [
  { value: 1, label: "1 Year" },
  { value: 3, label: "3 Years" },
  { value: 5, label: "5 Years" },
];

const hiddenCostFactors = [
  { label: "Recruitment & Onboarding", savings: 0.08, description: "We handle hiring, vetting, and onboarding at no extra cost." },
  { label: "Office & Infrastructure", savings: 0.05, description: "No office space, equipment, or utility costs." },
  { label: "Benefits & Insurance", savings: 0.12, description: "Health insurance, retirement, paid leave — all included." },
  { label: "Payroll & Compliance", savings: 0.04, description: "We handle local labor laws, taxes, and compliance." },
  { label: "Training & Development", savings: 0.03, description: "Continuous skills development covered by us." },
];

/* -------------------------------------------------------------------------- */
/*  Animated number hook                                                       */
/* -------------------------------------------------------------------------- */

function useAnimatedNumber(target: number, duration = 600, reducedMotion = false) {
  // When reduced motion is preferred, return target immediately — no animation.
  const [animated, setAnimated] = useState(target);
  const rafIdRef = useRef(0);

  useEffect(() => {
    if (reducedMotion) return;

    const start = animated;
    const diff = target - start;
    if (diff === 0) return;

    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimated(Math.round(start + diff * eased));
      if (progress < 1) {
        rafIdRef.current = requestAnimationFrame(step);
      }
    }

    rafIdRef.current = requestAnimationFrame(step);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = 0;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration, reducedMotion]);

  return reducedMotion ? target : animated;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function formatUSD(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `$${Math.round(value / 1_000)}K`;
  }
  return `$${value.toLocaleString()}`;
}

function formatUSDLong(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

/* -------------------------------------------------------------------------- */
/*  Savings bar                                                                */
/* -------------------------------------------------------------------------- */

function SavingsBar({
  label,
  localCost,
  vietnamCost,
  localColor,
  vietnamColor,
  delay,
}: {
  label: string;
  localCost: number;
  vietnamCost: number;
  localColor: string;
  vietnamColor: string;
  delay: number;
}) {
  const maxCost = localCost;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="space-y-2"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
        {label}
      </p>
      {/* Local bar */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-foreground-muted w-14 shrink-0">
          Local
        </span>
        <div className="flex-1 h-3 rounded-full bg-black/[0.04] overflow-hidden">
          <motion.div
            className={cn("h-full rounded-full origin-left", localColor)}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
          />
        </div>
        <span className="text-xs font-semibold text-foreground-muted w-20 text-right tabular-nums">
          {formatUSD(localCost)}
        </span>
      </div>
      {/* Vietnam bar */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-brand w-14 shrink-0">
          Vietnam
        </span>
        <div className="flex-1 h-3 rounded-full bg-black/[0.04] overflow-hidden">
          <motion.div
            className={cn("h-full rounded-full origin-left", vietnamColor)}
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: Math.max((vietnamCost / maxCost) * 100, 3) / 100,
            }}
            transition={{ duration: 0.8, delay: delay + 0.15, ease: "easeOut" }}
          />
        </div>
        <span className="text-xs font-semibold text-brand w-20 text-right tabular-nums">
          {formatUSD(vietnamCost)}
        </span>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Component                                                             */
/* -------------------------------------------------------------------------- */

export function ROICalculator() {
  const [teamSize, setTeamSize] = useState<TeamSize>("medium");
  const [region, setRegion] = useState<Region>("us");
  const [projection, setProjection] = useState<ProjectionYear>(3);
  const reducedMotion = usePrefersReducedMotion();

  const config = teamSizeConfig[teamSize];
  const regionInfo = regionConfig[region];
  const devs = config.devs;

  // Cost calculations
  const localMonthly = regionInfo.avgRate * devs;
  const vietnamMonthly = VIETNAM_RATE * devs;
  const monthlySavings = localMonthly - vietnamMonthly;
  const savingsPercent = Math.round((1 - vietnamMonthly / localMonthly) * 100);

  const hiddenSavings = Math.round(
    localMonthly * hiddenCostFactors.reduce((sum, f) => sum + f.savings, 0)
  );
  const totalMonthlySavings = monthlySavings + hiddenSavings;

  const annualLocal = localMonthly * 12;
  const annualVietnam = vietnamMonthly * 12;
  const annualSavings = totalMonthlySavings * 12;

  const projectedSavings = annualSavings * projection;
  const projectedLocal = annualLocal * projection;
  const projectedVietnam = annualVietnam * projection;

  // Animated numbers
  const animatedSavings = useAnimatedNumber(projectedSavings, 600, reducedMotion);
  const animatedPercent = useAnimatedNumber(savingsPercent, 600, reducedMotion);

  const handleTeamSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      if (val <= 3) setTeamSize("small");
      else if (val <= 6) setTeamSize("medium");
      else if (val <= 10) setTeamSize("large");
      else setTeamSize("enterprise");
    },
    []
  );

  const sliderValue = teamSizeConfig[teamSize].devs;

  // Build mailto link
  const mailtoBody = [
    `Hi Retech Solutions,`,
    ``,
    `I'm interested in exploring outsourcing savings:`,
    ``,
    `Team Size: ${config.description}`,
    `Current Region: ${regionInfo.label}`,
    `Estimated Annual Savings: ${formatUSDLong(annualSavings)}`,
    `${projection}-Year Projected Savings: ${formatUSDLong(projectedSavings)}`,
    ``,
    `I'd like to discuss this further.`,
    ``,
    `Thank you.`,
  ].join("\n");

  const mailtoHref = `${CONTACT.emailHref}?subject=${encodeURIComponent(
    `ROI Inquiry — ${config.label} Outsourcing to Vietnam`
  )}&body=${encodeURIComponent(mailtoBody)}`;

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center mb-12 md:mb-16"
        >
          <p className="text-sm font-medium tracking-widest uppercase text-brand mb-3">
            ROI Calculator
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Your Outsourcing Savings
          </h2>
          <p className="mt-4 text-lg text-foreground-secondary leading-relaxed">
            See how much you can save by building your team in Vietnam.
            Compare costs against US, EU, and Australian rates with multi-year projections.
          </p>
        </motion.div>

        {/* Calculator card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="mx-auto max-w-5xl"
        >
          <div className="rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] overflow-hidden">
            {/* Controls */}
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Team size slider */}
                <div className="space-y-2">
                  <label
                    htmlFor="roi-team-size"
                    className="flex items-center gap-2 text-sm font-semibold text-foreground"
                  >
                    <Users size={16} className="text-brand" />
                    Team Size
                  </label>
                  <div className="pt-2">
                    <input
                      id="roi-team-size"
                      type="range"
                      min={3}
                      max={15}
                      step={1}
                      value={sliderValue}
                      onChange={handleTeamSizeChange}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer bg-black/[0.06] accent-brand"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-foreground-muted">3</span>
                      <span className="text-lg font-bold text-brand tabular-nums">
                        {config.description}
                      </span>
                      <span className="text-xs text-foreground-muted">15</span>
                    </div>
                  </div>
                </div>

                {/* Region select */}
                <div className="space-y-2">
                  <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Globe size={16} className="text-brand" />
                    Compare Against
                  </span>
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {(Object.entries(regionConfig) as [Region, typeof regionConfig[Region]][]).map(
                      ([key, info]) => (
                        <button
                          key={key}
                          onClick={() => setRegion(key)}
                          className={cn(
                            "px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50",
                            region === key
                              ? "bg-brand text-white shadow-sm"
                              : "bg-black/[0.03] text-foreground-secondary hover:bg-black/[0.06]"
                          )}
                        >
                          {info.label.split(" ")[0]}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Projection period */}
                <div className="space-y-2">
                  <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Clock size={16} className="text-brand" />
                    Projection Period
                  </span>
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {projectionYears.map((py) => (
                      <button
                        key={py.value}
                        onClick={() => setProjection(py.value)}
                        className={cn(
                          "px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50",
                          projection === py.value
                            ? "bg-brand text-white shadow-sm"
                            : "bg-black/[0.03] text-foreground-secondary hover:bg-black/[0.06]"
                        )}
                      >
                        {py.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-black/[0.06]" />

            {/* Results */}
            <div className="p-6 md:p-8 bg-background-subtle/50">
              {/* Hero metric: Projected total savings */}
              <div className="text-center mb-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-2">
                  Estimated {projection}-Year Savings
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={animatedSavings}
                    initial={{ opacity: 0.6, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand tabular-nums"
                  >
                    {formatUSDLong(animatedSavings)}
                  </motion.p>
                </AnimatePresence>
                <p className="text-sm font-medium text-brand mt-2 flex items-center justify-center gap-1.5">
                  <TrendingUp size={14} />
                  {animatedPercent}% lower cost than {regionInfo.label}
                </p>
              </div>

              {/* Comparison bars */}
              <div className="space-y-6 max-w-xl mx-auto">
                <SavingsBar
                  label="Monthly Cost"
                  localCost={localMonthly}
                  vietnamCost={vietnamMonthly}
                  localColor="bg-red-200"
                  vietnamColor="bg-brand"
                  delay={0.1}
                />
                <SavingsBar
                  label={`${projection}-Year Total`}
                  localCost={projectedLocal}
                  vietnamCost={projectedVietnam}
                  localColor="bg-red-200"
                  vietnamColor="bg-brand"
                  delay={0.2}
                />
              </div>

              {/* Hidden savings breakdown */}
              <div className="mt-8 pt-6 border-t border-black/[0.06]">
                <div className="flex items-center gap-2 mb-4">
                  <PiggyBank size={16} className="text-brand" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
                    Additional Hidden Savings (Monthly)
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {hiddenCostFactors.map((factor, i) => (
                    <motion.div
                      key={factor.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                      className="group relative p-3.5 rounded-xl bg-white border border-black/[0.04] hover:border-brand/20 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-semibold text-foreground">
                          {factor.label}
                        </p>
                        <span className="text-xs font-bold text-brand tabular-nums">
                          ~{formatUSD(Math.round(localMonthly * factor.savings))}
                        </span>
                      </div>
                      <p className="text-[11px] text-foreground-muted leading-relaxed">
                        {factor.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-brand">
                  <DollarSign size={16} />
                  <span>
                    +{formatUSDLong(hiddenSavings)}/mo in avoided overhead
                  </span>
                </div>
              </div>

              {/* Quick stats row */}
              <div className="mt-6 pt-6 border-t border-black/[0.06]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      icon: BarChart3,
                      label: "Monthly Savings",
                      value: formatUSDLong(totalMonthlySavings),
                    },
                    {
                      icon: TrendingUp,
                      label: "Annual Savings",
                      value: formatUSDLong(annualSavings),
                    },
                    {
                      icon: DollarSign,
                      label: "Cost per Dev (Vietnam)",
                      value: `${formatUSDLong(VIETNAM_RATE)}/mo`,
                    },
                    {
                      icon: CheckCircle2,
                      label: "Savings Rate",
                      value: `${savingsPercent}%`,
                    },
                  ].map((stat) => {
                    const StatIcon = stat.icon;
                    return (
                      <div
                        key={stat.label}
                        className="text-center p-3 rounded-xl bg-white/80 border border-black/[0.04]"
                      >
                        <StatIcon
                          size={16}
                          className="text-brand mx-auto mb-1.5"
                        />
                        <p className="text-lg font-bold text-foreground tabular-nums">
                          {stat.value}
                        </p>
                        <p className="text-[11px] text-foreground-muted">
                          {stat.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-foreground-secondary">
                  Ready to realize these savings? Let&apos;s build your dedicated team.
                </p>
                <a
                  href={mailtoHref}
                  className="group/btn inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-full bg-brand text-white transition-all duration-300 hover:bg-brand-light hover:shadow-[0_4px_20px_rgba(32,133,53,0.25)] shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
                >
                  <Mail size={16} />
                  Discuss Your Savings
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-foreground-muted text-center mt-4 max-w-xl mx-auto">
            Estimates are based on average rates and typical overhead factors. Actual savings depend
            on project complexity, technology stack, and specific team composition.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
