import { useEffect, useState, useContext, createContext } from "react";
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext();

export const AuthProvide = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token");
        if (!token) return null;

        try {
            return jwtDecode(token);
        } catch {
            return null;
        }
    });
    const navigate = useNavigate();

    const logout = (redirectToLogin = true) => {
        localStorage.removeItem("token");
        setUser(null);

        if (redirectToLogin) {
            navigate("/login", { replace: true });
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setUser(null);
            return;
        }

        try {
            const decode = jwtDecode(token);
            if (decode.exp * 1000 < Date.now()) {
                alert("Session expire, Please Login");
                logout();
                return;
            }
            setUser(decode);
        } catch {
            logout(false);
        }
    }, []);

    const login = (token) => {
        try {
            localStorage.setItem("token", token);
            const decoded = jwtDecode(token);
            setUser(decoded);
            navigate("/dashboard", { replace: true });
        } catch (error) {
            console.log("Error in login context=>", error);
            logout();
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}
