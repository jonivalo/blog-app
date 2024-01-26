import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostForm from '../components/PostForm';

const Dashboard = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5000/posts', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
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

    const handleNewPost = async (newPostData) => {
        try {
            const response = await fetch('http://localhost:5000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(newPostData)
            });

            if (!response.ok) {
                throw new Error('Postauksen luonti epäonnistui');
            }

            const post = await response.json();
            setPosts([post, ...posts]);
        } catch (error) {
            console.error('Virhe luotaessa postausta:', error);
        }
    };

    return (
        <div className="container mx-auto my-8 p-6">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

            <PostForm onSubmit={handleNewPost} />

            {posts.map((post) => (
                <div key={post._id} className="border p-4 rounded shadow mb-4">
                    <Link to={`/posts/${post._id}`} className="text-xl font-bold">
                        {post.title}
                    </Link>
                    <p className="text-gray-600">{new Date(post.date).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;