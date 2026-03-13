import express from 'express';
import { createTermSummary, getTermSummaries, getSpecificTermSummary, getTermSummaryByStudentId, getTermSummaryByTermId, updateTermSummary, deleteTermSummary} from '../controllers/termSummaryController.js'

const router = express.Router();

router.get('/', getTermSummaries)
router.get('/student/:id', getTermSummaryByStudentId)
router.get('/term/:id', getTermSummaryByTermId)
router.get('/:id', getSpecificTermSummary)
router.post('/', createTermSummary)
router.put('/:id', updateTermSummary)
router.delete('/:id', deleteTermSummary)


export default router;