import React from "react";
import dummyEventCardCover from "../../assets/dummyEventCardCover.jpg";

function ClubCard({
  name = "Unknown Club",
  image = dummyEventCardCover,
  slug = "No Categories",
  categories = [],
}) {
  return (
    <div
      className="flex items-center gap-3 bg-white px-3 py-2 rounded-xl shadow-sm border border-gray-300 w-full 
                 transition-all duration-300 hover:shadow-md hover:bg-gray-100 hover:scale-[1.02] cursor-pointer"
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

export default ClubCard;
