import express from "express";
import {
  createFeeItem,
  getFeeItems,
  getFeeItem,
  getFeeStructureFeeItem,
  updateFeeItem,
  deleteFeeItem,
} from "../controllers/feeItemController.js";

const router = express.Router();

router.get("/", getFeeItems);
router.get("/feeStructure/:id", getFeeStructureFeeItem);
router.get("/:id", getFeeItem);
router.post("/", createFeeItem);
router.put("/:id", updateFeeItem);
router.delete("/:id", deleteFeeItem);

export default router;
