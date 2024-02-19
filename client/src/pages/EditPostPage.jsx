import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditPostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({ title: '', content: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:5000/posts/${postId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Postausta ei löytynyt');
                }
                const postData = await response.json();
                setPost({ title: postData.title, content: postData.content });
            } catch (error) {
                console.error('Virhe haettaessa postausta:', error);
            }
        };

        fetchPost();
    }, [postId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(post)
            });
            if (!response.ok) {
                throw new Error('Postauksen päivitys epäonnistui');
            }
            navigate(`/posts/${postId}`);
        } catch (error) {
            console.error('Virhe päivitettäessä postausta:', error);
        }
    };

    return (
        <div className="container mx-auto my-8">
            <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <form onSubmit={handleUpdate}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={post.title}
                            onChange={(e) => setPost({ ...post, title: e.target.value })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
                            Content
                        </label>
                        <textarea
                            id="content"
                            value={post.content}
                            onChange={(e) => setPost({ ...post, content: e.target.value })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Save Changes
                        </button>
                        <Link to={`/posts/${postId}`} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Back to Blog
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPostPage;