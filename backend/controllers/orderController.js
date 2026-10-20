import mongoose from 'mongoose'
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

export const placeOrder = async (req, res) => {
    try {
        const { items, totalAmount, paymentMethod, shippingDetails } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0 || !totalAmount || !shippingDetails) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        for (const item of items) {
            const findProduct = await Product.findById(item.product);
            if (!findProduct) {
                return res.status(404).json({ success: false, message: `Product not found.` });
            }
            if (findProduct.stock < item.quantity) {
                return res.status(400).json({ success: false, message: `Insufficient stock for ${findProduct.name}. Only ${findProduct.stock} left.` });
            }
        }

        const newOrder = new Order({
            items,
            totalAmount,
            paymentMethod: paymentMethod || 'COD',
            shippingDetails
        });
        await newOrder.save();

        for (const item of items) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { stock: -item.quantity, totalSold: item.quantity }
            });
        }

        res.status(201).json({
            success: true,
            message: 'Order placed successfully.',
            order: newOrder
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('items.product').sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders: orders
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid order ID' });
        }

        const validStatuses = Order.schema.path('status').enumValues;
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Invalid status. Allowed: ${validStatuses.join(', ')}`
            });
        }

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        ).populate('items.product');

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.json({ success: true, message: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};