import React from "react";

const Dropdown = ({ isOpen, options, onClose, style }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute top-full right-0 mt-2 w-48 bg-[#1F1F1F] text-white border border-gray-700 shadow-lg rounded-md z-50">
            {options.map((option, index) => (
                <button 
                    key={index}
                    onClick={option.onClick}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-700 transition duration-200"
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default Dropdown;
