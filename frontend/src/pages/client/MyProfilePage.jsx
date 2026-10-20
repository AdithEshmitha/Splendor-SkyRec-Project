import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from 'axios'
import { FaUser } from "react-icons/fa";

const MyProfilePage = () => {

    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);

    const getProfile = async () => {
        try {
            setLoading(true)

            const token = localStorage.getItem('user_token')

            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/get-my-profile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setUser(response.data.user)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            toast.error(
                error.response?.data?.message || error.message
            )
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <div className="w-full min-h-[calc(100vh-100px)] flex justify-center items-center px-4 sm:px-6 md:px-10 lg:px-20 py-6 md:py-8">

            <div className="w-full md:w-[85%] lg:w-[70%] shadow-2xl rounded-2xl flex flex-col">

                {/* HEADER */}
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6 p-4 sm:p-5 md:p-6">

                    <span className="w-13 h-13 sm:w-15 sm:h-15 md:w-17 md:h-17 shrink-0 rounded-full bg-text flex justify-center items-center text-2xl sm:text-3xl md:text-4xl text-white">
                        {user?.fullName?.charAt(0)}
                    </span>

                    <span className="h-16 sm:h-20 md:h-25 w-0.5 bg-text/20 rounded-full shrink-0"></span>

                    <div className="flex flex-col gap-1 min-w-0">

                        <p className="text-text/50 text-xs sm:text-sm tracking-wide line-clamp-2">
                            Your account and personal information
                        </p>

                        <h2 className="text-text text-lg sm:text-xl md:text-2xl font-semibold tracking-wide capitalize truncate">
                            Hello, {user?.fullName}
                        </h2>

                    </div>

                </div>

                <div className="px-4 sm:px-5">
                    <hr className="text-text/20" />
                </div>

                {/* INFORMATION */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 p-4 sm:p-5 md:p-6">

                    {/* FULL NAME */}
                    <div className="flex items-center gap-1 min-w-0">

                        <div className="w-10 h-12 sm:w-12 shrink-0 rounded-xl bg-blue-100 border border-blue-500/15 flex justify-center items-center">
                            <FaUser className="text-blue-500 text-lg sm:text-xl" />
                        </div>

                        <div className="w-full min-w-0 h-12 rounded-xl bg-blue-100 border border-blue-500/15 flex flex-col justify-center px-2 sm:px-3">

                            <span className="text-[11px] sm:text-xs text-blue-500">
                                Full Name
                            </span>

                            <h2 className="text-sm sm:text-[15px] font-semibold text-blue-500 tracking-wide truncate">
                                {user?.fullName}
                            </h2>

                        </div>

                    </div>

                    {/* EMAIL */}
                    <div className="flex items-center gap-1 min-w-0">

                        <div className="w-10 h-12 sm:w-12 shrink-0 rounded-xl bg-purple-100 border border-purple-600/15 flex justify-center items-center">
                            <FaUser className="text-purple-500 text-lg sm:text-xl" />
                        </div>

                        <div className="w-full min-w-0 h-12 rounded-xl bg-purple-100 border border-purple-600/15 flex flex-col justify-center px-2 sm:px-3">

                            <span className="text-[11px] sm:text-xs text-purple-500">
                                Email
                            </span>

                            <h2 className="text-sm sm:text-[15px] font-semibold text-purple-500 tracking-wide truncate">
                                {user?.email}
                            </h2>

                        </div>

                    </div>

                    {/* CONTACT */}
                    <div className="flex items-center gap-1 min-w-0">

                        <div className="w-10 h-12 sm:w-12 shrink-0 rounded-xl bg-green-100 border border-green-600/15 flex justify-center items-center">
                            <FaUser className="text-green-600 text-lg sm:text-xl" />
                        </div>

                        <div className="w-full min-w-0 h-12 rounded-xl bg-green-100 border border-green-600/15 flex flex-col justify-center px-2 sm:px-3">

                            <span className="text-[11px] sm:text-xs text-green-600">
                                Contact
                            </span>

                            <h2 className="text-sm sm:text-[15px] font-semibold text-green-600 tracking-wide truncate">
                                {user?.contact}
                            </h2>

                        </div>

                    </div>

                    {/* CITY */}
                    <div className="flex items-center gap-1 min-w-0">

                        <div className="w-10 h-12 sm:w-12 shrink-0 rounded-xl bg-yellow-100 border border-yellow-600/15 flex justify-center items-center">
                            <FaUser className="text-yellow-500 text-lg sm:text-xl" />
                        </div>

                        <div className="w-full min-w-0 h-12 rounded-xl bg-yellow-100 border border-yellow-600/15 flex flex-col justify-center px-2 sm:px-3">

                            <span className="text-[11px] sm:text-xs text-yellow-500">
                                City
                            </span>

                            <h2 className="text-sm sm:text-[15px] font-semibold text-yellow-500 tracking-wide truncate">
                                {user?.city}
                            </h2>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default MyProfilePage