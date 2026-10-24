import { escapeHtml } from "@/lib/email";

/**
 * Server-side counterpart of lead-attribution.ts. Validates the
 * client-supplied attribution object (allowlisted keys, bounded strings)
 * and renders an "Acquisition context" block for the inquiry email so
 * every lead carries its source story.
 *
 * Values are non-PII by construction (utm params, channel names, landing
 * paths). Everything is escapeHtml'd before entering the email HTML.
 */

const ALLOWED_KEYS = [
  "last_source",
  "last_medium",
  "last_channel",
  "last_landing",
  "last_campaign",
  "last_ai",
  "first_source",
  "first_medium",
  "first_channel",
  "first_landing",
  "first_campaign",
  "first_ai",
] as const;

const MAX_VALUE_LEN = 180;

export function parseAttribution(
  raw: unknown
): Partial<Record<(typeof ALLOWED_KEYS)[number], string>> {
  const out: Partial<Record<(typeof ALLOWED_KEYS)[number], string>> = {};
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return out;
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!(ALLOWED_KEYS as readonly string[]).includes(key)) continue;
    if (typeof value !== "string" || !value.trim()) continue;
    out[key as (typeof ALLOWED_KEYS)[number]] = value
      .trim()
      .slice(0, MAX_VALUE_LEN);
  }
  return out;
}

const LABELS: Record<string, string> = {
  last_source: "Last-touch source",
  last_medium: "Medium",
  last_channel: "Channel",
  last_landing: "Landing page",
  last_campaign: "Campaign",
  last_ai: "AI assistant",
  first_source: "First-touch source",
  first_medium: "First-touch medium",
  first_channel: "First-touch channel",
  first_landing: "First landing page",
  first_campaign: "First-touch campaign",
  first_ai: "First-touch AI assistant",
};

/** Render the email block; empty string when no attribution was captured. */
export function attributionEmailHtml(attr: ReturnType<typeof parseAttribution>): string {
  const rows = Object.entries(LABELS)
    .filter(([key]) => attr[key as keyof typeof attr])
    .map(
      ([key, label]) =>
        `<tr><td style="padding: 4px 0; color: #737373; width: 160px; vertical-align: top; font-size: 13px;">${label}:</td><td style="padding: 4px 0; font-size: 13px;">${escapeHtml(
          attr[key as keyof typeof attr] ?? ""
        )}</td></tr>`
    );
  if (rows.length === 0) return "";
  return `
      <h3 style="margin: 24px 0 8px 0; font-size: 14px; color: #737373;">Acquisition context</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; background: #f0fdf4; border-radius: 8px;">
        ${rows.join("")}
      </table>`;
}
