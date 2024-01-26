import React, { useState } from 'react';

const PostForm = ({ onSubmit }) => {
    const [post, setPost] = useState({ title: '', content: '' });

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(post);
        setPost({ title: '', content: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto my-8">
            <input
                type="text"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                placeholder="Post title"
                required
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <textarea
                value={post.content}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
                placeholder="Post content"
                required
                className="w-full p-2 border border-gray-300 rounded mb-4"
                rows="4"
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Create Post
            </button>
        </form>
    );
};

export default PostForm;