import type { IAssignment } from "../models/Assignment";

export function buildGenerationPrompt(assignment: IAssignment): string {
  const config = assignment.questionTypes
    .map(
      (q) =>
        `- ${q.type}: ${q.count} questions, ${q.marks} marks each (section total ${q.count * q.marks} marks)`,
    )
    .join("\n");

  return `You are an expert exam paper creator for Indian CBSE schools.

Create a structured question paper as VALID JSON ONLY (no markdown, no commentary).

Assignment:
- Title: ${assignment.title}
- Subject: ${assignment.subject}
- Due Date: ${assignment.dueDate}
${assignment.instructions ? `- Teacher Instructions: ${assignment.instructions}` : ""}

Question configuration:
${config}

Return JSON matching this schema exactly:
{
  "schoolName": "Delhi Public School, Sector-4, Bokaro",
  "subject": "${assignment.subject}",
  "className": "VIII",
  "timeAllowed": "45 minutes",
  "maximumMarks": <number>,
  "generalInstruction": "All questions are compulsory unless stated otherwise.",
  "sections": [
    {
      "title": "Section A",
      "instruction": "Attempt all questions. Each question carries X marks",
      "questionType": "Short Answer Questions",
      "questions": [
        {
          "question": "Question text here",
          "difficulty": "Easy",
          "marks": 2
        }
      ]
    }
  ],
  "answerKey": ["Answer for Q1...", "Answer for Q2..."]
}

Rules:
- difficulty must be one of: Easy, Moderate, Challenging
- Create one section per question type from the configuration
- Generate exactly the number of questions specified per type
- Use marks per question as specified
- Questions must be relevant to ${assignment.subject}
- answerKey must have one entry per question in order`;
}
