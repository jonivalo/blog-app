import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import BlogPostPage from './pages/BlogPostPage';

const App = () => {
    const isLoggedIn = localStorage.getItem('token');

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/posts/:postId" element={<ProtectedRoute> <BlogPostPage /></ProtectedRoute>} />

            </Routes>
        </>
    );
};

export default App;