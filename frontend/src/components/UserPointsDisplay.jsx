import React from "react";

const UserPointsDisplay = ({ points }) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-[10px] border-2 border-black shadow-[2px_2px_0_#000]">
      <div className="text-sm text-gray-500">Your Points:</div>
      <div className="text-lg font-bold">{points}</div>
    </div>
  );
};

export default UserPointsDisplay;
