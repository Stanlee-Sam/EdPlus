import express from "express";
import {
  getTCS,
  getSpecificTCS,
  createTCS,
  updateTCS,
  deleteTCS,
} from "../controllers/TeacherClassSubjectController.js";

const router = express.Router();

router.get("/", getTCS);
router.get("/:id", getSpecificTCS);
router.post("/", createTCS);
router.put("/:id", updateTCS);
router.delete("/:id", deleteTCS);

export default router;
