import type { Difficulty } from "@/types/assignment";
import { cn } from "@/lib/cn";

const styles: Record<string, string> = {
  Easy: "text-emerald-700",
  Moderate: "text-amber-700",
  Challenging: "text-orange-700",
  Hard: "text-red-700",
};

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  inline?: boolean;
}

export function DifficultyBadge({ difficulty, inline }: DifficultyBadgeProps) {
  if (inline) {
    return (
      <span className={cn("font-medium", styles[difficulty] ?? "text-ink-muted")}>
        [{difficulty}]
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex rounded-md px-2 py-0.5 text-xs font-medium",
        styles[difficulty] ?? "text-ink-muted",
      )}
    >
      {difficulty}
    </span>
  );
}
