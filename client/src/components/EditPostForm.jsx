import React, { useState } from 'react';

const EditPostForm = ({ post, onSave }) => {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(title, content);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Otsikko:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="content">Sisältö:</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <button type="submit">Tallenna Muutokset</button>
        </form>
    );
};

export default EditPostForm;
