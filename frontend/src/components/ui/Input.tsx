import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-ink"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "h-11 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-ink outline-none transition placeholder:text-ink-subtle focus:border-[#D1D5DB] focus:ring-1 focus:ring-ink/5",
              icon ? "pr-11" : undefined,
              error ? "border-red-400 focus:ring-red-100" : undefined,
              className,
            )}
            {...props}
          />
          {icon && (
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted">
              {icon}
            </div>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
