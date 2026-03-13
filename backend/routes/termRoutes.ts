import express from 'express'
import { createTerm, getTerms, getSpecificTerm, updateTerm, deleteTerm} from '../controllers/termController.js'

const router = express.Router()

router.get('/', getTerms)
router.get('/:id', getSpecificTerm)
router.post('/', createTerm)
router.put('/:id', updateTerm)
router.delete('/:id', deleteTerm)


export default router