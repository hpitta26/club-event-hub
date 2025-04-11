import React, { useState } from "react";

const FilterBar = ({ categories, onFilterSelect }) => {
    const [activeFilter, setActiveFilter] = useState("All");

    const handleFilterClick = (category) => {
        setActiveFilter(category);
        onFilterSelect(category);
    };

    return (
        <div className="mb-1 flex flex-wrap gap-[10px]">
            {categories.map((category) => (
                <button
                    key={category}
                    className={`px-3 text-[16px] rounded-lg border-[1.5px] border-black transition text-sm md:text-base ${
                        activeFilter === category
                            ? "bg-[#CFCCCC] shadow-[2px_2px_0px_#000000]"
                            : "bg-white"
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
