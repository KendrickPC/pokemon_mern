import express from 'express'
const router = express.Router()
import {
  getProducts, 
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview
} from '../controllers/productController.js'
import {protect, isAdmin} from '../middleware/authMiddleware.js'


router.get('/', getProducts)
router.get('/:id', getProductById)
router.delete('/:id', protect, isAdmin, deleteProduct)
router.put('/:id', protect, isAdmin, updateProduct)
router.post('/', protect, isAdmin, createProduct)
// localhost:3000/api/products/:id/reviews
router.post('/:id/reviews', protect, createProductReview)

export default router
