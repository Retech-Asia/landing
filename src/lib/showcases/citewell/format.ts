import { CITEWELL_NOW, type DemoLocale } from "./types";

/** Deterministic date helpers — every rendered date derives from CITEWELL_NOW. */

export function dateDaysAgo(daysAgo: number): Date {
  const d = new Date(CITEWELL_NOW);
  d.setDate(d.getDate() - daysAgo);
  return d;
}

export function formatLongDate(date: Date, locale: DemoLocale): string {
  return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatShortDate(date: Date, locale: DemoLocale): string {
  return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
    day: "numeric",
    month: "short",
  }).format(date);
}

export function formatDaysAgo(daysAgo: number, locale: DemoLocale): string {
  if (daysAgo === 0) return locale === "vi" ? "Hôm nay" : "Today";
  if (daysAgo === 1) return locale === "vi" ? "Hôm qua" : "Yesterday";
  return locale === "vi" ? `${daysAgo} ngày trước` : `${daysAgo} days ago`;
}

export function formatVersion(daysAgo: number, locale: DemoLocale): string {
  return locale === "vi"
    ? `Cập nhật ${formatDaysAgo(daysAgo, locale).toLowerCase()}`
    : `Updated ${formatDaysAgo(daysAgo, locale).toLowerCase()}`;
}
