"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { AiSummaryBanner } from "@/components/output/AiSummaryBanner";
import { QuestionPaper } from "@/components/output/QuestionPaper";
import { Loader } from "@/components/ui/Loader";
import { Button } from "@/components/ui/Button";
import { api } from "@/services/api";
import type { Assignment, GeneratedPaper } from "@/types/assignment";

function buildAiSummary(assignment: Assignment): string {
  if (assignment.instructions?.trim()) {
    return `Your AI-generated question paper for "${assignment.title}" follows your instructions: ${assignment.instructions.trim()}`;
  }
  return `Your AI-generated ${assignment.subject} question paper for "${assignment.title}" is ready. Review, print, or download as PDF below.`;
}

export default function AssignmentOutputPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [paper, setPaper] = useState<GeneratedPaper | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getAssignment(id);
        if (cancelled) return;

        if (data.status === "queued" || data.status === "processing") {
          router.replace(`/assignments/${id}/generating`);
          return;
        }

        if (data.status === "failed") {
          setAssignment(data);
          setError(
            data.errorMessage ??
              "Generation failed. Please create a new assignment.",
          );
          setLoading(false);
          return;
        }

        setAssignment(data);

        if (data.generatedPaper) {
          setPaper(data.generatedPaper);
        } else {
          const { paper: fetched } = await api.getGeneratedPaper(id);
          if (!cancelled) setPaper(fetched);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load assignment",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [id, router]);

  const pdfFilename = paper
    ? `${paper.subject.toLowerCase().replace(/\s+/g, "-")}-question-paper.pdf`
    : "question-paper.pdf";

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-x-hidden px-4 pt-4 sm:px-5 lg:px-1 lg:pt-2">
      <TopNavbar title="Create New" breadcrumb="Create New" showBack />

      {loading ? (
        <div className="mt-12 flex flex-1 items-center justify-center">
          <Loader label="Loading question paper..." />
        </div>
      ) : error || !paper ? (
        <div className="mx-auto mt-10 max-w-md rounded-card bg-surface p-8 text-center shadow-card">
          <p className="text-sm text-ink-muted">
            {error ?? "Question paper is not available yet."}
          </p>
          <Button
            className="mt-6"
            onClick={() => router.push("/assignments")}
          >
            Back to assignments
          </Button>
        </div>
      ) : (
        <div className="mx-auto mt-5 flex w-full max-w-[680px] flex-1 flex-col gap-4 px-1 pb-10 sm:gap-5 sm:px-2 lg:mt-6">
          <AiSummaryBanner
            message={assignment ? buildAiSummary(assignment) : ""}
            pdfTargetId="question-paper"
            pdfFilename={pdfFilename}
          />

          <div
            id="question-paper"
            className="question-paper-print-root overflow-hidden rounded-t-[24px] bg-white px-7 py-10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] print:overflow-visible print:rounded-none print:shadow-none sm:rounded-t-[28px] sm:px-10 sm:py-12 md:px-12 md:py-14"
          >
            <QuestionPaper paper={paper} />
          </div>
        </div>
      )}
    </div>
  );
}
