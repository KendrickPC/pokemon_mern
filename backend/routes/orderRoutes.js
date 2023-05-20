import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

// localhost:3000/api/orders
// router.post('/', protect, addOrderItems)
router.route('/').post(protect, addOrderItems)

// localhost:3000/api/orders/:id
// router.get('/:id', protect, getOrderById)
router.route('/:id').get(protect, getOrderById)

// localhost:3000/api/orders/:id/pay
// router.put('/:id/pay', protect, updateOrderToPaid)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router
