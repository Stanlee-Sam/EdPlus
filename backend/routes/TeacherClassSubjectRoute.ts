import express from "express";
import {
  getTCS,
  getSpecificTCS,
  createTCS,
  updateTCS,
  deleteTCS,
} from "../controllers/TeacherClassSubjectController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getTCS);
router.get("/:id", authenticateToken, getSpecificTCS);
router.post("/", authenticateToken, createTCS);
router.put("/:id", authenticateToken, updateTCS);
router.delete("/:id", authenticateToken, deleteTCS);

export default router;
