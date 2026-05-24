import type { Question } from "@/types/assignment";
import { DifficultyBadge } from "./DifficultyBadge";

interface QuestionItemProps {
  number: number;
  question: Question;
}

/** Single numbered exam question — print-safe grid with right-aligned marks */
export function QuestionItem({ number, question }: QuestionItemProps) {
  return (
    <li className="exam-question-block break-inside-avoid page-break-inside-avoid print:break-inside-avoid">
      <div className="exam-question-row grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-1">
        <p className="min-w-0 text-[14px] leading-[1.85] text-ink/95 sm:text-[15px]">
          <span className="mr-2 font-semibold tabular-nums">{number}.</span>
          <DifficultyBadge
            difficulty={question.difficulty}
            variant="pill"
            className="exam-difficulty-badge mr-2 align-middle"
          />
          <span>{question.question}</span>
        </p>
        <span className="exam-marks shrink-0 pt-0.5 text-right text-[12px] font-medium tabular-nums text-ink/60 sm:text-[13px]">
          [{question.marks} Marks]
        </span>
      </div>
    </li>
  );
}
