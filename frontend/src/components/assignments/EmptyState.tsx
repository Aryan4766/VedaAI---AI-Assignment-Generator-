import Link from "next/link";
import { Plus } from "lucide-react";
import { EmptyStateIllustration } from "./EmptyStateIllustration";
import { Button } from "@/components/ui/Button";

export function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center sm:px-10">
      <EmptyStateIllustration />
      <h2 className="mt-9 text-[22px] font-semibold tracking-tight text-ink sm:text-2xl">
        No assignments yet
      </h2>
      <p className="mt-3 max-w-[380px] text-sm leading-[1.65] text-ink-muted">
        Create your first assignment to start collecting and grading student
        submissions. You can set up rubrics, define marking criteria, and let
        AI assist with grading.
      </p>
      <Link href="/assignments/create" className="mt-9">
        <Button size="lg" className="h-11 min-w-[280px] px-7">
          <Plus className="h-4 w-4" />
          Create Your First Assignment
        </Button>
      </Link>
    </div>
  );
}
