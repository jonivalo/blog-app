import React from 'react';
import AuthForm from '../components/AuthForm';

const RegisterPage = () => {
    const handleRegister = async (credentials) => {
        try {
            const response = await fetch('http://localhost:5000/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error('Rekisteröintivirhe');
            }

            const data = await response.json();
            console.log('Rekisteröityminen onnistui:', data);

        } catch (error) {
            console.error('Rekisteröinnissä tapahtui virhe:', error);
        }
    };

    return (
        <div className="container mx-auto my-10">
            <h2 className="text-2xl font-bold mb-6">Register</h2>
            <AuthForm onSubmit={handleRegister} isRegisterForm={true} />
        </div>
    );
};

export default RegisterPage;