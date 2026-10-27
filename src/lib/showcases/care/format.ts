import { CARE_NOW } from "./types";
import type { DemoLocale } from "./types";
import type { LocalePair } from "@/lib/showcases/types";

/**
 * Deterministic time helpers for Care Companion — everything derives from the
 * fixed CARE_NOW anchor so server and client renders are identical. Date
 * formatting pins the timezone (repo convention, see relay/format.ts).
 */

/** Pick the locale side of a fixture string pair. */
export function pick(pair: LocalePair, locale: DemoLocale): string {
  return pair[locale];
}

/** Calendar day relative to the demo clock (0 = today). */
export function dayDate(dayOffset: number): Date {
  const base = new Date(CARE_NOW);
  base.setDate(base.getDate() + dayOffset);
  return base;
}

/** "8:00 AM" (EN) / "8:00" (VI). Accepts a 24h "HH:MM" fixture label. */
export function formatTimeLabel(hhmm: string, locale: DemoLocale): string {
  const [h24, mm] = hhmm.split(":");
  const hours = Number(h24);
  if (locale === "vi") return `${hours}:${mm}`;
  const period = hours < 12 ? "AM" : "PM";
  const h12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${h12}:${mm} ${period}`;
}

function intlFormat(dayOffset: number, locale: DemoLocale, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-GB", {
    ...options,
    timeZone: "Asia/Bangkok",
  }).format(dayDate(dayOffset));
}

/** "Today" / "Tomorrow" / "Yesterday" / short weekday date. */
export function formatDayLabel(dayOffset: number, locale: DemoLocale): string {
  if (dayOffset === 0) return locale === "vi" ? "Hôm nay" : "Today";
  if (dayOffset === 1) return locale === "vi" ? "Ngày mai" : "Tomorrow";
  if (dayOffset === -1) return locale === "vi" ? "Hôm qua" : "Yesterday";
  return intlFormat(dayOffset, locale, { weekday: "short", day: "numeric", month: "short" });
}

/** Long date for the app header, e.g. "Tuesday, 27 October". */
export function formatLongDate(dayOffset: number, locale: DemoLocale): string {
  return intlFormat(dayOffset, locale, { weekday: "long", day: "numeric", month: "long" });
}

/** Narrow weekday letter for chart axes (7 bars ending today). */
export function weekdayLabel(dayOffset: number, locale: DemoLocale): string {
  return intlFormat(dayOffset, locale, { weekday: "short" });
}

/** Minutes since midnight for a 24h "HH:MM" label — schedule ordering. */
export function timeToMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":");
  return Number(h) * 60 + Number(m);
}
