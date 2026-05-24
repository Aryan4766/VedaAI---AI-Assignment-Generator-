import type { Difficulty } from "@/types/assignment";
import { cn } from "@/lib/cn";

const styles: Record<string, string> = {
  Easy: "bg-emerald-50 text-emerald-700",
  Moderate: "bg-amber-50 text-amber-800",
  Challenging: "bg-red-50 text-red-800",
  Hard: "bg-red-50 text-red-800",
};

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  variant?: "inline" | "pill";
  className?: string;
}

/** Minimal academic difficulty tag — soft muted pill for exam papers */
export function DifficultyBadge({
  difficulty,
  variant = "pill",
  className,
}: DifficultyBadgeProps) {
  const label = difficulty === "Challenging" ? "Challenging" : difficulty;
  const colorClass = styles[difficulty] ?? "bg-gray-50 text-ink-muted";

  const pillClass =
    "inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium leading-none tracking-wide print:border print:border-gray-400 print:bg-white print:text-gray-800";

  if (variant === "inline") {
    return (
      <span className={cn(pillClass, colorClass, className)}>{label}</span>
    );
  }

  return <span className={cn(pillClass, colorClass, className)}>{label}</span>;
}
