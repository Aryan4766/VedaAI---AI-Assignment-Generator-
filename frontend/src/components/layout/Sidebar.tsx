"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { Logo } from "./Logo";
import { NavIcon } from "./NavIcons";
import { NAV_ITEMS, SCHOOL } from "@/lib/constants";
import { cn } from "@/lib/cn";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-full w-sidebar shrink-0 flex-col rounded-r-[24px] bg-surface px-4 py-5 shadow-card lg:flex">
      <Logo />

      <Link
        href="/assignments/create"
        className="mt-5 flex h-10 items-center justify-center gap-1.5 rounded-pill bg-ink px-4 text-[13px] font-medium text-white shadow-glow transition hover:bg-[#2a2a2a]"
      >
        <Sparkles className="h-3.5 w-3.5 text-brand-end" />
        Create Assignment
      </Link>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/assignments"
              ? pathname.startsWith("/assignments")
              : pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium text-ink/80 transition",
                active && "bg-[#F0F0F0] text-ink",
              )}
            >
              <NavIcon name={item.icon} />
              <span className="flex-1">{item.label}</span>
              {"badge" in item && item.badge ? (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gradient-to-r from-brand-start to-brand-end px-1.5 text-[11px] font-semibold text-white">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}

        <div className="mt-auto pt-6">
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium text-ink/80 hover:bg-[#F0F0F0]"
          >
            <NavIcon name="settings" />
            Settings
          </Link>
        </div>
      </nav>

      <div className="mt-4 flex items-center gap-3 rounded-[18px] bg-[#F7F7F8] p-3.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EDE9E1] text-base">
          🦍
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{SCHOOL.name}</p>
          <p className="truncate text-xs text-ink-muted">{SCHOOL.location}</p>
        </div>
      </div>
    </aside>
  );
}
