"use client";

import { Minus, Plus, X } from "lucide-react";
import { QUESTION_TYPES } from "@/lib/constants";
import type { QuestionTypeConfig } from "@/types/assignment";
interface QuestionTypeRowProps {
  row: QuestionTypeConfig;
  onUpdate: (patch: Partial<Omit<QuestionTypeConfig, "id">>) => void;
  onRemove: () => void;
  mobile?: boolean;
}

function Stepper({
  value,
  onChange,
  min = 1,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
}) {
  return (
    <div className="flex h-9 items-center rounded-pill border border-[#E5E7EB] bg-white">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-full w-10 items-center justify-center text-ink-muted hover:text-ink"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="min-w-[2rem] text-center text-sm font-medium text-ink">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="flex h-full w-10 items-center justify-center text-ink-muted hover:text-ink"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

export function QuestionTypeRow({
  row,
  onUpdate,
  onRemove,
  mobile,
}: QuestionTypeRowProps) {
  if (mobile) {
    return (
      <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] p-3.5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <select
            value={row.type}
            onChange={(e) => onUpdate({ type: e.target.value })}
            className="flex-1 rounded-xl border border-[#E5E7EB] bg-white px-3 py-1.5 text-sm font-medium text-ink outline-none"
          >
            {QUESTION_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={onRemove}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-black/5"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="mb-1.5 text-xs font-medium text-ink-subtle">
              No. of Questions
            </p>
            <Stepper
              value={row.count}
              onChange={(count) => onUpdate({ count })}
            />
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium text-ink-subtle">Marks</p>
            <Stepper
              value={row.marks}
              onChange={(marks) => onUpdate({ marks })}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <tr className="border-t border-[#F0F0F0]">
      <td className="py-3 pr-3">
        <div className="flex items-center gap-2">
          <select
            value={row.type}
            onChange={(e) => onUpdate({ type: e.target.value })}
            className="w-full min-w-[200px] rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-ink outline-none focus:border-[#D1D5DB] focus:ring-1 focus:ring-ink/5"
          >
            {QUESTION_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={onRemove}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink-muted hover:bg-black/5"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </td>
      <td className="py-3 px-3">
        <Stepper value={row.count} onChange={(count) => onUpdate({ count })} />
      </td>
      <td className="py-3 pl-3">
        <Stepper value={row.marks} onChange={(marks) => onUpdate({ marks })} />
      </td>
    </tr>
  );
}
