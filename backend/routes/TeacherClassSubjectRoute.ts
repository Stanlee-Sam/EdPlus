import express from "express";
import {
  getTCS,
  getSpecificTCS,
  createTCS,
  updateTCS,
  deleteTCS,
  getAllTeacherStudents,
  getAllTeacherClasses
} from "../controllers/TeacherClassSubjectController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { authorizeRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getTCS);
router.post("/", authenticateToken, createTCS);
router.get('/teacher-students-count', authenticateToken, authorizeRole(['TEACHER']), getAllTeacherStudents);
router.get('/teacher-classes-count', authenticateToken, authorizeRole(['TEACHER']), getAllTeacherClasses);
router.get("/:id", authenticateToken, getSpecificTCS);
router.put("/:id", authenticateToken, updateTCS);
router.delete("/:id", authenticateToken, deleteTCS);

export default router;
