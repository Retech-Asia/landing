interface ErrorReport {
  message: string;
  digest?: string;
  url: string;
  timestamp: string;
  userAgent: string;
}

/**
 * Constructs an error report and returns a mailto: link pre-filled with
 * the details so the user can email it to the team.
 */
import { CONTACT } from "./constants";

export function buildMailtoErrorLink(error: Error & { digest?: string }): string {
  const report: ErrorReport = {
    message: error.message || "Unknown error",
    digest: error.digest,
    url: typeof window !== "undefined" ? window.location.href : "N/A",
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "N/A",
  };

  const subject = encodeURIComponent(
    `[Retech Website] Error Report - ${report.timestamp}`
  );

  const body = encodeURIComponent(
    [
      "Error Report",
      "============",
      `Timestamp : ${report.timestamp}`,
      `URL       : ${report.url}`,
      `User Agent: ${report.userAgent}`,
      `Message   : ${report.message}`,
      report.digest ? `Digest    : ${report.digest}` : null,
      "",
      "Additional context (optional):",
      "",
    ]
      .filter(Boolean)
      .join("\n")
  );

  return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
}
