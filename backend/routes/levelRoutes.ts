import express from 'express'
import { createLevel, getLevel, getLevels, getSchoolLevel, updateLevel, deleteLevel} from '../controllers/levelController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', authenticateToken, getLevels)
router.get('/school/:id', authenticateToken, getSchoolLevel)
router.get('/:id', authenticateToken, getLevel)
router.post('/', authenticateToken, createLevel)
router.put('/:id', authenticateToken, updateLevel)
router.delete('/:id', authenticateToken, deleteLevel)


export default router