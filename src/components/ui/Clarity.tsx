"use client";

import Script from "next/script";
import { useEffect } from "react";
import { readConsent } from "@/lib/cookie-consent";

/**
 * Microsoft Clarity — session recordings, heatmaps, scroll tracking.
 *
 * Behavior mirrors <GA4 />:
 * - No-op when NEXT_PUBLIC_CLARITY_ID is not set: renders nothing, no
 *   request is made, zero runtime cost.
 * - Clarity loads with consent blocked (`clarity("consent", false)`) and
 *   flips to consented when the analytics category is accepted in the
 *   cookie banner. Input masking is ALWAYS on (Clarity default — all
 *   form fields are masked in recordings regardless of consent).
 *
 * Same-tab reactivity: listens for `retech:consent-change` (dispatched by
 * CookieConsent) plus the cross-tab `storage` event.
 */

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

function syncConsent() {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clarity = (window as any).clarity;
  if (typeof clarity !== "function") return;
  const record = readConsent();
  clarity("consent", record?.analytics === true);
}

export function Clarity() {
  useEffect(() => {
    if (!CLARITY_ID) return;
    syncConsent();
    const onChange = () => syncConsent();
    window.addEventListener("retech:consent-change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("retech:consent-change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  if (!CLARITY_ID) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          c[a]("consent", false);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
      `}
    </Script>
  );
}
