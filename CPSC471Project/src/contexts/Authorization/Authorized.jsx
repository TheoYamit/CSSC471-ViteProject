import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userDetails, setUserDetails] = useState({Username: "", Password: "", First_name: "", Last_name: "", Email: "", Address: ""})

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);
    const setDetails = (data) => {
        const [{ Username, Password, First_name, Last_name, Email, Address }] = data;

        setUserDetails({
            Username: Username,
            Password: Password,
            First_name: First_name,
            Last_name: Last_name,
            Email: Email,
            Address: Address
        });

    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userDetails, login, logout, setDetails}}>
            {children}
        </AuthContext.Provider>
    );
};
