// SearchBarTrigger.jsx
import React from 'react';

const SearchBarTrigger = ({ onClick }) => {
  return (
    <div
      className="flex items-center border border-white/50 px-2 py-1 rounded cursor-pointer"
      onClick={onClick}
    >
      <span className="mr-2 text-sm">Search...</span>
      <span className="opacity-70 text-sm">Ctrl + K</span>
    </div>
  );
};

export default SearchBarTrigger;