"use client";

import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatTimeLabel, weekdayLabel } from "@/lib/showcases/care/format";
import type { Appointment, DemoLocale, Medication, MedicationDose, ThreadMessage } from "@/lib/showcases/care/types";

/**
 * Care Companion shared primitives (Blueprint B): calm healthcare — soft
 * canvas, one restrained green accent, generous whitespace. Scoped `--cc-*`
 * tokens set on the shell root keep the palette separate from the other
 * showcases. Compact charts are deterministic inline SVG; no chart libraries.
 */

export const ccVars = {
  "--cc-canvas": "#F5F8F6",
  "--cc-surface": "#FFFFFF",
  "--cc-ink": "#1F3733",
  "--cc-secondary": "#5D7370",
  "--cc-accent": "#2E7D6B",
  "--cc-accent-strong": "#256655",
  "--cc-accent-soft": "#E3F0EC",
  "--cc-border": "#E2E9E6",
  "--cc-mist": "#EFF4F1",
  "--cc-info-bg": "#E7EEF6",
  "--cc-info-text": "#3D5A74",
} as CSSProperties;

export type CcChipTone = "neutral" | "accent" | "blue" | "muted";

const CHIP_TONE: Record<CcChipTone, string> = {
  neutral: "bg-[var(--cc-accent-soft)] text-[var(--cc-accent)]",
  blue: "bg-[var(--cc-info-bg)] text-[var(--cc-info-text)]",
  muted: "bg-[var(--cc-mist)] text-[var(--cc-secondary)]",
  accent: "bg-[var(--cc-accent)] text-white",
};

export function CcChip({
  tone = "muted",
  children,
  className,
}: {
  tone?: CcChipTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap",
        CHIP_TONE[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/** Initials avatar chip — no photographs anywhere in the concept. */
export function CcAvatar({
  initials,
  hue,
  size = 28,
}: {
  initials: string;
  hue: number;
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        backgroundColor: `hsl(${hue} 30% 92%)`,
        color: `hsl(${hue} 28% 32%)`,
      }}
    >
      {initials}
    </span>
  );
}

export function CcCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-[var(--cc-border)] bg-[var(--cc-surface)] p-4",
        className
      )}
    >
      {children}
    </section>
  );
}

export function CcLabel({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <p id={id} className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--cc-secondary)]">
      {children}
    </p>
  );
}

type CcButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

/** Calm button language: pill shape, 44px minimum target, soft transitions. */
export function CcButton({ variant = "primary", className, ...props }: CcButtonProps) {
  const variants = {
    primary: "bg-[var(--cc-accent)] text-white hover:bg-[var(--cc-accent-strong)]",
    secondary:
      "border border-[var(--cc-border)] bg-[var(--cc-surface)] text-[var(--cc-ink)] hover:border-[var(--cc-accent)] hover:text-[var(--cc-accent)]",
    ghost: "text-[var(--cc-accent)] hover:bg-[var(--cc-accent-soft)]",
  } as const;
  return (
    <button
      {...props}
      className={cn(
        "inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cc-accent)] disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className
      )}
    />
  );
}

/**
 * Compact weekly bar chart (7 bars ending today). Deterministic inline SVG:
 * `past` covers the six days before today, `todayValue` is the live bar.
 */
export function CcWeekBars({
  past,
  todayValue,
  max,
  locale,
  ariaLabel,
  className,
}: {
  past: number[];
  todayValue: number;
  max: number;
  locale: DemoLocale;
  ariaLabel: string;
  className?: string;
}) {
  const values = [...past.slice(-6), todayValue];
  const slot = 40;
  const barWidth = 24;
  const baseline = 66;
  const height = 84;
  const barHeight = (value: number) => {
    if (max <= 0) return 3;
    return Math.max(3, Math.round((Math.min(value, max) / max) * 52));
  };
  return (
    <figure className={cn("m-0", className)}>
      <svg
        viewBox={`0 0 ${slot * values.length} ${height}`}
        className="w-full"
        role="img"
        aria-label={ariaLabel}
      >
        {values.map((value, i) => {
          const isToday = i === values.length - 1;
          const h = barHeight(value);
          return (
            <g key={i}>
              <rect
                x={i * slot + (slot - barWidth) / 2}
                y={baseline - h}
                width={barWidth}
                height={h}
                rx={4}
                fill={isToday ? "var(--cc-accent)" : "var(--cc-border)"}
              />
              <text
                x={i * slot + slot / 2}
                y={height - 4}
                textAnchor="middle"
                fontSize="10"
                fill="var(--cc-secondary)"
              >
                {weekdayLabel(i - (values.length - 1), locale)}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

/** Compact progress ring for weekly care-plan progress. */
export function CcProgressRing({
  value,
  max,
  size = 76,
  ariaLabel,
  children,
}: {
  value: number;
  max: number;
  size?: number;
  ariaLabel: string;
  children?: ReactNode;
}) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const fraction = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className="relative inline-flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox="0 0 76 76" aria-hidden="true">
        <circle cx="38" cy="38" r={radius} fill="none" stroke="var(--cc-mist)" strokeWidth="8" />
        <circle
          cx="38"
          cy="38"
          r={radius}
          fill="none"
          stroke="var(--cc-accent)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference * (1 - fraction)}
          transform="rotate(-90 38 38)"
          className="transition-[stroke-dashoffset] duration-500"
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center text-center leading-tight">
        {children}
      </span>
    </div>
  );
}

/** One medication dose row with its take toggle. */
export function CcMedicationRow({
  medication,
  dose,
  locale,
  onToggle,
  disabled = false,
}: {
  medication: Medication;
  dose: MedicationDose;
  locale: DemoLocale;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border p-3 transition-colors",
        dose.taken
          ? "border-[var(--cc-border)] bg-[var(--cc-mist)]"
          : "border-[var(--cc-border)] bg-[var(--cc-surface)]"
      )}
    >
      <span className="w-14 shrink-0 text-sm font-semibold tabular-nums text-[var(--cc-secondary)]">
        {formatTimeLabel(dose.time, locale)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-[var(--cc-ink)]">
          {medication.name}
        </span>
        <span className="block truncate text-xs text-[var(--cc-secondary)]">
          {medication.dosage[locale]} · {medication.instruction[locale]}
        </span>
      </span>
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        aria-pressed={dose.taken}
        className={cn(
          "inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cc-accent)] disabled:cursor-not-allowed disabled:opacity-50",
          dose.taken
            ? "bg-[var(--cc-accent-soft)] text-[var(--cc-accent)] hover:bg-[var(--cc-accent)]/15"
            : "bg-[var(--cc-accent)] text-white hover:bg-[var(--cc-accent-strong)]"
        )}
      >
        {dose.taken && <Check size={14} strokeWidth={2.25} aria-hidden="true" />}
        {dose.taken
          ? locale === "vi"
            ? "Đã uống"
            : "Taken"
          : locale === "vi"
            ? "Uống"
            : "Take"}
      </button>
    </div>
  );
}

/** Appointment card with optional preparation steps and a footer slot. */
export function CcAppointmentCard({
  appointment,
  locale,
  teamName,
  showPrep = false,
  footer,
}: {
  appointment: Appointment;
  locale: DemoLocale;
  teamName: string;
  showPrep?: boolean;
  footer?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--cc-border)] bg-[var(--cc-surface)] p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--cc-ink)]">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--cc-accent-soft)] text-[var(--cc-accent)]">
            {appointment.mode === "video" ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h7A2.5 2.5 0 0 1 16 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 4 17.5Zm14 3.3 3.4-2.4a.9.9 0 0 1 1.6.7v7.8a.9.9 0 0 1-1.6.7L18 14.2Z" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 11.2 12 4l9 7.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.5 9.5V20h13V9.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          {appointment.kind[locale]}
        </span>
        <CcChip tone={appointment.mode === "video" ? "blue" : "neutral"}>
          {appointment.mode === "video"
            ? locale === "vi"
              ? "Video"
              : "Video"
            : locale === "vi"
              ? "Trực tiếp"
              : "In person"}
        </CcChip>
      </div>
      <p className="mt-1 text-sm text-[var(--cc-secondary)]">
        {formatTimeLabel(appointment.time, locale)} · {teamName}
      </p>
      <p className="mt-0.5 text-xs leading-snug text-[var(--cc-secondary)]">
        {appointment.location[locale]}
      </p>
      {showPrep && appointment.prep.length > 0 && (
        <ul className="mt-3 flex flex-col gap-1.5 border-t border-[var(--cc-border)] pt-3">
          {appointment.prep.map((step) => (
            <li key={step.id} className="flex items-start gap-2 text-[13px] leading-snug">
              <span
                aria-hidden="true"
                className={cn(
                  "mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                  step.done
                    ? "bg-[var(--cc-accent)] text-white"
                    : "border border-[var(--cc-border)] bg-[var(--cc-surface)]"
                )}
              >
                {step.done && <Check size={10} strokeWidth={3} />}
              </span>
              <span className={cn(step.done ? "text-[var(--cc-secondary)]" : "text-[var(--cc-ink)]")}>
                {step.label[locale]}
              </span>
            </li>
          ))}
        </ul>
      )}
      {footer && <div className="mt-3">{footer}</div>}
    </div>
  );
}

/** Chat bubble for the scripted thread — care team left, patient right. */
export function CcMessageBubble({
  message,
  locale,
  senderName,
}: {
  message: ThreadMessage;
  locale: DemoLocale;
  senderName?: string;
}) {
  const fromPatient = message.direction === "patient";
  return (
    <div className={cn("flex flex-col", fromPatient ? "items-end" : "items-start")}>
      {!fromPatient && senderName && (
        <span className="mb-0.5 text-[11px] font-semibold text-[var(--cc-secondary)]">
          {senderName}
        </span>
      )}
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
          fromPatient
            ? "rounded-br-md bg-[var(--cc-accent)] text-white"
            : "rounded-bl-md border border-[var(--cc-border)] bg-[var(--cc-surface)] text-[var(--cc-ink)]"
        )}
      >
        {message.body[locale]}
      </div>
      <span className="mt-0.5 text-[10px] tabular-nums text-[var(--cc-secondary)]">
        {formatTimeLabel(message.time, locale)}
      </span>
    </div>
  );
}
