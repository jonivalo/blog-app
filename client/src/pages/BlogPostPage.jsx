import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const BlogPostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:5000/posts/${postId}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                if (!response.ok) {
                    throw new Error('Blogia ei löytynyt');
                }
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error('Virhe haettaessa blogia:', error);
                navigate('/dashboard');
            }
        };

        fetchPost();
    }, [postId, navigate]);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (!response.ok) {
                throw new Error('Virhe poistettaessa blogia');
            }
            navigate('/dashboard');
        } catch (error) {
            console.error('Blogia poistettaessa tapahtui virhe:', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (!post) return <div>Ladataan...</div>;

    return (
        <div className="container mx-auto my-8">
            <div className="bg-white shadow rounded p-6 max-w-2xl mx-auto relative">
                <Link to="/dashboard" className="text-blue-500 hover:text-blue-700 mb-4 inline-block">Takaisin</Link>
                <h1 className="text-3xl font-bold mb-4 text-center">{post.title}</h1>

                {post.imageUrl && (
                    <img src={post.imageUrl} alt={post.title} className="mb-4 max-w-full h-auto" />
                )}

                <p className="mb-4">{post.content}</p>
                <p className="text-gray-500 text-sm mb-4">
                    Posted in {post.tags.map((tag, index) => (
                        <Link key={index} to={`/tags/${tag}`} className="text-blue-500 hover:text-blue-700">
                            {tag}{index < post.tags.length - 1 ? ', ' : ''}
                        </Link>
                    ))} on {formatDate(post.date)}
                </p>
                <div className="flex justify-around">
                    <Link to={`/edit/${postId}`} className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Muokkaa</Link>
                    <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white p-2 rounded">
                        Poista Blogi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogPostPage;