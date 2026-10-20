import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLogOutOutline } from "react-icons/io5";
import { AuthContext } from '../../context/AuthContext';

const Settings = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="w-full mx-auto p-6">
            <h1 className="text-2xl font-bold text-text mb-6">Settings</h1>

            <div className="bg-white border border-text/10 rounded-2xl p-6 shadow-sm max-w-md">
                <h3 className="font-semibold text-lg text-text mb-2">Account Actions</h3>
                <p className="text-sm text-text/50 mb-6">Sign out securely from your administrative management dashboard session.</p>

                <button
                    onClick={handleLogout}
                    className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-md shadow-red-100 active:scale-[0.98]"
                >
                    <IoLogOutOutline className="text-xl" />
                    Logout Account
                </button>
            </div>
        </div>
    )
}

export default Settings;
