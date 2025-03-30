import React, { useState, useEffect, useRef } from 'react';
import gatherULogo from '../../assets/icons/GatherUIcon.svg';
import { GoBell } from "react-icons/go";
import { HiMiniBars3 } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import EventModal from '../EventModal';
import { useSidebar } from '../../context/SidebarContext';
import backend from '../backend';

const NewStudentNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clickedLink, setClickedLink] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [eventsClicked, setEventsClicked] = useState(false);
  const [isFollowingModalOpen, setFollowingModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const { toggleSidebar } = useSidebar(); 

  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

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
  }

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen((prev) => !prev);
  };

  const closeProfileDropdown = () => {
    setProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  // Fetch the profile image URL when the component mounts
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await backend.get('student-profile-image/');
        setProfileImage(response.data.image_url);
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };
    fetchProfileImage();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        handleSearchOpen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      //   setDropdown(null);
      // }
      // if (searchRef.current && !searchRef.current.contains(event.target)) {
      //   setShowSearch(false);
      // }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        closeProfileDropdown();
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

  const userProfileSrc = null;

  return (
    <>
        {showEventModal && (
          <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-[100]" onClick={displayEventModal} />

            {/* Event Modal */}
            <div ref={sidebarRef} className="z-[110] relative">
              <EventModal onClose={displayEventModal} />
            </div>
          </>
        )}
        <nav className="fixed w-full h-20 bg-[#FFFAFD] z-40">
            <div className="relative flex items-center justify-between h-full px-4 md:px-8">
                {/* Left: Hamburger Icon, Logo, and Links */}
                <div className="flex items-center space-x-8">
                  <HiMiniBars3 className="text-black w-8 h-8 cursor-pointer" onClick={toggleSidebar} />
                  <a href="/discover" className="flex items-center">
                    <img src={gatherULogo} alt="GatherU Logo" className="h-10 w-auto" />
                  </a>
                  <div className="flex space-x-6">
                    <a href="/discover" className={`font-normal text-black text-lg tracking-wide hover:text-pink-500`}>
                      Discover
                    </a>
                    <a href="/following" className={`font-normal text-black text-lg tracking-wide hover:text-blue-500`}>
                      Following
                    </a>
                  </div>
                </div>
                {/* Center: Search Bar */}
                <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex items-center bg-white border-[1.5px] border-r border-b border-black shadow-[2px_2px_0px_#000000] rounded-md px-3 py-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search"
                    className="ml-2 text-sm text-gray-600 placeholder-gray-500 focus:outline-none"
                  />
                </div>

                {/* Right: Events, Notifications, and Profile */}
                <div className="flex items-center space-x-4">
                  {/* Events Button */}
                  <button className="hidden md:block bg-[#FD4EB7] text-black font-normal text-sm px-4 py-2 rounded-md border-[1.5px] border-black hover:bg-pink-400" onClick={handleEventsClick}>
                    Your Events
                  </button>
                  {/* Notifications */}
                  <button className="hidden md:block bg-[#4D9FFD] text-black p-2 rounded-md border-[1.5px] border-black hover:bg-blue-400">
                    <GoBell className="w-5 h-5" />
                  </button>

                  {/* Profile Icon */}
                  <div className="w-[50px] h-[50px] bg-white border-[1.5px] border-black rounded-full overflow-hidden cursor-pointer" onClick={toggleProfileDropdown}>
                    <img src={profileImage || "something"} alt="Profile" className="w-full h-full object-cover"/>
                    {isProfileDropdownOpen && (
                      <div ref={profileDropdownRef} className="absolute right-5 mt-1 py-2 w-48 bg-white border-[1.5px] border-black rounded-md shadow-lg">
                        <a href="#" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">
                          Profile
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
                </div>
            </div>
        </nav>
    </>
  );
};

export default NewStudentNavbar;