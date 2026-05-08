import express from "express";
import { getUsers, registerUsers, loginUser, updateUserRole} from '../controllers/usersControllers.js'
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRole } from "../middleware/roleMiddleware.js";
const router = express.Router();

router.get('/', authenticateToken, authorizeRole(['SUPER_ADMIN', 'SCHOOL_ADMIN']), getUsers);
router.post('/register', registerUsers);
router.post('/login', loginUser);
router.patch('/:id/role', authenticateToken, authorizeRole(['SUPER_ADMIN', 'SCHOOL_ADMIN']), updateUserRole); 
   
export default router