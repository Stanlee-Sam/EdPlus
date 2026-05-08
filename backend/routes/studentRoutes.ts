import express from 'express';
import {getStudents, getSpecificStudent, createStudent, updateStudent, deleteStudent} from '../controllers/studentController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';

const router = express.Router()

router.get('/', authenticateToken, getStudents)
router.get('/:id', authenticateToken, getSpecificStudent)
router.post('/', authenticateToken, authorizeRole(['SCHOOL_ADMIN', 'TEACHER']), createStudent)
router.put('/:id', authenticateToken, authorizeRole(['SCHOOL_ADMIN', 'TEACHER']), updateStudent)
router.delete('/:id', authenticateToken, authorizeRole(['SCHOOL_ADMIN']), deleteStudent)

export default router;