import express from 'express'
const router = express.Router()
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

// localhost:3000/api/users/login
router.post('/login', authUser)

// localhost:3000/api/users/profile
router.put('/profile', protect, updateUserProfile)

// localhost:3000/api/users/profile
router.get('/profile', protect, getUserProfile)


// localhost:3000/api/users
router.post('/', registerUser)

export default router
