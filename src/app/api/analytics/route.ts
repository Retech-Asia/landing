import { NextRequest, NextResponse } from "next/server";

// ── Rate limiter (in-memory, per-IP) ────────────────────────────
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 100;

const requestCounts = new Map<string, { count: number; resetAt: number }>();

/**
 * Simple sliding-window rate limiter.
 * Returns `true` when the request should be allowed.
 */
function isAllowed(ip: string): boolean {
  const now = Date.now();
  const entry = requestCounts.get(ip);

  if (!entry || now > entry.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS) {
    return false;
  }

  return true;
}

// Periodically prune expired entries to avoid unbounded memory growth.
// Runs once per minute in the Node.js runtime.
if (typeof globalThis !== "undefined" && !(globalThis as Record<string, unknown>).__rateLimitCleanup) {
  (globalThis as Record<string, unknown>).__rateLimitCleanup = true;
  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of requestCounts.entries()) {
      if (now > entry.resetAt) {
        requestCounts.delete(ip);
      }
    }
  }, WINDOW_MS);
}

// ── CORS headers ─────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  "https://www.retech.asia",
  "https://retech.asia",
  // Allow localhost during development
  ...(process.env.NODE_ENV === "development"
    ? ["http://localhost:3000"]
    : []),
];

function corsHeaders(request: NextRequest): Record<string, string> {
  const origin = request.headers.get("origin") ?? "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin)
    ? origin
    : ALLOWED_ORIGINS[0];

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

// ── Handlers ─────────────────────────────────────────────────────

/** Handle CORS preflight. */
export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(request),
  });
}

interface AnalyticsPayload {
  event?: unknown;
  timestamp?: unknown;
  [key: string]: unknown;
}

/** Accept analytics events from the client. */
export async function POST(request: NextRequest): Promise<NextResponse> {
  // ── Rate limiting ──
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!isAllowed(ip)) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: corsHeaders(request) },
    );
  }

  // ── Enforce body size limit (10 KB max) ──
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 10_000) {
    return NextResponse.json(
      { error: "Payload too large" },
      { status: 413, headers: corsHeaders(request) },
    );
  }

  // ── Parse body ──
  let body: AnalyticsPayload;
  try {
    body = (await request.json()) as AnalyticsPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400, headers: corsHeaders(request) },
    );
  }

  // ── Validate required fields ──
  const { event, timestamp } = body;

  if (!event || typeof event !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid field: event (string required)" },
      { status: 400, headers: corsHeaders(request) },
    );
  }

  if (
    timestamp === undefined ||
    (typeof timestamp !== "number" && typeof timestamp !== "string")
  ) {
    return NextResponse.json(
      { error: "Missing or invalid field: timestamp (number or ISO string required)" },
      { status: 400, headers: corsHeaders(request) },
    );
  }

  // ── Process event ──
  if (process.env.NODE_ENV === "development") {
    // Only log the validated scalar fields; ignore arbitrary extra data
    // to prevent log injection from untrusted payloads.
    const extraFields: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(body)) {
      if (k !== "event" && k !== "timestamp" && typeof v === "string" && v.length <= 200) {
        extraFields[k] = v;
      }
    }
    console.log("[analytics]", {
      event,
      timestamp: typeof timestamp === "number" ? new Date(timestamp).toISOString() : timestamp,
      ip,
      ...extraFields,
    });
  }

  // Production: placeholder for real analytics integration.
  // e.g. forward to Mixpanel, Amplitude, a data warehouse, etc.

  return NextResponse.json(
    { ok: true },
    { status: 200, headers: corsHeaders(request) },
  );
}

/** Reject unsupported methods. */
export async function GET(request: NextRequest): Promise<NextResponse> {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: corsHeaders(request) },
  );
}
