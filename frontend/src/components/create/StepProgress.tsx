interface StepProgressProps {
  step: number;
  total?: number;
}

export function StepProgress({ step, total = 2 }: StepProgressProps) {
  const pct = Math.round((step / total) * 100);

  return (
    <div className="h-0.5 w-full overflow-hidden rounded-full bg-[#ECECEC]">
      <div
        className="h-full rounded-full bg-ink/70 transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
