import React from "react";

// Dropdown component that takes in props: isOpen (controls visibility), options (list of menu items), 
// onClose (function to close dropdown), and style (optional styling)
const Dropdown = ({ isOpen, options, onClose, style }) => {
    // If dropdown is not open, do not render anything
    if (!isOpen) return null;

    return (
        // Dropdown container with absolute positioning, styled to appear below the triggering element
        <div className="absolute top-full right-0 mt-2 w-48 bg-[#1F1F1F] text-white border border-gray-700 shadow-lg rounded-md z-50">
            {/* Loop through options and create a button for each */}
            {options.map((option, index) => (
                <button 
                    key={index} // Unique key for React list rendering
                    onClick={option.onClick} // Assign click handler for each option
                    className="block w-full px-4 py-2 text-left hover:bg-gray-700 transition duration-200"
                >
                    {option.label} {/* Display the text label for the option */}
                </button>
            ))}
        </div>
    );
};

export default Dropdown;
