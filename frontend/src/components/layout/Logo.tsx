import Link from "next/link";
import { cn } from "@/lib/cn";

interface LogoProps {
  compact?: boolean;
  className?: string;
}

export function Logo({ compact, className }: LogoProps) {
  return (
    <Link href="/assignments" className={cn("flex items-center gap-2.5", className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-start to-brand-end text-sm font-bold text-white shadow-sm">
        V
      </span>
      {!compact && (
        <span className="text-[17px] font-bold tracking-tight text-ink">
          VedaAI
        </span>
      )}
    </Link>
  );
}
