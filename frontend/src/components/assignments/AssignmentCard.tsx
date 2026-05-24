"use client";

import { useState } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { MoreVertical } from "lucide-react";
import type { Assignment } from "@/types/assignment";
import { toDisplayStatus, getAssignmentHref } from "@/lib/assignmentStatus";
import { StatusBadge } from "./StatusBadge";

export interface AssignmentCardProps {
  assignment: Assignment;
  onDelete?: (id: string) => void;
}

function formatDisplayDate(value?: string) {
  if (!value) return "—";
  if (/^\d{2}-\d{2}-\d{4}$/.test(value)) return value;
  try {
    const d = value.includes("T") ? parseISO(value) : new Date(value);
    return format(d, "dd-MM-yyyy");
  } catch {
    return value;
  }
}

/** Assignment listing card — matches Figma card layout */
export function AssignmentCard({ assignment, onDelete }: AssignmentCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const displayStatus = toDisplayStatus(assignment.status);

  const assignedOn = formatDisplayDate(
    assignment.assignedOn ?? assignment.createdAt,
  );
  const due = formatDisplayDate(assignment.dueDate);

  return (
    <article className="group relative rounded-card border border-transparent bg-surface p-5 shadow-card transition duration-200 hover:border-[#F0F0F0] hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)] sm:p-[22px]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-2">
          <StatusBadge status={displayStatus} />
          <Link
            href={getAssignmentHref(assignment)}
            className="block text-base font-bold text-ink underline decoration-ink/25 underline-offset-[5px] transition group-hover:decoration-ink/50"
          >
            {assignment.title}
          </Link>
          <p className="text-sm text-ink-muted">{assignment.subject}</p>
        </div>

        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition hover:bg-black/5 hover:text-ink"
            aria-label="More options"
          >
            <MoreVertical className="h-5 w-5" strokeWidth={1.75} />
          </button>
          {menuOpen && (
            <>
              <button
                type="button"
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              />
              <div className="absolute right-0 top-9 z-20 min-w-[168px] rounded-xl border border-[#EBEBEB] bg-white py-1 shadow-card">
                <Link
                  href={getAssignmentHref(assignment)}
                  className="block px-4 py-2.5 text-sm text-ink hover:bg-[#F5F5F5]"
                  onClick={() => setMenuOpen(false)}
                >
                  View Assignment
                </Link>
                <button
                  type="button"
                  className="block w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete?.(assignment._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-2 border-t border-[#F3F4F6] pt-4 text-xs sm:grid-cols-2 sm:gap-4">
        <div>
          <span className="font-semibold text-ink">Assigned on : </span>
          <span className="text-ink-muted">{assignedOn}</span>
        </div>
        <div className="sm:text-right">
          <span className="font-semibold text-ink">Due : </span>
          <span className="text-ink-muted">{due}</span>
        </div>
      </div>
    </article>
  );
}
