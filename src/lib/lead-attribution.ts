/**
 * Lead attribution — first-touch / last-touch capture on first-party
 * storage only. No PII: utm parameters, referrer hostname, landing path,
 * and ad-click-id PRESENCE flags (never values).
 *
 * Privacy: persisted (localStorage) only when analytics consent is granted
 * (see cookie-consent.ts). Without consent everything stays in memory for
 * the current tab session and is discarded on close.
 *
 * AI assistants: landing referrers from known assistant surfaces
 * (chatgpt.com, claude.ai, perplexity.ai, ...) are classified as
 * `ai_assistant` so GA4 + inquiry emails can distinguish observable
 * AI referrals from unattributable traffic. An AI-origin visit that then
 * converts via direct URL later is intentionally NOT counted — we only
 * report what is directly observable.
 */

export interface TouchData {
  /** Channel: direct | organic_search | social | referral | ai_assistant | campaign */
  channel: string;
  /** Referrer hostname or utm_source, whichever is authoritative. */
  source: string;
  medium: string;
  campaign?: string;
  term?: string;
  content?: string;
  /** Landing path of the touch. */
  landing_page: string;
  /** Timestamp (ms). */
  ts: number;
  /** Hostname of the referrer when one existed. */
  referrer?: string;
  /** Presence flags only — values are never stored. */
  click_ids?: string;
}

const FIRST_KEY = "retech_attr_first";
const LAST_KEY = "retech_attr_last";
/** Attribution validity window for the stored first touch (days). */
const FIRST_TOUCH_DAYS = 180;

const AI_HOSTS = [
  "chatgpt.com",
  "chat.openai.com",
  "openai.com",
  "claude.ai",
  "anthropic.com",
  "perplexity.ai",
  "gemini.google.com",
  "copilot.microsoft.com",
  "poe.com",
  "you.com",
];

const SEARCH_HOSTS = [
  "google.",
  "bing.com",
  "duckduckgo.com",
  "yahoo.com",
  "yandex.",
  "baidu.com",
  "ecosia.org",
  "search.brave.com",
];

const SOCIAL_HOSTS = [
  "linkedin.com",
  "lnkd.in",
  "facebook.com",
  "t.co",
  "twitter.com",
  "x.com",
  "instagram.com",
  "reddit.com",
  "youtube.com",
];

function classify(
  referrerHost: string,
  utmSource: string,
  utmMedium: string
): { channel: string; source: string; medium: string } {
  if (utmSource) {
    const medium = utmMedium || "utm";
    const isAi = AI_HOSTS.some((h) => utmSource.includes(h.replace(/\.(com|ai|net)$/, "")));
    return {
      channel: isAi ? "ai_assistant" : utmSource.toLowerCase().includes("news") ? "newsletter" : "campaign",
      source: utmSource,
      medium,
    };
  }
  if (!referrerHost) return { channel: "direct", source: "(direct)", medium: "(none)" };
  if (AI_HOSTS.some((h) => referrerHost === h || referrerHost.endsWith("." + h) || referrerHost.includes(h))) {
    return { channel: "ai_assistant", source: referrerHost, medium: "referral" };
  }
  if (SEARCH_HOSTS.some((h) => referrerHost.includes(h))) {
    return { channel: "organic_search", source: referrerHost, medium: "organic" };
  }
  if (SOCIAL_HOSTS.some((h) => referrerHost === h || referrerHost.endsWith("." + h))) {
    return { channel: "social", source: referrerHost, medium: "social" };
  }
  return { channel: "referral", source: referrerHost, medium: "referral" };
}

function sameHost(host: string): boolean {
  return typeof location !== "undefined" && host === location.hostname;
}

/** Extract the current landing touch from URL + referrer. */
function currentTouch(): TouchData | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source")?.slice(0, 100) ?? "";
  const utmMedium = params.get("utm_medium")?.slice(0, 100) ?? "";
  const utmCampaign = params.get("utm_campaign")?.slice(0, 100) ?? "";
  const utmTerm = params.get("utm_term")?.slice(0, 100) ?? "";
  const utmContent = params.get("utm_content")?.slice(0, 100) ?? "";

  let referrerHost = "";
  try {
    if (document.referrer) referrerHost = new URL(document.referrer).hostname;
  } catch {
    referrerHost = "";
  }
  // Internal navigation is not an acquisition touch.
  if (referrerHost && sameHost(referrerHost)) return null;

  const hasUtm = Boolean(utmSource || utmCampaign);
  const clickIds = ["gclid", "fbclid", "msclkid", "li_fat_id", "ttclid"]
    .filter((k) => params.get(k))
    .map((k) => `${k}:present`)
    .join(",");

  if (!hasUtm && !referrerHost && !clickIds) return null;

  const { channel, source, medium } = classify(referrerHost, utmSource, utmMedium);
  return {
    channel,
    source,
    medium,
    ...(utmCampaign ? { campaign: utmCampaign } : {}),
    ...(utmTerm ? { term: utmTerm } : {}),
    ...(utmContent ? { content: utmContent } : {}),
    landing_page: window.location.pathname.slice(0, 200),
    ts: Date.now(),
    ...(referrerHost ? { referrer: referrerHost } : {}),
    ...(clickIds ? { click_ids: clickIds } : {}),
  };
}

function hasAnalyticsConsent(): boolean {
  try {
    // Local import would create a cycle risk in tests; read directly.
    const raw = localStorage.getItem("retech-cookie-consent");
    if (!raw) return false;
    const prefs = JSON.parse(raw) as { analytics?: boolean };
    return prefs.analytics === true;
  } catch {
    return false;
  }
}

function readStored(key: string, maxAgeDays: number): TouchData | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const data = JSON.parse(raw) as TouchData;
    if (!data || typeof data.ts !== "number") return null;
    if (Date.now() - data.ts > maxAgeDays * 86_400_000) return null;
    return data;
  } catch {
    return null;
  }
}

/** In-memory fallback when consent is absent (session-only). */
let memoryFirst: TouchData | null = null;
let memoryLast: TouchData | null = null;

/**
 * Record a landing touch. Call once per page load (mount of the layout).
 * Safe to call repeatedly — only the first touch per (persisted) window
 * and the latest touch per tab are kept.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  const touch = currentTouch();
  if (!touch) return;

  if (hasAnalyticsConsent()) {
    if (!readStored(FIRST_KEY, FIRST_TOUCH_DAYS)) {
      try {
        localStorage.setItem(FIRST_KEY, JSON.stringify(touch));
      } catch {
        /* storage full/blocked — memory fallback already set */
      }
    }
    try {
      sessionStorage.setItem(LAST_KEY, JSON.stringify(touch));
    } catch {
      /* ignore */
    }
  }
  if (!memoryFirst) memoryFirst = touch;
  memoryLast = touch;
}

/**
 * Merged attribution for the current visitor: first touch (persisted up to
 * 180 days, or session memory) + last touch (this tab session).
 */
export function getAttribution(): { first: TouchData | null; last: TouchData | null } {
  const persisted = hasAnalyticsConsent() ? readStored(FIRST_KEY, FIRST_TOUCH_DAYS) : null;
  let last: TouchData | null = memoryLast;
  if (typeof window !== "undefined") {
    try {
      const raw = sessionStorage.getItem(LAST_KEY);
      if (raw) last = JSON.parse(raw) as TouchData;
    } catch {
      /* keep memory value */
    }
  }
  return { first: persisted ?? memoryFirst, last };
}

/**
 * GA4/lead-event parameter projection of a touch — bounded, PII-free.
 */
function leadParams(t: TouchData | null, prefix: string): Record<string, string> {
  if (!t) return {};
  const out: Record<string, string> = {
    [`${prefix}_source`]: t.source.slice(0, 100),
    [`${prefix}_medium`]: t.medium.slice(0, 100),
    [`${prefix}_channel`]: t.channel.slice(0, 100),
    [`${prefix}_landing`]: t.landing_page.slice(0, 180),
  };
  if (t.campaign) out[`${prefix}_campaign`] = t.campaign;
  if (t.channel === "ai_assistant") out[`${prefix}_ai`] = t.source.slice(0, 100);
  return out;
}

/**
 * Fire the `generate_lead` GA4 recommended event on a CONFIRMED
 * submission (called from the form success path only — never on clicks
 * or failures). Carries attribution context, never PII.
 */
export function trackGenerateLead(
  formType: "contact" | "estimate",
  extra?: Record<string, string>
): void {
  const { first, last } = getAttribution();
  const params: Record<string, string> = {
    form_type: formType,
    ...leadParams(last, "last"),
    ...leadParams(first, "first"),
    ...(extra ?? {}),
  };
  if (typeof window !== "undefined" && "gtag" in window) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag("event", "generate_lead", params);
  }
  // Private endpoint mirror (no PII — same parameter set).
  import("@/lib/analytics").then(({ trackEvent }) => {
    trackEvent("generate_lead", params);
  });
}

/** Flat attribution payload for form POST bodies (email enrichment). */
export function attributionFields(): Record<string, string> {
  const { first, last } = getAttribution();
  return {
    ...leadParams(last, "last"),
    ...leadParams(first, "first"),
  };
}
