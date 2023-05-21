import express from 'express'
const router = express.Router()
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser
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

// localhost:3000/api/users/:id
router.delete('/:id', protect, isAdmin, deleteUser)

// localhost:3000/api/users/:id
router.get('/:id', protect, isAdmin, getUserById)

// localhost:3000/api/users/:id
router.put('/:id', protect, isAdmin, updateUser)

export default router
