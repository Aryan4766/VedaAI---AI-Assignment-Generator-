import { API_BASE } from "@/lib/constants";
import { normalizeAssignment } from "@/lib/normalizeAssignment";
import type {
  Assignment,
  CreateAssignmentPayload,
  GeneratedPaper,
} from "@/types/assignment";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as { message?: string }).message ?? `Request failed (${res.status})`,
    );
  }

  return res.json() as Promise<T>;
}

export const api = {
  getAssignments: async () => {
    const list = await request<Assignment[]>("/api/assignments");
    return list.map(normalizeAssignment);
  },

  getAssignment: async (id: string) =>
    normalizeAssignment(await request<Assignment>(`/api/assignments/${id}`)),

  createAssignment: async (payload: CreateAssignmentPayload) =>
    normalizeAssignment(
      await request<Assignment>("/api/assignments", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    ),

  deleteAssignment: (id: string) =>
    request<{ success: boolean }>(`/api/assignments/${id}`, {
      method: "DELETE",
    }),

  generateAssignment: (id: string) =>
    request<{ assignmentId: string; status: string }>(
      `/api/assignments/${id}/generate`,
      { method: "POST" },
    ),

  getGeneratedPaper: (id: string) =>
    request<{ paper: GeneratedPaper }>(`/api/assignments/${id}/paper`),
};
