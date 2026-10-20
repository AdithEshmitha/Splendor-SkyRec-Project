import { createContext, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState()

    const navigate = useNavigate();

    const [userName, setUserName] = useState(
        localStorage.getItem("user_name") || ""
    );

    const login = (name, token) => {
        localStorage.setItem("user_token", token);
        localStorage.setItem("user_name", name);

        setUserName(name);
    };

    const logout = () => {
        localStorage.removeItem("user_token");
        localStorage.removeItem("user_name");
        navigate('/login')

        setUserName("");
    };

    const getUser = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem('user_token')
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/get-my-profile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setLoading(false)
            setUser(response?.data?.user)
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    }

    return (
        <AuthContext.Provider value={{ userName, login, logout, getUser, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;