import mongoose, { Schema, Document } from "mongoose";
import type { GeneratedPaper } from "../types/paper";

export type AssignmentStatus =
  | "draft"
  | "queued"
  | "processing"
  | "completed"
  | "failed";

export interface QuestionTypeConfig {
  type: string;
  count: number;
  marks: number;
}

export interface IAssignment extends Document {
  title: string;
  subject: string;
  dueDate: string;
  instructions?: string;
  questionTypes: QuestionTypeConfig[];
  status: AssignmentStatus;
  generatedPaper?: GeneratedPaper;
  fileName?: string;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionTypeSchema = new Schema<QuestionTypeConfig>(
  {
    type: { type: String, required: true },
    count: { type: Number, required: true, min: 1 },
    marks: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const AssignmentSchema = new Schema<IAssignment>(
  {
    title: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    dueDate: { type: String, required: true },
    instructions: { type: String },
    questionTypes: { type: [QuestionTypeSchema], required: true },
    status: {
      type: String,
      enum: ["draft", "queued", "processing", "completed", "failed"],
      default: "draft",
    },
    generatedPaper: { type: Schema.Types.Mixed },
    fileName: { type: String },
    errorMessage: { type: String },
  },
  { timestamps: true },
);

export const Assignment = mongoose.model<IAssignment>(
  "Assignment",
  AssignmentSchema,
);
