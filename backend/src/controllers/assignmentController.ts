import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { Assignment } from "../models/Assignment";
import { generationQueue } from "../queues/generationQueue";
import { emitGenerationUpdate } from "../sockets";
import { publishGenerationEvent } from "../utils/generationEvents";

const QuestionTypeInput = z.object({
  type: z.string().min(1),
  count: z.number().int().positive(),
  marks: z.number().positive(),
});

const CreateAssignmentSchema = z.object({
  title: z.string().min(1),
  subject: z.string().min(1),
  dueDate: z.string().min(1),
  instructions: z.string().optional(),
  questionTypes: z.array(QuestionTypeInput).min(1),
  fileName: z.string().optional(),
});

export async function listAssignments(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json(assignments);
  } catch (err) {
    next(err);
  }
}

export async function getAssignment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      res.status(404).json({ message: "Assignment not found" });
      return;
    }
    res.json(assignment);
  } catch (err) {
    next(err);
  }
}

export async function createAssignment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body = CreateAssignmentSchema.parse(req.body);
    const assignment = await Assignment.create({
      ...body,
      status: "draft",
    });
    res.status(201).json(assignment);
  } catch (err) {
    next(err);
  }
}

export async function deleteAssignment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await Assignment.findByIdAndDelete(req.params.id);
    if (!result) {
      res.status(404).json({ message: "Assignment not found" });
      return;
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

export async function generateAssignment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      res.status(404).json({ message: "Assignment not found" });
      return;
    }

    assignment.status = "queued";
    await assignment.save();

    await generationQueue.add(
      "generate",
      { assignmentId: assignment.id },
      {
        removeOnComplete: true,
        removeOnFail: false,
        attempts: 2,
        backoff: { type: "exponential", delay: 2000 },
      },
    );

    emitGenerationUpdate(assignment.id, {
      status: "queued",
      message: "Generation queued",
    });
    void publishGenerationEvent({
      assignmentId: assignment.id,
      status: "queued",
      message: "Generation queued",
    });

    res.json({ assignmentId: assignment.id, status: "queued" });
  } catch (err) {
    next(err);
  }
}

export async function getPaper(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment?.generatedPaper) {
      res.status(404).json({ message: "Paper not ready" });
      return;
    }
    res.json({ paper: assignment.generatedPaper });
  } catch (err) {
    next(err);
  }
}
