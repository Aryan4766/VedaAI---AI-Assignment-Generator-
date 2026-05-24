"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { exportElementToPdf } from "@/utils/pdf";
import { Button } from "@/components/ui/Button";

interface PdfExportButtonProps {
  targetId: string;
  filename?: string;
}

export function PdfExportButton({
  targetId,
  filename = "vedaai-question-paper.pdf",
}: PdfExportButtonProps) {
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
    <Button
      type="button"
      variant="secondary"
      onClick={handleExport}
      disabled={loading}
      className="bg-white"
    >
      <Download className="h-4 w-4" />
      {loading ? "Preparing PDF..." : "Download as PDF"}
    </Button>
  );
}
