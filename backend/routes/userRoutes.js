import express from 'express'
const router = express.Router()
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers
} from '../controllers/userController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

// localhost:3000/api/users/login
router.post('/login', authUser)

// localhost:3000/api/users/profile
router.put('/profile', protect, updateUserProfile)

// localhost:3000/api/users/profile
router.get('/profile', protect, getUserProfile)

// localhost:3000/api/users
router.post('/', registerUser)

// localhost:3000/api/users
router.get('/', protect, isAdmin, getAllUsers)

export default router
