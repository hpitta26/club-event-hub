import React, { useState, useEffect, useRef, useContext } from "react";
import UserDropdown from "./UserDropDown";
import NotificationsDropdown from "./NotificationsDropdown";
import SearchIcon from "../assets/icons/SearchIcon";
import PlusIcon from "../assets/icons/PlusIcon";
import InboxIcon from "../assets/icons/InboxIcon";
import UserIcon from "../assets/icons/UserIcon";
import pulseLogo from "../assets/icons/pulse_logo_1.png";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import EventModal from "./EventModal";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const sidebarRef = useRef(null); 
  const [showEventModal, setShowEventModal] = useState(false); 
  const { userContext } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleDropdown = (type) => {
    setDropdown(dropdown === type ? null : type);
  };

  const handleLogout = () => {
    setDropdown(null);
    navigate("/logout");
  };

  const displayEventModal = () => {
    setShowEventModal(!showEventModal);
    setDropdown(null); 
    setShowSearch(false);
  }





  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(null);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)){
        setShowEventModal(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
    {showEventModal && <div ref={sidebarRef}><EventModal onClose={displayEventModal}/></div>}
    <nav className="bg-[#1F1F1F] text-white p-4 flex relative  items-center justify-between">
      <div className="flex items-center">
        <img src={pulseLogo} alt="pUlse Logo" className="h-8 w-auto" />
      </div>
      <ul className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
        <li>
          <Link href="#" className="hover:text-gray-400">
            Events
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-gray-400">
            Followed
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-gray-400">
            Discover
          </Link>
        </li>
      </ul>
      <div className="flex space-x-6 items-center relative" ref={dropdownRef}>
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
        {userContext === null || userContext === undefined ? (
          <></>
        ) : (
          <>
            <Link href="#" className="hover:text-gray-400">
              <PlusIcon className="w-5 h-5 text-white hover:text-gray-400 transition duration-200" />
            </Link>
            <button
              onClick={() => toggleDropdown("notifications")}
              className="hover:text-gray-400 relative"
            >
              <InboxIcon className="w-5 h-5 text-white hover:text-gray-400 transition duration-200" />
            </button>
            {/* Event Modal */}
            <button
              onClick={() => displayEventModal()}
              className="hover:text-gray-400 relative"
            >
              <p className="text-white  hover:text-gray-400 transition duration-200">
                Your Events
              </p>
            </button>
            <NotificationsDropdown
              isOpen={dropdown === "notifications"}
              onClose={() => setDropdown(null)}
            />
            <button
              onClick={() => toggleDropdown("user")}
              className="hover:text-gray-400 relative"
            >
              <UserIcon className="w-5 h-5 text-white  hover:text-gray-400 transition duration-200" />
            </button>
            <UserDropdown
              isOpen={dropdown === "user"}
              onLogout={handleLogout}
              onClose={() => setDropdown(null)}
            />
          </>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navbar;
