import React, { useState, useRef, useEffect, useContext } from 'react';
import gatherULogo from '../../assets/icons/GatherUIcon.png';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { UserContext } from '../../context/UserContext';

const ClubNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clickedLink, setClickedLink] = useState(null);
  const [eventsClicked, setEventsClicked] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isActiveLink = (path) => location.pathname === path;
  const { userContext } = useContext(UserContext);

  const notificationsRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const burgerButtonRef = useRef(null);

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
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen((prev) => !prev);
    setIsNotificationsOpen(false);
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <nav className="fixed w-full h-20 bg-white z-40 border-b-2 border-b-black border-solid">
      <div className="relative flex items-center justify-between h-full px-4 md:px-8">
        <Link className="flex items-center" to="/analytics">
          <img src={gatherULogo} alt="GatherU Logo" className="h-14 w-auto" />
        </Link>

        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex space-x-16">
          <Link
            to="/analytics"
            className={`` + (isActiveLink('/analytics') ? 'font-normal text-pink-500 border-pink-500 border-b-2' : 'font-normal text-black') + ` text-lg tracking-wide hover:text-pink-500`}
          >
            Analytics
          </Link>
          <Link 
            to="/events"
            className={`` + (isActiveLink('/events') ? 'font-normal text-blue-500 border-blue-500 border-b-2' : 'font-normal text-black') + ` text-lg tracking-wide hover:text-blue-500`}
          >
            Events
          </Link>
        </div>

        <div className="pr-4 flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <button
              className="bg-[#FD4EB7] hover:bg-[#ff23a7] text-white font-normal text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2 rounded-md border border-black sm:border-[1.5px] hover:shadow-[2px_2px_0_#000] transition-all duration-300 mr-2"
              onClick={handleEventsClick}
            >
             New Event
            </button>
            
            <div className="relative">
              <div
                className="w-[50px] h-[50px] bg-white border-[1.5px] border-black rounded-full overflow-hidden cursor-pointer"
                onClick={toggleProfileDropdown}
              >
                <img src={userContext.profile_picture || "something"} alt="Profile" className="w-full h-full object-cover" />
              </div>
              {isProfileDropdownOpen && (
                <div
                  ref={profileDropdownRef}
                  className="absolute right-0 mt-1 py-2 w-48 bg-white border-[1.5px] border-black shadow-[2px_2px_0px_#000000] rounded-md"
                >
                  <Link to="#" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link to="/club-settings" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">
                    Settings
                  </Link>
                  <div onClick={handleLogout} className="block px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer">
                    Logout
                  </div>
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute right-4 top-12 mt-5 py-2 w-48 bg-white border-[1.5px] border-black shadow-[2px_2px_0px_#000000] rounded-md md:hidden z-50"
        >
          <Link
            to="/analytics"
            className={`block px-4 py-2 text-sm text-black rounded-md hover:bg-gray-100
              ${clickedLink === 'Analytics' ? 'bg-pink-500/20 text-pink-500' : ''}`}
            onClick={() => handleLinkClick('Analytics')}
          >
            Analytics
          </Link>
          <Link
            to="/events"
            className={`block px-4 py-2 text-sm text-black rounded-md hover:bg-gray-100
              ${clickedLink === 'Events' ? 'bg-blue-500/20 text-blue-500' : ''}`}
            onClick={() => handleLinkClick('Events')}
          >
            Events
          </Link>
        </div>
      )}
    </nav>
  );
};

export default ClubNavbar;