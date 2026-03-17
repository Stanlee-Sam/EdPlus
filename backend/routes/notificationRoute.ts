import express from 'express'
import { createNotification, getNotifications, getNotification, getUserNotifications, updateNotification, deleteNotification, markNotificationAsRead} from '../controllers/notificationController.js'

const router = express.Router()

router.get('/', getNotifications)
router.get('/user/:id', getUserNotifications)
router.get('/:id', getNotification)
router.post('/', createNotification)
router.put('/:id', updateNotification)
router.put('/read/:id', markNotificationAsRead)
router.delete('/:id', deleteNotification)


export default router