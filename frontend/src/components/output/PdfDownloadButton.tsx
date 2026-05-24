"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { exportElementToPdf } from "@/utils/pdf";
import { cn } from "@/lib/cn";

interface PdfDownloadButtonProps {
  targetId: string;
  filename?: string;
  className?: string;
}

/** Subtle premium PDF download — sized for dark summary banner */
export function PdfDownloadButton({
  targetId,
  filename = "vedaai-question-paper.pdf",
  className,
}: PdfDownloadButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    const el = document.getElementById(targetId);
    if (!el) return;

    setLoading(true);
    try {
      await exportElementToPdf(el, filename);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={loading}
      className={cn(
        "inline-flex h-10 shrink-0 items-center gap-2 rounded-xl bg-white px-4 text-sm font-medium text-ink shadow-sm transition hover:bg-[#FAFAFA] disabled:opacity-60",
        className,
      )}
    >
      <Download className="h-4 w-4" strokeWidth={1.75} />
      {loading ? "Preparing…" : "Download as PDF"}
    </button>
  );
}
