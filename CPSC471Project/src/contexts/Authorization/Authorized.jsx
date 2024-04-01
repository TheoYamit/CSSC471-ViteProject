import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userDetails, setUserDetails] = useState({Username: "", Password: "", First_name: "", Last_name: "", Email: "", Address: ""})

    const login = () => setIsAuthenticated(true);
    const logout = () => {
        setIsAuthenticated(false);
        setIsAdmin(false);
    }
    const listOfAdmins = ["Triton", "Logan24"];
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

        if (listOfAdmins.includes(Username)) {
            setIsAdmin(true);
        }
        else {
            setIsAdmin(false);
        }

    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, userDetails, login, logout, setDetails}}>
            {children}
        </AuthContext.Provider>
    );
};
