import express from "express";
import { getUsers, registerUsers, registerSchoolAdmin, loginUser, updateUserRole, getTeachers, registerTeacher, registerParent} from '../controllers/usersControllers.js'
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRole } from "../middleware/roleMiddleware.js";
const router = express.Router();

router.get('/', authenticateToken, authorizeRole(['SUPER_ADMIN', 'SCHOOL_ADMIN']), getUsers);
router.get('/teachers', authenticateToken, authorizeRole(['SUPER_ADMIN', 'SCHOOL_ADMIN']), getTeachers);
router.post('/register', registerUsers);
router.post('/register-school-admin', registerSchoolAdmin);
router.post('/register-teacher', authenticateToken, authorizeRole(['SCHOOL_ADMIN']), registerTeacher);
router.post('/register-parent', authenticateToken, authorizeRole(['SCHOOL_ADMIN']), registerParent);
router.post('/login', loginUser);
router.patch('/:id/role', authenticateToken, authorizeRole(['SUPER_ADMIN', 'SCHOOL_ADMIN']), updateUserRole); 
    
export default router
