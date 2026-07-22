"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Clock, TrendingDown, Mail, type LucideIcon } from "lucide-react";
import { CustomSelect as CustomSelectComponent } from "@/components/ui/CustomSelect";
import { CONTACT } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/* ── Pricing data ────────────────────────────────────────────── */
const RATES: Record<Seniority, number> = {
  junior: 2000,
  mid: 3000,
  senior: 4500,
  lead: 6000,
};

const SENIORITY_LABELS: Record<Seniority, string> = {
  junior: "Junior",
  mid: "Mid-level",
  senior: "Senior",
  lead: "Lead / Architect",
};

const DURATION_MONTHS: Record<Duration, number> = {
  "3": 3,
  "6": 6,
  "12": 12,
};

const US_EU_MULTIPLIER = 3; // Vietnam rates are ~60-70% lower (roughly 3x cheaper)

type Seniority = "junior" | "mid" | "senior" | "lead";
type Duration = "3" | "6" | "12";

/* ── Animated number hook ────────────────────────────────────── */
function useAnimatedNumber(target: number, duration = 500, reducedMotion = false) {
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
      // Ease-out cubic
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
    // We intentionally use `animated` from the enclosing closure only for the
    // initial value -- the animation drives itself via requestAnimationFrame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration, reducedMotion]);

  return reducedMotion ? target : animated;
}

/* ── Format currency ─────────────────────────────────────────── */
function formatUSD(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

/* ── Custom select wrapper for calculator ───────────────────── */
function CalculatorSelect<T extends string>({
  value,
  onChange,
  options,
  icon: Icon,
  label,
  id,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  icon: LucideIcon;
  label: string;
  id: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Icon size={16} className="text-brand" />
        {label}
      </label>
      <CustomSelectComponent
        id={id}
        options={options.map((opt) => ({ value: opt.value as string, label: opt.label }))}
        value={value}
        onChange={(v) => onChange(v as T)}
      />
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────── */
export function TeamCostCalculator() {
  const [teamSize, setTeamSize] = useState(3);
  const [seniority, setSeniority] = useState<Seniority>("senior");
  const [duration, setDuration] = useState<Duration>("6");
  const reducedMotion = usePrefersReducedMotion();

  const monthlyRate = RATES[seniority];
  const monthlyTotal = monthlyRate * teamSize;
  const totalCost = monthlyTotal * DURATION_MONTHS[duration];
  const usMonthly = monthlyRate * US_EU_MULTIPLIER;
  const usTotal = usMonthly * teamSize * DURATION_MONTHS[duration];
  const savings = usTotal - totalCost;
  const savingsPercent = Math.round((1 - totalCost / usTotal) * 100);

  const animatedMonthly = useAnimatedNumber(monthlyTotal, 500, reducedMotion);
  const animatedTotal = useAnimatedNumber(totalCost, 500, reducedMotion);
  const animatedSavings = useAnimatedNumber(savings, 500, reducedMotion);

  const handleTeamSizeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamSize(Number(e.target.value));
  }, []);

  const seniorityOptions: { value: Seniority; label: string }[] = [
    { value: "junior", label: `${SENIORITY_LABELS.junior} — $${RATES.junior.toLocaleString()}/mo` },
    { value: "mid", label: `${SENIORITY_LABELS.mid} — $${RATES.mid.toLocaleString()}/mo` },
    { value: "senior", label: `${SENIORITY_LABELS.senior} — $${RATES.senior.toLocaleString()}/mo` },
    { value: "lead", label: `${SENIORITY_LABELS.lead} — $${RATES.lead.toLocaleString()}/mo` },
  ];

  const durationOptions: { value: Duration; label: string }[] = [
    { value: "3", label: "3 months" },
    { value: "6", label: "6 months" },
    { value: "12", label: "12 months" },
  ];

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
            Cost Calculator
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Estimate Your Team Cost
          </h2>
          <p className="mt-4 text-lg text-foreground-secondary leading-relaxed">
            Get an instant estimate for your dedicated development team. See how much you save compared to US/EU rates.
          </p>
        </motion.div>

        {/* Calculator card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="mx-auto max-w-4xl"
        >
          <div className="rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] overflow-hidden">
            {/* Controls row */}
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Team size slider */}
                <div className="space-y-2 md:col-span-1">
                  <label htmlFor="team-size" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Users size={16} className="text-brand" />
                    Team Size
                  </label>
                  <div className="pt-2">
                    <input
                      id="team-size"
                      type="range"
                      min={1}
                      max={10}
                      step={1}
                      value={teamSize}
                      onChange={handleTeamSizeChange}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer bg-black/[0.06] accent-brand"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-foreground-muted">1</span>
                      <span className="text-lg font-bold text-brand tabular-nums">
                        {teamSize} {teamSize === 1 ? "dev" : "devs"}
                      </span>
                      <span className="text-xs text-foreground-muted">10</span>
                    </div>
                  </div>
                </div>

                {/* Seniority select */}
                <CalculatorSelect
                  value={seniority}
                  onChange={setSeniority}
                  options={seniorityOptions}
                  icon={Users}
                  label="Seniority Level"
                  id="seniority-level"
                />

                {/* Duration select */}
                <CalculatorSelect
                  value={duration}
                  onChange={setDuration}
                  options={durationOptions}
                  icon={Clock}
                  label="Duration"
                  id="project-duration"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-black/[0.06]" />

            {/* Results */}
            <div className="p-6 md:p-8 bg-background-subtle/50">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Monthly cost */}
                <div className="text-center sm:text-left">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">
                    Monthly Cost
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={animatedMonthly}
                      initial={{ opacity: 0.6, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl md:text-3xl font-bold text-foreground tabular-nums"
                    >
                      {formatUSD(animatedMonthly)}
                      <span className="text-sm font-medium text-foreground-muted">/mo</span>
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Total cost */}
                <div className="text-center sm:text-left">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">
                    Total for {DURATION_MONTHS[duration]} months
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={animatedTotal}
                      initial={{ opacity: 0.6, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl md:text-3xl font-bold text-foreground tabular-nums"
                    >
                      {formatUSD(animatedTotal)}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Savings — the hero metric */}
                <div className="text-center sm:text-left">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">
                    You Save vs US/EU
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={animatedSavings}
                      initial={{ opacity: 0.6, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl md:text-3xl font-bold text-brand tabular-nums"
                    >
                      {formatUSD(animatedSavings)}
                    </motion.p>
                  </AnimatePresence>
                  <p className="text-xs font-semibold text-brand mt-0.5">
                    <TrendingDown size={12} className="inline -mt-0.5 mr-0.5" />
                    {savingsPercent}% lower cost
                  </p>
                </div>
              </div>

              {/* Comparison bar */}
              <div className="mt-6 pt-6 border-t border-black/[0.06]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
                    Cost Comparison
                  </span>
                </div>
                <div className="space-y-2">
                  {/* US/EU bar */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-foreground-muted w-12 shrink-0">
                      US/EU
                    </span>
                    <div className="flex-1 h-3 rounded-full bg-black/[0.04] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-red-200 origin-left"
                        initial={false}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-foreground-muted w-24 text-right tabular-nums">
                      {formatUSD(usTotal)}
                    </span>
                  </div>
                  {/* Vietnam bar */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-brand w-12 shrink-0">
                      Vietnam
                    </span>
                    <div className="flex-1 h-3 rounded-full bg-black/[0.04] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-brand origin-left"
                        initial={false}
                        animate={{ scaleX: totalCost / usTotal }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-brand w-24 text-right tabular-nums">
                      {formatUSD(totalCost)}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-foreground-secondary">
                  Need a tailored estimate? We&apos;ll match the right team to your project scope.
                </p>
                <a
                  href={`${CONTACT.emailHref}?subject=Dedicated%20Team%20Inquiry%20-%20Custom%20Quote`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-full bg-brand text-white transition-all duration-300 hover:bg-brand-light hover:shadow-[0_4px_20px_rgba(32,133,53,0.25)] shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
                >
                  <Mail size={16} />
                  Get a Custom Quote
                </a>
              </div>
            </div>
          </div>

          {/* Small disclaimer */}
          <p className="text-xs text-foreground-muted text-center mt-4 max-w-xl mx-auto">
            Estimates are based on standard rates and serve as a starting point. Final pricing depends on technology stack, project complexity, and specific requirements.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
