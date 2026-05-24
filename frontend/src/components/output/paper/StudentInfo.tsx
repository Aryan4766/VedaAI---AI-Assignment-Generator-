import { cn } from "@/lib/cn";

interface StudentInfoProps {
  className?: string;
}

/** Printable student detail lines with ruled underscores */
export function StudentInfo({ className }: StudentInfoProps) {
  const fields = [
    { label: "Name", width: "min-w-[180px] sm:min-w-[240px]" },
    { label: "Roll Number", width: "min-w-[180px] sm:min-w-[240px]" },
    { label: "Class / Section", width: "min-w-[180px] sm:min-w-[240px]" },
  ];

  return (
    <div
      className={cn(
        "exam-student-info break-inside-avoid page-break-inside-avoid print:break-inside-avoid",
        className,
      )}
    >
      {fields.map((field) => (
        <p
          key={field.label}
          className="mt-4 first:mt-0 text-[13px] leading-[1.75] sm:text-[14px]"
        >
          <span className="font-semibold">{field.label}:</span>{" "}
          <span
            className={`inline-block border-b border-ink/30 ${field.width} align-bottom`}
          />
        </p>
      ))}
    </div>
  );
}
