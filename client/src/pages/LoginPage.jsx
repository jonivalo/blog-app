import React, { useContext, useEffect } from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { user, login } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const handleLogin = async (credentials) => {
        try {
            const response = await fetch('http://localhost:5000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error('Kirjautuminen epäonnistui');
            }

            const data = await response.json();
            login(data.token);

        } catch (error) {
            console.error('Kirjautumisvirhe:', error);
        }
    };

    return (
        <div className="container mx-auto my-10">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <AuthForm onSubmit={handleLogin} isRegisterForm={false} />
        </div>
    );
};

export default LoginPage;
