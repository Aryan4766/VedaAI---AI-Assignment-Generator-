"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Filter } from "lucide-react";
import type { StatusFilter } from "@/lib/assignmentStatus";
import { cn } from "@/lib/cn";

const OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "Generated", label: "Generated" },
  { value: "Pending", label: "Pending" },
  { value: "Draft", label: "Draft" },
];

interface FilterDropdownProps {
  value: StatusFilter;
  onChange: (value: StatusFilter) => void;
  className?: string;
}

/** Status filter dropdown matching Figma "Filter By" pattern */
export function FilterDropdown({ value, onChange, className }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = OPTIONS.find((o) => o.value === value) ?? OPTIONS[0];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  return (
    <div ref={ref} className={cn("relative shrink-0", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 items-center gap-2 rounded-pill border border-[#EBEBEB] bg-white px-4 text-sm font-medium text-ink transition hover:bg-[#FAFAFA]"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Filter className="h-4 w-4 text-ink-subtle" strokeWidth={1.75} />
        <span className="hidden sm:inline">Filter By</span>
        <span className="sm:hidden">Filter</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-ink-subtle transition",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-[calc(100%+6px)] z-30 min-w-[180px] rounded-xl border border-[#EBEBEB] bg-white py-1 shadow-card"
        >
          {OPTIONS.map((option) => (
            <li key={option.value} role="option" aria-selected={value === option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={cn(
                  "block w-full px-4 py-2.5 text-left text-sm transition hover:bg-[#F5F5F5]",
                  value === option.value
                    ? "font-medium text-ink"
                    : "text-ink-muted",
                )}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      {value !== "all" && (
        <span className="mt-1.5 block text-xs text-ink-subtle sm:hidden">
          {selected.label}
        </span>
      )}
    </div>
  );
}
