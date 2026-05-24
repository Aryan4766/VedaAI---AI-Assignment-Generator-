import type { AssignmentStatus } from "@/types/assignment";

export type DisplayStatus = "Draft" | "Generated" | "Pending";
export type StatusFilter = "all" | DisplayStatus;

export function toDisplayStatus(status: AssignmentStatus): DisplayStatus {
  switch (status) {
    case "completed":
      return "Generated";
    case "queued":
    case "processing":
      return "Pending";
    default:
      return "Draft";
  }
}

export function getAssignmentHref(assignment: {
  _id: string;
  status: AssignmentStatus;
}): string {
  if (assignment.status === "queued" || assignment.status === "processing") {
    return `/assignments/${assignment._id}/generating`;
  }
  return `/assignments/${assignment._id}`;
}
