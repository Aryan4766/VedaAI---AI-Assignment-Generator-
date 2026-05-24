import { cn } from "@/lib/cn";

interface LoaderProps {
  className?: string;
  label?: string;
}

export function Loader({ className, label }: LoaderProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink/20 border-t-ink" />
      {label && <p className="text-sm text-ink-muted">{label}</p>}
    </div>
  );
}
