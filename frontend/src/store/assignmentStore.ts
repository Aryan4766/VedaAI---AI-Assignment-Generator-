import { create } from "zustand";
import { api } from "@/services/api";
import type {
  Assignment,
  CreateAssignmentPayload,
  QuestionTypeConfig,
} from "@/types/assignment";
import { QUESTION_TYPES } from "@/lib/constants";

/** Stable IDs — random UUIDs during SSR caused hydration crash (blank screen) */
const DEFAULT_QUESTION_TYPES: QuestionTypeConfig[] = [
  { id: "qt-mcq", type: QUESTION_TYPES[0], count: 4, marks: 1 },
  { id: "qt-short", type: QUESTION_TYPES[1], count: 3, marks: 2 },
  { id: "qt-diagram", type: QUESTION_TYPES[2], count: 5, marks: 5 },
  { id: "qt-numerical", type: QUESTION_TYPES[3], count: 5, marks: 5 },
];

function cloneDefaultQuestionTypes(): QuestionTypeConfig[] {
  return DEFAULT_QUESTION_TYPES.map((row) => ({ ...row }));
}

function createRowId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `row-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

interface AssignmentStore {
  assignments: Assignment[];
  loading: boolean;
  error: string | null;

  form: {
    title: string;
    subject: string;
    dueDate: string;
    instructions: string;
    questionTypes: QuestionTypeConfig[];
    fileName?: string;
  };

  fetchAssignments: () => Promise<void>;
  createAssignment: (payload: CreateAssignmentPayload) => Promise<Assignment>;
  deleteAssignment: (id: string) => Promise<void>;
  setFormField: <K extends keyof AssignmentStore["form"]>(
    key: K,
    value: AssignmentStore["form"][K],
  ) => void;
  resetForm: () => void;
  addQuestionType: () => void;
  removeQuestionType: (id: string) => void;
  updateQuestionType: (
    id: string,
    patch: Partial<Omit<QuestionTypeConfig, "id">>,
  ) => void;
  getAssignmentById: (id: string) => Assignment | undefined;
}

const initialForm = () => ({
  title: "",
  subject: "",
  dueDate: "",
  instructions: "",
  questionTypes: cloneDefaultQuestionTypes(),
  fileName: undefined as string | undefined,
});

export const useAssignmentStore = create<AssignmentStore>((set, get) => ({
  assignments: [],
  loading: false,
  error: null,
  form: initialForm(),

  fetchAssignments: async () => {
    set({ loading: true, error: null });
    try {
      const assignments = await api.getAssignments();
      set({ assignments, loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err instanceof Error ? err.message : "Failed to load",
      });
    }
  },

  createAssignment: async (payload) => {
    const created = await api.createAssignment(payload);
    set((state) => ({
      assignments: [created, ...state.assignments],
    }));
    return created;
  },

  deleteAssignment: async (id) => {
    await api.deleteAssignment(id);
    set((state) => ({
      assignments: state.assignments.filter((a) => a._id !== id),
    }));
  },

  setFormField: (key, value) =>
    set((state) => ({ form: { ...state.form, [key]: value } })),

  resetForm: () => set({ form: initialForm() }),

  addQuestionType: () =>
    set((state) => ({
      form: {
        ...state.form,
        questionTypes: [
          ...state.form.questionTypes,
          {
            id: createRowId(),
            type: QUESTION_TYPES[0],
            count: 1,
            marks: 1,
          },
        ],
      },
    })),

  removeQuestionType: (id) =>
    set((state) => ({
      form: {
        ...state.form,
        questionTypes: state.form.questionTypes.filter((q) => q.id !== id),
      },
    })),

  getAssignmentById: (id) => {
    return get().assignments.find((a) => a._id === id);
  },

  updateQuestionType: (id, patch) =>
    set((state) => ({
      form: {
        ...state.form,
        questionTypes: state.form.questionTypes.map((q) =>
          q.id === id ? { ...q, ...patch } : q,
        ),
      },
    })),
}));
