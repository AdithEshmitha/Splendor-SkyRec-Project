import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    address: { type: String, required: true, default: '' },
    city: { type: String, required: true },
    profileImg: { type: String, default: '' },
    contact: { type: String, required: true, trim: true },
    isEmailVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },

            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1,
            },
        },
    ],
    verificationToken: {
        type: String,
        default: null,
        select: false,
    },

    verificationTokenExpire: {
        type: Date,
        default: null,
        select: false,
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);

export default User;