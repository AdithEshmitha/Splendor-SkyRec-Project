import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

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
        localStorage.removeItem("cart");
        navigate('/')

        setUserName("");
    };

    return (
        <AuthContext.Provider value={{ userName, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;