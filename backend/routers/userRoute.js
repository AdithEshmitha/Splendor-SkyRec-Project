import express from 'express'
import { createUser, getAllUsers, getMyProfile, loginUser } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'
import { isAdmin } from '../middleware/adminMiddleware.js'

const userRouter = express.Router()

userRouter.post('/register', createUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-my-profile', protect, getMyProfile)
userRouter.get('/get-all-users', protect, isAdmin, getAllUsers)

export default userRouter