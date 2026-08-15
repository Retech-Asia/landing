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
import { useLocale } from "next-intl";
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
  { label: "Benefits & Insurance", savings: 0.12, description: "Health insurance, retirement, paid leave, all included." },
  { label: "Payroll & Compliance", savings: 0.04, description: "We handle local labor laws, taxes, and compliance." },
  { label: "Training & Development", savings: 0.03, description: "Continuous skills development covered by us." },
];

/* -------------------------------------------------------------------------- */
/*  Locale dictionaries (EN | VI)                                              */
/* -------------------------------------------------------------------------- */

interface ROIStrings {
  eyebrow: string;
  heading: string;
  subheading: string;
  teamSizeLabel: string;
  compareAgainst: string;
  projectionPeriod: string;
  estimatedSavingsLabel: (years: number) => string;
  percentLower: (percent: number, region: string) => string;
  monthlyCost: string;
  yearTotal: (years: number) => string;
  local: string;
  vietnam: string;
  hiddenSavingsTitle: string;
  overhead: (value: string) => string;
  monthlySavings: string;
  annualSavings: string;
  costPerDev: string;
  savingsRate: string;
  perMonth: string;
  ctaBody: string;
  cta: string;
  disclaimer: string;
}

const ROI_STRINGS: Record<"en" | "vi", ROIStrings> = {
  en: {
    eyebrow: "ROI Calculator",
    heading: "Your Outsourcing Savings",
    subheading:
      "See how much you can save by building your team in Vietnam. Compare costs against US, EU, and Australian rates with multi-year projections.",
    teamSizeLabel: "Team Size",
    compareAgainst: "Compare Against",
    projectionPeriod: "Projection Period",
    estimatedSavingsLabel: (years) => `Estimated ${years}-Year Savings`,
    percentLower: (percent, region) => `${percent}% lower cost than ${region}`,
    monthlyCost: "Monthly Cost",
    yearTotal: (years) => `${years}-Year Total`,
    local: "Local",
    vietnam: "Vietnam",
    hiddenSavingsTitle: "Additional Hidden Savings (Monthly)",
    overhead: (value) => `+${value}/mo in avoided overhead`,
    monthlySavings: "Monthly Savings",
    annualSavings: "Annual Savings",
    costPerDev: "Cost per Dev (Vietnam)",
    savingsRate: "Savings Rate",
    perMonth: "/mo",
    ctaBody: "Ready to realize these savings? Let's build your dedicated team.",
    cta: "Discuss Your Savings",
    disclaimer:
      "Estimates are based on average rates and typical overhead factors. Actual savings depend on project complexity, technology stack, and specific team composition.",
  },
  vi: {
    eyebrow: "Công cụ Tính ROI",
    heading: "Mức Tiết kiệm khi Outsourcing",
    subheading:
      "Xem bạn có thể tiết kiệm bao nhiêu khi xây dựng đội ngũ tại Việt Nam. So sánh chi phí với mức giá US, EU và Úc cùng dự toán nhiều năm.",
    teamSizeLabel: "Quy mô Nhóm",
    compareAgainst: "So sánh với",
    projectionPeriod: "Thời gian Dự toán",
    estimatedSavingsLabel: (years) => `Tiết kiệm dự kiến sau ${years} năm`,
    percentLower: (percent, region) => `${percent}% chi phí thấp hơn so với ${region}`,
    monthlyCost: "Chi phí Hàng tháng",
    yearTotal: (years) => `Tổng sau ${years} năm`,
    local: "Nội địa",
    vietnam: "Việt Nam",
    hiddenSavingsTitle: "Tiết kiệm Ẩn thêm (Hàng tháng)",
    overhead: (value) => `+${value}/tháng chi phí vận hành được loại bỏ`,
    monthlySavings: "Tiết kiệm Hàng tháng",
    annualSavings: "Tiết kiệm Hàng năm",
    costPerDev: "Chi phí mỗi Dev (Việt Nam)",
    savingsRate: "Tỷ lệ Tiết kiệm",
    perMonth: "/tháng",
    ctaBody:
      "Sẵn sàng hiện thực hóa mức tiết kiệm này? Hãy cùng xây dựng đội ngũ chuyên trách của bạn.",
    cta: "Trao đổi về Mức Tiết kiệm",
    disclaimer:
      "Các ước tính dựa trên mức giá trung bình và các yếu tố chi phí điển hình. Mức tiết kiệm thực tế phụ thuộc vào độ phức tạp dự án, công nghệ sử dụng và cấu hình nhóm cụ thể.",
  },
};

// VI display labels keyed by stable ids. Underlying config values (used for
// calculations and mailto logic) stay unchanged.
const TEAM_SIZE_VI: Record<TeamSize, { label: string; description: string }> = {
  small: { label: "Nhóm Nhỏ", description: "3 lập trình viên" },
  medium: { label: "Nhóm Vừa", description: "5 lập trình viên" },
  large: { label: "Nhóm Lớn", description: "8 lập trình viên" },
  enterprise: { label: "Doanh nghiệp", description: "15 lập trình viên" },
};

const REGION_VI: Record<Region, { label: string; short: string }> = {
  us: { label: "Hoa Kỳ", short: "Hoa Kỳ" },
  eu: { label: "Tây Âu", short: "Tây Âu" },
  australia: { label: "Úc", short: "Úc" },
};

const PROJECTION_LABEL_VI: Record<ProjectionYear, string> = {
  1: "1 Năm",
  3: "3 Năm",
  5: "5 Năm",
};

const HIDDEN_COST_VI: Record<string, { label: string; description: string }> = {
  "Recruitment & Onboarding": {
    label: "Tuyển dụng & Onboarding",
    description: "Chúng tôi đảm nhận tuyển dụng, sàng lọc và onboarding mà không tính thêm phí.",
  },
  "Office & Infrastructure": {
    label: "Văn phòng & Hạ tầng",
    description: "Không tốn chi phí mặt bằng, thiết bị hay tiện ích.",
  },
  "Benefits & Insurance": {
    label: "Phúc lợi & Bảo hiểm",
    description: "Bảo hiểm y tế, hưu trí, phép năm có lương — tất cả đã bao gồm.",
  },
  "Payroll & Compliance": {
    label: "Payroll & Tuân thủ",
    description: "Chúng tôi xử lý luật lao động địa phương, thuế và các yêu cầu tuân thủ.",
  },
  "Training & Development": {
    label: "Đào tạo & Phát triển",
    description: "Phát triển kỹ năng liên tục do chúng tôi đảm nhận.",
  },
};

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
  const locale = useLocale();
  const isVi = locale === "vi";
  const t = ROI_STRINGS[isVi ? "vi" : "en"];
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
          {t.local}
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
          {t.vietnam}
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

  const locale = useLocale();
  const isVi = locale === "vi";
  const t = ROI_STRINGS[isVi ? "vi" : "en"];

  // Localized display text (falls back to EN config when VI is unavailable).
  const teamText = isVi
    ? TEAM_SIZE_VI[teamSize]
    : { label: teamSizeConfig[teamSize].label, description: teamSizeConfig[teamSize].description };
  const regionText = isVi
    ? REGION_VI[region]
    : { label: regionConfig[region].label, short: regionConfig[region].label.split(" ")[0] };

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

  // Build mailto link (localized)
  const mailtoBody = isVi
    ? [
        `Xin chào Retech Solutions,`,
        ``,
        `Tôi muốn tìm hiểu về mức tiết kiệm khi thuê ngoài:`,
        ``,
        `Quy mô nhóm: ${teamText.description}`,
        `Khu vực hiện tại: ${regionText.label}`,
        `Tiết kiệm hằng năm dự kiến: ${formatUSDLong(annualSavings)}`,
        `Tổng tiết kiệm dự kiến sau ${projection} năm: ${formatUSDLong(projectedSavings)}`,
        ``,
        `Tôi muốn trao đổi thêm về điều này.`,
        ``,
        `Xin cảm ơn.`,
      ].join("\n")
    : [
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

  const mailtoSubject = isVi
    ? `Yêu cầu Tư vấn ROI | ${teamText.label} tại Việt Nam`
    : `ROI Inquiry | ${config.label} Outsourcing to Vietnam`;

  const mailtoHref = `${CONTACT.emailHref}?subject=${encodeURIComponent(
    mailtoSubject
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
            {t.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {t.heading}
          </h2>
          <p className="mt-4 text-lg text-foreground-secondary leading-relaxed">
            {t.subheading}
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
          <div className="rounded-2xl border border-card-border bg-card-bg shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] overflow-hidden">
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
                    {t.teamSizeLabel}
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
                        {teamText.description}
                      </span>
                      <span className="text-xs text-foreground-muted">15</span>
                    </div>
                  </div>
                </div>

                {/* Region select */}
                <div className="space-y-2">
                  <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Globe size={16} className="text-brand" />
                    {t.compareAgainst}
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
                          {isVi ? REGION_VI[key].short : info.label.split(" ")[0]}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Projection period */}
                <div className="space-y-2">
                  <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Clock size={16} className="text-brand" />
                    {t.projectionPeriod}
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
                        {isVi ? PROJECTION_LABEL_VI[py.value] : py.label}
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
                  {t.estimatedSavingsLabel(projection)}
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
                  {t.percentLower(animatedPercent, regionText.label)}
                </p>
              </div>

              {/* Comparison bars */}
              <div className="space-y-6 max-w-xl mx-auto">
                <SavingsBar
                  label={t.monthlyCost}
                  localCost={localMonthly}
                  vietnamCost={vietnamMonthly}
                  localColor="bg-red-200"
                  vietnamColor="bg-brand"
                  delay={0.1}
                />
                <SavingsBar
                  label={t.yearTotal(projection)}
                  localCost={projectedLocal}
                  vietnamCost={projectedVietnam}
                  localColor="bg-red-200"
                  vietnamColor="bg-brand"
                  delay={0.2}
                />
              </div>

              {/* Hidden savings breakdown */}
              <div className="mt-8 pt-6 border-t border-card-border">
                <div className="flex items-center gap-2 mb-4">
                  <PiggyBank size={16} className="text-brand" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
                    {t.hiddenSavingsTitle}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {hiddenCostFactors.map((factor, i) => (
                    <motion.div
                      key={factor.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                      className="group relative p-3.5 rounded-xl bg-card-bg border border-card-border hover:border-brand/20 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-semibold text-foreground">
                          {isVi ? HIDDEN_COST_VI[factor.label]?.label ?? factor.label : factor.label}
                        </p>
                        <span className="text-xs font-bold text-brand tabular-nums">
                          ~{formatUSD(Math.round(localMonthly * factor.savings))}
                        </span>
                      </div>
                      <p className="text-[11px] text-foreground-muted leading-relaxed">
                        {isVi ? HIDDEN_COST_VI[factor.label]?.description ?? factor.description : factor.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-brand">
                  <DollarSign size={16} />
                  <span>
                    {t.overhead(formatUSDLong(hiddenSavings))}
                  </span>
                </div>
              </div>

              {/* Quick stats row */}
              <div className="mt-6 pt-6 border-t border-card-border">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      icon: BarChart3,
                      label: t.monthlySavings,
                      value: formatUSDLong(totalMonthlySavings),
                    },
                    {
                      icon: TrendingUp,
                      label: t.annualSavings,
                      value: formatUSDLong(annualSavings),
                    },
                    {
                      icon: DollarSign,
                      label: t.costPerDev,
                      value: `${formatUSDLong(VIETNAM_RATE)}${t.perMonth}`,
                    },
                    {
                      icon: CheckCircle2,
                      label: t.savingsRate,
                      value: `${savingsPercent}%`,
                    },
                  ].map((stat) => {
                    const StatIcon = stat.icon;
                    return (
                      <div
                        key={stat.label}
                        className="text-center p-3 rounded-xl bg-card-bg border border-card-border"
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
              <div className="mt-6 pt-6 border-t border-card-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-foreground-secondary">
                  {t.ctaBody}
                </p>
                <a
                  href={mailtoHref}
                  className="group/btn inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-full bg-brand text-white transition-all duration-300 hover:bg-brand-light hover:shadow-[0_4px_20px_rgba(32,133,53,0.25)] shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
                >
                  <Mail size={16} />
                  {t.cta}
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
            {t.disclaimer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
