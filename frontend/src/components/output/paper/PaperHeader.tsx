import type { GeneratedPaper } from "@/types/assignment";

interface PaperHeaderProps {
  paper: GeneratedPaper;
}

/** Centered school header, subject, class, time & marks — academic serif layout */
export function PaperHeader({ paper }: PaperHeaderProps) {
  return (
    <header className="exam-paper-header break-inside-avoid page-break-inside-avoid text-center print:break-inside-avoid">
      <h1 className="text-lg font-bold leading-snug tracking-tight sm:text-[21px]">
        {paper.schoolName}
      </h1>
      <p className="mt-3 text-[14px] font-medium leading-relaxed sm:text-[15px]">
        Subject: {paper.subject}
      </p>
      {paper.className && (
        <p className="text-[14px] font-medium leading-relaxed sm:text-[15px]">
          Class: {paper.className}
        </p>
      )}

      <div className="mt-7 flex flex-col gap-2.5 text-left text-[13px] leading-relaxed sm:flex-row sm:items-center sm:justify-between sm:text-[14px]">
        <p>
          <span className="font-semibold">Time Allowed:</span>{" "}
          {paper.timeAllowed ?? "45 minutes"}
        </p>
        <p className="sm:text-right">
          <span className="font-semibold">Maximum Marks:</span>{" "}
          {paper.maximumMarks ?? "—"}
        </p>
      </div>

      {paper.generalInstruction && (
        <p className="mt-6 text-left text-[13px] leading-[1.75] text-ink/90 sm:text-[14px]">
          {paper.generalInstruction}
        </p>
      )}
    </header>
  );
}
