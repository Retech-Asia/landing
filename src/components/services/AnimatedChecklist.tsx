"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface AnimatedChecklistProps {
  items: string[];
  /** Gradient accent color class (e.g. "from-brand to-accent-cyan") */
  accentColor?: string;
}

/**
 * Checklist section with staggered animated checkmarks.
 * Each item fades in and slides up with a small delay.
 */
export function AnimatedChecklist({ items }: AnimatedChecklistProps) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
          className="flex items-start gap-3 group"
        >
          {/* Animated check circle */}
          <motion.span
            className="relative flex items-center justify-center w-6 h-6 rounded-full bg-brand/10 shrink-0 mt-0.5"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15,
              delay: i * 0.05 + 0.15,
            }}
          >
            <Check size={14} className="text-brand" strokeWidth={3} />
            {/* Ping animation on appear */}
            <motion.span
              className="absolute inset-0 rounded-full bg-brand/20"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 + 0.3 }}
            />
          </motion.span>
          <span className="text-sm font-medium text-foreground leading-snug">
            {item}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}
