import React from "react";
import { useNavigate } from "react-router-dom";
import dummyEventCardCover from "../../assets/dummyEventCardCover.jpg";

function SidebarCard({name = "Unknown Club", image = dummyEventCardCover, categories = [],}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const clubSlug = name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/club/${clubSlug}`);
  }

  return (
    <div
      className="flex items-center gap-3 bg-[#F0EFEB] px-3 py-2 rounded-lg shadow-sm border-2 border-black w-[220px] h-[64px] 
                 transition-all duration-300 hover:shadow-md hover:bg-[#F0EFEB] hover:scale-[1.02] cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Club Image */}
      <img src={image} alt={name} className="w-10 h-10 object-cover rounded-full" />

      {/* Club Name & Categories */}
      <div className="flex flex-col">
        <p className="text-lg font-semibold transition-all duration-300 hover:text-black">{name}</p>
        <div className="flex gap-2 text-gray-400 text-sm">
          {categories.length > 0
            ? categories.map((category, index) => (
                <span key={index} className="font-medium transition-all duration-300 hover:text-gray-700">
                  {category}
                </span>
              ))
            : <span className="font-medium">No Categories</span>}
        </div>
      </div>
    </div>
  );
}

export default SidebarCard;