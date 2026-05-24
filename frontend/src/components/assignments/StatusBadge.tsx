import type { DisplayStatus } from "@/lib/assignmentStatus";
import { cn } from "@/lib/cn";

const styles: Record<DisplayStatus, string> = {
  Draft: "bg-[#F3F4F6] text-[#6B7280]",
  Generated: "bg-[#ECFDF5] text-[#047857]",
  Pending: "bg-[#FFF7ED] text-[#C2410C]",
};

interface StatusBadgeProps {
  status: DisplayStatus;
  className?: string;
}

/** Soft pill status badge — Draft / Generated / Pending */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2.5 py-0.5 text-[11px] font-medium leading-none",
        styles[status],
        className,
      )}
    >
      {status}
    </span>
  );
}
