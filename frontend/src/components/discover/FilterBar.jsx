import React, { useState } from "react";

const FilterBar = ({ categories, onFilterSelect }) => {
    const [activeFilter, setActiveFilter] = useState("All");

    const handleFilterClick = (category) => {
        setActiveFilter(category);
        onFilterSelect(category);
    };

    return (
        <div className="mb-1 flex flex-wrap gap-2">
            {categories.map((category) => (
                <button
                    key={category}
                    className={`px-4 py-2 rounded-lg transition text-sm md:text-base ${
                        activeFilter === category ? "bg-gray-700 text-white" : "bg-gray-500 text-gray-200"
                    }`}
                    onClick={() => handleFilterClick(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default FilterBar;
