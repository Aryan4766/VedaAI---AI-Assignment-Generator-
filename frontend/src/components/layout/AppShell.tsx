"use client";

import { Sidebar } from "./Sidebar";
import { MobileHeader } from "./MobileHeader";
import { BottomNav } from "./BottomNav";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-canvas">
      <MobileHeader />
      <div className="mx-auto flex min-h-screen max-w-[1440px] gap-0 lg:gap-5 lg:p-5 xl:p-6">
        <Sidebar />
        <div className="flex min-h-0 flex-1 flex-col pb-24 lg:pb-5">
          {children}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
