import type { GeneratedPaper } from "@/types/assignment";
import { PaperHeader } from "./paper/PaperHeader";
import { StudentInfo } from "./paper/StudentInfo";
import { QuestionSection } from "./paper/QuestionSection";
import { AnswerKeySection } from "./paper/AnswerKeySection";

interface QuestionPaperProps {
  paper: GeneratedPaper;
}

/** Full printable exam paper — composes academic sub-components */
export function QuestionPaper({ paper }: QuestionPaperProps) {
  let questionOffset = 0;

  return (
    <div className="font-serif text-ink">
      <div className="mx-auto max-w-full">
        <PaperHeader paper={paper} />
        <StudentInfo className="mt-9 sm:mt-10" />

        {paper.sections.map((section) => {
          const startNumber = questionOffset + 1;
          questionOffset += section.questions.length;

          return (
            <QuestionSection
              key={section.title}
              section={section}
              startNumber={startNumber}
            />
          );
        })}

        <p className="exam-end-marker mt-14 text-center text-[13px] font-semibold tracking-wide text-ink-muted sm:mt-16 sm:text-[14px]">
          End of Question Paper
        </p>

        {paper.answerKey && paper.answerKey.length > 0 && (
          <AnswerKeySection answers={paper.answerKey} />
        )}
      </div>
    </div>
  );
}
