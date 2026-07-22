import { Resend } from "resend";
import { CONTACT } from "@/lib/constants";

/**
 * Email helper — uses Resend to deliver form submissions to CONTACT.email.
 *
 * Required env var: RESEND_API_KEY (get one at https://resend.com/api-keys)
 *
 * Until the retech.asia domain is verified inside Resend, the FROM address
 * falls back to Resend's sandbox address (onboarding@resend.dev). The
 * submitter's email is always set as reply-to so you can hit "reply" in your
 * inbox to respond directly to the lead.
 *
 * To verify retech.asia for production FROM (e.g. hello@retech.asia):
 *   1. Resend dashboard → Domains → Add Domain → retech.asia
 *   2. Add the DNS records Resend shows you (SPF, DKIM, MX) in Cloudflare
 *   3. Update RESEND_FROM env var to "Retech Solutions <hello@retech.asia>"
 */

const apiKey = process.env.RESEND_API_KEY;
const fromAddress =
  process.env.RESEND_FROM ??
  // Sandbox address — works without domain verification, can only send TO
  // the email associated with the Resend account.
  "Retech Website <onboarding@resend.dev>";

const resend = apiKey ? new Resend(apiKey) : null;

export interface EmailPayload {
  /** Email subject line. */
  subject: string;
  /** HTML body — must be pre-escaped/sanitised by caller. */
  html: string;
  /** Submitter's email — used as reply-to so you can hit Reply in your inbox. */
  replyTo?: string;
  /** Optional display name shown in the reply-to header. */
  replyToName?: string;
}

export interface EmailResult {
  success: boolean;
  /** Resend message id when successful. */
  messageId?: string;
  /** Error message when unsuccessful. */
  error?: string;
}

/**
 * Send an email via Resend.
 *
 * In development (no RESEND_API_KEY set), logs to console instead of sending
 * so the form flow can be exercised locally without a Resend account.
 */
export async function sendEmail(payload: EmailPayload): Promise<EmailResult> {
  if (!resend) {
    console.warn(
      "[email] RESEND_API_KEY not set — logging submission instead of sending.",
    );
    console.info("[email] Would send:", {
      from: fromAddress,
      to: CONTACT.email,
      replyTo: payload.replyTo,
      subject: payload.subject,
    });
    return { success: true, messageId: "dev-mode-no-send" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: CONTACT.email,
      replyTo: payload.replyTo
        ? payload.replyToName
          ? `${payload.replyToName} <${payload.replyTo}>`
          : payload.replyTo
        : undefined,
      subject: payload.subject,
      html: payload.html,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
}

/**
 * Escape user-supplied text for safe insertion into HTML email body.
 * Prevents HTML injection through form fields.
 */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Basic email format validation. RFC-simple; sufficient for form use.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
