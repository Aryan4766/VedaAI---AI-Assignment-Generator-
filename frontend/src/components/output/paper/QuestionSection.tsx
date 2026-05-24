import type { PaperSection as PaperSectionType } from "@/types/assignment";
import { QuestionItem } from "./QuestionItem";

interface QuestionSectionProps {
  section: PaperSectionType;
  startNumber: number;
}

/** Exam section block — print-safe section with stable page breaks */
export function QuestionSection({ section, startNumber }: QuestionSectionProps) {
  return (
    <section className="exam-section-block mt-12 break-inside-avoid page-break-inside-avoid first:mt-10 print:break-inside-avoid">
      <h2 className="exam-section-heading break-after-avoid page-break-after-avoid text-center text-[14px] font-bold uppercase tracking-[0.08em] text-ink sm:text-[15px]">
        {section.title}
      </h2>

      {section.questionType && (
        <h3 className="mt-6 text-[14px] font-semibold text-ink sm:text-[15px]">
          {section.questionType}
        </h3>
      )}

      <p className="mt-2 text-[13px] italic leading-[1.7] text-ink-muted sm:text-[14px]">
        {section.instruction}
      </p>

      <ol className="mt-7 list-none space-y-7 sm:space-y-8">
        {section.questions.map((q, index) => (
          <QuestionItem
            key={`${section.title}-${index}`}
            number={startNumber + index}
            question={q}
          />
        ))}
      </ol>
    </section>
  );
}
