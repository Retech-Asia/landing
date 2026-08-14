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
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  FormField,
  FormFieldTextarea,
  FormFieldSelect,
} from "@/components/ui/FormField";
import { cn } from "@/lib/cn";
import { CONTACT } from "@/lib/constants";
import { useLocale } from "next-intl";

const SERVICES = [
  "Custom Software Development",
  "CMS Development",
  "CRM Development",
  "ERP Solutions",
  "AI-Powered Solutions",
  "Mobile App Development",
];

const SERVICE_VI: Record<string, string> = {
  "Custom Software Development": "Phát triển Phần mềm Theo yêu cầu",
  "CMS Development": "Phát triển CMS",
  "CRM Development": "Phát triển CRM",
  "ERP Solutions": "Giải pháp ERP",
  "AI-Powered Solutions": "Giải pháp Tích hợp AI",
  "Mobile App Development": "Phát triển Ứng dụng Di động",
};

const MESSAGE_MAX_LENGTH = 2000;
const MESSAGE_MIN_LENGTH = 20;

const TOTAL_STEPS = 3;

/* ── Inline locale dictionaries (EN | VI) ──────────────────── */

const VALIDATION = {
  en: {
    nameRequired: "Name is required.",
    nameMin: (n: number) => `Name must be at least ${n} characters.`,
    emailRequired: "Email is required.",
    emailInvalid: "Please enter a valid email address.",
    phoneInvalid: "Enter a valid phone number (7-15 digits).",
    serviceRequired: "Please select a service.",
    messageRequired: "Message is required.",
    messageMin: (n: number) => `Message must be at least ${n} characters.`,
  },
  vi: {
    nameRequired: "Vui lòng nhập họ và tên.",
    nameMin: (n: number) => `Họ và tên phải có ít nhất ${n} ký tự.`,
    emailRequired: "Vui lòng nhập email.",
    emailInvalid: "Vui lòng nhập email hợp lệ.",
    phoneInvalid: "Vui lòng nhập số điện thoại hợp lệ (7-15 chữ số).",
    serviceRequired: "Vui lòng chọn dịch vụ.",
    messageRequired: "Vui lòng nhập nội dung.",
    messageMin: (n: number) => `Nội dung phải có ít nhất ${n} ký tự.`,
  },
};

type ValidationStrings = typeof VALIDATION.en;

function validationFor(locale: string): ValidationStrings {
  return locale === "vi" ? VALIDATION.vi : VALIDATION.en;
}

const STRINGS = {
  en: {
    stepOf: (n: number, t: number) => `Step ${n} of ${t}`,
    stepLabels: ["Project Type", "Details", "Contact Info"],
    requiredCompleted: (c: number, t: number) =>
      `${c} of ${t} required fields completed`,
    successTitle: "Opening your email client",
    successBody:
      "Your email client should open with a pre-filled message. If it didn't open, you can email us directly at",
    sendAnother: "Send another message",
    serviceInterest: "Service Interest",
    selectService: "Select a service",
    company: "Company",
    companyPh: "Your company name (optional)",
    message: "Message",
    messagePh: "Tell us about your project... (minimum 20 characters)",
    nameLabel: "Name",
    namePh: "Your name",
    email: "Email",
    phone: "Phone",
    phonePh: "+84 123 456 789 (optional)",
    fileHintA: "Need to share reference files or documents?",
    fileHintB: "Send them via email after submission",
    fileHintC: "and we'll review everything together.",
    fileHintShort: "Share files via email after submission",
    fixBeforeContinuing: "Please fix the highlighted fields before continuing.",
    fixBeforeSubmitting: "Please fix the highlighted fields before submitting.",
    back: "Back",
    nextStep: "Next Step",
    showAllFields: "Show all fields",
    stepByStepForm: "Step-by-step form",
    sending: "Sending…",
    sendMessage: "Send Message",
    submitFailed:
      "Something went wrong sending your message. Please try again or email us directly.",
    networkError:
      "Network error. Please check your connection and try again, or email us directly.",
    serviceLabel: (service: string) => service,
  },
  vi: {
    stepOf: (n: number, t: number) => `Bước ${n}/${t}`,
    stepLabels: ["Loại Dự án", "Chi tiết", "Thông tin Liên hệ"],
    requiredCompleted: (c: number, t: number) =>
      `Đã hoàn thành ${c}/${t} trường bắt buộc`,
    successTitle: "Đang mở ứng dụng email của bạn",
    successBody:
      "Ứng dụng email của bạn sẽ mở với nội dung đã điền sẵn. Nếu không mở, bạn có thể gửi email trực tiếp cho chúng tôi tại",
    sendAnother: "Gửi tin nhắn khác",
    serviceInterest: "Dịch vụ Quan tâm",
    selectService: "Chọn một dịch vụ",
    company: "Công ty",
    companyPh: "Tên công ty của bạn (không bắt buộc)",
    message: "Nội dung",
    messagePh: "Hãy cho chúng tôi biết về dự án của bạn... (tối thiểu 20 ký tự)",
    nameLabel: "Họ và tên",
    namePh: "Tên của bạn",
    email: "Email",
    phone: "Số điện thoại",
    phonePh: "+84 123 456 789 (không bắt buộc)",
    fileHintA: "Cần chia sẻ tài liệu hoặc tệp tham khảo?",
    fileHintB: "Hãy gửi qua email sau khi gửi biểu mẫu",
    fileHintC: "và chúng tôi sẽ cùng xem xét.",
    fileHintShort: "Chia sẻ tệp qua email sau khi gửi",
    fixBeforeContinuing:
      "Vui lòng sửa các trường được đánh dấu trước khi tiếp tục.",
    fixBeforeSubmitting: "Vui lòng sửa các trường được đánh dấu trước khi gửi.",
    back: "Quay lại",
    nextStep: "Bước tiếp theo",
    showAllFields: "Hiện tất cả các trường",
    stepByStepForm: "Biểu mẫu từng bước",
    sending: "Đang gửi...",
    sendMessage: "Gửi tin nhắn",
    submitFailed:
      "Đã xảy ra lỗi khi gửi tin nhắn của bạn. Vui lòng thử lại hoặc gửi email trực tiếp cho chúng tôi.",
    networkError:
      "Lỗi kết nối mạng. Vui lòng kiểm tra kết nối và thử lại, hoặc gửi email trực tiếp cho chúng tôi.",
    serviceLabel: (service: string) => SERVICE_VI[service] ?? service,
  },
};

type FormStrings = typeof STRINGS.en;

function stringsFor(locale: string): FormStrings {
  return locale === "vi" ? STRINGS.vi : STRINGS.en;
}

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
  value: string,
  locale = "en"
): string | undefined {
  const m = validationFor(locale);
  switch (field) {
    case "name":
      if (!value.trim()) return m.nameRequired;
      if (value.trim().length < 2) return m.nameMin(2);
      return undefined;
    case "email":
      if (!value.trim()) return m.emailRequired;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return m.emailInvalid;
      return undefined;
    case "phone":
      if (!value.trim()) return undefined;
      const digits = value.replace(/[\s\-\(\)\+\.]/g, "");
      if (!/^\d{7,15}$/.test(digits)) return m.phoneInvalid;
      return undefined;
    case "service":
      if (!value) return m.serviceRequired;
      return undefined;
    case "message":
      if (!value.trim()) return m.messageRequired;
      if (value.trim().length < MESSAGE_MIN_LENGTH)
        return m.messageMin(MESSAGE_MIN_LENGTH);
      return undefined;
    default:
      return undefined;
  }
}

function validateFields(
  fields: (keyof FormErrors)[],
  data: FormData,
  locale = "en"
): FormErrors {
  const errors: FormErrors = {};
  for (const f of fields) {
    const err = validateField(f, data[f], locale);
    if (err) errors[f] = err;
  }
  return errors;
}

function validateAll(data: FormData, locale = "en"): FormErrors {
  return validateFields(
    ["name", "email", "phone", "service", "message"],
    data,
    locale
  );
}

/* ── Step progress indicator ────────────────────────────────── */

function StepProgress({
  currentStep,
  totalSteps,
  stepLabel,
}: {
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-foreground-secondary">
          {stepLabel}
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

function StepLabels({
  currentStep,
  labels,
}: {
  currentStep: number;
  labels: string[];
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      {labels.map((label, i) => {
        const isActive = i + 1 === currentStep;
        const isCompleted = i + 1 < currentStep;
        return (
          <div
            key={label}
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
              {label}
            </span>
            {i < labels.length - 1 && (
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

function SuccessState({
  onReset,
  t,
}: {
  onReset: () => void;
  t: FormStrings;
}) {
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
        {t.successTitle}
      </h3>
      <p className="text-sm text-foreground-secondary mb-4">
        {t.successBody}{" "}
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
        {t.sendAnother}
      </button>
    </motion.div>
  );
}

/* ── Single-page progress indicator (fallback mode) ─────────── */

function FormProgress({
  formData,
  locale,
  t,
}: {
  formData: FormData;
  locale: string;
  t: FormStrings;
}) {
  const requiredFields: (keyof FormErrors)[] = [
    "name",
    "email",
    "service",
    "message",
  ];
  const completed = requiredFields.filter((f) => {
    const val = formData[f];
    if (!val) return false;
    return !validateField(f, val, locale);
  }).length;
  const total = requiredFields.length;
  const pct = (completed / total) * 100;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-foreground-secondary">
          {t.requiredCompleted(completed, total)}
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
  const locale = useLocale();
  const t = stringsFor(locale);
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
            formData[key as keyof FormData],
            locale
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
  }, [formData, touched, locale]);

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

      const stepErrors = validateFields(fieldsToValidate, formData, locale);
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
    [formData, touched, locale]
  );

  const goNext = () => {
    if (!validateStep(currentStep)) {
      setShakeSubmit(true);
      setTimeout(() => setShakeSubmit(false), 600);
      return;
    }
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const goBack = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

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

      const validationErrors = validateAll(formData, locale);
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
          // Honeypot — grab the value from the hidden field. Bots fill it.
          website: (document.querySelector('input[name="website"]') as HTMLInputElement)?.value || undefined,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        const message =
          (typeof data.error === "string" && data.error) || t.submitFailed;
        setSubmitError(message);
        setShakeSubmit(true);
        setTimeout(() => setShakeSubmit(false), 600);
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError(t.networkError);
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
    return <SuccessState onReset={handleReset} t={t} />;
  }

  const hasErrors = Object.keys(errors).length > 0;

  /* ── Wizard mode ────────────────────────────────────────── */

  if (wizardMode) {
    return (
      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot — visually hidden, bots fill it. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          /* Honeypot field — visually hidden but accessible to spam bots that
             blindly fill all inputs. Tailwind utility equivalent of the
             previous inline style. */
          className="absolute -left-[9999px] h-px w-px opacity-0"
        />
        <StepLabels currentStep={currentStep} labels={t.stepLabels} />
        <StepProgress
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          stepLabel={t.stepOf(currentStep, TOTAL_STEPS)}
        />

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
                    label={t.serviceInterest}
                    name="service"
                    required
                    value={formData.service}
                    onChange={(value) => handleChange("service", value)}
                    onBlur={() => handleBlur("service")}
                    error={errors.service}
                    touched={touched.service}
                    placeholder={t.selectService}
                    options={[
                      { value: "", label: t.selectService },
                      ...SERVICES.map((service) => ({
                        value: service,
                        label: t.serviceLabel(service),
                      })),
                    ]}
                  />

                  <FormField
                    label={t.company}
                    name="company"
                    type="text"
                    placeholder={t.companyPh}
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
                      label={t.message}
                      name="message"
                      rows={5}
                      placeholder={t.messagePh}
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
                  <div className="flex items-start gap-2.5 rounded-xl border border-card-border bg-brand/[0.02] px-4 py-3">
                    <Paperclip
                      size={14}
                      className="text-brand shrink-0 mt-0.5"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <p className="text-xs text-foreground-secondary leading-relaxed">
                      {t.fileHintA}{" "}
                      <span className="font-medium text-foreground">
                        {t.fileHintB}
                      </span>{" "}
                      {t.fileHintC}
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
                      label={t.nameLabel}
                      name="name"
                      type="text"
                      placeholder={t.namePh}
                      required
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      error={errors.name}
                      touched={touched.name}
                    />

                    <FormField
                      label={t.email}
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
                    label={t.phone}
                    name="phone"
                    type="tel"
                    placeholder={t.phonePh}
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
              <p className="text-xs text-red-600">{t.fixBeforeContinuing}</p>
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
                {t.back}
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
              {t.showAllFields}
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
                  {t.nextStep}
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
                  {submitting ? t.sending : t.sendMessage}
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
      {/* Honeypot — visually hidden, bots fill it. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />
      <div className="flex items-center justify-between mb-2">
        <FormProgress formData={formData} locale={locale} t={t} />
        <button
          type="button"
          onClick={() => {
            setWizardMode(true);
            setCurrentStep(1);
          }}
          className="text-xs text-foreground-muted hover:text-foreground-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded px-2 py-1 cursor-pointer"
        >
          {t.stepByStepForm}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          label={t.nameLabel}
          name="name"
          type="text"
          placeholder={t.namePh}
          required
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          error={errors.name}
          touched={touched.name}
        />

        <FormField
          label={t.email}
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
          label={t.phone}
          name="phone"
          type="tel"
          placeholder={t.phonePh}
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          onBlur={() => handleBlur("phone")}
          error={errors.phone}
          touched={touched.phone}
        />

        <FormField
          label={t.company}
          name="company"
          type="text"
          placeholder={t.companyPh}
          value={formData.company}
          onChange={(e) => handleChange("company", e.target.value)}
          onBlur={() => handleBlur("company")}
          touched={touched.company}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormFieldSelect
          label={t.serviceInterest}
          name="service"
          required
          value={formData.service}
          onChange={(value) => handleChange("service", value)}
          onBlur={() => handleBlur("service")}
          error={errors.service}
          touched={touched.service}
          placeholder={t.selectService}
          options={[
            { value: "", label: t.selectService },
            ...SERVICES.map((service) => ({
              value: service,
              label: t.serviceLabel(service),
            })),
          ]}
        />
      </div>

      <div>
        <FormFieldTextarea
          label={t.message}
          name="message"
          rows={5}
          placeholder={t.messagePh}
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
              {t.fileHintShort}
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
            <p className="text-xs text-red-600">{t.fixBeforeSubmitting}</p>
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
          {submitting ? t.sending : t.sendMessage}
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
