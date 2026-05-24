import { Sparkles } from "lucide-react";

interface GenerationBannerProps {
  message?: string;
  loading?: boolean;
}

export function GenerationBanner({
  message = "Generating intelligent questions to construct Question Paper for your VedaAI Account based on the chosen document.",
  loading,
}: GenerationBannerProps) {
  return (
    <div className="rounded-[20px] bg-[#2D2D2D] px-6 py-5 text-white shadow-card">
      <p className="max-w-3xl text-sm leading-relaxed sm:text-[15px]">
        {message}
      </p>
      {loading && (
        <div className="mt-4 flex items-center gap-2 text-white/80">
          <Sparkles className="h-4 w-4 animate-pulse" />
          <span className="text-xs">Processing with AI...</span>
        </div>
      )}
    </div>
  );
}
