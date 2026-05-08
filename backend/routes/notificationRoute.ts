import express from 'express'
import { createNotification, getNotifications, getNotification, getUserNotifications, updateNotification, deleteNotification, markNotificationAsRead} from '../controllers/notificationController.js'
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router()

router.get('/', authenticateToken, getNotifications)
router.get('/user/:id', authenticateToken, getUserNotifications)
router.get('/:id', authenticateToken, getNotification)
router.post('/', authenticateToken, createNotification)
router.put('/:id', authenticateToken, updateNotification)
router.put('/read/:id', authenticateToken, markNotificationAsRead)
router.delete('/:id', authenticateToken, deleteNotification)


export default router