import express from 'express'
import {getHomework, createHomework, editHomework, deleteHomework, ParentEditHomework} from '../controllers/homeworkController.js'

const router = express.Router()

router.get('/', getHomework)
router.post('/', createHomework)
router.put('/:id', editHomework)
router.put('/status', ParentEditHomework)
router.delete('/:id', deleteHomework)


export default router