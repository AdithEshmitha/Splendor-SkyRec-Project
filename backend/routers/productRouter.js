import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { isAdmin } from '../middleware/adminMiddleware.js'
import { addProduct, deleteProduct, getAllProducts, getAllProductsBySearch, getOneProduct, getProducts, updateProduct } from '../controllers/productController.js'

const productRouter = express.Router()

productRouter.post('/add-product', protect, isAdmin, addProduct)
productRouter.put('/update-product/:id', protect, isAdmin, updateProduct)
productRouter.delete('/delete-product/:id', protect, isAdmin, deleteProduct)
productRouter.get('/get-product/:slug', getOneProduct)
productRouter.get('/get-products', getProducts)
productRouter.get('/get-products/:query', getAllProductsBySearch)
productRouter.get('/get-all-products', protect, isAdmin, getAllProducts)

export default productRouter