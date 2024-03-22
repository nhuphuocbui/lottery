import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [user, setUser] = useState();
    const setAuthValue = (newAuth) => {
        setAuth(newAuth);
        localStorage.setItem("role", newAuth.roles);
    }
    const setUserValue = (newUser) => {
        setUser(newUser);
    }
    return (
        <AuthContext.Provider value={{ auth, setAuthValue, user, setUserValue }}>
            {children}
        </AuthContext.Provider>
    )
};
