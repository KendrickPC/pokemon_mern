import express from 'express'
const router = express.Router()
import {
  getProducts, 
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct
} from '../controllers/productController.js'
import {protect, isAdmin} from '../middleware/authMiddleware.js'


router.get('/', getProducts)
router.get('/:id', getProductById)
router.delete('/:id', protect, isAdmin, deleteProduct)
router.put('/:id', protect, isAdmin, updateProduct)
router.post('/', protect, isAdmin, createProduct)

export default router
