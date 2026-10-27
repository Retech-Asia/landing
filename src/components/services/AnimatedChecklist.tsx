"use client";

import { motion } from "framer-motion";

interface AnimatedChecklistProps {
  items: string[];
  /** Gradient accent color class (e.g. "from-brand to-accent-cyan") */
  accentColor?: string;
}

/**
 * Checklist section with staggered row reveal, ruled-list language:
 * hairline rules divide the rows, no icon markers.
 * Each item fades in and slides up with a small delay.
 *
 * 2026-10-27 (owner: retire the decorative icon language site-wide): the
 * animated check circles are gone — the rules and the copy carry the list.
 */
export function AnimatedChecklist({ items }: AnimatedChecklistProps) {
  return (
    <ul className="border-t border-rule">
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
          className="border-b border-rule-soft py-4 text-sm font-medium text-foreground leading-snug"
        >
          {item}
        </motion.li>
      ))}
    </ul>
  );
}
