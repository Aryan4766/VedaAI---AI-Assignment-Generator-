"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Mic } from "lucide-react";
import Link from "next/link";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { StepProgress } from "@/components/create/StepProgress";
import { FileUpload } from "@/components/create/FileUpload";
import { QuestionSection } from "@/components/create/QuestionSection";
import { DueDateInput } from "@/components/create/DueDateInput";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAssignmentStore } from "@/store/assignmentStore";
import { api } from "@/services/api";
import {
  validateCreateForm,
  type FormErrors,
} from "@/utils/validation";

export default function CreateAssignmentPage() {
  const router = useRouter();
  const {
    form,
    setFormField,
    addQuestionType,
    removeQuestionType,
    updateQuestionType,
    createAssignment,
    resetForm,
  } = useAssignmentStore();

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const validation = validateCreateForm({
      title: form.title,
      subject: form.subject,
      dueDate: form.dueDate,
      questionTypes: form.questionTypes,
    });

    setErrors(validation);
    if (Object.keys(validation).length) return;

    setSubmitting(true);
    try {
      const created = await createAssignment({
        title: form.title.trim(),
        subject: form.subject.trim(),
        dueDate: form.dueDate,
        instructions: form.instructions.trim() || undefined,
        questionTypes: form.questionTypes.map(({ type, count, marks }) => ({
          type,
          count,
          marks,
        })),
        fileName: form.fileName,
      });

      await api.generateAssignment(created._id);
      resetForm();
      router.push(`/assignments/${created._id}/generating`);
    } catch (err) {
      setErrors({
        title: err instanceof Error ? err.message : "Failed to create",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 pt-4 lg:px-1 lg:pt-2">
      <div className="lg:hidden">
        <div className="mb-4 flex items-center gap-3">
          <Link
            href="/assignments"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-card"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="flex-1 text-center text-base font-semibold text-ink">
            Create Assignment
          </h1>
          <span className="w-9" />
        </div>
        <StepProgress step={1} />
      </div>

      <div className="hidden lg:block">
        <TopNavbar title="Assignment" breadcrumb="Assignment" />
      </div>

      <div className="mt-5 flex flex-1 flex-col rounded-shell bg-surface p-6 shadow-card md:px-10 md:py-9 lg:mt-6">
        <div className="hidden lg:block">
          <StepProgress step={1} />
          <div className="mt-7 flex items-center gap-2.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
            <h1 className="text-xl font-semibold text-ink">Create Assignment</h1>
          </div>
          <p className="mt-2.5 text-sm text-ink-subtle">
            Set up a new assignment for your students
          </p>
        </div>

        <div className="px-1 md:px-2">
        <div className="mt-6 lg:mt-9">
          <h2 className="text-base font-semibold text-ink">Assignment Details</h2>
          <p className="mt-1 text-sm text-ink-subtle">
            Basic information about your assignment
          </p>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Input
            label="Assignment Title"
            placeholder="e.g. Quiz on Electricity"
            value={form.title}
            onChange={(e) => setFormField("title", e.target.value)}
            error={errors.title}
          />
          <Input
            label="Subject"
            placeholder="e.g. Science"
            value={form.subject}
            onChange={(e) => setFormField("subject", e.target.value)}
            error={errors.subject}
          />
        </div>

        <div className="mt-6">
          <FileUpload
            fileName={form.fileName}
            onFileSelect={(file) =>
              setFormField("fileName", file?.name ?? undefined)
            }
          />
        </div>

        <div className="mt-6 max-w-md">
          <DueDateInput
            value={form.dueDate}
            onChange={(dueDate) => setFormField("dueDate", dueDate)}
            error={errors.dueDate}
          />
        </div>

        <div className="mt-8">
          <QuestionSection
            rows={form.questionTypes}
            onAdd={addQuestionType}
            onRemove={removeQuestionType}
            onUpdate={updateQuestionType}
            error={errors.questionTypes}
          />
        </div>

        <div className="mt-8">
          <label className="mb-2 block text-sm font-medium text-ink">
            Additional Information (For better output)
          </label>
          <div className="relative">
            <textarea
              value={form.instructions}
              onChange={(e) => setFormField("instructions", e.target.value)}
              placeholder="e.g. Generate a question paper for 3 hour exam duration..."
              rows={4}
              className="w-full resize-none rounded-2xl border border-[#E5E7EB] bg-[#F7F7F8] px-4 py-3 pr-12 text-sm text-ink outline-none placeholder:text-ink-subtle focus:border-[#D1D5DB] focus:ring-1 focus:ring-ink/5"
            />
            <button
              type="button"
              className="absolute bottom-3 right-3 text-ink-subtle"
              aria-label="Voice input"
            >
              <Mic className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Link href="/assignments">
            <Button variant="outline" size="lg" className="w-full border-[#E0E0E0] sm:w-auto">
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
          </Link>
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full sm:w-auto"
          >
            {submitting ? "Creating..." : "Next"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
}
