import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserDetails(token);
        }
    }, []);

    const fetchUserDetails = async (token) => {
        try {
            const response = await fetch('http://localhost:5000/users/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const userData = await response.json();
                setUser({ ...userData, _id: userData._id });
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const login = async (token) => {
        localStorage.setItem('token', token);
        await fetchUserDetails(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
