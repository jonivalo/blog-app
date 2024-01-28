const TagsList = ({ tags }) => {
    if (!tags || tags.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="bg-gray-200 text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>
    );
  };

  export default TagsList;