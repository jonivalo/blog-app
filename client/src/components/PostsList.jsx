import React from 'react';
import { Link } from 'react-router-dom';

const PostsList = ({ posts }) => {
    if (!posts.length) return <div>No blogs yet</div>;

    const sortedPosts = posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div>
            {sortedPosts.map(post => (
                <div key={post._id} className="border p-4 rounded shadow mb-4">
                    <Link to={`/posts/${post._id}`} className="text-lg font-bold">
                        {post.title}
                    </Link>
                    <p className="text-gray-600 text-sm">{new Date(post.date).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default PostsList;