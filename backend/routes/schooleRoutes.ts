import express from "express"
import {createSchool, deleteSchool, getSchools, updateSchool} from '../controllers/schoolController.js'
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRole } from "../middleware/roleMiddleware.js";
const router = express.Router()

router.post('/', authenticateToken, authorizeRole(['SUPER_ADMIN']), createSchool )
router.get('/', authenticateToken, getSchools)
router.put('/:id', authenticateToken, authorizeRole(['SUPER_ADMIN', 'SCHOOL_ADMIN']), updateSchool)
router.delete('/:id', authenticateToken, authorizeRole(['SUPER_ADMIN']), deleteSchool)


export default router;