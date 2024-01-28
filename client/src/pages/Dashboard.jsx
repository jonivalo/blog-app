import React, { useEffect, useState } from 'react';
import PostForm from '../components/PostForm';
import PostsList from '../components/PostsList';
import TagsSidebar from '../components/TagsSidebar';

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetchPosts();
        fetchTags();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:5000/posts', {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            });
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            }
        } catch (error) {
            console.error('Virhe haettaessa postauksia:', error);
        }
    };

    const fetchTags = async () => {
        try {
            const response = await fetch('http://localhost:5000/tags', {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            });
            if (response.ok) {
                const data = await response.json();
                setTags(data);
            }
        } catch (error) {
            console.error('Virhe haettaessa tageja:', error);
        }
    };

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

            const newPost = await response.json();
            setPosts([newPost, ...posts]);

            fetchTags();
        } catch (error) {
            console.error('Virhe luotaessa postausta:', error);
        }
    };

    return (
        <div className="container mx-auto my-8 p-6 flex items-start">
            <div className="w-1/4 pr-4">
                <PostsList posts={posts} />
            </div>
            <div className="w-2/3">
                <PostForm onSubmit={handleNewPost} />
            </div>
            <div className="w-1/4 pl-4">
                <TagsSidebar tags={tags} />
            </div>
        </div>
    );
};

export default Dashboard;