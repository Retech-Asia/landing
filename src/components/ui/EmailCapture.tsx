"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle, Loader2, Mail, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT } from "@/lib/constants";

type EmailCaptureVariant = "inline" | "full";

interface EmailCaptureProps {
  /** Layout variant: "inline" for compact sidebar usage, "full" for section-level usage */
  variant?: EmailCaptureVariant;
  /** Use dark styling for placement on dark backgrounds (e.g. footer) */
  dark?: boolean;
  /** Optional heading text (defaults provided per variant) */
  heading?: string;
  /** Optional description text */
  description?: string;
  /** Optional className for the outer wrapper */
  className?: string;
}

function validateEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function EmailCapture({
  variant = "full",
  dark = false,
  heading,
  description,
  className,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    // Brief loading state for visual feedback, then open mailto
    setTimeout(() => {
      const subject = encodeURIComponent("Newsletter Subscription");
      const body = encodeURIComponent(
        `Hi,\n\nI would like to subscribe to the Retech Solutions newsletter.\n\nEmail: ${email}\n\nThank you!`
      );
      window.location.href = `${CONTACT.emailHref}?subject=${subject}&body=${body}`;

      setLoading(false);
      setSubmitted(true);
    }, 600);
  }

  const isInline = variant === "inline";

  const defaultHeading = isInline
    ? "Subscribe to our newsletter"
    : "Stay Updated";
  const defaultDescription = isInline
    ? "Get the latest insights on software development and digital transformation."
    : "Get the latest insights on software development, AI, and digital transformation delivered to your inbox.";

  const resolvedHeading = heading ?? defaultHeading;
  const resolvedDescription = description ?? defaultDescription;

  // Dark mode color tokens
  const textColor = dark ? "text-white" : "text-foreground";
  const secondaryColor = dark ? "text-white/60" : "text-foreground-secondary";
  const mutedColor = dark ? "text-white/40" : "text-foreground-muted";
  const iconColor = dark ? "text-brand" : "text-brand";
  const inputBg = dark ? "bg-white/5" : "bg-white";
  const inputPlaceholder = dark
    ? "placeholder:text-white/30"
    : "placeholder:text-foreground-muted/50";
  const inputText = dark ? "text-white" : "text-foreground";
  const inputBorder = dark
    ? "rgba(255, 255, 255, 0.10)"
    : "var(--card-border)";
  const inputFocusBorder = dark
    ? "rgba(32, 133, 53, 0.5)"
    : "rgba(32, 133, 53, 0.4)";
  const inputFocusShadow = dark
    ? "0 0 20px rgba(32, 133, 53, 0.15)"
    : "0 0 0 3px rgba(32, 133, 53, 0.08)";
  const btnFocusRing = dark
    ? "focus-visible:ring-white/50 focus-visible:ring-offset-[#1A1A2E]"
    : "focus-visible:ring-brand/50 focus-visible:ring-offset-background";
  const successBg = dark ? "bg-brand/10" : "bg-brand/10";
  const successText = dark ? "text-brand" : "text-brand";
  const errorColor = dark ? "text-red-400" : "text-red-500";

  // Track whether description was explicitly provided (used for inline variant)
  const descriptionProvided = description !== undefined;

  return (
    <div className={className}>
      {/* Header */}
      {isInline ? (
        <div className="flex items-center gap-2 mb-2">
          <Mail size={16} className={`${iconColor} shrink-0`} aria-hidden="true" />
          <h4 className={`text-sm font-semibold ${textColor}`}>
            {resolvedHeading}
          </h4>
        </div>
      ) : (
        <>
          <h3 className={`text-2xl font-semibold ${textColor} mb-2`}>
            {resolvedHeading}
          </h3>
          <p className={`text-sm ${secondaryColor} mb-6 leading-relaxed`}>
            {resolvedDescription}
          </p>
        </>
      )}

      {isInline && !descriptionProvided && (
        <p className={`text-xs ${secondaryColor} mb-3 leading-relaxed`}>
          {resolvedDescription}
        </p>
      )}

      {/* Success state */}
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium ${successBg} ${successText}`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 400, damping: 15 }}
            >
              <CheckCircle size={16} className="shrink-0" />
            </motion.div>
            Thank you for subscribing!
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={
              isInline
                ? "flex flex-col gap-2"
                : "flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
            }
          >
            {/* Input wrapper */}
            <div className={isInline ? "w-full" : "w-full sm:flex-1"}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Enter your email"
                aria-label="Email address for newsletter"
                aria-invalid={error ? "true" : undefined}
                disabled={loading}
                className={
                  isInline
                    ? `w-full rounded-lg border ${inputBg} px-3 py-2 text-base ${inputText} ${inputPlaceholder} focus:outline-none transition-all duration-300 disabled:opacity-50`
                    : `w-full rounded-lg border ${inputBg} px-4 py-3 text-base ${inputText} ${inputPlaceholder} focus:outline-none transition-all duration-300 disabled:opacity-50`
                }
                style={{
                  borderColor: error
                    ? "rgba(239, 68, 68, 0.5)"
                    : inputBorder,
                  boxShadow: error
                    ? "0 0 12px rgba(239, 68, 68, 0.1)"
                    : undefined,
                }}
                onFocus={(e) => {
                  if (!error) {
                    e.currentTarget.style.borderColor = inputFocusBorder;
                    e.currentTarget.style.boxShadow = inputFocusShadow;
                  }
                }}
                onBlur={(e) => {
                  if (!error) {
                    e.currentTarget.style.borderColor = inputBorder;
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-xs ${errorColor} mt-1`}
                  role="alert"
                >
                  {error}
                </motion.p>
              )}
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={loading}
              aria-label="Subscribe to newsletter"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={
                isInline
                  ? `inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-light transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 ${btnFocusRing} focus-visible:ring-offset-2 disabled:opacity-60`
                  : `w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-medium text-white hover:bg-brand-light transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 ${btnFocusRing} focus-visible:ring-offset-2 disabled:opacity-60`
              }
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin shrink-0" />
                  Subscribing...
                </>
              ) : (
                <>
                  Subscribe
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Send
                      size={14}
                      className="shrink-0"
                      aria-hidden="true"
                    />
                  </motion.span>
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* No-spam note */}
      {!submitted && (
        <p className={`text-xs ${mutedColor} mt-2 text-center sm:text-left`}>
          No spam. Unsubscribe anytime.
        </p>
      )}
    </div>
  );
}
