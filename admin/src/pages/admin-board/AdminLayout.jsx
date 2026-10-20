import { Outlet } from "react-router-dom"
import Sidebar from "../../components/Sidebar"
import Navbar from "../../components/Navbar"

const AdminLayout = () => {
    return (
        <div className='min-h-screen flex bg-gray-50'>
            <Sidebar />
            <div className="flex-1 min-w-0 flex flex-col">
                <Navbar />
                <main className="p-2 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout
