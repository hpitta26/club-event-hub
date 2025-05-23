import React from "react";
import { useNavigate } from "react-router-dom";

const SidebarCard = ({ name, image }) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    const clubSlug = name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/club/${clubSlug}`);
  }

  return (
    <div 
      className="relative w-[200px] h-[58px] bg-white border border-black rounded-[10px] shadow-[2px_2px_0px_#000000] flex items-center gap-2 px-2 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="w-8 h-8 rounded-full flex-shrink-0">
        <img src={image} alt={name} className="w-full h-full object-cover rounded-full" />
      </div>
      <div className="flex flex-col">
        <span className="text-black font-normal text-[16px] leading-[19px]">{name}</span>
      </div>
    </div>
  );
};

export default SidebarCard;