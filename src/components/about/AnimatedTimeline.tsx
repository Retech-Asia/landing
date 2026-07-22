"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface AnimatedTimelineProps {
  milestones: Milestone[];
}

function TimelineDot({ delay, isVisible }: { delay: number; isVisible: boolean }) {
  return (
    <motion.div
      className="absolute -left-[calc(2rem+5px)] top-1.5"
      initial={{ scale: 0 }}
      animate={isVisible ? { scale: 1 } : { scale: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 15, delay }}
    >
      {/* Pulse ring */}
      <motion.div
        className="absolute inset-[-6px] rounded-full bg-brand/20"
        initial={{ scale: 0, opacity: 0 }}
        animate={
          isVisible
            ? {
                scale: [0, 2.5, 0],
                opacity: [0, 0.6, 0],
              }
            : {}
        }
        transition={{ duration: 1.2, delay: delay + 0.2, ease: "easeOut" }}
      />
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-[-10px] rounded-full bg-brand/10"
        initial={{ scale: 0, opacity: 0 }}
        animate={
          isVisible
            ? {
                scale: [0, 1.8, 0],
                opacity: [0, 0.3, 0],
              }
            : {}
        }
        transition={{ duration: 1.6, delay: delay + 0.35, ease: "easeOut" }}
      />
      {/* Dot */}
      <div className="relative w-3 h-3 rounded-full bg-gradient-to-br from-brand to-accent-cyan ring-4 ring-white" />
    </motion.div>
  );
}

function TimelineItem({
  milestone,
  index,
  totalItems,
}: {
  milestone: Milestone;
  index: number;
  totalItems: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative"
    >
      <TimelineDot delay={0.1} isVisible={isInView} />

      <motion.div
        initial={{
          opacity: 0,
          x: isEven ? -30 : 30,
          scale: 0.96,
        }}
        animate={
          isInView
            ? { opacity: 1, x: 0, scale: 1 }
            : { opacity: 0, x: isEven ? -30 : 30, scale: 0.96 }
        }
        transition={{
          duration: 0.6,
          delay: 0.15,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="relative rounded-xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.03),0_4px_12px_rgba(0,0,0,0.02)] p-5 group hover:border-brand/20 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05),0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-300"
      >
        {/* Year badge */}
        <motion.span
          className="inline-block text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-brand/10 text-brand mb-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {milestone.year}
        </motion.span>

        <h3 className="text-lg font-bold text-foreground mb-1.5 group-hover:text-brand-dark transition-colors duration-200">
          {milestone.title}
        </h3>

        <p className="text-sm text-foreground-secondary leading-relaxed">
          {milestone.description}
        </p>

        {/* Step indicator */}
        <div className="absolute -right-3 top-5 w-6 h-6 rounded-full bg-white border border-black/[0.06] flex items-center justify-center text-[10px] font-bold text-foreground-muted">
          {index + 1}/{totalItems}
        </div>
      </motion.div>
    </div>
  );
}

export function AnimatedTimeline({ milestones }: AnimatedTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to line height: 0% -> 100%
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);
  const springHeight = useSpring(lineHeight, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Glowing dot opacity — fades in then out as scroll progresses
  const dotOpacity = useTransform(scrollYProgress, [0.1, 0.15, 0.75, 0.8], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto">
      <div className="relative pl-8">
        {/* Background track */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-black/[0.06]" />

        {/* Animated fill line - draws itself as user scrolls */}
        <motion.div
          className="absolute left-0 top-0 w-px bg-gradient-to-b from-brand via-accent-cyan to-accent-violet origin-top"
          style={{ height: springHeight }}
        />

        {/* Glowing dot that travels along the line */}
        <motion.div
          className="absolute left-[-3px] w-[7px] h-[7px] rounded-full bg-brand shadow-[0_0_8px_rgba(32,133,53,0.5)]"
          style={{
            top: springHeight,
            opacity: dotOpacity,
          }}
        />

        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <TimelineItem
              key={milestone.year}
              milestone={milestone}
              index={index}
              totalItems={milestones.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
