"use client";

import { useState, useCallback } from "react";
import { Mail, Phone, MapPin, type LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

const iconMap: Record<string, LucideIcon> = {
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
};

interface ContactInfoCardAction {
  /** "copy" copies value to clipboard. "link" navigates to href. "map" opens Google Maps. */
  type: "copy" | "link" | "map";
  /** For "link" and "map" types */
  href?: string;
  /** Label shown on hover or after action */
  label?: string;
}

export interface ContactInfoCardProps {
  /** Icon name: "mail", "phone", or "mapPin" */
  iconName: string;
  /** Icon background color class e.g. "bg-brand/10" */
  iconBg?: string;
  /** Icon color class e.g. "text-brand" */
  iconColor?: string;
  /** Card heading */
  label: string;
  /** The main value (email, phone, address) */
  value: string;
  /** Secondary description */
  description?: string;
  /** Action behavior */
  action: ContactInfoCardAction;
  /** Additional className on the root */
  className?: string;
}

export function ContactInfoCard({
  iconName,
  iconBg = "bg-brand/10",
  iconColor = "text-brand",
  label,
  value,
  description,
  action,
  className,
}: ContactInfoCardProps) {
  const Icon = iconMap[iconName] ?? Mail;
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [value]);

  const handleClick = () => {
    if (action.type === "copy") {
      handleCopy();
    } else if (action.href) {
      window.open(action.href, "_blank", "noopener,noreferrer");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const interactive = action.type === "copy";

  return (
    <div
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? handleClick : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      className={cn(
        "group relative rounded-xl border border-card-border bg-white p-5 transition-all duration-300",
        interactive
          ? "cursor-pointer hover:border-brand/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          : "cursor-default",
        className,
      )}
    >
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="relative flex items-start gap-3.5">
        {/* Icon */}
        <div className={cn("p-2.5 rounded-lg shrink-0 transition-transform duration-300 group-hover:scale-105", iconBg)}>
          <Icon size={18} className={iconColor} strokeWidth={1.75} />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-foreground-muted mb-0.5">{label}</p>
          <p className="text-sm font-semibold text-foreground break-words">{value}</p>
          {description && (
            <p className="text-xs text-foreground-secondary mt-1 leading-relaxed">{description}</p>
          )}
        </div>

        {/* Action indicator */}
        <div className="shrink-0 self-center">
          <AnimatePresence mode="wait">
            {action.type === "copy" && copied ? (
              <motion.div
                key="copied"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-brand/10"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-[10px] font-medium text-brand">Copied</span>
              </motion.div>
            ) : action.type === "copy" ? (
              <motion.button
                key="copy"
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="p-2.5 rounded-md text-foreground-muted hover:text-brand hover:bg-brand/10 transition-all"
                aria-label="Copy to clipboard"
                type="button"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </motion.button>
            ) : action.type === "link" || action.type === "map" ? (
              <a
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-md text-foreground-muted hover:text-brand hover:bg-brand/10 transition-all inline-flex"
                aria-label={action.label || "Open"}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
