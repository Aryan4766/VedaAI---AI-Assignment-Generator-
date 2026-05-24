import { Router } from "express";
import {
  listAssignments,
  getAssignment,
  createAssignment,
  deleteAssignment,
  generateAssignment,
  getPaper,
} from "../controllers/assignmentController";

const router = Router();

router.get("/", listAssignments);
router.post("/", createAssignment);
router.get("/:id", getAssignment);
router.delete("/:id", deleteAssignment);
router.post("/:id/generate", generateAssignment);
router.get("/:id/paper", getPaper);

export default router;
