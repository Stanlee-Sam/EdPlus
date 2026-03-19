import express from 'express'
import { createLevel, getLevel, getLevels, getSchoolLevel, updateLevel, deleteLevel} from '../controllers/levelController.js'

const router = express.Router()

router.get('/', getLevels)
router.get('/school/:id', getSchoolLevel)
router.get('/:id', getLevel)
router.post('/', createLevel)
router.put('/:id', updateLevel)
router.delete('/:id', deleteLevel)


export default router