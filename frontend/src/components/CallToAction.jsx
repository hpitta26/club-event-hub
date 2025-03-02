import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = ({ to, children, className = '', onClick }) => {
  return (
    <Link
      to={to}
      className={`
        inline-block
        min-w-[150px]
        bg-emerald-600 
        hover:bg-emerald-500 
        text-white 
        text-center
        font-semibold 
        py-3 
        px-6 
        rounded-full 
        shadow-lg 
        transition 
        duration-300 
        ease-in-out 
        transform 
        hover:scale-105 
        focus:outline-none 
        focus:ring-2 
        focus:ring-emerald-400 
        focus:ring-offset-2
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default CallToAction;
