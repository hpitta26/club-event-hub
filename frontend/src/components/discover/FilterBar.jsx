import React, { useState } from "react";

const Filterbar = ({ categories, onFilterSelect }) => {
    const [activeFilter, setActiveFilter] = useState("All");
    
    const handleFilterClick = (category) => {
        setActiveFilter(category);
        onFilterSelect(category);
    };
    
    return (
        <div className="mb-1 overflow-x-auto pb-2">
            <div className="flex flex-nowrap gap-[10px] min-w-max">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`px-3 py-1 text-[14px] md:text-[16px] rounded-lg border-[1.5px] border-black transition whitespace-nowrap ${
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
        </div>
    );
};

export default Filterbar;