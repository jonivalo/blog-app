import React from 'react';
import { Link } from 'react-router-dom';

const TagsSidebar = ({ tags }) => {
    if (!tags.length) return <div>No tags yet</div>;

    return (
        <div className="border p-4 rounded shadow">
            <h3 className="font-bold text-lg mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <Link key={index} to={`/tags/${tag}`} className="bg-gray-200 text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                        {tag}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TagsSidebar;