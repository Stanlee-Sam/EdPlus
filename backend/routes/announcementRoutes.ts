import express from "express";
import { getAnnouncement, getAnnouncements, getClassAnnouncement, getSchoolAnnouncement, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../controllers/announcementsController.js'
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router()

router.get('/', authenticateToken, getAnnouncements)
router.get('/class/:id', authenticateToken, getClassAnnouncement)
router.get('/school/:id', authenticateToken, getSchoolAnnouncement)
router.get('/:id', authenticateToken, getAnnouncement)
router.post('/', authenticateToken, createAnnouncement)
router.put('/:id', authenticateToken, updateAnnouncement)
router.delete('/:id', authenticateToken, deleteAnnouncement)

export default router;