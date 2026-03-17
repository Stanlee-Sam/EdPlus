import express from "express";
import { getAnnouncement, getAnnouncements, getClassAnnouncement, getSchoolAnnouncement, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../controllers/announcementsController.js'

const router = express.Router()

router.get('/', getAnnouncements)
router.get('/class/:id', getClassAnnouncement)
router.get('/school/:id', getSchoolAnnouncement)
router.get('/:id', getAnnouncement)
router.post('/', createAnnouncement)
router.put('/:id', updateAnnouncement)
router.delete('/:id', deleteAnnouncement)

export default router;