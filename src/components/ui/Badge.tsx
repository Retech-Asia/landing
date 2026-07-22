import { cn } from "@/lib/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "brand" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
        variant === "default" && "bg-black/[0.04] text-foreground-secondary",
        variant === "brand" && "bg-brand/10 text-brand",
        variant === "outline" && "border border-black/[0.08] text-foreground-secondary",
        className
      )}
    >
      {children}
    </span>
  );
}
