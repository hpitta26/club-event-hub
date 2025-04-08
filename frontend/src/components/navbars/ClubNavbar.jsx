<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react';
import gatherULogo from '../../assets/icons/GatherUIcon.png';
import { GoBell } from 'react-icons/go';
=======
import React, { useState, useEffect } from "react";
import gatherULogo from "../../assets/icons/GatherUIcon.png";
import SearchBar from "./navbarAssets/searchBar";
import SearchBarTrigger from "./navbarAssets/SearchBarIcon";
import ProfileIcon from "./navbarAssets/ProfileIcon";
import { FaBell } from "react-icons/fa";
>>>>>>> a187e79 (updated the logo to a png)
import { useNavigate } from "react-router-dom";
import NotificationDropDown from '../NotificationDropDown';

const ClubNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clickedLink, setClickedLink] = useState(null);
  const [eventsClicked, setEventsClicked] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const notificationsRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const burgerButtonRef = useRef(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch('/api/profile-image');
        const data = await response.json();
        setProfileImage(data.image_url);
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };
    fetchProfileImage();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      // Close mobile menu when clicking outside
      if (
        mobileOpen && 
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target) &&
        burgerButtonRef.current &&
        !burgerButtonRef.current.contains(event.target)
      ) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileOpen]);

  const handleLinkClick = (link) => {
    setClickedLink(link);
    setTimeout(() => setClickedLink(null), 300);
  };

  const handleEventsClick = () => {
    setEventsClicked(true);
    setTimeout(() => setEventsClicked(false), 300);
    navigate("/create-event");
<<<<<<< HEAD
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen((prev) => !prev);
    setProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen((prev) => !prev);
    setIsNotificationsOpen(false);
=======
>>>>>>> a187e79 (updated the logo to a png)
  };

  const handleLogout = () => {
    navigate("/logout");
  };

<<<<<<< HEAD
=======
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        handleSearchOpen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const userProfileSrc = null;

>>>>>>> a187e79 (updated the logo to a png)
  return (
    <nav className="fixed w-full h-20 bg-white z-40 border-b-2 border-b-black border-solid">
      <div className="relative flex items-center justify-between h-full px-4 md:px-8">
        <a className="flex items-center" href="/analytics">
          <img src={gatherULogo} alt="GatherU Logo" className="h-14 w-auto" />
        </a>

<<<<<<< HEAD
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex space-x-16">
          <a href="/analytics" className="font-normal text-black text-lg tracking-wide hover:text-pink-500">
            Analytics
          </a>
          <a href="/events" className="font-normal text-black text-lg tracking-wide hover:text-blue-500">
=======
        {/* Center: Links (hidden on mobile) */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex space-x-8">
          <a
            href="/analytics"
            className={`text-sm transition-all duration-300 ease-out transform px-2 py-1 rounded-md
              ${
                clickedLink === "Analytics"
                  ? "text-pink-500 bg-pink-500/20 scale-110 shadow-lg"
                  : "text-[#F0EFEB] bg-transparent scale-100 hover:text-pink-500"
              }`}
            onClick={() => handleLinkClick("Analytics")}
          >
            Analytics
          </a>
          <a
            href="/events"
            className={`text-sm transition-all duration-300 ease-out transform px-2 py-1 rounded-md
              ${
                clickedLink === "Events"
                  ? "text-blue-500 bg-blue-500/20 scale-110 shadow-lg"
                  : "text-[#F0EFEB] bg-transparent scale-100 hover:text-blue-500"
              }`}
            onClick={() => handleLinkClick("Events")}
          >
>>>>>>> a187e79 (updated the logo to a png)
            Events
          </a>
        </div>

        <div className="pr-4 flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
<<<<<<< HEAD
            <button
              className="bg-[#FD4EB7] hover:bg-[#ff23a7] text-white font-normal text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2 rounded-md border border-black sm:border-[1.5px] shadow-[2px_2px_0px_#000000] hover:shadow-[3px_3px_0_#000] transition-all duration-300"
=======
            <SearchBarTrigger
              onClick={handleSearchOpen}
              className="hidden md:block"
            />{" "}
            {/* Hide on mobile */}
            <button
              className={`whitespace-nowrap transition-all duration-300 ease-out transform border border-white/50 rounded-md
                ${
                  eventsClicked
                    ? "text-yellow-500 bg-yellow-500/20 scale-110 shadow-lg"
                    : "text-[#F0EFEB] bg-transparent scale-100"
                }
                text-xs px-1.5 py-0.5 sm:text-sm sm:px-2 sm:py-1`}
>>>>>>> a187e79 (updated the logo to a png)
              onClick={handleEventsClick}
            >
             Create Event
            </button>
<<<<<<< HEAD
            
            <div className="relative">
              <div
                className="w-[50px] h-[50px] bg-white border-[1.5px] border-black rounded-full overflow-hidden cursor-pointer"
                onClick={toggleProfileDropdown}
              >
                <img src={profileImage || "something"} alt="Profile" className="w-full h-full object-cover" />
=======
            <button className="text-[#F0EFEB] hover:text-gray-300 flex-shrink-0">
              <FaBell className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <ProfileIcon src={userProfileSrc}>
              <div className="py-2">
                <a
                  href="#"
                  className="block px-4 py-1 text-sm hover:bg-white/10"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-1 text-sm hover:bg-white/10"
                >
                  Settings
                </a>
                <a
                  onClick={handleLogout}
                  className="block px-4 py-1 text-sm hover:bg-white/10"
                >
                  Logout
                </a>
>>>>>>> a187e79 (updated the logo to a png)
              </div>
              {isProfileDropdownOpen && (
                <div
                  ref={profileDropdownRef}
                  className="absolute right-0 mt-1 py-2 w-48 bg-white border-[1.5px] border-black shadow-[2px_2px_0px_#000000] rounded-md"
                >
                  <a href="#" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">
                    Profile
                  </a>
                  <a href="/club-settings" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">
                    Settings
                  </a>
                  <a onClick={handleLogout} className="block px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer">
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>

          <button
            ref={burgerButtonRef}
            className="md:hidden flex-shrink-0"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
<<<<<<< HEAD
        <div
          ref={mobileMenuRef}
          className="absolute right-4 top-12 mt-5 py-2 w-48 bg-white border-[1.5px] border-black shadow-[2px_2px_0px_#000000] rounded-md md:hidden z-50"
        >
          <a
            href="/analytics"
            className={`block px-4 py-2 text-sm text-black rounded-md hover:bg-gray-100
              ${clickedLink === 'Analytics' ? 'bg-pink-500/20 text-pink-500' : ''}`}
            onClick={() => handleLinkClick('Analytics')}
          >
            Analytics
          </a>
          <a
            href="/events"
            className={`block px-4 py-2 text-sm text-black rounded-md hover:bg-gray-100
              ${clickedLink === 'Events' ? 'bg-blue-500/20 text-blue-500' : ''}`}
            onClick={() => handleLinkClick('Events')}
          >
            Events
          </a>
=======
        <div className="md:hidden bg-black border-t border-white/10">
          <div className="flex flex-col items-center py-2 space-y-2">
            <a
              href="/analytics"
              className={`text-sm text-[#F0EFEB] transition-all duration-300 ease-out px-2 py-1 rounded-md
                ${clickedLink === "Analytics" ? "bg-pink-500/20 text-pink-500" : "hover:text-pink-500 bg-transparent"}`}
              onClick={() => handleLinkClick("Analytics")}
            >
              Analytics
            </a>
            <a
              href="/events"
              className={`text-sm text-[#F0EFEB] transition-all duration-300 ease-out px-2 py-1 rounded-md
                ${clickedLink === "Events" ? "bg-blue-500/20 text-blue-500" : "hover:text-blue-500 bg-transparent"}`}
              onClick={() => handleLinkClick("Events")}
            >
              Events
            </a>
            <SearchBarTrigger onClick={handleSearchOpen} />
          </div>
>>>>>>> a187e79 (updated the logo to a png)
        </div>
      )}
    </nav>
  );
};

export default ClubNavbar;
