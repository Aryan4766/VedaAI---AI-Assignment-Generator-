"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { AssignmentCard } from "@/components/assignments/AssignmentCard";
import { SearchBar } from "@/components/assignments/SearchBar";
import { FilterDropdown } from "@/components/assignments/FilterDropdown";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Loader } from "@/components/ui/Loader";
import { useAssignmentStore } from "@/store/assignmentStore";
import { toDisplayStatus, type StatusFilter } from "@/lib/assignmentStatus";

export default function AssignmentsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center py-20">
          <Loader label="Loading assignments..." />
        </div>
      }
    >
      <AssignmentsPageContent />
    </Suspense>
  );
}

function AssignmentsPageContent() {
  const searchParams = useSearchParams();
  const {
    assignments,
    loading,
    error,
    fetchAssignments,
    deleteAssignment,
  } = useAssignmentStore();

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    void fetchAssignments();
  }, [fetchAssignments]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return assignments.filter((a) => {
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.subject.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "all" ||
        toDisplayStatus(a.status) === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [assignments, query, statusFilter]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteAssignment(deleteId);
      setDeleteId(null);
    } catch {
      /* store sets error */
    } finally {
      setDeleting(false);
    }
  };

  const generationError = searchParams.get("error") === "generation-failed";

  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 pt-4 lg:px-1 lg:pt-2">
      <TopNavbar title="Assignment" breadcrumb="Assignment" />

      <div className="mt-5 flex flex-1 flex-col rounded-shell bg-surface p-6 shadow-card md:px-10 md:py-9 lg:mt-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
            <h1 className="text-xl font-semibold text-ink">Assignments</h1>
          </div>
          <p className="mt-2 text-sm text-ink-subtle">
            Manage and create assignments for your classes.
          </p>
        </div>

        {generationError && (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Question paper generation failed. Please try creating the assignment
            again.
          </p>
        )}

        {error && (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3 lg:mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <FilterDropdown value={statusFilter} onChange={setStatusFilter} />
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
              <SearchBar
                value={query}
                onChange={setQuery}
                className="w-full sm:max-w-md"
              />
              <Link href="/assignments/create" className="hidden shrink-0 lg:block">
                <Button size="md" className="whitespace-nowrap">
                  <Plus className="h-4 w-4" />
                  Create Assignment
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-1 items-center justify-center py-20">
            <Loader label="Loading assignments..." />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
            <p className="text-sm font-medium text-ink">
              {assignments.length === 0
                ? "No assignments yet"
                : "No assignments found"}
            </p>
            <p className="mt-1 text-sm text-ink-subtle">
              {assignments.length === 0
                ? "Create your first AI-powered assessment."
                : "Try adjusting your search or filter."}
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:gap-5">
            {filtered.map((assignment) => (
              <AssignmentCard
                key={assignment._id}
                assignment={assignment}
                onDelete={setDeleteId}
              />
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center pb-2 lg:mt-12">
          <Link href="/assignments/create">
            <Button size="lg">
              <Plus className="h-4 w-4" />
              Create Assignment
            </Button>
          </Link>
        </div>
      </div>

      <Link
        href="/assignments/create"
        className="fixed bottom-24 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-start shadow-fab lg:hidden"
        aria-label="Create assignment"
      >
        <Plus className="h-6 w-6" strokeWidth={2} />
      </Link>

      <Modal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete assignment?"
      >
        <p className="text-sm text-ink-muted">
          This action cannot be undone.
        </p>
        <div className="mt-6 flex gap-3">
          <Button variant="secondary" fullWidth onClick={() => setDeleteId(null)}>
            Cancel
          </Button>
          <Button
            fullWidth
            className="bg-red-600 hover:bg-red-700"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}