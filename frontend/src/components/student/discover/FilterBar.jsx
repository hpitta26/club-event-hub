import React, { useState } from "react";

const Filterbar = ({ categories, onFilterSelect }) => {
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
          className={`px-3 text-[16px] rounded-md border-[1.5px] border-black transition text-sm md:text-base hover:shadow-[1.5px_1.5px_0px_#000000] hover:bg-[#FFE4F4] ease-in-out duration-200 ${
            activeFilter === category
              ? "bg-[#FEC8E9] shadow-[2px_2px_0px_#000000] ease-in-out duration-200"
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

export default Filterbar;
