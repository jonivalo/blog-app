import React, { useEffect, useState } from 'react';

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5000/posts');
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
                }
            } catch (error) {
                console.error('Virhe haettaessa postauksia:', error);
            }
        };

        fetchPosts();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="container mx-auto my-8">
            <h1 className="text-3xl font-bold text-center mb-6">Welcome</h1>
            {posts.length > 0 ? (
                <div className="flex flex-col items-center space-y-4">
                    {posts.map(post => (
                        <div key={post._id} className="w-full max-w-lg p-4 border rounded shadow">
                            <h2 className="text-xl font-bold">{post.title}</h2>
                            <p className="mt-2 text-gray-600">{post.content.substring(0, 100)}{post.content.length > 100 && '...'}</p>
                            <p className="text-gray-500 text-sm mt-4">
                                Posted in {post.tags.join(', ')} on {formatDate(post.date)}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">Ei blogeja.</p>
            )}
        </div>
    );
};

export default Home;
