import { NextResponse } from "next/server";
import { sendEmail, escapeHtml, isValidEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface EstimatePayload {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  phone?: unknown;
  // Estimator state
  projectType?: unknown;
  projectTypeLabel?: unknown;
  scope?: unknown;
  scopeLabel?: unknown;
  scopeDescription?: unknown;
  teamSize?: unknown;
  teamSizeLabel?: unknown;
  teamSizeDescription?: unknown;
  estimateLabel?: unknown;
  estimateRange?: unknown;
  notes?: unknown;
}

export async function POST(request: Request) {
  let payload: EstimatePayload;
  try {
    payload = (await request.json()) as EstimatePayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  // ---- Validate required fields ----
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";

  if (!name || name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Please enter your name." },
      { status: 422 },
    );
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  // Optional fields
  const company =
    typeof payload.company === "string" ? payload.company.trim() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const projectTypeLabel =
    typeof payload.projectTypeLabel === "string"
      ? payload.projectTypeLabel.trim()
      : "";
  const scopeLabel =
    typeof payload.scopeLabel === "string" ? payload.scopeLabel.trim() : "";
  const scopeDescription =
    typeof payload.scopeDescription === "string"
      ? payload.scopeDescription.trim()
      : "";
  const teamSizeLabel =
    typeof payload.teamSizeLabel === "string"
      ? payload.teamSizeLabel.trim()
      : "";
  const teamSizeDescription =
    typeof payload.teamSizeDescription === "string"
      ? payload.teamSizeDescription.trim()
      : "";
  const estimateLabel =
    typeof payload.estimateLabel === "string" ? payload.estimateLabel.trim() : "";
  const estimateRange =
    typeof payload.estimateRange === "string" ? payload.estimateRange.trim() : "";
  const notes = typeof payload.notes === "string" ? payload.notes.trim() : "";

  // ---- Compose + send email ----
  const subject = `Detailed quote request from ${escapeHtml(name)}${
    projectTypeLabel ? ` — ${escapeHtml(projectTypeLabel)}` : ""
  }`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; color: #0a0a0a;">
      <h2 style="margin: 0 0 16px 0; color: #208535;">Project Estimate Request</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 6px 0; color: #737373; width: 120px; vertical-align: top;">Name:</td><td style="padding: 6px 0;"><strong>${escapeHtml(name)}</strong></td></tr>
        ${company ? `<tr><td style="padding: 6px 0; color: #737373; vertical-align: top;">Company:</td><td style="padding: 6px 0;">${escapeHtml(company)}</td></tr>` : ""}
        <tr><td style="padding: 6px 0; color: #737373; vertical-align: top;">Email:</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #208535;">${escapeHtml(email)}</a></td></tr>
        ${phone ? `<tr><td style="padding: 6px 0; color: #737373; vertical-align: top;">Phone:</td><td style="padding: 6px 0;">${escapeHtml(phone)}</td></tr>` : ""}
      </table>

      <h3 style="margin: 24px 0 8px 0; font-size: 14px; color: #737373;">Project Details</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        ${projectTypeLabel ? `<tr><td style="padding: 6px 0; color: #737373; width: 120px; vertical-align: top;">Type:</td><td style="padding: 6px 0;">${escapeHtml(projectTypeLabel)}</td></tr>` : ""}
        ${scopeLabel ? `<tr><td style="padding: 6px 0; color: #737373; vertical-align: top;">Scope:</td><td style="padding: 6px 0;"><strong>${escapeHtml(scopeLabel)}</strong>${scopeDescription ? `<br><span style="color: #737373; font-size: 13px;">${escapeHtml(scopeDescription)}</span>` : ""}</td></tr>` : ""}
        ${teamSizeLabel ? `<tr><td style="padding: 6px 0; color: #737373; vertical-align: top;">Team Size:</td><td style="padding: 6px 0;"><strong>${escapeHtml(teamSizeLabel)}</strong>${teamSizeDescription ? `<br><span style="color: #737373; font-size: 13px;">${escapeHtml(teamSizeDescription)}</span>` : ""}</td></tr>` : ""}
        ${estimateRange ? `<tr><td style="padding: 6px 0; color: #737373; vertical-align: top;">Estimate:</td><td style="padding: 6px 0;"><strong style="color: #208535;">${escapeHtml(estimateRange)}</strong>${estimateLabel ? ` <span style="color: #737373; font-size: 13px;">(${escapeHtml(estimateLabel)})</span>` : ""}</td></tr>` : ""}
      </table>

      ${
        notes
          ? `<h3 style="margin: 24px 0 8px 0; font-size: 14px; color: #737373;">Notes</h3><div style="padding: 16px; background: #f5f5f4; border-radius: 8px; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(notes)}</div>`
          : ""
      }

      <p style="margin: 24px 0 0 0; font-size: 12px; color: #a3a3a3;">Sent from the project estimator on the Retech Solutions website.</p>
    </div>
  `;

  const result = await sendEmail({
    subject,
    html,
    replyTo: email,
    replyToName: name,
  });

  if (!result.success) {
    return NextResponse.json(
      { ok: false, error: result.error ?? "Failed to send email." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
