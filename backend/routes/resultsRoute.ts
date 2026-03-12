import  express  from 'express';
import { getResults, getResult,getResultPerClass, getResultPerStudent, getResultPerTerm, createResult, updateResult, deleteResult} from '../controllers/resultsController.js'

const router = express.Router();

router.get('/', getResults)
router.get('/:id', getResult)
router.get('/class/:id', getResultPerClass)
router.get('/student/:id', getResultPerStudent)
router.get('/term/:id', getResultPerTerm)
router.post('/', createResult)
router.put('/:id', updateResult)
router.delete('/:id', deleteResult)

export default router;