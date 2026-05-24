import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-white hover:bg-[#2a2a2a] shadow-sm disabled:opacity-50",
  secondary:
    "bg-white text-ink border border-[#E5E7EB] hover:bg-[#FAFAFA]",
  ghost: "bg-transparent text-ink hover:bg-black/5",
  outline:
    "bg-white text-ink border border-[#D1D5DB] hover:bg-[#FAFAFA]",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-5 text-sm font-medium",
  lg: "h-11 px-7 text-[15px] font-medium",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth,
      children,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-pill transition-colors",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
);

Button.displayName = "Button";
