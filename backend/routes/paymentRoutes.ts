import express from "express";
import {
  createPayment,
  getPayment,
  getPayments,
  getSchoolPayment,
  getStudentPayment,
  getTermPayment,
  updatePayment,
  deletePayment,
} from "../controllers/paymentController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { authorizeRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, authorizeRole(['SCHOOL_ADMIN']), createPayment);
router.get("/", authenticateToken, getPayments);
router.get("/school/:id", authenticateToken, getSchoolPayment);
router.get("/student/:id", authenticateToken, getStudentPayment);
router.get("/term/:id", authenticateToken, getTermPayment);
router.get("/:id", authenticateToken, getPayment);
router.put("/:id", authenticateToken, authorizeRole(['SCHOOL_ADMIN']), updatePayment);
router.delete("/:id", authenticateToken, authorizeRole(['SCHOOL_ADMIN']), deletePayment);

export default router;
