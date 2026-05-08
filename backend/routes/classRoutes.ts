import express from 'express';
import {getClasses, createClass, updateClass, deleteClass} from '../controllers/classController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, getClasses)
router.post('/', authenticateToken, authorizeRole(['SCHOOL_ADMIN']), createClass)
router.put('/:id', authenticateToken, authorizeRole(['SCHOOL_ADMIN']), updateClass)
router.delete('/:id', authenticateToken, authorizeRole(['SCHOOL_ADMIN']), deleteClass)


export default router;