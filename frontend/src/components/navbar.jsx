import React, { useState, useEffect, useRef } from "react";
import UserDropdown from "./UserDropDown";
import NotificationsDropdown from "./NotificationsDropdown";
import SearchIcon from "../assets/icons/SearchIcon";
import PlusIcon from "../assets/icons/PlusIcon";
import InboxIcon from "../assets/icons/InboxIcon";
import UserIcon from "../assets/icons/UserIcon";
import pulseLogo from "../assets/icons/pulse_logo_1.png";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const toggleDropdown = (type) => {
    setDropdown(dropdown === type ? null : type);
  };

  const handleLogout = () => {
    setDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(null);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[#1F1F1F] text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src={pulseLogo} alt="pUlse Logo" className="h-8 w-auto" />
      </div>
      <ul className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
        <li>
          <a href="#" className="hover:text-gray-400">
            Events
          </a>
        </li>
        <li>
          <a href="/following" className="hover:text-gray-400">
            Following
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400">
            Discover
          </a>
        </li>
      </ul>
      <div className="flex space-x-6 items-center relative" ref={dropdownRef}>
        <a href="#" className="hover:text-gray-400">
          <PlusIcon className="w-5 h-5 text-white hover:text-gray-400 transition duration-200" />
        </a>
        <div className="flex items-center relative" ref={searchRef}>
          <button
            onClick={() => {
              setDropdown(null);
              setShowSearch(!showSearch);
            }}
            className="hover:text-gray-400"
          >
            <SearchIcon className="w-5 h-5 text-white hover:text-gray-400 transition duration-200" />
          </button>
          {showSearch && (
            <input
              type="text"
              placeholder="Search..."
              onFocus={() => setDropdown(null)}
              className="absolute top-full mt-2 right-0 bg-[#1F1F1F] text-white border border-gray-700 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          )}
        </div>
        <button
          onClick={() => toggleDropdown("notifications")}
          className="hover:text-gray-400 relative"
        >
          <InboxIcon className="w-5 h-5 text-white hover:text-gray-400 transition duration-200" />
        </button>
        <NotificationsDropdown
          isOpen={dropdown === "notifications"}
          onClose={() => setDropdown(null)}
        />
        <button
          onClick={() => toggleDropdown("user")}
          className="hover:text-gray-400 relative"
        >
          <UserIcon className="w-5 h-5 text-white hover:text-gray-400 transition duration-200" />
        </button>
        <UserDropdown
          isOpen={dropdown === "user"}
          onLogout={handleLogout}
          onClose={() => setDropdown(null)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
