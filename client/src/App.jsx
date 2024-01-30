import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import BlogPostPage from './pages/BlogPostPage';
import ProtectedRoute from './components/ProtectedRoute';
import { UserContext } from './context/UserContext';

const App = () => {
    const { user, logout } = useContext(UserContext);

    return (
        <>
            <Navbar onLogout={logout} isLoggedIn={!!user} />
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/posts/:postId" element={<ProtectedRoute><BlogPostPage /></ProtectedRoute>} />
            </Routes>
        </>
    );
};

export default App;