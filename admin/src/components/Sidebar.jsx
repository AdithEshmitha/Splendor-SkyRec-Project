import { useState } from "react"
import { RiMenu2Fill } from "react-icons/ri"
import { SiGoogleanalytics } from "react-icons/si"
import { FaUsers } from "react-icons/fa6"
import { FaBoxOpen } from "react-icons/fa"
import { FaCartArrowDown } from "react-icons/fa"
import { FaGear } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom"

const Sidebar = () => {

    const [sideMenuOpen, setSideMenuOpen] = useState(false)

    const location = useLocation()

    const sideBarLinks = [
        { name: "Dashboard", path: '/', icon: <SiGoogleanalytics /> },
        { name: "Users", path: '/users', icon: <FaUsers /> },
        { name: "Products", path: '/products', icon: <FaBoxOpen /> },
        { name: "Orders", path: '/orders', icon: <FaCartArrowDown /> },
        { name: "Settings", path: '/settings', icon: <FaGear /> }
    ]

    return (
        <div className={`${sideMenuOpen ? 'w-70' : 'w-15'} bg-[#02032b] flex flex-col pt-8 transition-all duration-300 shrink-0 overflow-hidden`}>
            <div className="flex items-center gap-5 border-b border-b-white pb-5 pl-4">
                <RiMenu2Fill className="text-2xl text-white cursor-pointer shrink-0" onClick={() => { setSideMenuOpen(!sideMenuOpen) }} />
                {sideMenuOpen && <h1 className="text-white text-xl font-semibold line-clamp-1">Splendor. | Admin Pannel</h1>}
            </div>
            <div className="mt-10 flex flex-col transition-all duration-300">
                {
                    sideBarLinks.map((link, index) => {

                        const curPath = location.pathname === link.path

                        return (
                            <Link
                                onClick={() => { setSideMenuOpen(false) }}
                                to={link.path}
                                key={index}
                                className={`flex items-center gap-5 pl-4 py-7 transition-all duration-300 hover:bg-white/15 ${curPath && 'bg-white/15'}`}>
                                <span className="text-2xl text-white cursor-pointer">{link.icon}</span>
                                {sideMenuOpen && <span className="text-white text-[17px] tracking-wide">{link.name}</span>}
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Sidebar
