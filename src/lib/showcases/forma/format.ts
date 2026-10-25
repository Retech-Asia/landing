import type { DemoLocale } from "./types";

/** Forma demo formatting helpers (relative editorial dates, EN/VI labels). */

export function formatLongDate(date: Date, locale: DemoLocale): string {
  return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
    month: "long",
    day: "numeric",
  }).format(date);
}

export function formatShortDate(date: Date, locale: DemoLocale): string {
  return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

export function dateDaysFromNow(days: number): Date {
  const base = new Date("2026-10-26T09:00:00");
  base.setDate(base.getDate() + days);
  return base;
}

export function formatDaysAgo(daysAgo: number, locale: DemoLocale): string {
  if (daysAgo <= 0) return locale === "vi" ? "Hôm nay" : "Today";
  if (daysAgo === 1) return locale === "vi" ? "Hôm qua" : "Yesterday";
  return locale === "vi" ? `${daysAgo} ngày trước` : `${daysAgo}d ago`;
}

export function formatPublishIn(days: number, locale: DemoLocale): string {
  if (days < 0) return locale === "vi" ? `${Math.abs(days)} ngày trước` : `${Math.abs(days)}d ago`;
  if (days === 0) return locale === "vi" ? "Hôm nay" : "Today";
  return locale === "vi" ? `Sau ${days} ngày` : `In ${days}d`;
}

export function formatWordCount(paragraphs: string[]): string {
  const words = paragraphs.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return new Intl.NumberFormat("en-US").format(words);
}
