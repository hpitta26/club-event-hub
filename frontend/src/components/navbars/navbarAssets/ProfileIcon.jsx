import React, { useState, useEffect, useRef } from 'react';

const ProfileIcon = ({ src, alt = 'User Profile', children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false); // Close if click is outside
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        className="w-6 h-6 rounded-full overflow-hidden focus:outline-none"
        onClick={handleToggle}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-white rounded-full" />
        )}
      </button>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-black text-white border border-white/10 rounded-md shadow-lg z-50"
          onClick={handleClose} // Close when clicking inside
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;