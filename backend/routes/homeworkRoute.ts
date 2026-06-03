import express from 'express'
import {getHomework, createHomework, editHomework, deleteHomework, ParentEditHomework, getAssignmentsToGradeCount} from '../controllers/homeworkController.js'
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';

const router = express.Router()

router.get('/', authenticateToken, getHomework)
router.post('/', authenticateToken, authorizeRole(['TEACHER', 'SCHOOL_ADMIN']), createHomework)
router.put('/status', authenticateToken, authorizeRole(['PARENT']), ParentEditHomework)
router.get('/assignments-to-grade-count', authenticateToken, authorizeRole(['TEACHER']), getAssignmentsToGradeCount)
router.put('/:id', authenticateToken, authorizeRole(['TEACHER', 'SCHOOL_ADMIN']), editHomework)
router.delete('/:id', authenticateToken, authorizeRole(['TEACHER', 'SCHOOL_ADMIN']), deleteHomework)



export default router
