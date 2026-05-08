import express from 'express';
import { createTermSummary, getTermSummaries, getSpecificTermSummary, getTermSummaryByStudentId, getTermSummaryByTermId, updateTermSummary, deleteTermSummary} from '../controllers/termSummaryController.js'
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, getTermSummaries)
router.get('/student/:id', authenticateToken, getTermSummaryByStudentId)
router.get('/term/:id', authenticateToken, getTermSummaryByTermId)
router.get('/:id', authenticateToken, getSpecificTermSummary)
router.post('/', authenticateToken, createTermSummary)
router.put('/:id', authenticateToken, updateTermSummary)
router.delete('/:id', authenticateToken, deleteTermSummary)


export default router;