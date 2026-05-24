"use client";

import { Bell, Menu } from "lucide-react";
import { Logo } from "./Logo";

export function MobileHeader() {
  return (
    <header className="flex items-center justify-between rounded-b-[20px] bg-surface px-4 py-3 shadow-card lg:hidden">
      <Logo />
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center text-ink-muted"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" strokeWidth={1.75} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <span className="h-9 w-9 overflow-hidden rounded-full bg-[#E5E7EB]">
          <img
            src="https://i.pravatar.cc/80?u=john"
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </span>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center text-ink"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" strokeWidth={1.75} />
        </button>
      </div>
    </header>
  );
}
