/**
 * Cookie consent utilities — shared between CookieConsent UI and consumers
 * like WebVitals or analytics scripts.
 *
 * Consent is stored in localStorage under the key `retech-cookie-consent` as
 * a JSON object with per-category boolean flags and a timestamp.
 */

export const STORAGE_KEY = "retech-cookie-consent";
const CONSENT_DURATION_MS = 6 * 30 * 24 * 60 * 60 * 1000; // ~6 months

export interface ConsentPreferences {
  /** Always true — site cannot function without these. */
  necessary: true;
  /** Analytics cookies (Web Vitals, anonymous traffic stats). */
  analytics: boolean;
  /** Marketing / advertising cookies. */
  marketing: boolean;
  /** When the consent record was saved. */
  timestamp: number;
}

/** Category metadata for the preferences UI. */
export interface CookieCategory {
  id: keyof Omit<ConsentPreferences, "timestamp">;
  label: string;
  description: string;
  /** If true the toggle is disabled and the value is always `true`. */
  required: boolean;
}

export const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: "necessary",
    label: "Necessary",
    description:
      "Required for the website to function properly. These cannot be disabled.",
    required: true,
  },
  {
    id: "analytics",
    label: "Analytics",
    description:
      "Help us understand how visitors interact with the site by collecting anonymous traffic data.",
    required: false,
  },
  {
    id: "marketing",
    label: "Marketing",
    description:
      "Used to track visitors across websites to display relevant advertisements.",
    required: false,
  },
];

// ── Helpers ──────────────────────────────────────────────────────

/** Build a fresh consent record with every optional category set to `value`. */
function buildRecord(value: boolean): ConsentPreferences {
  return {
    necessary: true,
    analytics: value,
    marketing: value,
    timestamp: Date.now(),
  };
}

/** Read the stored consent record. Returns `null` when absent or expired. */
export function readConsent(): ConsentPreferences | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const record: ConsentPreferences = JSON.parse(raw);
    if (!record.timestamp) return null;
    if (Date.now() - record.timestamp > CONSENT_DURATION_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return record;
  } catch {
    return null;
  }
}

/** Persist a full consent record. Safely handles SSR and storage-full errors. */
export function saveConsent(prefs: ConsentPreferences): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Silently fail — localStorage may be unavailable in SSR or full.
  }
}

/** Accept all categories. */
export function acceptAll(): ConsentPreferences {
  const record = buildRecord(true);
  saveConsent(record);
  return record;
}

/** Decline all optional categories. */
export function declineAll(): ConsentPreferences {
  const record = buildRecord(false);
  saveConsent(record);
  return record;
}

/** Check whether a specific category has been consented to. */
export function hasConsent(
  category: "analytics" | "marketing" | "necessary"
): boolean {
  const record = readConsent();
  if (!record) return false;
  return record[category] === true;
}
