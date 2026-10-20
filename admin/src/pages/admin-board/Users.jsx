import { toast } from "react-toastify"
import axios from 'axios'
import { useEffect, useState } from "react"
import { FaRegEdit } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"

const Users = () => {

    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    const getAllUsers = async () => {

        try {
            setLoading(true)
            const token = localStorage.getItem('user_token')
            const response = await axios.get(`${BACKEND_URL}/api/users/get-all-users`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setUsers(response.data.users)
        } catch (error) {
            toast.error(error.response?.data?.error || error.message)
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <div className='w-full flex flex-col'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-text text-[15px] font-bold md:text-3xl tracking-wide'>Users</h1>
                    <h1 className='text-text text-[15px] md:text-[17px] tracking-wide line-clamp-1'>Manage registered users</h1>
                </div>
                <span className='text-text text-[13px] md:text-[15px] tracking-wide line-clamp-1'>{users.length} Users</span>
            </div>
            <div className="w-full mt-5 overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-5 py-4 text-xs font-semibold text-text/50 uppercase tracking-wide">User</th>
                            <th className="px-5 py-4 text-xs font-semibold text-text/50 uppercase tracking-wide">Contact</th>
                            <th className="px-5 py-4 text-xs font-semibold text-text/50 uppercase tracking-wide">City</th>
                            <th className="px-5 py-4 text-xs font-semibold text-text/50 uppercase tracking-wide">Role</th>
                            <th className="px-5 py-4 text-xs font-semibold text-text/50 uppercase tracking-wide">Verification</th>
                            <th className="px-5 py-4 text-xs font-semibold text-text/50 uppercase tracking-wide">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            [1, 2, 3, 4].map((item, index) => {
                                return (
                                    <tr key={index} className="border-b border-gray-100 animate-pulse">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 shrink-0 rounded-full bg-gray-200"></div>
                                                <div className="w-26 h-3 bg-gray-200 rounded-full"></div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-26 h-3 bg-gray-200 rounded-full"></div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-26 h-3 bg-gray-200 rounded-full"></div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-26 h-3 bg-gray-200 rounded-full"></div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-26 h-3 bg-gray-200 rounded-full"></div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-26 h-3 bg-gray-200 rounded-full"></div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-5 py-16 text-center text-[17px] text-text/50 tracking-wide">
                                    Users not found!
                                </td>
                            </tr>
                        ) : (
                            users.map((user, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-100 hover:bg-gray-50/70 transition-all duration-200"
                                    >
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-4">
                                                {user?.profileImg ? (
                                                    <div className="w-11 h-11 shrink-0 rounded-full overflow-hidden">
                                                        <img
                                                            className="w-full h-full object-cover object-center"
                                                            src={user.profileImg}
                                                            alt={user.fullName}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex justify-center items-center w-11 h-11 shrink-0 text-white text-sm font-semibold bg-[#02032b] rounded-full uppercase">
                                                        {user?.fullName?.charAt(0)}
                                                    </div>
                                                )}

                                                <div className="flex flex-col min-w-0">
                                                    <h2 className="text-sm font-semibold text-text/90 tracking-wide truncate">
                                                        {user?.fullName}
                                                    </h2>

                                                    <span className="text-xs text-text/50 tracking-wide truncate">
                                                        {user?.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-3.5 text-sm text-text/80 whitespace-nowrap align-middle">
                                            {user?.contact}
                                        </td>

                                        <td className="px-5 py-3.5 text-sm text-text/80 whitespace-nowrap align-middle">
                                            {user?.city}
                                        </td>

                                        <td className="px-5 py-3.5 align-middle">
                                            <span className="inline-flex px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-medium capitalize">
                                                {user?.role}
                                            </span>
                                        </td>

                                        <td className="px-5 py-3.5 align-middle">
                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${user?.isEmailVerified
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-yellow-100 text-yellow-600"
                                                    }`}
                                            >
                                                {user?.isEmailVerified ? "Verified" : "Unverified"}
                                            </span>
                                        </td>

                                        <td className="px-5 py-3.5 align-middle flex items-center gap-2">
                                            <div className="flex items-center gap-2">
                                                <button className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-200 transition-all duration-200">
                                                    <FaRegEdit className="text-sm" />
                                                </button>

                                                <button className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-all duration-200">
                                                    <RiDeleteBin6Line className="text-sm" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users
