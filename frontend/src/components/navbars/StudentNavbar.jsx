import React, { useState, useEffect, useRef } from "react";
import gatherULogo from "../../assets/icons/GatherUIcon.png";
import SearchBar from "./navbarAssets/searchBar";
import SearchBarTrigger from "./navbarAssets/SearchBarIcon";
import ProfileIcon from "./navbarAssets/ProfileIcon";
import FollowingModal from "../FollowingModal";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EventModal from "../EventModal";

const StudentNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clickedLink, setClickedLink] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [eventsClicked, setEventsClicked] = useState(false);
  const [isFollowingModalOpen, setFollowingModalOpen] = useState(false);

  const [showEventModal, setShowEventModal] = useState(false);
  const sidebarRef = useRef(null);

  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    setClickedLink(link);
    setTimeout(() => setClickedLink(null), 300);
  };

  const handleSearchOpen = () => setSearchOpen(true);
  const handleSearchClose = () => setSearchOpen(false);

  const handleEventsClick = () => {
    setEventsClicked(true);
    setTimeout(() => setEventsClicked(false), 300);
    displayEventModal();
  };

  const displayEventModal = () => {
    setShowEventModal(!showEventModal);
    // setDropdown(null);
    // setShowSearch(false);
  };

  const handleLogout = () => {
    navigate("/logout");
  };

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      // if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      //   setDropdown(null);
      // }
      // if (searchRef.current && !searchRef.current.contains(event.target)) {
      //   setShowSearch(false);
      // }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowEventModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const userProfileSrc = null;

  return (
    <>
      {showEventModal && (
        <div ref={sidebarRef}>
          <EventModal onClose={displayEventModal} />
        </div>
      )}
      <nav className="fixed w-full bg-black text-white z-40">
        {/* Main row */}
        <div className="w-full relative flex items-center justify-between h-10">
          {/* Left: Logo */}
          <a className="pl-4 flex items-center" href="/discover">
            <img src={gatherULogo} alt="GatherU Logo" className="h-5 w-auto" />
          </a>

          {/* Center: Links (hidden on mobile) */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex space-x-8">
            <a
              href="/discover"
              className={`text-sm transition-all duration-300 ease-out transform px-2 py-1 rounded-md
                ${
                  clickedLink === "following"
                    ? "text-pink-500 bg-pink-500/20 scale-110 shadow-lg"
                    : "text-[#F0EFEB] bg-transparent scale-100 hover:text-pink-500"
                }`}
              onClick={() => handleLinkClick("following")}
            >
              Discover
            </a>
            <a
              href="/following"
              className={`text-sm transition-all duration-300 ease-out transform px-2 py-1 rounded-md
                ${
                  clickedLink === "discover"
                    ? "text-blue-500 bg-blue-500/20 scale-110 shadow-lg"
                    : "text-[#F0EFEB] bg-transparent scale-100 hover:text-blue-500"
                }`}
              onClick={() => handleLinkClick("discover")}
            >
              Following
            </a>
          </div>

          {/* Right: Events Button + Notification + Profile + Mobile Toggle */}
          <div className="pr-4 flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
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
                onClick={handleEventsClick}
              >
                <span className="hidden xs:inline">View Events</span>
                <span className="xs:hidden">Events</span>
              </button>
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
                    href="/student-settings"
                    className="block px-4 py-1 text-sm hover:bg-white/10"
                  >
                    Settings
                  </a>
                  <a
                    onClick={() => setFollowingModalOpen(true)}
                    className="block px-4 py-1 text-sm hover:bg-white/10"
                  >
                    Following
                  </a>
                  <a
                    onClick={handleLogout}
                    className="block px-4 py-1 text-sm hover:bg-white/10"
                  >
                    Logout
                  </a>
                </div>
              </ProfileIcon>
              <SearchBar open={searchOpen} onClose={handleSearchClose} />
            </div>
            <button
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

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-black border-t border-white/10">
            <div className="flex flex-col items-center py-2 space-y-2">
              <a
                href="/discover"
                className={`text-sm text-[#F0EFEB] transition-all duration-300 ease-out px-2 py-1 rounded-md
                  ${clickedLink === "following" ? "bg-pink-500/20 text-pink-500" : "hover:text-pink-500 bg-transparent"}`}
                onClick={() => handleLinkClick("following")}
              >
                Discover
              </a>
              <a
                href="/following"
                className={`text-sm text-[#F0EFEB] transition-all duration-300 ease-out px-2 py-1 rounded-md
                  ${clickedLink === "discover" ? "bg-blue-500/20 text-blue-500" : "hover:text-blue-500 bg-transparent"}`}
                onClick={() => handleLinkClick("discover")}
              >
                Following
              </a>
              <SearchBarTrigger onClick={handleSearchOpen} />
            </div>
          </div>
        )}
        <FollowingModal
          isOpen={isFollowingModalOpen}
          onClose={() => setFollowingModalOpen(false)}
        />
      </nav>
    </>
  );
};

export default StudentNavbar;
