"use client";

import { useState, useCallback, useEffect, useRef, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Paperclip,
  LayoutList,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  FormField,
  FormFieldTextarea,
  FormFieldSelect,
} from "@/components/ui/FormField";
import { cn } from "@/lib/cn";
import { CONTACT } from "@/lib/constants";

const SERVICES = [
  "Custom Software Development",
  "CMS Development",
  "CRM Development",
  "ERP Solutions",
  "AI-Powered Solutions",
  "Mobile App Development",
];

const MESSAGE_MAX_LENGTH = 2000;
const MESSAGE_MIN_LENGTH = 20;

const TOTAL_STEPS = 3;

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

interface Touched {
  name?: boolean;
  email?: boolean;
  phone?: boolean;
  company?: boolean;
  service?: boolean;
  message?: boolean;
}

/* ── Validation helpers ────────────────────────────────────── */

function validateField(
  field: keyof FormData,
  value: string
): string | undefined {
  switch (field) {
    case "name":
      if (!value.trim()) return "Name is required.";
      if (value.trim().length < 2)
        return "Name must be at least 2 characters.";
      return undefined;
    case "email":
      if (!value.trim()) return "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Please enter a valid email address.";
      return undefined;
    case "phone":
      if (!value.trim()) return undefined;
      const digits = value.replace(/[\s\-\(\)\+\.]/g, "");
      if (!/^\d{7,15}$/.test(digits))
        return "Enter a valid phone number (7-15 digits).";
      return undefined;
    case "service":
      if (!value) return "Please select a service.";
      return undefined;
    case "message":
      if (!value.trim()) return "Message is required.";
      if (value.trim().length < MESSAGE_MIN_LENGTH)
        return `Message must be at least ${MESSAGE_MIN_LENGTH} characters.`;
      return undefined;
    default:
      return undefined;
  }
}

function validateFields(
  fields: (keyof FormErrors)[],
  data: FormData
): FormErrors {
  const errors: FormErrors = {};
  for (const f of fields) {
    const err = validateField(f, data[f]);
    if (err) errors[f] = err;
  }
  return errors;
}

function validateAll(data: FormData): FormErrors {
  return validateFields(
    ["name", "email", "phone", "service", "message"],
    data
  );
}

/* ── Step progress indicator ────────────────────────────────── */

function StepProgress({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-foreground-secondary">
          Step {currentStep} of {totalSteps}
        </span>
        <div className="flex items-center gap-1">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-colors duration-300",
                i < currentStep
                  ? "bg-brand"
                  : i === currentStep
                    ? "bg-brand/40"
                    : "bg-black/[0.06]"
              )}
              initial={{ width: i === currentStep ? 24 : 12 }}
              animate={{
                width: i === currentStep ? 24 : 12,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          ))}
        </div>
      </div>
      {/* Progress bar */}
      <div className="h-1 w-full rounded-full bg-black/[0.05] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand to-accent-cyan"
          initial={{ width: 0 }}
          animate={{
            width: `${(currentStep / totalSteps) * 100}%`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  );
}

/* ── Step labels ────────────────────────────────────────────── */

const STEP_LABELS = [
  { label: "Project Type", icon: LayoutList },
  { label: "Details", icon: Paperclip },
  { label: "Contact Info", icon: Send },
];

function StepLabels({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-between mb-6">
      {STEP_LABELS.map((step, i) => {
        const isActive = i + 1 === currentStep;
        const isCompleted = i + 1 < currentStep;
        return (
          <div
            key={step.label}
            className={cn(
              "flex items-center gap-2 transition-colors duration-300",
              isActive
                ? "text-brand"
                : isCompleted
                  ? "text-brand/60"
                  : "text-foreground-muted"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-300",
                isActive
                  ? "bg-brand text-white shadow-[0_2px_8px_rgba(32,133,53,0.3)]"
                  : isCompleted
                    ? "bg-brand/15 text-brand"
                    : "bg-black/[0.04] text-foreground-muted"
              )}
            >
              {isCompleted ? (
                <CheckCircle size={14} strokeWidth={2.5} />
              ) : (
                i + 1
              )}
            </div>
            <span
              className={cn(
                "text-xs font-medium hidden sm:inline",
                isActive && "text-foreground"
              )}
            >
              {step.label}
            </span>
            {i < STEP_LABELS.length - 1 && (
              <div
                className={cn(
                  "hidden sm:block w-8 lg:w-16 h-px mx-1",
                  isCompleted ? "bg-brand/30" : "bg-black/[0.06]"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Slide transition variants ──────────────────────────────── */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
  }),
};

/* ── Success state ──────────────────────────────────────────── */

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-2xl border border-brand/20 bg-brand/5 p-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.15 }}
      >
        <CheckCircle
          size={40}
          className="text-brand mx-auto mb-4"
          strokeWidth={1.5}
        />
      </motion.div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Opening your email client
      </h3>
      <p className="text-sm text-foreground-secondary mb-4">
        Your email client should open with a pre-filled message. If it
        didn&apos;t open, you can email us directly at{" "}
        <a
          href={CONTACT.emailHref}
          className="text-brand hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-sm"
        >
          {CONTACT.email}
        </a>
      </p>
      <button
        type="button"
        onClick={onReset}
        className="text-sm font-medium text-brand hover:text-brand-dark transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-sm px-1"
      >
        Send another message
      </button>
    </motion.div>
  );
}

/* ── Single-page progress indicator (fallback mode) ─────────── */

function FormProgress({ formData }: { formData: FormData }) {
  const requiredFields: (keyof FormErrors)[] = [
    "name",
    "email",
    "service",
    "message",
  ];
  const completed = requiredFields.filter((f) => {
    const val = formData[f];
    if (!val) return false;
    return !validateField(f, val);
  }).length;
  const total = requiredFields.length;
  const pct = (completed / total) * 100;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-foreground-secondary">
          {completed} of {total} required fields completed
        </span>
        <span className="text-xs font-medium text-foreground-muted">
          {Math.round(pct)}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-black/[0.05] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand to-accent-cyan origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: pct / 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  );
}

/* ── Main form ──────────────────────────────────────────────── */

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [submitted, setSubmitted] = useState(false);
  const [shakeSubmit, setShakeSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Multi-step state
  const [wizardMode, setWizardMode] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const stepContainerRef = useRef<HTMLDivElement>(null);

  /* Debounced real-time validation */
  useEffect(() => {
    const timer = setTimeout(() => {
      const newErrors: FormErrors = {};
      for (const key of Object.keys(touched) as (keyof Touched)[]) {
        if (touched[key]) {
          const err = validateField(
            key as keyof FormData,
            formData[key as keyof FormData]
          );
          if (err) newErrors[key as keyof FormErrors] = err;
        }
      }
      setErrors((prev) => {
        const merged = { ...prev };
        for (const k of Object.keys(merged) as (keyof FormErrors)[]) {
          if (touched[k]) {
            if (newErrors[k] !== undefined) {
              merged[k] = newErrors[k];
            } else {
              delete merged[k];
            }
          }
        }
        for (const k of Object.keys(newErrors) as (keyof FormErrors)[]) {
          if (touched[k]) {
            merged[k] = newErrors[k];
          }
        }
        return merged;
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [formData, touched]);

  /* Focus first element on step change */
  useEffect(() => {
    if (!wizardMode) return;
    const timer = setTimeout(() => {
      const container = stepContainerRef.current;
      if (!container) return;
      const firstInput = container.querySelector<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >("input, textarea, select");
      if (firstInput) firstInput.focus();
    }, 350);
    return () => clearTimeout(timer);
  }, [currentStep, wizardMode]);

  const handleChange = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setTouched((prev) => ({ ...prev, [field]: true }));
    },
    []
  );

  const handleBlur = useCallback((field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  /* ── Step navigation ────────────────────────────────────── */

  const validateStep = useCallback(
    (step: number): boolean => {
      let fieldsToValidate: (keyof FormErrors)[] = [];
      if (step === 1) fieldsToValidate = ["service"];
      else if (step === 2) fieldsToValidate = ["message"];
      else if (step === 3) fieldsToValidate = ["name", "email", "phone"];

      const newTouched = { ...touched };
      for (const f of fieldsToValidate) {
        newTouched[f] = true;
      }
      setTouched(newTouched);

      const stepErrors = validateFields(fieldsToValidate, formData);
      setErrors((prev) => {
        const merged = { ...prev };
        for (const k of fieldsToValidate) {
          if (stepErrors[k]) {
            merged[k] = stepErrors[k];
          } else {
            delete merged[k];
          }
        }
        return merged;
      });

      return Object.keys(stepErrors).length === 0;
    },
    [formData, touched]
  );

  const goNext = useCallback(() => {
    if (!validateStep(currentStep)) {
      setShakeSubmit(true);
      setTimeout(() => setShakeSubmit(false), 600);
      return;
    }
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  }, [currentStep, validateStep]);

  const goBack = useCallback(() => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  /* ── Final submit ───────────────────────────────────────── */

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (wizardMode) {
      // Validate all steps at once
      const allValid = validateStep(1) && validateStep(2) && validateStep(3);
      if (!allValid) {
        setShakeSubmit(true);
        setTimeout(() => setShakeSubmit(false), 600);
        return;
      }
    } else {
      setTouched({
        name: true,
        email: true,
        phone: true,
        company: true,
        service: true,
        message: true,
      });

      const validationErrors = validateAll(formData);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        setShakeSubmit(true);
        setTimeout(() => setShakeSubmit(false), 600);
        return;
      }
    }

    // Submit to backend API — sends via Resend (or logs in dev when no key).
    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: formData.service,
          message: formData.message,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        const message =
          (typeof data.error === "string" && data.error) ||
          "Something went wrong sending your message. Please try again or email us directly.";
        setSubmitError(message);
        setShakeSubmit(true);
        setTimeout(() => setShakeSubmit(false), 600);
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Network error — please check your connection and try again, or email us directly.",
      );
      setShakeSubmit(true);
      setTimeout(() => setShakeSubmit(false), 600);
    } finally {
      setSubmitting(false);
    }
  }

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    });
    setErrors({});
    setTouched({});
    setCurrentStep(1);
    setDirection(1);
  };

  if (submitted) {
    return <SuccessState onReset={handleReset} />;
  }

  const hasErrors = Object.keys(errors).length > 0;

  /* ── Wizard mode ────────────────────────────────────────── */

  if (wizardMode) {
    return (
      <form onSubmit={handleSubmit} noValidate>
        <StepLabels currentStep={currentStep} />
        <StepProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        <div ref={stepContainerRef} className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            {/* Step 1: Project Type */}
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="space-y-5">
                  <FormFieldSelect
                    label="Service Interest"
                    name="service"
                    required
                    value={formData.service}
                    onChange={(value) => handleChange("service", value)}
                    onBlur={() => handleBlur("service")}
                    error={errors.service}
                    touched={touched.service}
                    placeholder="Select a service"
                    options={[
                      { value: "", label: "Select a service" },
                      ...SERVICES.map((service) => ({ value: service, label: service })),
                    ]}
                  />

                  <FormField
                    label="Company"
                    name="company"
                    type="text"
                    placeholder="Your company name (optional)"
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    onBlur={() => handleBlur("company")}
                    touched={touched.company}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Details & Message */}
            {currentStep === 2 && (
              <motion.div
                key="step-2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="space-y-5">
                  <div>
                    <FormFieldTextarea
                      label="Message"
                      name="message"
                      rows={5}
                      placeholder="Tell us about your project... (minimum 20 characters)"
                      required
                      maxLength={MESSAGE_MAX_LENGTH}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      onBlur={() => handleBlur("message")}
                      error={errors.message}
                      touched={touched.message}
                    />
                    <div className="flex justify-end -mt-1">
                      <span
                        className={cn(
                          "text-xs transition-colors duration-200",
                          formData.message.length > MESSAGE_MAX_LENGTH * 0.9
                            ? "text-amber-500"
                            : "text-foreground-muted"
                        )}
                      >
                        {formData.message.length}/{MESSAGE_MAX_LENGTH}
                      </span>
                    </div>
                  </div>

                  {/* File attachment hint */}
                  <div className="flex items-start gap-2.5 rounded-xl border border-black/[0.05] bg-brand/[0.02] px-4 py-3">
                    <Paperclip
                      size={14}
                      className="text-brand shrink-0 mt-0.5"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <p className="text-xs text-foreground-secondary leading-relaxed">
                      Need to share reference files or documents?{" "}
                      <span className="font-medium text-foreground">
                        Send them via email after submission
                      </span>{" "}
                      — we&apos;ll review everything together.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Contact Info */}
            {currentStep === 3 && (
              <motion.div
                key="step-3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      label="Name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      error={errors.name}
                      touched={touched.name}
                    />

                    <FormField
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      error={errors.email}
                      touched={touched.email}
                    />
                  </div>

                  <FormField
                    label="Phone"
                    name="phone"
                    type="tel"
                    placeholder="+84 123 456 789 (optional)"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    onBlur={() => handleBlur("phone")}
                    error={errors.phone}
                    touched={touched.phone}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Step-level error notice */}
        <AnimatePresence>
          {hasErrors && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 mt-4"
            >
              <AlertCircle size={16} className="text-red-500 shrink-0" />
              <p className="text-xs text-red-600">
                Please fix the highlighted fields before continuing.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-lg px-3 py-2 cursor-pointer"
              >
                <ArrowLeft size={14} strokeWidth={2} />
                Back
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            {/* Mode toggle */}
            <button
              type="button"
              onClick={() => setWizardMode(false)}
              className="text-xs text-foreground-muted hover:text-foreground-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded px-2 py-1 cursor-pointer"
            >
              Show all fields
            </button>

            {currentStep < TOTAL_STEPS ? (
              <motion.div
                animate={
                  shakeSubmit
                    ? { x: [0, -6, 6, -4, 4, -2, 2, 0] }
                    : { x: 0 }
                }
                transition={{ duration: 0.5 }}
              >
                <Button variant="primary" size="md" onClick={goNext}>
                  Next Step
                  <ArrowRight size={14} />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                animate={
                  shakeSubmit
                    ? { x: [0, -6, 6, -4, 4, -2, 2, 0] }
                    : { x: 0 }
                }
                transition={{ duration: 0.5 }}
              >
                <Button variant="primary" size="md" type="submit" disabled={submitting}>
                  {submitting ? "Sending…" : "Send Message"}
                  {!submitting && <Send size={14} />}
                </Button>
              </motion.div>
            )}
          </div>

          {submitError && (
            <div
              role="alert"
              className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700"
            >
              {submitError}
            </div>
          )}
        </div>
      </form>
    );
  }

  /* ── Single-page mode (fallback) ────────────────────────── */

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="flex items-center justify-between mb-2">
        <FormProgress formData={formData} />
        <button
          type="button"
          onClick={() => {
            setWizardMode(true);
            setCurrentStep(1);
          }}
          className="text-xs text-foreground-muted hover:text-foreground-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded px-2 py-1 cursor-pointer"
        >
          Step-by-step form
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          label="Name"
          name="name"
          type="text"
          placeholder="Your name"
          required
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          error={errors.name}
          touched={touched.name}
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="you@company.com"
          required
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          error={errors.email}
          touched={touched.email}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          label="Phone"
          name="phone"
          type="tel"
          placeholder="+84 123 456 789 (optional)"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          onBlur={() => handleBlur("phone")}
          error={errors.phone}
          touched={touched.phone}
        />

        <FormField
          label="Company"
          name="company"
          type="text"
          placeholder="Your company name (optional)"
          value={formData.company}
          onChange={(e) => handleChange("company", e.target.value)}
          onBlur={() => handleBlur("company")}
          touched={touched.company}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormFieldSelect
          label="Service Interest"
          name="service"
          required
          value={formData.service}
          onChange={(value) => handleChange("service", value)}
          onBlur={() => handleBlur("service")}
          error={errors.service}
          touched={touched.service}
          placeholder="Select a service"
          options={[
            { value: "", label: "Select a service" },
            ...SERVICES.map((service) => ({ value: service, label: service })),
          ]}
        />
      </div>

      <div>
        <FormFieldTextarea
          label="Message"
          name="message"
          rows={5}
          placeholder="Tell us about your project... (minimum 20 characters)"
          required
          maxLength={MESSAGE_MAX_LENGTH}
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          error={errors.message}
          touched={touched.message}
        />
        <div className="flex justify-between items-end -mt-1">
          {/* File attachment hint */}
          <div className="flex items-start gap-2">
            <Paperclip
              size={12}
              className="text-foreground-muted shrink-0 mt-0.5"
              strokeWidth={2}
              aria-hidden="true"
            />
            <p className="text-[11px] text-foreground-muted leading-relaxed">
              Share files via email after submission
            </p>
          </div>
          <span
            className={cn(
              "text-xs transition-colors duration-200",
              formData.message.length > MESSAGE_MAX_LENGTH * 0.9
                ? "text-amber-500"
                : "text-foreground-muted"
            )}
          >
            {formData.message.length}/{MESSAGE_MAX_LENGTH}
          </span>
        </div>
      </div>

      {/* Global error notice */}
      <AnimatePresence>
        {hasErrors && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5"
          >
            <AlertCircle size={16} className="text-red-500 shrink-0" />
            <p className="text-xs text-red-600">
              Please fix the highlighted fields before submitting.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          shakeSubmit
            ? {
                x: [0, -6, 6, -4, 4, -2, 2, 0],
              }
            : { x: 0 }
        }
        transition={{ duration: 0.5 }}
      >
        <Button variant="primary" size="lg" className="w-full sm:w-auto" disabled={submitting}>
          {submitting ? "Sending…" : "Send Message"}
          {!submitting && <Send size={16} />}
        </Button>
      </motion.div>

      {submitError && (
        <div
          role="alert"
          className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700"
        >
          {submitError}
        </div>
      )}
    </form>
  );
}
