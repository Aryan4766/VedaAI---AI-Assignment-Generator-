import { env } from "../config/env";
import { GeneratedPaperSchema, type GeneratedPaper } from "../types/paper";
import type { IAssignment } from "../models/Assignment";
import { buildGenerationPrompt } from "../utils/prompt";

function extractJson(text: string): unknown {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1].trim() : trimmed;

  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("No JSON object found in AI response");
  }

  return JSON.parse(raw.slice(start, end + 1));
}

function buildMockPaper(assignment: IAssignment): GeneratedPaper {
  const sections = assignment.questionTypes.map((qt, index) => {
    const sectionLetter = String.fromCharCode(65 + index);
    const questions = Array.from({ length: qt.count }, (_, i) => ({
      question: `Sample ${qt.type} question ${i + 1} for ${assignment.subject}.`,
      difficulty: (["Easy", "Moderate", "Challenging"] as const)[i % 3],
      marks: qt.marks,
    }));

    return {
      title: `Section-${sectionLetter}`,
      instruction: `Attempt all questions. Each question carries ${qt.marks} marks`,
      questionType: qt.type,
      questions,
    };
  });

  const maximumMarks = assignment.questionTypes.reduce(
    (sum, q) => sum + q.count * q.marks,
    0,
  );

  return {
    schoolName: "Delhi Public School, Sector-4, Bokaro",
    subject: assignment.subject,
    className: "VIII",
    timeAllowed: "45 minutes",
    maximumMarks,
    generalInstruction:
      "All questions are compulsory unless stated otherwise.",
    sections,
    answerKey: sections.flatMap((s) =>
      s.questions.map((q) => `Model answer for: ${q.question}`),
    ),
  };
}

export async function generateQuestionPaper(
  assignment: IAssignment,
): Promise<GeneratedPaper> {
  if (!env.openRouterKey) {
    return GeneratedPaperSchema.parse(buildMockPaper(assignment));
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.openRouterKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "VedaAI Assessment Creator",
    },
    body: JSON.stringify({
      model: env.openRouterModel,
      messages: [
        {
          role: "user",
          content: buildGenerationPrompt(assignment),
        },
      ],
      temperature: 0.4,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenRouter error: ${errText}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty response from OpenRouter");

  const parsed = extractJson(content);
  return GeneratedPaperSchema.parse(parsed);
}
