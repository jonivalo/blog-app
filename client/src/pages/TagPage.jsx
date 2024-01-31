import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const TagPage = () => {
    const { tag } = useParams();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPostsByTag = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:5000/tags/${tag}`);
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
                } else {
                    throw new Error('Virhe haettaessa postauksia');
                }
            } catch (error) {
                console.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPostsByTag();
    }, [tag]);

    if (isLoading) return <div>Ladataan...</div>;

    return (
        <div className="container mx-auto my-8">
            <h1 className="text-3xl font-bold mb-4">Postaukset tagilla "{tag}"</h1>
            {posts.length > 0 ? (
                posts.map(post => (
                    <div key={post._id} className="border p-4 rounded shadow mb-4">
                        <Link to={`/posts/${post._id}`} className="text-lg font-bold">
                            {post.title}
                        </Link>
                        <p className="text-gray-600 text-sm">Posted in {post.tags.join(', ')} on {new Date(post.date).toLocaleDateString()}</p>
                    </div>
                ))
            ) : (
                <p>Ei postauksia tällä tagilla.</p>
            )}
        </div>
    );
};

export default TagPage;