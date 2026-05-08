import express from "express";
import {
  createFeeItem,
  getFeeItems,
  getFeeItem,
  getFeeStructureFeeItem,
  updateFeeItem,
  deleteFeeItem,
} from "../controllers/feeItemController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { authorizeRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getFeeItems);
router.get("/feeStructure/:id", authenticateToken, getFeeStructureFeeItem);
router.get("/:id", authenticateToken, getFeeItem);
router.post("/", authenticateToken, authorizeRole(['SCHOOL_ADMIN']), createFeeItem);
router.put("/:id", authenticateToken, authorizeRole(['SCHOOL_ADMIN']), updateFeeItem);
router.delete("/:id", authenticateToken, authorizeRole(['SCHOOL_ADMIN']), deleteFeeItem);

export default router;
