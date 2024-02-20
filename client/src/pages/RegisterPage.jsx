import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';

const RegisterPage = () => {
    const [formKey, setFormKey] = useState(0);

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

            setFormKey(prevKey => prevKey + 1);
            console.log('Rekisteröityminen onnistui');

        } catch (error) {
            console.error('Rekisteröinnissä tapahtui virhe:', error);
        }
    };

    return (
        <div className="container mx-auto my-10">
            <h2 className="text-2xl font-bold mb-6">Register</h2>
            <AuthForm key={formKey} onSubmit={handleRegister} isRegisterForm={true} />
        </div>
    );
};

export default RegisterPage;