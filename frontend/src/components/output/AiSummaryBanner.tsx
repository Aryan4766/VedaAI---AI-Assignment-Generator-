import { PdfDownloadButton } from "@/components/output/PdfDownloadButton";

interface AiSummaryBannerProps {
  message: string;
  pdfTargetId: string;
  pdfFilename?: string;
}

/** Dark premium AI summary strip with PDF action — integrated with paper layout */
export function AiSummaryBanner({
  message,
  pdfTargetId,
  pdfFilename,
}: AiSummaryBannerProps) {
  return (
    <div className="rounded-2xl bg-[#2A2A2A] px-5 py-4 text-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] sm:rounded-[18px] sm:px-6 sm:py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="text-[13px] leading-[1.7] text-white/90 sm:text-sm sm:leading-[1.65]">
          {message}
        </p>
        <PdfDownloadButton
          targetId={pdfTargetId}
          filename={pdfFilename}
          className="shrink-0 self-start sm:self-center"
        />
      </div>
    </div>
  );
}
