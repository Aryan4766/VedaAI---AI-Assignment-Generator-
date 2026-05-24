export type Difficulty = "Easy" | "Moderate" | "Challenging" | "Hard";

export type AssignmentStatus =
  | "draft"
  | "queued"
  | "processing"
  | "completed"
  | "failed";

export interface QuestionTypeConfig {
  id?: string;
  type: string;
  count: number;
  marks: number;
}

export interface Question {
  question: string;
  difficulty: Difficulty;
  marks: number;
}

export interface PaperSection {
  title: string;
  instruction: string;
  questionType?: string;
  questions: Question[];
}

export interface GeneratedPaper {
  schoolName?: string;
  subject: string;
  className?: string;
  timeAllowed?: string;
  maximumMarks?: number;
  generalInstruction?: string;
  sections: PaperSection[];
  answerKey?: string[];
}

export interface Assignment {
  _id: string;
  title: string;
  subject: string;
  dueDate: string;
  instructions?: string;
  questionTypes: QuestionTypeConfig[];
  status: AssignmentStatus;
  generatedPaper?: GeneratedPaper;
  errorMessage?: string;
  assignedOn?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssignmentPayload {
  title: string;
  subject: string;
  dueDate: string;
  instructions?: string;
  questionTypes: Omit<QuestionTypeConfig, "id">[];
  fileName?: string;
}

export interface GenerationEvent {
  assignmentId: string;
  status: AssignmentStatus;
  message?: string;
}
