import express from 'express';
import {createAttendance, getAttendance, getAttendancePerStudent, updateAttendance, deleteAttendance} from '../controllers/attendanceController.js'

const router = express.Router();

router.get('/', getAttendance)
router.get('/:id', getAttendancePerStudent)
router.post('/', createAttendance)
router.put('/:id', updateAttendance)
router.delete('/:id', deleteAttendance)


export default router;