import express from 'express'
import { createTerm, getTerms, getSpecificTerm, updateTerm, deleteTerm} from '../controllers/termController.js'
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';

const router = express.Router()

router.get('/', authenticateToken, getTerms)
router.get('/:id', authenticateToken, getSpecificTerm)
router.post('/', authenticateToken, authorizeRole(['SCHOOL_ADMIN']), createTerm)
router.put('/:id', authenticateToken, authorizeRole(['SCHOOL_ADMIN']), updateTerm)
router.delete('/:id', authenticateToken, authorizeRole(['SCHOOL_ADMIN']), deleteTerm)


export default router