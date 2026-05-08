import express from 'express';
import {createAttendance, getAttendance, getAttendancePerStudent, updateAttendance, deleteAttendance} from '../controllers/attendanceController.js'
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, getAttendance)
router.get('/:id', authenticateToken, getAttendancePerStudent)
router.post('/', authenticateToken, authorizeRole(['TEACHER', 'SCHOOL_ADMIN']), createAttendance)
router.put('/:id', authenticateToken, authorizeRole(['TEACHER', 'SCHOOL_ADMIN']), updateAttendance)
router.delete('/:id', authenticateToken, authorizeRole(['TEACHER', 'SCHOOL_ADMIN']), deleteAttendance)


export default router;