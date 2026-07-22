import { cn } from "@/lib/cn";

interface GradientBackgroundProps {
  className?: string;
  variant?: "hero" | "subtle" | "cta" | "wave" | "dots" | "mesh";
}

export function GradientBackground({
  className,
  variant = "subtle",
}: GradientBackgroundProps) {
  const gradients: Record<string, string[]> = {
    hero: [
      "absolute -top-40 -left-40 w-[60vw] h-[60vw] rounded-full bg-brand/[0.04] blur-[140px] animate-mesh-1",
      "absolute -bottom-20 -right-20 w-[50vw] h-[50vw] rounded-full bg-accent-cyan/[0.03] blur-[160px] animate-mesh-2",
      "absolute top-1/3 right-1/4 w-[40vw] h-[40vw] rounded-full bg-accent-violet/[0.02] blur-[120px] animate-mesh-3",
    ],
    subtle: [
      "absolute -top-20 left-1/4 w-[50vw] h-[50vw] rounded-full bg-brand/[0.03] blur-[160px] animate-mesh-4",
      "absolute -bottom-10 right-1/4 w-[40vw] h-[40vw] rounded-full bg-accent-cyan/[0.02] blur-[140px] animate-mesh-5",
    ],
    cta: [
      "absolute -top-20 -left-20 w-[60vw] h-[60vw] rounded-full bg-accent-cyan/[0.04] blur-[140px] animate-mesh-1",
      "absolute -bottom-20 -right-20 w-[50vw] h-[50vw] rounded-full bg-accent-violet/[0.03] blur-[120px] animate-mesh-2",
      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-brand/[0.03] blur-[160px] animate-mesh-3",
    ],
    wave: [
      "absolute -top-[10%] left-[-10%] w-[80vw] h-[40vh] rounded-[50%] bg-brand/[0.04] blur-[120px] animate-wave-1",
      "absolute top-[20%] right-[-10%] w-[60vw] h-[35vh] rounded-[50%] bg-accent-cyan/[0.03] blur-[140px] animate-wave-2",
      "absolute -bottom-[5%] left-[10%] w-[70vw] h-[30vh] rounded-[50%] bg-accent-violet/[0.025] blur-[130px] animate-wave-3",
    ],
    dots: [
      "absolute inset-0 animate-dot-pulse-1",
      "absolute inset-0 animate-dot-pulse-2",
      "absolute inset-0 animate-dot-pulse-3",
    ],
    mesh: [
      "absolute -top-20 -left-10 w-[45vw] h-[45vw] rounded-full bg-brand/[0.05] blur-[120px] animate-mesh-orb-1",
      "absolute top-1/4 -right-10 w-[35vw] h-[35vw] rounded-full bg-accent-cyan/[0.04] blur-[140px] animate-mesh-orb-2",
      "absolute -bottom-10 left-1/3 w-[40vw] h-[40vw] rounded-full bg-accent-violet/[0.035] blur-[130px] animate-mesh-orb-3",
      "absolute top-1/2 right-1/3 w-[30vw] h-[30vw] rounded-full bg-brand/[0.03] blur-[150px] animate-mesh-orb-4",
    ],
  };

  const needsDotPattern = variant === "dots";

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {needsDotPattern && (
        <div className="absolute inset-0 gradient-dots-bg" />
      )}
      {gradients[variant].map((cls, i) => (
        <div key={i} className={cls} />
      ))}
    </div>
  );
}
