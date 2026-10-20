import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import User from '../models/userModel.js';

export const createUser = async (req, res) => {

    try {
        const { fullName, email, password, address, city, contact } = req.body

        if (!fullName || !email || !password || !address || !city || !contact) {
            return res.status(404).json({ success: false, message: 'All required fields must be completed.' })
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'An account with this email address already exists.' })
        }
        const saltRound = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRound);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            address,
            city,
            contact
        })
        await newUser.save()
        res.status(201).json({
            success: true,
            message: 'Registration successfully!'
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

export async function loginUser(req, res) {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All required fields must be completed.' })
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid Credintionals!' })
        }
        const isMatchPassword = bcrypt.compareSync(password, user.password)
        if (!isMatchPassword) {
            return res.status(400).json({ success: false, message: 'Invalid Credintionals!' })
        }
        const token = jsonwebtoken.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '7d' })
        const userResponse = user.toObject();
        delete userResponse.password;
        res.status(200).json({
            success: true,
            message: 'Logged in successfully!',
            token: token,
            user: userResponse
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

export async function getMyProfile(req, res) {

    try {
        if (!req.user) {
            return res.status(404).json({ success: false, message: 'User not found!' })
        }
        res.status(201).json({ success: true, user: req.user })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

export async function getAllUsers(req, res) {

    try {
        const users = await User.find()
        if (!users) {
            return res.status(404).json({ success: false, message: 'Users not found!' })
        }
        res.status(200).json({ success: true, message: 'Users fetched successfully!', users })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}
