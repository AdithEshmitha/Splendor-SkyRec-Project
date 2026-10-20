import mongoose from 'mongoose'
import crypto from 'crypto'

const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true, trim: true, default: () => crypto.randomUUID() },
    name: { type: String, required: true, trim: true, maxlength: 150, },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, },
    category: { type: String, required: true },
    description: { type: String, required: true, trim: true },
    images: [{ type: String, required: true }],
    price: { type: Number, required: true, min: 0 },
    discountPercentage: { type: Number, default: 0, min: 0, max: 100 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    isPublished: { type: Boolean, default: true },
    totalSold: { type: Number, default: 0, min: 0 }
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)

export default Product;