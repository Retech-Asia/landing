import { DEMO_NOW } from "./types";

/**
 * Locale-aware formatting for the Northline demo. Currency stays USD in both
 * locales (it is a US-style sample dataset); dates localize.
 */

export type DemoLocale = "en" | "vi";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Compact currency for KPI/charts: $48k / $1.2m. */
export function formatCurrencyCompact(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}m`;
  }
  if (Math.abs(value) >= 1_000) {
    return `$${Math.round(value / 1_000)}k`;
  }
  return `$${value}`;
}

/** "just now", "4h ago", "3d ago" (+ VI equivalents) from daysAgo. */
export function formatDaysAgo(daysAgo: number, locale: DemoLocale): string {
  if (daysAgo < 0.04) {
    return locale === "vi" ? "vừa xong" : "just now";
  }
  const hours = daysAgo * 24;
  if (hours < 24) {
    const h = Math.max(1, Math.round(hours));
    return locale === "vi" ? `${h} giờ trước` : `${h}h ago`;
  }
  const d = Math.round(daysAgo);
  return locale === "vi" ? `${d} ngày trước` : `${d}d ago`;
}

/** Due labels from dueInDays: negative = overdue. */
export function formatDue(dueInDays: number, locale: DemoLocale): string {
  if (dueInDays < 0) {
    const d = Math.round(-dueInDays);
    return locale === "vi" ? `Quá hạn ${d} ngày` : `${d}d overdue`;
  }
  if (dueInDays === 0) {
    return locale === "vi" ? "Hôm nay" : "Today";
  }
  const d = Math.round(dueInDays);
  return locale === "vi" ? `Sau ${d} ngày` : `In ${d}d`;
}

const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_VI = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"];

/** Deterministic calendar date for a day-offset relative to DEMO_NOW. */
export function dateDaysFromNow(dayOffset: number): Date {
  const d = new Date(DEMO_NOW);
  d.setDate(d.getDate() + dayOffset);
  return d;
}

/** "Oct 26" / "26 T10". */
export function formatShortDate(date: Date, locale: DemoLocale): string {
  const months = locale === "vi" ? MONTHS_VI : MONTHS_EN;
  return locale === "vi"
    ? `${date.getDate()} ${months[date.getMonth()]}`
    : `${months[date.getMonth()]} ${date.getDate()}`;
}

/** Monday of the DEMO_NOW week, used to bucket activity trend by day. */
export function demoWeekStart(): Date {
  const d = new Date(DEMO_NOW);
  const day = d.getDay(); // 0 Sun … 6 Sat
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}
