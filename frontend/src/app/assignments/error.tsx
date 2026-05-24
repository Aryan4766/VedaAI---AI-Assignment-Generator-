"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AssignmentsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h2 className="text-lg font-semibold text-ink">Something went wrong</h2>
      <p className="max-w-md text-sm text-ink-muted">
        The page failed to load. Try refreshing or return to assignments.
      </p>
      <div className="flex gap-3">
        <Button type="button" onClick={() => reset()}>
          Try again
        </Button>
        <Link href="/assignments">
          <Button variant="secondary">Back to assignments</Button>
        </Link>
      </div>
    </div>
  );
}
