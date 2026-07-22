import { NextResponse } from "next/server";
import { sendEmail, escapeHtml, isValidEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  service?: unknown;
  message?: unknown;
  /** Honeypot — bots fill this, humans don't (it's visually hidden). */
  website?: unknown;
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  // Honeypot check — if the hidden "website" field is filled, it's a bot.
  // Return a fake success so the bot thinks it worked.
  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  // ---- Validate required fields ----
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";

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
  if (!message || message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Please tell us a bit more about your project." },
      { status: 422 },
    );
  }

  // Optional fields
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const company =
    typeof payload.company === "string" ? payload.company.trim() : "";
  const service =
    typeof payload.service === "string" ? payload.service.trim() : "";

  // ---- Compose + send email ----
  const subject = `New inquiry from ${escapeHtml(name)}${
    company ? ` (${escapeHtml(company)})` : ""
  }${service ? ` — ${escapeHtml(service)}` : ""}`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; color: #0a0a0a;">
      <h2 style="margin: 0 0 16px 0; color: #208535;">New Contact Form Submission</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 6px 0; color: #737373; width: 100px; vertical-align: top;">Name:</td><td style="padding: 6px 0;"><strong>${escapeHtml(name)}</strong></td></tr>
        ${company ? `<tr><td style="padding: 6px 0; color: #737373; vertical-align: top;">Company:</td><td style="padding: 6px 0;">${escapeHtml(company)}</td></tr>` : ""}
        <tr><td style="padding: 6px 0; color: #737373; vertical-align: top;">Email:</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #208535;">${escapeHtml(email)}</a></td></tr>
        ${phone ? `<tr><td style="padding: 6px 0; color: #737373; vertical-align: top;">Phone:</td><td style="padding: 6px 0;">${escapeHtml(phone)}</td></tr>` : ""}
        ${service ? `<tr><td style="padding: 6px 0; color: #737373; vertical-align: top;">Service:</td><td style="padding: 6px 0;">${escapeHtml(service)}</td></tr>` : ""}
      </table>
      <h3 style="margin: 24px 0 8px 0; font-size: 14px; color: #737373;">Message</h3>
      <div style="padding: 16px; background: #f5f5f4; border-radius: 8px; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</div>
      <p style="margin: 24px 0 0 0; font-size: 12px; color: #a3a3a3;">Sent from the Retech Solutions website contact form.</p>
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
