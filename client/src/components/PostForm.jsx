import React, { useState } from 'react';
import { uploadImageToFirebase } from '../services/FirebaseService';

const PostForm = ({ onSubmit }) => {
  const [post, setPost] = useState({ title: '', content: '', tags: '', imageUrl: null });
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const downloadURL = await uploadImageToFirebase(file);
      setPost({ ...post, imageUrl: downloadURL });
    } catch (error) {
      console.error('Virhe ladattaessa kuvaa:', error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSubmit({
      title: post.title,
      content: post.content,
      tags: post.tags.split(',').map(tag => tag.trim()),
      imageUrl: post.imageUrl
    });
    setPost({ title: '', content: '', tags: '', imageUrl: null });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto my-8 bg-white p-6 shadow-lg rounded-lg">
      <div className="mb-6">
        <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">Post Title</label>
        <input
          id="title"
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          placeholder="Enter your post title here"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="content" className="block text-lg font-medium text-gray-700 mb-2">Content</label>
        <textarea
          id="content"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          placeholder="Write your post content here"
          required
          className="w-full h-40 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="10"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="image" className="block text-lg font-medium text-gray-700 mb-2">Image</label>
        <input
          id="image"
          type="file"
          onChange={handleImageChange}
          disabled={uploadingImage}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="tags" className="block text-lg font-medium text-gray-700 mb-2">Tags</label>
        <input
          id="tags"
          type="text"
          value={post.tags}
          onChange={(e) => setPost({ ...post, tags: e.target.value })}
          placeholder="Tags (comma separated)"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
        Create Post
      </button>
    </form>
  );
};

export default PostForm;
