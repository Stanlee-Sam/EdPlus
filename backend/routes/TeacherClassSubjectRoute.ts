import express from "express";
import {
  getTCS,
  getSpecificTCS,
  createTCS,
  updateTCS,
  deleteTCS,
  getAllTeacherStudents
} from "../controllers/TeacherClassSubjectController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { authorizeRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getTCS);
router.get("/:id", authenticateToken, getSpecificTCS);
router.post("/", authenticateToken, createTCS);
router.put("/:id", authenticateToken, updateTCS);
router.delete("/:id", authenticateToken, deleteTCS);
router.get('/teacher/:id', authenticateToken, authorizeRole(['TEACHER']), getAllTeacherStudents)

export default router;
