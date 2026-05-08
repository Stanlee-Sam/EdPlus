import express from 'express'
import {getHomework, createHomework, editHomework, deleteHomework, ParentEditHomework} from '../controllers/homeworkController.js'
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';

const router = express.Router()

router.get('/', authenticateToken, getHomework)
router.post('/', authenticateToken, authorizeRole(['TEACHER', 'SCHOOL_ADMIN']), createHomework)
router.put('/status', authenticateToken, authorizeRole(['PARENT']), ParentEditHomework)
router.put('/:id', authenticateToken, authorizeRole(['TEACHER', 'SCHOOL_ADMIN']), editHomework)
router.delete('/:id', authenticateToken, authorizeRole(['TEACHER', 'SCHOOL_ADMIN']), deleteHomework)


export default router
