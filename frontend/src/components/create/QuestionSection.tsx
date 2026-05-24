"use client";

import { Plus } from "lucide-react";
import { QuestionTypeRow } from "./QuestionTypeRow";
import type { QuestionTypeConfig } from "@/types/assignment";
import { calcTotals } from "@/utils/validation";

interface QuestionSectionProps {
  rows: QuestionTypeConfig[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (
    id: string,
    patch: Partial<Omit<QuestionTypeConfig, "id">>,
  ) => void;
  error?: string;
}

export function QuestionSection({
  rows,
  onAdd,
  onRemove,
  onUpdate,
  error,
}: QuestionSectionProps) {
  const totals = calcTotals(rows);

  return (
    <div>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs font-medium text-ink-subtle">
              <th className="pb-2.5 font-medium">Question Type</th>
              <th className="pb-2.5 font-medium">No. of Questions</th>
              <th className="pb-2.5 font-medium">Marks</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <QuestionTypeRow
                key={row.id}
                row={row}
                onUpdate={(patch) => onUpdate(row.id!, patch)}
                onRemove={() => onRemove(row.id!)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {rows.map((row) => (
          <QuestionTypeRow
            key={row.id}
            row={row}
            mobile
            onUpdate={(patch) => onUpdate(row.id, patch)}
            onRemove={() => onRemove(row.id)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="mt-4 flex items-center gap-2 text-sm font-medium text-ink"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-white">
          <Plus className="h-3.5 w-3.5" />
        </span>
        Add Question Type
      </button>

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

      <div className="mt-8 space-y-2 text-right text-sm">
        <p className="text-ink-subtle">
          Total Questions:{" "}
          <span className="font-medium text-ink/85">{totals.questions}</span>
        </p>
        <p className="text-ink-subtle">
          Total Marks:{" "}
          <span className="font-medium text-ink/85">{totals.marks}</span>
        </p>
      </div>
    </div>
  );
}
