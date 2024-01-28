import React from 'react';

const TagsSidebar = ({ tags }) => {
    if (!tags.length) return <div>No tags yet</div>;

    return (
        <div className="border p-4 rounded shadow">
            <h3 className="font-bold text-lg mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TagsSidebar;