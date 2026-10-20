import { useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const pathParts = location.pathname.split("/",).filter(Boolean);
    const pageName = pathParts[pathParts.length - 1] || "dashboard";
    return (
        <div className="w-full bg-white px-4 md:px-10 py-4 flex justify-end items-center">
            {/* <h1 className="capitalize text-gray-800 md:text-2xl font-semibold">{pageName}</h1> */}
            <span className="text-gray-800 md:text-xl text-sm">{'Adith Eshmitha'}</span>
        </div>
    );
};

export default Navbar;
