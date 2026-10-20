import { Link, useLocation, useNavigate } from "react-router-dom"
import { CgMenuRightAlt } from "react-icons/cg";
import { useContext, useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {

    const { userName, logout } = useContext(AuthContext);

    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [loggoutMenu, setLoggoutMenu] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === "/";
    const navTextColor = isHomePage && !isScrolled ? "text-white" : "text-text";

    const firstLetter = userName
        ? userName.charAt(0).toUpperCase()
        : "";

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const updateCartCount = () => {
        try {
            const localCart = JSON.parse(localStorage.getItem('cart')) || [];

            const totalQuantity = localCart.reduce(
                (total, item) => total + Number(item.quantity || 0),
                0
            );

            setCartCount(totalQuantity);
        } catch (error) {
            console.error('Failed to update cart count:', error);
            setCartCount(0);
        }
    };

    useEffect(() => {
        updateCartCount();

        window.addEventListener('cartUpdated', updateCartCount);
        window.addEventListener('storage', updateCartCount);

        return () => {
            window.removeEventListener('cartUpdated', updateCartCount);
            window.removeEventListener('storage', updateCartCount);
        };
    }, []);

    const links = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Reviews", path: "/reviews" },
        { name: "About", path: "/about" }
    ]

    return (
        // NAVIGATION BAR
        <div className={`w-full flex items-center justify-between px-4 md:px-10 lg:px-20 py-5 transition-all duration-300 ${isHomePage && !isScrolled ? 'bg-transparent' : 'bg-white'}`}>
            {/* LOGO */}
            <Link to="/" className={`text-3xl font-bold ${navTextColor}`}>Splen<span className="text-primary">dor.</span></Link>
            {/* DESKTOP MENU */}
            <div className="md:flex items-center gap-10 hidden">
                <ul className={`flex gap-10 items-center ${navTextColor}`}>
                    {
                        links.map((link, index) => {

                            const isActive = location.pathname === link.path;

                            return (
                                <Link
                                    to={link.path}
                                    key={index}
                                    className={`text-[17px] tracking-wide cursor-pointer transition-all duration-300 hover:text-primary ${isActive ? 'text-primary' : navTextColor}`}>{link.name}</Link>
                            )
                        })
                    }
                </ul>
                {userName ? <div onClick={() => { setLoggoutMenu(!loggoutMenu) }} className="flex items-center gap-3 cursor-pointer px-3 py-1.5 rounded-full bg-white shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm">
                        {firstLetter}
                    </div>

                    <div className="max-w-35 truncate text-sm font-medium text-gray-800">
                        {userName}
                    </div>

                    {loggoutMenu &&
                        <div className="absolute top-20 right-20 w-72 overflow-hidden rounded-xl bg-white border border-gray-100 shadow-lg z-50">
                            <div className="px-5 py-4">
                                <h3 className="text-sm font-semibold text-gray-800">
                                    Account
                                </h3>
                                <p className="mt-0.5 text-xs text-gray-400">
                                    Manage your account
                                </p>
                            </div>
                            <div className="h-px bg-gray-100" />

                            <div
                                onClick={() => navigate("/my-profile")}
                                className="flex items-center gap-3 px-5 py-3.5 cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100">
                                    <FaUserAlt className="text-sm text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">My Profile</p>
                                    <p className="text-xs text-gray-400">View your profile</p>
                                </div>
                            </div>

                            <div
                                onClick={
                                    () => {
                                        navigate('/cart')
                                    }
                                }
                                className="flex items-center gap-3 px-5 py-3.5 cursor-pointer text-blue-500 hover:bg-blue-50 transition-colors duration-200">
                                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-50">
                                    <FaCartShopping className="text-lg" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Cart ({cartCount})</p>
                                    <p className="text-xs text-blue-300">View your cart</p>
                                </div>
                            </div>

                            <div
                                onClick={logout}
                                className="flex items-center gap-3 px-5 py-3.5 cursor-pointer text-red-500 hover:bg-red-50 transition-colors duration-200">
                                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50">
                                    <IoLogOutOutline className="text-lg" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Logout</p>
                                    <p className="text-xs text-red-300">Sign out of your account</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                    : <button onClick={() => { navigate('/sign-in') }} className="px-8 py-2 rounded-full bg-primary text-white text-[17px] cursor-pointer transition-all duration-300 active:scale-85">Sign In</button>}
            </div>
            {/* MOBILE MENU */}
            {menuOpen &&
                <div className="transition-all duration-500 absolute left-1/2 top-20 w-[calc(100%-2rem)] -translate-x-1/2 bg-white shadow-xl p-5 rounded-xl flex flex-col gap-5">
                    <ul className="flex flex-col">
                        {
                            links.map((link, index) => {

                                const isActive = location.pathname === link.path;

                                return (
                                    <Link
                                        to={link.path}
                                        key={index}
                                        className={`text-text text-[16px] w-full transition-all duration-300 py-4 px-3 hover:bg-gray-50 rounded ${isActive ? 'text-primary bg-gray-50' : 'text-text'}`}
                                        onClick={() => setMenuOpen(false)}>{link.name}</Link>
                                )
                            })
                        }
                    </ul>
                    {userName ? (
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100">

                                <div className="w-10 h-10 shrink-0 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm">
                                    {firstLetter}
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs text-gray-400">
                                        Welcome
                                    </p>

                                    <p className="text-sm font-semibold text-gray-800 truncate">
                                        {userName}
                                    </p>
                                </div>

                            </div>
                            <div
                                onClick={() => { logout(); setMenuOpen(false) }}
                                className="w-full bg-red-100 py-2 cursor-pointer flex items-center gap-2 justify-center rounded-xl border border-[#f0f0f0]">
                                <span className="text-[17px] text-red-500">Logout</span>
                                <IoLogOutOutline className="text-xl text-red-500" />
                            </div>
                            <div
                                onClick={() => { navigate("/my-profile"); setMenuOpen(false); }}
                                className="w-full bg-blue-100 py-2 cursor-pointer flex items-center gap-2 justify-center rounded-xl border border-[#f0f0f0]">
                                <span className="text-[17px] text-blue-600">My Profile</span>
                                <FaUserAlt className="text-[17px] text-blue-600" />
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => {
                                navigate('/sign-in');
                                setMenuOpen(false);
                            }}
                            className="bg-primary text-white text-[16px] py-3 rounded-full transition-all duration-300 active:scale-95"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            }
            {/* MENU ICON */}
            <CgMenuRightAlt className={`text-3xl ${navTextColor} cursor-pointer block md:hidden`} onClick={() => setMenuOpen(!menuOpen)} />
        </div>
    )
}

export default Navbar