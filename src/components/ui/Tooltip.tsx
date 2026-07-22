"use client";

import { useState, useRef, type ReactNode, type ElementType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

interface TooltipProps {
  children: ReactNode;
  content: string;
  /** Render as a specific element instead of div (e.g. "span") */
  as?: ElementType;
  side?: "top" | "bottom";
  className?: string;
}

export function Tooltip({
  children,
  content,
  as,
  side = "top",
  className,
}: TooltipProps) {
  // Cast to ComponentType<any> so JSX accepts standard HTML attributes.
  // (React 19 strict types tighten ElementType's prop inference to `never`,
  // which rejects className/onMouseEnter/etc. at the call site.)
  const Component = (as ?? "div") as React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const show = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const hide = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <Component
      className={cn("relative inline-flex", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, y: side === "top" ? 4 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: side === "top" ? 4 : -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            role="tooltip"
            className={cn(
              "absolute z-50 max-w-[220px] rounded-lg px-3 py-2 text-xs leading-relaxed text-white bg-foreground shadow-lg pointer-events-none whitespace-normal",
              side === "top" && "bottom-full left-1/2 -translate-x-1/2 mb-2",
              side === "bottom" && "top-full left-1/2 -translate-x-1/2 mt-2"
            )}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </Component>
  );
}
