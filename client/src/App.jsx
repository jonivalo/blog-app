import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BlogPostPage from './pages/BlogPostPage';
import EditPostPage from './pages/EditPostPage';
import ProtectedRoute from './components/ProtectedRoute';
import TagPage from './pages/TagPage';
import { UserContext } from './context/UserContext';

const App = () => {
    const { user, logout } = useContext(UserContext);

    return (
        <>
            <Navbar onLogout={logout} isLoggedIn={!!user} />
            <Routes>
            <Route path="/" element={<Home />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/tags/:tag" element={<TagPage />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/posts/:postId" element={<ProtectedRoute><BlogPostPage /></ProtectedRoute>} />
                <Route path="/edit/:postId" element={<ProtectedRoute><EditPostPage /></ProtectedRoute>} />
            </Routes>
        </>
    );
};

export default App;