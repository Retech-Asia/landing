import { cn } from "@/lib/cn";

/* ========================================================================
   AnimatedBackground — CSS-only slow-moving gradient mesh.
   Placed behind hero or CTA sections for visual depth.
   No JavaScript animation — all driven by @keyframes in globals.css.
   ======================================================================== */

interface AnimatedBackgroundProps {
  className?: string;
  /** Intensity of the gradient blobs. "subtle" = very low opacity, "default" = standard. */
  intensity?: "subtle" | "default";
}

export function AnimatedBackground({
  className,
  intensity = "subtle",
}: AnimatedBackgroundProps) {
  const opacityScale = intensity === "subtle" ? 0.6 : 1;

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none will-change-transform", className)}
      aria-hidden="true"
    >
      {/* Color stop 1 — brand green, top-left drift */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full blur-[140px] animate-animated-bg-1"
        style={{
          background: `radial-gradient(circle, rgba(32, 133, 53, ${0.06 * opacityScale}) 0%, transparent 70%)`,
        }}
      />

      {/* Color stop 2 — cyan, bottom-right drift */}
      <div
        className="absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full blur-[160px] animate-animated-bg-2"
        style={{
          background: `radial-gradient(circle, rgba(6, 182, 212, ${0.05 * opacityScale}) 0%, transparent 70%)`,
        }}
      />

      {/* Color stop 3 — violet, center-left drift */}
      <div
        className="absolute top-[30%] -left-[5%] w-[40vw] h-[40vw] rounded-full blur-[130px] animate-animated-bg-3"
        style={{
          background: `radial-gradient(circle, rgba(139, 92, 246, ${0.04 * opacityScale}) 0%, transparent 70%)`,
        }}
      />

      {/* Color stop 4 — brand green accent, top-right */}
      <div
        className="absolute -top-[5%] right-[10%] w-[35vw] h-[35vw] rounded-full blur-[120px] animate-animated-bg-4"
        style={{
          background: `radial-gradient(circle, rgba(32, 133, 53, ${0.035 * opacityScale}) 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
