import { cn } from "@/lib/cn";

/* ========================================================================
   CSS-only animated decorative icons.
   All animations are defined via @keyframes in globals.css.
   No JavaScript animation — purely declarative CSS.
   ======================================================================== */

interface AnimatedIconProps {
  className?: string;
  size?: number;
}

/* ── 1. Pulsing code brackets with blinking cursor (`</>`) ── */
export function CodeBracketIcon({ className, size = 48 }: AnimatedIconProps) {
  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-full h-full animate-code-pulse"
      >
        {/* Left bracket < */}
        <path
          d="M16 16L8 24L16 32"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-brand"
          opacity="0.7"
        />
        {/* Forward slash / */}
        <line
          x1="28"
          y1="14"
          x2="20"
          y2="34"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-accent-cyan"
          opacity="0.6"
        />
        {/* Right bracket > */}
        <path
          d="M32 16L40 24L32 32"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-brand"
          opacity="0.7"
        />
      </svg>
      {/* Blinking cursor */}
      <span className="animate-cursor-blink absolute right-[10%] bottom-[22%] w-[2px] h-[20%] bg-brand rounded-full" />
    </div>
  );
}

/* ── 2. Rotating gear / cog ── */
export function GearIcon({ className, size = 48 }: AnimatedIconProps) {
  return (
    <div
      className={cn("relative inline-flex items-center justify-center animate-gear-spin", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-full h-full"
      >
        {/* Outer gear teeth */}
        <path
          d="M24 4L26.5 8.5L31 7.5L31.5 12L36 13L34.5 17.5L38.5 20L35.5 23.5L38.5 27L34.5 29.5L36 34L31.5 34.5L31 39L26.5 38L24 42.5L21.5 38L17 39L16.5 34.5L12 34L13.5 29.5L9.5 27L12.5 23.5L9.5 20L13.5 17.5L12 13L16.5 12L17 7.5L21.5 8.5L24 4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          className="text-brand"
          opacity="0.6"
        />
        {/* Inner circle */}
        <circle
          cx="24"
          cy="23"
          r="7"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-accent-cyan"
          opacity="0.5"
        />
        {/* Center dot */}
        <circle
          cx="24"
          cy="23"
          r="2.5"
          fill="currentColor"
          className="text-brand"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}

/* ── 3. Morphing shapes (circle -> square -> triangle -> circle) ── */
export function MorphingShapesIcon({ className, size = 48 }: AnimatedIconProps) {
  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Outer shape that morphs */}
      <div
        className="w-[70%] h-[70%] animate-shape-morph"
        style={{
          background: "linear-gradient(135deg, var(--brand), var(--accent-cyan))",
          opacity: 0.25,
        }}
      />
      {/* Inner shape that morphs with delay */}
      <div
        className="absolute w-[45%] h-[45%] animate-shape-morph"
        style={{
          background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))",
          opacity: 0.2,
          animationDelay: "-3s",
        }}
      />
    </div>
  );
}

/* ── 4. Waveform / audio bars ── */
export function WaveformIcon({ className, size = 48 }: AnimatedIconProps) {
  const barCount = 5;
  const barWidth = size * 0.1;
  const gap = size * 0.06;

  return (
    <div
      className={cn("relative inline-flex items-end justify-center gap-[var(--wave-gap)] animate-waveform-container", className)}
      style={{
        width: size,
        height: size,
        "--wave-gap": `${gap}px`,
      } as React.CSSProperties}
      aria-hidden="true"
    >
      {Array.from({ length: barCount }).map((_, i) => {
        const maxH = 55 + i * 8 + (i > 2 ? (4 - i) * 16 : 0);
        return (
          <div
            key={i}
            className="rounded-full animate-waveform-bar"
            style={{
              width: barWidth,
              height: `${maxH}%`,
              animationDelay: `${i * 0.15}s`,
              background: i % 2 === 0
                ? "var(--brand)"
                : "var(--accent-cyan)",
              opacity: 0.45,
            }}
          />
        );
      })}
    </div>
  );
}

/* ── 5. Floating dots constellation ── */
export function ConstellationDotsIcon({ className, size = 64 }: AnimatedIconProps) {
  const dots = [
    { x: 15, y: 20, s: 3, delay: 0 },
    { x: 70, y: 15, s: 2.5, delay: 0.5 },
    { x: 45, y: 45, s: 3.5, delay: 1 },
    { x: 20, y: 70, s: 2, delay: 1.5 },
    { x: 75, y: 65, s: 3, delay: 0.8 },
    { x: 50, y: 80, s: 2.5, delay: 1.2 },
    { x: 85, y: 40, s: 2, delay: 0.3 },
  ];

  const lines = [
    { from: 0, to: 2 },
    { from: 2, to: 1 },
    { from: 2, to: 3 },
    { from: 2, to: 4 },
    { from: 4, to: 6 },
    { from: 5, to: 3 },
  ];

  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
      >
        {/* Connection lines */}
        {lines.map(({ from, to }, i) => (
          <line
            key={`line-${i}`}
            x1={dots[from].x}
            y1={dots[from].y}
            x2={dots[to].x}
            y2={dots[to].y}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-brand"
            opacity="0.15"
          />
        ))}
        {/* Dots */}
        {dots.map((dot, i) => (
          <circle
            key={`dot-${i}`}
            cx={dot.x}
            cy={dot.y}
            r={dot.s}
            className="animate-constellation-dot"
            style={{ animationDelay: `${dot.delay}s` }}
          >
            <animate
              attributeName="fill"
              values="var(--brand);var(--accent-cyan);var(--brand)"
              dur="4s"
              begin={`${dot.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
}
