"use client";

import { useMemo } from "react";
import { CONTACT } from "@/lib/constants";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const reportLink = useMemo(() => {
    const message = error?.message || "Unknown error";
    const digest = error?.digest;
    const url = typeof window !== "undefined" ? window.location.href : "N/A";
    const timestamp = new Date().toISOString();
    const userAgent =
      typeof navigator !== "undefined" ? navigator.userAgent : "N/A";

    const subject = encodeURIComponent(
      `[Retech Website] Critical Error Report - ${timestamp}`
    );
    const body = encodeURIComponent(
      [
        "Critical Error Report",
        "=====================",
        `Timestamp : ${timestamp}`,
        `URL       : ${url}`,
        `User Agent: ${userAgent}`,
        `Message   : ${message}`,
        digest ? `Digest    : ${digest}` : null,
        "",
        "Additional context (optional):",
        "",
      ]
        .filter(Boolean)
        .join("\n")
    );
    return `${CONTACT.emailHref}?subject=${subject}&body=${body}`;
  }, [error]);

  const handleReload = () => {
    try {
      reset();
    } catch {
      window.location.reload();
    }
  };

  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <html lang="en">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes errRotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              @keyframes errPulse {
                0%, 100% { opacity: 0.3; transform: scale(0.9); }
                50% { opacity: 0.15; transform: scale(1.05); }
              }
              @keyframes errFloat1 {
                0%, 100% { transform: translateY(0); opacity: 0.3; }
                50% { transform: translateY(-6px); opacity: 0.5; }
              }
              @keyframes errFloat2 {
                0%, 100% { transform: translateY(0); opacity: 0.3; }
                50% { transform: translateY(-8px); opacity: 0.5; }
              }
              @keyframes errFloat3 {
                0%, 100% { transform: translateY(0); opacity: 0.25; }
                50% { transform: translateY(-5px); opacity: 0.4; }
              }
              @keyframes errGlow1 {
                0%, 100% { opacity: 0.5; transform: scale(1); }
                50% { opacity: 0.7; transform: scale(1.03); }
              }
              @keyframes errGlow2 {
                0%, 100% { opacity: 0.4; transform: scale(1); }
                50% { opacity: 0.6; transform: scale(1.02); }
              }
              @keyframes errFadeUp {
                from { opacity: 0; transform: translateY(16px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .err-rotate { animation: errRotate 20s linear infinite; transform-origin: 100px 100px; }
              .err-pulse { animation: errPulse 3s ease-in-out infinite; transform-origin: 100px 100px; }
              .err-float1 { animation: errFloat1 4s ease-in-out infinite; }
              .err-float2 { animation: errFloat2 5s ease-in-out infinite 1s; }
              .err-float3 { animation: errFloat3 3.5s ease-in-out infinite 0.5s; }
              .err-glow1 { animation: errGlow1 6s ease-in-out infinite; }
              .err-glow2 { animation: errGlow2 7s ease-in-out infinite 1s; }
              .err-fade-up { animation: errFadeUp 0.5s ease-out forwards; }
              .err-fade-up-d1 { animation: errFadeUp 0.5s ease-out 0.1s forwards; opacity: 0; }
              .err-fade-up-d2 { animation: errFadeUp 0.5s ease-out 0.3s forwards; opacity: 0; }
              .err-fade-up-d3 { animation: errFadeUp 0.5s ease-out 0.5s forwards; opacity: 0; }
              .err-fade-up-d4 { animation: errFadeUp 0.5s ease-out 0.6s forwards; opacity: 0; }
              @media (prefers-reduced-motion: reduce) {
                .err-rotate, .err-pulse, .err-float1, .err-float2, .err-float3,
                .err-glow1, .err-glow2, .err-fade-up, .err-fade-up-d1,
                .err-fade-up-d2, .err-fade-up-d3, .err-fade-up-d4 {
                  animation: none !important;
                  opacity: 1 !important;
                  transform: none !important;
                }
              }
            `,
          }}
        />
      </head>
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            backgroundColor: "#FAFAF8",
            color: "#1A1A2E",
            padding: "2rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background gradient orbs */}
          <div
            className="err-glow1"
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-5%",
              left: "20%",
              width: "600px",
              height: "400px",
              background: "radial-gradient(ellipse, rgba(32, 133, 53, 0.06), transparent)",
              pointerEvents: "none",
            }}
          />
          <div
            className="err-glow2"
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "30%",
              right: "-5%",
              width: "500px",
              height: "350px",
              background: "radial-gradient(ellipse, rgba(6, 182, 212, 0.05), transparent)",
              pointerEvents: "none",
            }}
          />

          {/* Animated warning triangle SVG illustration */}
          <div className="err-fade-up-d1" style={{ marginBottom: "1.5rem" }}>
            <svg
              width="160"
              height="160"
              viewBox="0 0 200 200"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="critGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#208535" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>

              {/* Outer rotating dashed ring */}
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="url(#critGrad)"
                strokeWidth="2"
                strokeDasharray="12 8"
                fill="none"
                className="err-rotate"
              />

              {/* Inner pulsing ring */}
              <circle
                cx="100"
                cy="100"
                r="70"
                stroke="#208535"
                strokeWidth="1.5"
                fill="none"
                className="err-pulse"
              />

              {/* Warning triangle */}
              <path
                d="M100 45 L145 125 L55 125 Z"
                fill="none"
                stroke="url(#critGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Exclamation mark */}
              <line
                x1="100"
                y1="75"
                x2="100"
                y2="100"
                stroke="url(#critGrad)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="100" cy="112" r="2.5" fill="#208535" />

              {/* Floating accent dots */}
              <circle cx="30" cy="60" r="3" fill="#06b6d4" opacity="0.3" className="err-float1" />
              <circle cx="170" cy="50" r="2.5" fill="#8b5cf6" opacity="0.3" className="err-float2" />
              <circle cx="160" cy="160" r="2" fill="#208535" opacity="0.25" className="err-float3" />
            </svg>
          </div>

          {/* Heading */}
          <h1
            className="err-fade-up-d2"
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              margin: "0 0 0.5rem",
              lineHeight: 1.2,
            }}
          >
            Something went wrong
          </h1>
          <p
            className="err-fade-up-d3"
            style={{
              fontSize: "1rem",
              color: "#6B6B78",
              maxWidth: "440px",
              lineHeight: 1.6,
              marginBottom: "2rem",
            }}
          >
            A critical error occurred. Don&apos;t worry &mdash; try reloading the
            page, head back home, or go back to where you were.
          </p>

          {/* Action buttons */}
          <div
            className="err-fade-up-d3"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
            }}
          >
            {/* Reload button */}
            <button
              onClick={handleReload}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.875rem 2rem",
                fontSize: "1rem",
                fontWeight: 500,
                borderRadius: "9999px",
                color: "#fff",
                background: "linear-gradient(to right, #208535, #06b6d4)",
                border: "none",
                cursor: "pointer",
                transition: "box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 4px 20px rgba(32, 133, 53, 0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
              </svg>
              Reload Page
            </button>

            {/* Go Home link — plain <a> because global-error renders outside the Next.js router */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.875rem 2rem",
                fontSize: "1rem",
                fontWeight: 500,
                borderRadius: "9999px",
                color: "#1A1A2E",
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.12)",
                textDecoration: "none",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(0,0,0,0.20)";
                el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(0,0,0,0.12)";
                el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Go Home
            </a>

            {/* Go Back button */}
            <button
              onClick={handleGoBack}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.875rem 2rem",
                fontSize: "1rem",
                fontWeight: 500,
                borderRadius: "9999px",
                color: "#6B6B78",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#1A1A2E";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#6B6B78";
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Go Back
            </button>
          </div>

          {/* Report issue link */}
          <a
            href={reportLink}
            className="err-fade-up-d4"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              marginTop: "1.5rem",
              fontSize: "0.875rem",
              color: "#6B6B78",
              textDecoration: "none",
              transition: "color 0.2s",
              borderRadius: "0.125rem",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#1A1A2E";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#6B6B78";
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Report this issue
          </a>
        </div>
      </body>
    </html>
  );
}
