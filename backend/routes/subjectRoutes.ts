import express from "express";
import {
  getSubjects,
  getSpecificSubject,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../controllers/subjectController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getSubjects);
router.get("/:id", authenticateToken, getSpecificSubject);
router.post("/", authenticateToken, createSubject);
router.put("/:id", authenticateToken, updateSubject);
router.delete("/:id", authenticateToken, deleteSubject);

export default router;
