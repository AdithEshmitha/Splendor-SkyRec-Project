import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity cannot be less than 1.']
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['COD', 'Card'],
        default: 'COD',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    shippingDetails: {
        fullName: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true }
    }
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
