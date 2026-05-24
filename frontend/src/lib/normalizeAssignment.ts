import type { Assignment, QuestionTypeConfig } from "@/types/assignment";

/** Normalize Mongo/API JSON into frontend Assignment shape */
export function normalizeAssignment(raw: Assignment): Assignment {
  const questionTypes: QuestionTypeConfig[] = (raw.questionTypes ?? []).map(
    (qt, index) => ({
      ...qt,
      id: qt.id ?? `qt-${index}-${qt.type}`,
    }),
  );

  return {
    ...raw,
    _id: String(raw._id),
    createdAt: String(raw.createdAt),
    updatedAt: String(raw.updatedAt),
    questionTypes,
  };
}
