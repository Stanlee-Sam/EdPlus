import express from "express"
import {createSchool, deleteSchool, getSchools, updateSchool} from '../controllers/schoolController.js'
const router = express.Router()

router.post('/', createSchool )
router.get('/', getSchools)
router.put('/:id', updateSchool)
router.delete('/:id', deleteSchool)


export default router;