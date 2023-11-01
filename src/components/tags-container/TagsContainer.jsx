import React from "react";

const TagsContainer = ({ value }) => {
    return (
        <div className="flex justify-start overflow-y-auto">
            <p className="rounded-full bg-tags-container font-medium text-xs text-container py-2 px-3">{value}</p>
        </div>
    );
};

export default TagsContainer;
