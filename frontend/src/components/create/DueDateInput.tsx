"use client";

import { useEffect, useRef, useState } from "react";
import { format, isValid, parse } from "date-fns";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/cn";

interface DueDateInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

function displayToIso(display: string): string {
  const parsed = parse(display, "dd-MM-yyyy", new Date());
  if (!isValid(parsed)) return "";
  return format(parsed, "yyyy-MM-dd");
}

function isoToDisplay(iso: string): string {
  const parsed = parse(iso, "yyyy-MM-dd", new Date());
  if (!isValid(parsed)) return "";
  return format(parsed, "dd-MM-yyyy");
}

export function DueDateInput({ value, onChange, error }: DueDateInputProps) {
  const pickerRef = useRef<HTMLInputElement>(null);
  const inputId = "due-date";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openCalendar = () => {
    const picker = pickerRef.current;
    if (!picker) return;
    try {
      if (typeof picker.showPicker === "function") {
        picker.showPicker();
      } else {
        picker.focus();
        picker.click();
      }
    } catch {
      picker.focus();
    }
  };

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="mb-2 block text-sm font-medium text-ink"
      >
        Due Date
      </label>
      <div className="relative">
        <input
          id={inputId}
          type="text"
          inputMode="numeric"
          placeholder="DD-MM-YYYY"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "h-11 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 pr-11 text-sm text-ink outline-none transition placeholder:text-ink-subtle focus:border-[#D1D5DB] focus:ring-1 focus:ring-ink/5",
            error && "border-red-400 focus:ring-red-100",
          )}
        />

        {/* Native picker — client-only to avoid hydration mismatch */}
        {mounted && (
          <input
            ref={pickerRef}
            type="date"
            tabIndex={-1}
            aria-hidden
            value={displayToIso(value)}
            onChange={(e) => {
              if (e.target.value) onChange(isoToDisplay(e.target.value));
            }}
            className="absolute bottom-0 right-0 h-px w-px opacity-0"
          />
        )}

        <button
          type="button"
          onClick={openCalendar}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted transition hover:text-ink"
          aria-label="Open calendar"
        >
          <Calendar className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
