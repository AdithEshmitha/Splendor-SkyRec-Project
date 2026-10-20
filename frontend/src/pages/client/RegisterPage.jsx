import { IoMail, IoEye, IoEyeOff } from "react-icons/io5";
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaUserAlt } from "react-icons/fa";

const RegisterPage = () => {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [contact, setContact] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            setSubmitted(true)
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
                {
                    fullName,
                    email,
                    password,
                    address,
                    contact,
                    city
                }
            )
            toast.success(response.data.message)
            navigate('/sign-in')
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setSubmitted(false)
        }
    }

    return (
        <div className="flex justify-center items-center w-full h-[calc(100vh-80px)]">

            <div className="flex flex-col shadow-2xl px-5 py-10 rounded-xl">
                <h1 className="text-text text-3xl font-semibold text-center mb-2.5">Sign Up</h1>
                <p className="text-center text-text/50 capitalize text-[17px] mb-4">Welcome! Create new account.</p>
                <form onSubmit={handleRegister} className="grid sm:grid-cols-2 gap-3">
                    <div className="w-full h-11 bg-[#f0f0f0]/50 flex items-center justify-between rounded">
                        <input
                            className="flex-1 h-full rounded outline-none px-5 tracking-wide text-text"
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => { setFullName(e.target.value) }}
                            required />
                    </div>
                    <div className="w-full h-11 bg-[#f0f0f0]/50 flex items-center justify-between rounded">
                        <input
                            className="flex-1 h-full rounded outline-none px-5 tracking-wide text-text"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            required />
                    </div>
                    <div className="w-full h-11 bg-[#f0f0f0]/50 flex items-center justify-between rounded">
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
                    <div className="w-full h-11 bg-[#f0f0f0]/50 flex items-center justify-between rounded">
                        <input
                            className="flex-1 h-full rounded outline-none px-5 tracking-wide text-text"
                            type="number"
                            placeholder="Contact"
                            value={contact}
                            onChange={(e) => { setContact(e.target.value) }}
                            required />
                    </div>
                    <div className="w-full h-11 bg-[#f0f0f0]/50 flex items-center justify-between rounded">
                        <input
                            className="flex-1 h-full rounded outline-none px-5 tracking-wide text-text"
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => { setAddress(e.target.value) }}
                            required />
                    </div>
                    <div className="w-full h-11 bg-[#f0f0f0]/50 flex items-center justify-between rounded">
                        <input
                            className="flex-1 h-full rounded outline-none px-5 tracking-wide text-text"
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => { setCity(e.target.value) }}
                            required />
                    </div>
                    <button className="w-full sm:col-span-2 bg-primary rounded-full h-11 text-white mt-5 text-[17px] cursor-pointer transition-all duration-300 active:scale-95"
                        type="submit">{submitted ? 'Sign In...' : 'Sign In'}</button>

                </form>
                <p className="text-center text-[16px] mt-5 text-text">Already have an account? <Link className="hover:underline" to='/sign-in'>Sign In</Link></p>

            </div>

        </div>
    )
}

export default RegisterPage
