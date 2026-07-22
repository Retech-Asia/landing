"use client";

import { cn } from "@/lib/cn";
import { CheckCircle } from "lucide-react";
import { type InputHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from "react";
import { CustomSelect, type CustomSelectOption } from "@/components/ui/CustomSelect";

/* ── Shared classes ────────────────────────────────────────── */

function formInputClasses(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-white px-4 py-3 text-base text-foreground",
    "placeholder:text-foreground-muted outline-none transition-all duration-200",
    "focus:ring-2 focus:ring-brand/10 focus:shadow-[0_0_0_3px_rgba(32,133,53,0.08)]",
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
      : "border-black/[0.08] focus:border-brand/40"
  );
}

/* ── Input ─────────────────────────────────────────────────── */

interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  label: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
}

export function FormField(props: FormInputProps) {
  const {
    label,
    name,
    error,
    touched,
    required,
    className,
    ...inputProps
  } = props;

  const errorId = name ? `${name}-error` : undefined;
  const hasError = Boolean(touched && !!error);

  return (
    <div className={cn("relative", className)}>
      <label
        htmlFor={name}
        className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5"
      >
        {label}
        {required && <span className="text-red-400" aria-hidden="true">*</span>}
        {touched && !error && (
          <CheckCircle
            size={14}
            className="text-brand ml-0.5 animate-[fade-up_0.25s_ease-out_forwards]"
            strokeWidth={2}
            aria-hidden="true"
          />
        )}
      </label>
      <input
        id={name}
        name={name}
        className={formInputClasses(hasError)}
        aria-required={required || undefined}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        required={required}
        {...inputProps}
      />
      <div
        id={errorId}
        role={hasError ? "alert" : undefined}
        className={cn(
          "overflow-hidden transition-all duration-200",
          error ? "max-h-6 opacity-100 mt-1" : "max-h-0 opacity-0 mt-0"
        )}
      >
        <p className="text-xs text-red-500 leading-tight">{error || "\u00A0"}</p>
      </div>
    </div>
  );
}

/* ── Textarea ──────────────────────────────────────────────── */

interface FormTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "type"> {
  type?: "textarea";
  label: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
}

export function FormFieldTextarea(props: FormTextareaProps) {
  const {
    label,
    name,
    error,
    touched,
    required,
    className,
    ...textareaProps
  } = props;

  const errorId = name ? `${name}-error` : undefined;
  const hasError = Boolean(touched && !!error);

  return (
    <div className={cn("relative", className)}>
      <label
        htmlFor={name}
        className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5"
      >
        {label}
        {required && <span className="text-red-400" aria-hidden="true">*</span>}
        {touched && !error && (
          <CheckCircle
            size={14}
            className="text-brand ml-0.5 animate-[fade-up_0.25s_ease-out_forwards]"
            strokeWidth={2}
            aria-hidden="true"
          />
        )}
      </label>
      <textarea
        id={name}
        name={name}
        className={cn(formInputClasses(hasError), "resize-none")}
        aria-required={required || undefined}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        required={required}
        {...textareaProps}
      />
      <div
        id={errorId}
        role={hasError ? "alert" : undefined}
        className={cn(
          "overflow-hidden transition-all duration-200",
          error ? "max-h-6 opacity-100 mt-1" : "max-h-0 opacity-0 mt-0"
        )}
      >
        <p className="text-xs text-red-500 leading-tight">{error || "\u00A0"}</p>
      </div>
    </div>
  );
}

/* ── Select ─────────────────────────────────────────────────── */

interface FormSelectProps {
  type?: "select";
  label: string;
  name?: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
  className?: string;
  /** Current value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Blur handler */
  onBlur?: () => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Children rendered as option elements (legacy API — converted automatically) */
  children?: ReactNode;
  /** Direct options array (preferred API) */
  options?: CustomSelectOption[];
}

/**
 * Extracts { value, label } pairs from <option> children.
 * Supports: <option value="x">Label</option> and <option value="">Placeholder</option>
 */
function parseOptionsFromChildren(children: ReactNode): CustomSelectOption[] {
  const result: CustomSelectOption[] = [];
  const childArray = Array.isArray(children) ? children : [children];

  for (const child of childArray) {
    if (child && typeof child === "object" && "type" in child && child.type === "option") {
      const props = child.props as { value?: string; disabled?: boolean; children?: ReactNode };
      const label = typeof props.children === "string" ? props.children : "";
      result.push({
        value: props.value ?? "",
        label,
        disabled: props.disabled,
      });
    }
  }
  return result;
}

export function FormFieldSelect(props: FormSelectProps) {
  const {
    label,
    name,
    error,
    touched,
    required,
    className,
    children,
    options: directOptions,
    value,
    onChange,
    onBlur,
    placeholder,
    disabled,
  } = props;

  const errorId = name ? `${name}-error` : undefined;
  const hasError = Boolean(touched && !!error);

  // Support both direct options and children-based API
  const options = directOptions ?? parseOptionsFromChildren(children);

  return (
    <div className={cn("relative", className)}>
      <label
        htmlFor={name}
        className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5"
      >
        {label}
        {required && <span className="text-red-400" aria-hidden="true">*</span>}
        {touched && !error && (
          <CheckCircle
            size={14}
            className="text-brand ml-0.5 animate-[fade-up_0.25s_ease-out_forwards]"
            strokeWidth={2}
            aria-hidden="true"
          />
        )}
      </label>
      <CustomSelect
        id={name}
        name={name}
        options={options}
        value={value ?? ""}
        onChange={(v) => onChange?.(v)}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        aria-required={required || undefined}
        aria-invalid={hasError || undefined}
      />
      <div
        id={errorId}
        role={hasError ? "alert" : undefined}
        className={cn(
          "overflow-hidden transition-all duration-200",
          error ? "max-h-6 opacity-100 mt-1" : "max-h-0 opacity-0 mt-0"
        )}
      >
        <p className="text-xs text-red-500 leading-tight">{error || "\u00A0"}</p>
      </div>
    </div>
  );
}
