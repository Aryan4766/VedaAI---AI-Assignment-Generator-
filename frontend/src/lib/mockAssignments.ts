/** @deprecated Use @/lib/assignmentStatus — kept for reference/demo data only */
export {
  toDisplayStatus,
  getAssignmentHref,
  type DisplayStatus,
  type StatusFilter,
} from "./assignmentStatus";

import type { Assignment } from "@/types/assignment";

/** Static demo data — not used when API is connected */
export const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    _id: "mock-1",
    title: "Mathematics Quiz",
    subject: "Mathematics",
    dueDate: "21-06-2025",
    assignedOn: "20-06-2025",
    status: "completed",
    questionTypes: [],
    createdAt: "2025-06-20T10:00:00.000Z",
    updatedAt: "2025-06-20T10:00:00.000Z",
  },
];
