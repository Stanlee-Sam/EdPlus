import express from "express";
import {
  getSubjects,
  getSpecificSubject,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../controllers/subjectController.js";

const router = express.Router();

router.get("/", getSubjects);
router.get("/:id", getSpecificSubject);
router.post("/", createSubject);
router.put("/:id", updateSubject);
router.delete("/:id", deleteSubject);

export default router;
