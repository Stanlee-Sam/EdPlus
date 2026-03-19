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

const router = express.Router();

router.get("/", getFeeStructures);
router.get("/level/:id", getLevelFeeStructure);
router.get("/term/:id", getTermFeeStructure);
router.get("/:id", getFeeStructure);
router.post("/", createFeeStructure);
router.put("/:id", updateFeeStructure);
router.delete("/:id", deleteFeeStructure);

export default router;