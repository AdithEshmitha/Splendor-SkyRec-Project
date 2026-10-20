import { IoMail, IoEye, IoEyeOff } from "react-icons/io5";
import { useContext, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AuthContext } from "../context/AuthContext";

const AdminLogin = () => {

    const { login, user } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setSubmitted(true)
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
                {
                    email,
                    password
                }
            )
            if (user?.role || response.data?.user?.role !== 'admin') {
                navigate('/')
                toast.error(`You're not authorized to access this page.`)
                return
            }
            login(
                response.data.user.fullName,
                response.data.token
            )
            toast.success(response.data.message)
            navigate('/')
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setSubmitted(false)
        }
    }

    return (
        <div className="flex justify-center items-center w-full h-[calc(100vh-80px)]">

            <div className="flex flex-col w-100 shadow-2xl px-5 py-10 rounded-xl">
                <h1 className="text-text text-3xl font-semibold text-center mb-2.5">Admin | Sign In</h1>
                <p className="text-center text-text/50 capitalize text-[17px] mb-4">Welcome! Login to your account.</p>
                <form onSubmit={handleLogin} className="flex flex-col gap-3">
                    <div className="w-full h-11 bg-[#f0f0f0] flex items-center justify-between rounded">
                        <input
                            className="flex-1 h-full rounded outline-none px-5 tracking-wide text-text"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            required />
                        <IoMail className="text-xl text-text/70 mr-5" />
                    </div>
                    <div className="w-full h-11 bg-[#f0f0f0] flex items-center justify-between rounded">
                        <input
                            className="flex-1 h-full rounded outline-none px-5 tracking-wide text-text"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            onChange={(e) => { setPassword(e.target.value) }}
                            value={password}
                            required />
                        {!showPassword ?
                            <IoEye className="text-xl text-text/70 mr-5 cursor-pointer" onClick={() => { setShowPassword(!showPassword) }} />
                            : <IoEyeOff className="text-xl text-text/70 mr-5 cursor-pointer" onClick={() => { setShowPassword(!showPassword) }} />}
                    </div>
                    <div className="flex items-center justify-between text-text">
                        <label className="text-[16px] flex items-center gap-1">
                            <input
                                className="accent-primary"
                                type="checkbox" />
                            Remember Me
                        </label>
                        <Link
                            className="text-[16px] hover:underline"
                            to='/forgot-password'>Forgot Password?</Link>
                    </div>
                    <button
                        className="w-full bg-primary rounded-full h-11 text-white text-[17px] cursor-pointer transition-all duration-300 active:scale-95"
                        type="submit">{submitted ? 'Sign In...' : 'Sign In'}</button>
                </form>

                <p className="text-center text-[16px] mt-5 text-text">Don't have an account? <Link className="hover:underline" to='/sign-up'>Create Account</Link></p>

            </div>

        </div>
    )
}

export default AdminLogin
