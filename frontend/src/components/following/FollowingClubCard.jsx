import React from 'react';

const FollowingClubCard = ({ name = "Unknown Club", imageUrl = "/api/placeholder/80/80" }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-xl shadow-sm w-full">
      {/* Club Image */}
      <div className="mr-4">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>
      
      {/* Club Info */}
      <div>
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-gray-400 text-sm">No Categories</p>
      </div>
    </div>
  );
};

export default FollowingClubCard;