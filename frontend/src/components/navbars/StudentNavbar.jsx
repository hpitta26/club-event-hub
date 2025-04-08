<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import gatherULogo from '../../assets/icons/GatherUIcon.png';
import { GoBell } from "react-icons/go";
import { HiMiniBars3 } from "react-icons/hi2";
=======
import React, { useState, useEffect, useRef } from "react";
import gatherULogo from "../../assets/icons/GatherUIcon.png";
import SearchBar from "./navbarAssets/searchBar";
import SearchBarTrigger from "./navbarAssets/SearchBarIcon";
import ProfileIcon from "./navbarAssets/ProfileIcon";
import FollowingModal from "../FollowingModal";
import { FaBell } from "react-icons/fa";
>>>>>>> 63f935c (Update GatherU logo to PNG format and fix quote style)
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import EventModal from '../EventModal';
import { useSidebar } from '../../context/SidebarContext';
import backend from '../backend';
import NotificationDropDown from '../NotificationDropDown';
import { LuAward } from "react-icons/lu";
=======
import EventModal from "../EventModal";
>>>>>>> a187e79 (updated the logo to a png)

const StudentNavbar = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [spiritPoints, setSpiritPoints] = useState(0);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventsClicked, setEventsClicked] = useState(false);
  const { toggleSidebar } = useSidebar(); 
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clickedLink, setClickedLink] = useState(null);

  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const notificationsRef = useRef(null); 
  const mobileMenuRef = useRef(null);
  const burgerButtonRef = useRef(null);

  const [showEventModal, setShowEventModal] = useState(false);
  const sidebarRef = useRef(null);

  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    setClickedLink(link);
    setTimeout(() => setClickedLink(null), 300);
    setMobileOpen(false);
  };


  const handleEventsClick = () => {
    async function getEvents() {
    	const result = await backend.get('get-student-events/');
    	if (result.status === 200) {
            console.log(result);
            setEvents(result.data)
    	};
    };
    getEvents();
    setEventsClicked(true);
    setTimeout(() => setEventsClicked(false), 300);
    displayEventModal();
  };

  const displayEventModal = () => {
    setShowEventModal(!showEventModal);
    // setDropdown(null);
    // setShowSearch(false);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen((prev) => !prev);
    setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen((prev) => !prev);
    setProfileDropdownOpen(false);
  };

  const closeProfileDropdown = () => {
    setProfileDropdownOpen(false);
  };

  const closeNotificationsDropdown = () => {
    setIsNotificationsOpen(false);
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  // Fetch the profile image URL when the component mounts
  useEffect(() => {
<<<<<<< HEAD
    const fetchProfileImage = async () => {
      try {
        const response = await backend.get('student-profile-image/');
        setProfileImage(response.data.image_url);
        const response2 = await backend.get('get-spirit-points/');
        setSpiritPoints(response2.data.spirit_points);
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };
    fetchProfileImage();
=======
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        handleSearchOpen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
>>>>>>> a187e79 (updated the logo to a png)
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
<<<<<<< HEAD
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        closeProfileDropdown();
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)){
        setShowEventModal(false); 
=======
      // if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      //   setDropdown(null);
      // }
      // if (searchRef.current && !searchRef.current.contains(event.target)) {
      //   setShowSearch(false);
      // }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowEventModal(false);
>>>>>>> a187e79 (updated the logo to a png)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        closeNotificationsDropdown();
      }
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


  return (
    <>
<<<<<<< HEAD
        {showEventModal && (
          <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-[100]" onClick={displayEventModal} />

            {/* Event Modal */}
            <div ref={sidebarRef} className="z-[110] relative">
              <EventModal events={events} onClose={displayEventModal} />
            </div>
          </>
        )}
        <nav className="fixed w-full h-20 bg-white z-40 border-b-2 border-b-black border-solid">
            <div className="relative flex items-center justify-between h-full px-4 md:px-8">
                {/* Left: Hamburger Icon, Logo, and Links */}
                <div className="flex items-center space-x-8">
              <HiMiniBars3 className="md:block hidden text-black w-8 h-8 cursor-pointer" onClick={toggleSidebar} />
                <a href="/discover" className="flex items-center">
                  <img src={gatherULogo} alt="GatherU Logo" className="h-14 w-auto" />
                </a>
            </div>
            <div className=" absolute left-1/2 transform -translate-x-1/2 flex space-x-16">
              <a href="/discover" className={`md:block hidden font-normal text-black text-lg tracking-wide hover:text-pink-500`}>
                  Discover
              </a>
              <a href="/following" className={`md:block hidden font-normal text-black text-lg tracking-wide hover:text-blue-500`}>
                  Following 
              </a>
              <a href="/leaderboard" className={`md:block hidden font-normal text-black text-lg tracking-wide hover:text-pink-500`}>
                  Leaderboard
              </a>
                </div>
                
                {/* Right: Events, Notifications, and Profile */}
                <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                  <div className='bg-[#FDD74D] hover:bg-yellow-400 text-black p-1 sm:p-2 rounded-md border border-black sm:border-[1.5px] shadow-[2px_2px_0px_#000000] hover:shadow-[3px_3px_0px_#000000] transition-all flex flex-row'>
                    <LuAward className="w-5 h-5" /> <span className='ml-1 -mt-[2px]'>{spiritPoints}</span>
                  </div>
                  {/* Events Button */}
                  <button className="bg-[#FD4EB7] hover:bg-[#ff23a7] text-white font-normal text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2 rounded-md border border-black sm:border-[1.5px] shadow-[2px_2px_0px_#000000] hover:shadow-[3px_3px_0_#000] transition-all" onClick={handleEventsClick}>
                    Your Events
                  </button>
                  {/* Notifications */}
                  <div className="relative" ref={notificationsRef}>
                    <button 
                      className="bg-[#4D9FFD] hover:bg-[#4287ff] text-black p-1 sm:p-2 rounded-md border border-black sm:border-[1.5px] shadow-[2px_2px_0px_#000000] hover:shadow-[3px_3px_0px_#000000]  transition-all"
                      onClick={toggleNotifications}
                    >
                      <GoBell className="w-5 h-5" />
                    </button>
                    <NotificationDropDown 
                      isOpen={isNotificationsOpen} 
                      onClose={closeNotificationsDropdown} 
                    />
                  </div>

                  {/* Profile Icon */}
                  <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-white border border-black sm:border-[1.5px] rounded-full overflow-hidden cursor-pointer" onClick={toggleProfileDropdown}>
                    <img src={profileImage || "something"} alt="Profile" className="w-full h-full object-cover"/>
                    {isProfileDropdownOpen && (
                      <div ref={profileDropdownRef} className="absolute right-5 mt-1 py-2 w-48 bg-white border-[1.5px] border-black shadow-[2px_2px_0px_#000000] rounded-md">
                        <a href="/student-profile" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">
                          Profile
                        </a>
                        <a href="/student-times" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">
                          Availability
                        </a>
                        <a href="/student-settings" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">
                          Settings
                        </a>
                        <a onClick={handleLogout} className="block px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer">
                          Logout
                        </a>
                      </div>
                    )}
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
          <a
            href="/discover"
            className={`block px-4 py-2 text-sm text-black rounded-md hover:bg-gray-100
              ${clickedLink === 'Discover' ? 'bg-pink-500/20 text-pink-500' : ''}`}
            onClick={() => handleLinkClick('Discover')}
          >
            Discover
          </a>
          <a
            href="/following"
            className={`block px-4 py-2 text-sm text-black rounded-md hover:bg-gray-100
              ${clickedLink === 'Following' ? 'bg-blue-500/20 text-blue-500' : ''}`}
            onClick={() => handleLinkClick('Following')}
          >
            Following
          </a>
        </div>
      )}
        </nav>
=======
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
>>>>>>> a187e79 (updated the logo to a png)
    </>
  );
};

export default StudentNavbar;
