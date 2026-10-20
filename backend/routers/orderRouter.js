import express from 'express';
import { getAllOrders, placeOrder, updateOrderStatus } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';

const orderRouter = express.Router();

orderRouter.post('/place-order', placeOrder);
orderRouter.get('/all-orders', getAllOrders);
orderRouter.put('/update-status/:id', protect, isAdmin, updateOrderStatus)

export default orderRouter;
