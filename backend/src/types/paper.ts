import { z } from "zod";

export const QuestionSchema = z.object({
  question: z.string().min(1),
  difficulty: z.enum(["Easy", "Moderate", "Challenging", "Hard"]),
  marks: z.number().positive(),
});

export const SectionSchema = z.object({
  title: z.string().min(1),
  instruction: z.string().min(1),
  questionType: z.string().optional(),
  questions: z.array(QuestionSchema).min(1),
});

export const GeneratedPaperSchema = z.object({
  schoolName: z.string().optional(),
  subject: z.string().min(1),
  className: z.string().optional(),
  timeAllowed: z.string().optional(),
  maximumMarks: z.number().optional(),
  generalInstruction: z.string().optional(),
  sections: z.array(SectionSchema).min(1),
  answerKey: z.array(z.string()).optional(),
});

export type GeneratedPaper = z.infer<typeof GeneratedPaperSchema>;
export type PaperSection = z.infer<typeof SectionSchema>;
export type Question = z.infer<typeof QuestionSchema>;
