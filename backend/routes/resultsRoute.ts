import  express  from 'express';
import { getResults, getResult,getResultPerClass, getResultPerStudent, getResultPerTerm, createResult, updateResult, deleteResult} from '../controllers/resultsController.js'
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, getResults)
router.get('/:id', authenticateToken, getResult)
router.get('/class/:id', authenticateToken, getResultPerClass)
router.get('/student/:id', authenticateToken, getResultPerStudent)
router.get('/term/:id', authenticateToken, getResultPerTerm)
router.post('/', authenticateToken, authorizeRole(['TEACHER', 'SCHOOL_ADMIN']), createResult)
router.put('/:id', authenticateToken, authorizeRole(['TEACHER', 'SCHOOL_ADMIN']), updateResult)
router.delete('/:id', authenticateToken, authorizeRole(['TEACHER', 'SCHOOL_ADMIN']), deleteResult)

export default router;