"use client";

import { cn } from "@/lib/cn";
import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
  children,
  className,
  hover = true,
  padding = "md",
}: CardProps) {
  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const sharedClasses = cn(
    "rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 group",
    hover && "card-shimmer hover:border-brand/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_12px_32px_rgba(32,133,53,0.08)] cursor-pointer",
    paddingStyles[padding],
    className
  );

  if (hover) {
    return (
      <motion.div
        whileHover={{ scale: 1.015, y: -3, transition: { duration: 0.3, ease: "easeOut" } }}
        className={sharedClasses}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={sharedClasses}>
      {children}
    </div>
  );
}
