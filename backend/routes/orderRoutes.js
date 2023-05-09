import express from 'express'
const router = express.Router()
import {
  addOrderItems
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

// localhost:3000/api/orders
router.post('/', protect, addOrderItems)

export default router
