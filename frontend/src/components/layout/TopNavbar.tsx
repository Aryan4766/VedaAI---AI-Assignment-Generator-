"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bell,
  ChevronDown,
  LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/cn";

interface TopNavbarProps {
  title?: string;
  showBack?: boolean;
  breadcrumb?: string;
  className?: string;
}

export function TopNavbar({
  title = "Assignment",
  showBack = true,
  breadcrumb,
  className,
}: TopNavbarProps) {
  const router = useRouter();

  return (
    <header
      className={cn(
        "flex h-[52px] items-center justify-between rounded-shell border border-[#EBEBEB] bg-surface px-4 md:px-5",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-black/5"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={1.75} />
          </button>
        )}
        <button
          type="button"
          className="hidden h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-black/5 sm:flex"
          aria-label="Menu grid"
        >
          <LayoutGrid className="h-4 w-4" strokeWidth={1.75} />
        </button>
        <span className="text-sm font-medium text-ink-muted">
          {breadcrumb ?? title}
        </span>
      </div>

      <div className="flex items-center gap-5 md:gap-6">
        <button
          type="button"
          className="relative flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-black/5"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" strokeWidth={1.75} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        <button
          type="button"
          className="flex items-center gap-2.5 rounded-pill py-0.5 pl-0.5 pr-3 hover:bg-black/[0.03] md:gap-3 md:pr-3.5"
        >
          <span className="h-8 w-8 overflow-hidden rounded-full bg-[#E5E7EB]">
            <img
              src="https://i.pravatar.cc/80?u=john"
              alt="John Doe"
              className="h-full w-full object-cover"
            />
          </span>
          <span className="hidden text-sm font-medium text-ink md:inline">
            John Doe
          </span>
          <ChevronDown className="hidden h-4 w-4 text-ink-muted md:block" />
        </button>
      </div>
    </header>
  );
}
