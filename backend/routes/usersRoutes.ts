import express from "express";
import { getUsers, registerUsers, loginUser} from '../controllers/usersControllers.js'
const router = express.Router();

router.get('/', getUsers);
router.post('/register', registerUsers);
router.post('/login', loginUser);
    
export default router