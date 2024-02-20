import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const BlogPostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:5000/posts/${postId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Blog not found');
                }
                const postData = await response.json();
                setPost(postData);
            } catch (error) {
                console.error('Error fetching blog:', error);
                navigate('/dashboard');
            }
        };
        fetchPost();
    }, [postId, navigate, user]);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Error deleting blog');
            }
            navigate('/dashboard');
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (!post) return <div>Loading...</div>;


    const isAuthor = user?._id === post.author._id;

    return (
        <div className="container mx-auto my-8">
            <div className="bg-white shadow rounded p-6 max-w-2xl mx-auto relative">
                <h1 className="text-3xl font-bold mb-4 text-center">{post.title}</h1>
                {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="mb-4 max-w-full h-auto" />}
                <p className="mb-4">{post.content}</p>
                <p className="text-gray-500 text-sm mb-4">
                    Posted in {post.tags.map((tag, index) => <Link key={index} to={`/tags/${tag}`} className="text-blue-500 hover:text-blue-700">{tag}{index < post.tags.length - 1 ? ', ' : ''}</Link>)} on {formatDate(post.date)}
                </p>
                {isAuthor && (
                    <div className="flex justify-around">
                        <Link to={`/edit/${postId}`} className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Edit</Link>
                        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white p-2 rounded">Delete</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPostPage;
