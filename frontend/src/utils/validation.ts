import type { QuestionTypeConfig } from "@/types/assignment";

export interface FormErrors {
  title?: string;
  subject?: string;
  dueDate?: string;
  questionTypes?: string;
}

export function validateDueDate(value: string): string | undefined {
  if (!value.trim()) return "Due date is required";

  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value);
  if (!match) return "Use DD-MM-YYYY format";

  const [, day, month, year] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() !== Number(month) - 1 ||
    date.getDate() !== Number(day)
  ) {
    return "Enter a valid date";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) return "Due date cannot be in the past";

  return undefined;
}

export function validateQuestionTypes(
  types: QuestionTypeConfig[],
): string | undefined {
  if (!types.length) return "Add at least one question type";

  for (const row of types) {
    if (!row.type.trim()) return "Select a question type for each row";
    if (row.count <= 0) return "Number of questions must be greater than 0";
    if (row.marks <= 0) return "Marks must be greater than 0";
  }

  return undefined;
}

export function validateCreateForm(input: {
  title: string;
  subject: string;
  dueDate: string;
  questionTypes: QuestionTypeConfig[];
}): FormErrors {
  const errors: FormErrors = {};

  if (!input.title.trim()) errors.title = "Assignment title is required";
  if (!input.subject.trim()) errors.subject = "Subject is required";

  const dueError = validateDueDate(input.dueDate);
  if (dueError) errors.dueDate = dueError;

  const qtError = validateQuestionTypes(input.questionTypes);
  if (qtError) errors.questionTypes = qtError;

  return errors;
}

export function calcTotals(types: QuestionTypeConfig[]) {
  return types.reduce(
    (acc, row) => ({
      questions: acc.questions + row.count,
      marks: acc.marks + row.count * row.marks,
    }),
    { questions: 0, marks: 0 },
  );
}
