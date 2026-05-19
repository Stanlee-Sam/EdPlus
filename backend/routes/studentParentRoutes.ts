import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { authorizeRole } from "../middleware/roleMiddleware.js";
import {
  getParentsByStudent,
  linkParentToStudent,
} from "../controllers/studentParentController.js";

const router = express.Router();

router.post("/", authenticateToken, authorizeRole(["SCHOOL_ADMIN"]), linkParentToStudent);
router.get(
  "/student/:studentId/parents",
  authenticateToken,
  authorizeRole(["SCHOOL_ADMIN"]),
  getParentsByStudent,
);

export default router;
