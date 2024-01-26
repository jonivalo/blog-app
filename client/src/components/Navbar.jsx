import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="font-semibold">Home</Link>
                <div>
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Logout</button>
                    ) : (
                        <>
                            <Link to="/login" className="mr-4">Login</Link>
                            <Link to="/register">Sign In</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;