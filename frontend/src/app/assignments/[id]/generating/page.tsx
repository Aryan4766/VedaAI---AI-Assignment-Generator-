"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { GenerationBanner } from "@/components/output/GenerationBanner";
import { Loader } from "@/components/ui/Loader";
import { subscribeToGeneration } from "@/services/socket";
import { api } from "@/services/api";

export default function GeneratingPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const unsubscribe = subscribeToGeneration(id, (event) => {
      if (event.status === "completed") {
        router.replace(`/assignments/${id}`);
      }
      if (event.status === "failed") {
        router.replace(`/assignments?error=generation-failed`);
      }
    });

    const poll = setInterval(async () => {
      try {
        const assignment = await api.getAssignment(id);
        if (assignment.status === "completed") {
          router.replace(`/assignments/${id}`);
        }
        if (assignment.status === "failed") {
          router.replace(`/assignments?error=generation-failed`);
        }
      } catch {
        /* ignore polling errors */
      }
    }, 4000);

    return () => {
      unsubscribe();
      clearInterval(poll);
    };
  }, [id, router]);

  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 pt-4 lg:px-1 lg:pt-2">
      <TopNavbar title="Create New" breadcrumb="Create New" showBack />

      <div className="mt-5 flex flex-1 flex-col gap-5 lg:mt-6">
        <GenerationBanner loading />

        <div className="flex flex-1 flex-col items-center justify-center rounded-t-[32px] bg-surface py-20 shadow-card">
          <Loader label="Generating your question paper..." />
          <p className="mt-4 max-w-sm text-center text-sm text-ink-muted">
            This may take a moment. You will be redirected when the assessment
            is ready.
          </p>
        </div>
      </div>
    </div>
  );
}
