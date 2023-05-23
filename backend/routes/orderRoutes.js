import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders
} from '../controllers/orderController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

// localhost:3000/api/orders
router.post('/', protect, addOrderItems)

// localhost:3000/api/orders
router.get('/', protect, isAdmin, getAllOrders)

// localhost:3000/api/orders/myorders
router.get('/myorders', protect, getMyOrders)

// localhost:3000/api/orders/:id
router.get('/:id', protect, getOrderById)

// localhost:3000/api/orders/:id/pay
router.put('/:id/pay', protect, updateOrderToPaid)



export default router
