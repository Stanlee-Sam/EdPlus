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

const router = express.Router();

router.post("/", createPayment);
router.get("/", getPayments);
router.get("/school/:id", getSchoolPayment);
router.get("/student/:id", getStudentPayment);
router.get("/term/:id", getTermPayment);
router.get("/:id", getPayment);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

export default router;
