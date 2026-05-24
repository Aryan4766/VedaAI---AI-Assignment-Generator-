interface AnswerKeySectionProps {
  answers: string[];
}

/** Formatted answer key — print-safe spacing and page-break rules */
export function AnswerKeySection({ answers }: AnswerKeySectionProps) {
  if (!answers.length) return null;

  return (
    <section className="exam-answer-key-section mt-14 break-inside-avoid border-t border-ink/[0.08] pt-12 print:break-inside-avoid">
      <h3 className="exam-section-heading break-after-avoid text-[14px] font-semibold tracking-wide text-ink sm:text-[15px]">
        Answer Key
      </h3>
      <ol className="mt-6 list-decimal space-y-5 pl-5 text-[13px] leading-[1.8] text-ink/85 sm:pl-6 sm:text-[14px]">
        {answers.map((answer, index) => (
          <li
            key={index}
            className="exam-answer-item break-inside-avoid page-break-inside-avoid pl-1.5 marker:font-semibold marker:text-ink/70 print:break-inside-avoid"
          >
            {answer}
          </li>
        ))}
      </ol>
    </section>
  );
}
