import { cn } from "@/lib/cn";

interface GridPatternProps {
  className?: string;
}

export function GridPattern({ className }: GridPatternProps) {
  return (
    <div
      className={cn("absolute inset-0 grid-pattern pointer-events-none opacity-40", className)}
      aria-hidden="true"
    />
  );
}
