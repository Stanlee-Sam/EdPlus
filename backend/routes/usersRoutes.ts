import express from "express";
import { getUsers, registerUsers, loginUser, updateUserRole} from '../controllers/usersControllers.js'
const router = express.Router();

router.get('/', getUsers);
router.post('/register', registerUsers);
router.post('/login', loginUser);
router.put('/:id/role', updateUserRole); 
   
export default router