"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavIcon } from "./NavIcons";
import { MOBILE_NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/cn";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 rounded-t-[28px] bg-nav-dark px-2 pb-3 pt-2 lg:hidden">
      <ul className="flex items-end justify-around">
        {MOBILE_NAV_ITEMS.map((item) => {
          const active =
            item.href === "/assignments"
              ? pathname.startsWith("/assignments")
              : pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex min-w-[72px] flex-col items-center gap-1 px-3 py-2 text-[11px] font-medium",
                  active ? "text-white" : "text-nav-inactive",
                )}
              >
                {active && (
                  <span className="mb-0.5 h-0.5 w-6 rounded-full bg-white" />
                )}
                {!active && <span className="mb-0.5 h-0.5 w-6" />}
                <NavIcon name={item.icon} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
