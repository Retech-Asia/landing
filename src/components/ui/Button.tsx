"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { type ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  type,
  className,
  onClick,
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background select-none disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-brand text-white hover:bg-brand-light hover:shadow-[0_4px_20px_rgba(32,133,53,0.25)] hover:shadow-brand/25 active:bg-brand-dark active:scale-[0.97] btn-shimmer",
    secondary:
      "bg-white text-foreground border border-black/[0.12] hover:border-black/[0.20] hover:shadow-[0_2px_12px_rgba(0,0,0,0.08)] active:scale-[0.97] active:bg-black/[0.02] shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
    ghost: "text-foreground-secondary hover:text-foreground hover:bg-black/[0.04] active:bg-black/[0.08] active:scale-[0.97]",
  };

  const classes = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    disabled ? "cursor-not-allowed" : "cursor-pointer",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <motion.button
      type={type ?? "button"}
      onClick={onClick}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      disabled={disabled}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
