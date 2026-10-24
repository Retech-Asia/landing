"use client";

import { useEffect } from "react";
import { readConsent } from "@/lib/cookie-consent";

/**
 * Microsoft Clarity — session recordings, heatmaps, scroll tracking.
 *
 * Consent-first loading (owner ruling 2026-10-24: Clarity's pre-consent
 * bootstrap cookies — CLID/SM/MUID — are unacceptable, so the tag must not
 * even load before acceptance):
 * - No script request of any kind until the visitor accepts the analytics
 *   category. Nothing renders server-side; injection happens only after a
 *   granted consent is read from storage.
 * - On grant: the tag loader is injected once and `clarity("consent", true)`
 *   is queued, so recording starts consented from the first frame.
 * - On reject: no load, ever (the loader only triggers on `analytics === true`).
 * - On revocation after load: `clarity("consent", false)` plus
 *   `clarity("stop")` halt recording. The tag cannot be un-loaded from the
 *   page, but no further session data is sent; re-granting resumes via
 *   `clarity("start")`. Input masking is ALWAYS on (Clarity default — all
 *   form fields are masked in recordings regardless of consent).
 *
 * Same-tab reactivity: listens for `retech:consent-change` (dispatched by
 * CookieConsent) plus the cross-tab `storage` event.
 */

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

// Module-level so React strict-mode double-invocation can't double-load.
let loaded = false;
let stopped = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function clarityFn(): any | null {
  if (typeof window === "undefined") return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = (window as any).clarity;
  return typeof c === "function" ? c : null;
}

function grant() {
  const c = clarityFn();
  if (!c) return;
  c("consent", true);
  if (stopped) {
    c("start");
    stopped = false;
  }
}

function deny() {
  const c = clarityFn();
  if (!c) return;
  c("consent", false);
  if (!stopped) {
    c("stop");
    stopped = true;
  }
}

function load() {
  if (loaded || !CLARITY_ID || typeof document === "undefined") return;
  loaded = true;
  // Same bootstrap shape as Microsoft's snippet, executed only post-consent:
  // queue object first, then the tag script, then the consent command (the
  // library replays queued calls on init).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  w.clarity =
    w.clarity ||
    function (...args: unknown[]) {
      (w.clarity.q = w.clarity.q || []).push(args);
    };
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(s);
  grant();
}

function applyConsent() {
  const record = readConsent();
  if (record?.analytics === true) {
    if (loaded) {
      grant();
    } else {
      load();
    }
  } else if (loaded) {
    deny();
  }
}

export function Clarity() {
  useEffect(() => {
    if (!CLARITY_ID) return;
    applyConsent();
    const onChange = () => applyConsent();
    window.addEventListener("retech:consent-change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("retech:consent-change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  // The tag is injected imperatively after consent — nothing renders.
  return null;
}
