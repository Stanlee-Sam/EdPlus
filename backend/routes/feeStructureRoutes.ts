import express from "express";
import {
  createFeeStructure,
  getFeeStructures,
  getFeeStructure,
  getLevelFeeStructure,
  getTermFeeStructure,
  updateFeeStructure,
  deleteFeeStructure,
} from "../controllers/feeStructureController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { authorizeRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getFeeStructures);
router.get("/level/:id", authenticateToken, getLevelFeeStructure);
router.get("/term/:id", authenticateToken, getTermFeeStructure);
router.get("/:id", authenticateToken, getFeeStructure);
router.post("/", authenticateToken, authorizeRole(['SCHOOL_ADMIN']), createFeeStructure);
router.put("/:id", authenticateToken, authorizeRole(['SCHOOL_ADMIN']), updateFeeStructure);
router.delete("/:id", authenticateToken, authorizeRole(['SCHOOL_ADMIN']), deleteFeeStructure);

export default router;