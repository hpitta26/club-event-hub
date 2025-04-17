import React, { useState, useEffect, useRef } from 'react';
import gatherULogo from '../../assets/icons/GatherUIcon.png';
import { useNavigate } from 'react-router-dom';
import StudentOrClubModal from '../StudentOrClubModal';
import { HiMiniBars3 } from "react-icons/hi2";

const LoggedOutNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clickedLink, setClickedLink] = useState(null);
  const [signupClicked, setSignupClicked] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLinkClick = (link) => {
    setClickedLink(link);
    setTimeout(() => setClickedLink(null), 300);
  };


  const handleSignupClick = () => {
    setSignupClicked(true);
    setTimeout(() => setSignupClicked(false), 300);
    setIsOpen(true);
  };

  const handleLoginClick = () => {
    setLoginClicked(true);
    setTimeout(() => setLoginClicked(false), 300);
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed w-full h-20 bg-[#FFFAFD] z-40 text-color-black">
      <div className="relative flex items-center h-full px-4 md:px-8">
        {/* Left section */}
        <div className="flex-1 flex items-center">
          <a className="flex items-center" href="/">
            <img src={gatherULogo} alt="GatherU Logo" className="h-14 w-auto" />
          </a>
        </div>

        {/* Center section */}
        <div className="absolute left-0 right-0 flex justify-center items-center h-full pointer-events-none">
          <a
            href="/discover"
            className="font-normal text-black text-lg tracking-wide hover:text-pink-500 pointer-events-auto"
          >
            Discover
          </a>
        </div>

        {/* Right section */}
        <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-3 md:space-x-4">
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <button
              className="hidden md:block bg-[#FD4EB7] text-black font-normal text-sm px-4 py-2 rounded-md border-[1.5px] border-black hover:bg-pink-400"
              onClick={handleSignupClick}
            >
              Sign up
            </button>
            <button
              className="hidden md:block bg-[#4D9FFD] text-black font-normal text-sm px-4 py-2 rounded-md border-[1.5px] border-black hover:bg-blue-400"
              onClick={handleLoginClick}
            >
              Log in
            </button>
          </div>

          {/* Dropdown button */}
            <div ref={dropdownRef} className="flex items-center space-x-8">
                <HiMiniBars3 className="md:hidden block text-black w-8 h-8 cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)} />
            </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="absolute top-20 mt-1 right-4 w-48 bg-white p-3 border-[1.5px] border-black shadow-[2px_2px_0px_#000000] rounded-md">
          <div className="flex flex-col space-y-2">
            <button
              className="bg-[#FD4EB7] text-black font-normal text-sm px-4 py-2 rounded-md border-[1.5px] border-black hover:bg-pink-400"
              onClick={handleSignupClick}
            >
              Sign up
            </button>
            <button
              className="bg-[#4D9FFD] text-black font-normal text-sm px-4 py-2 rounded-md border-[1.5px] border-black hover:bg-blue-400"
              onClick={handleLoginClick}
            >
              Log in
            </button>
          </div>
        </div>
      )}

      <StudentOrClubModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </nav>
  );
};

export default LoggedOutNavbar;
