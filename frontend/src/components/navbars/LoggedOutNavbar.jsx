<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import gatherULogo from '../../assets/icons/GatherUIcon.png';
import { useNavigate } from 'react-router-dom';
import StudentOrClubModal from '../StudentOrClubModal';
=======
import React, { useState, useEffect } from "react";
import gatherULogo from "../../assets/icons/GatherUIcon.png";
import SearchBar from "./navbarAssets/searchBar";
import SearchBarTrigger from "./navbarAssets/SearchBarIcon";
import { useNavigate } from "react-router-dom";
import StudentOrClubModal from "../StudentOrClubModal";
>>>>>>> 63f935c (Update GatherU logo to PNG format and fix quote style)

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
    navigate("/login");
  };

  useEffect(() => {
<<<<<<< HEAD
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
    <nav className="fixed w-full h-20 bg-white z-40 text-color-black border-b-2 border-b-black border-solid">
      <div className="relative flex items-center h-full px-4 md:px-8">
        {/* Left section */}
        <div className="flex-1 flex items-center">
          <a className="flex items-center" href="/">
            <img src={gatherULogo} alt="GatherU Logo" className="h-14 w-auto" />
=======
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        handleSearchOpen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <nav className="fixed w-full bg-black text-white z-40">
      {/* Main row */}
      <div className="w-full relative flex items-center justify-between h-10">
        {/* Left: Logo */}
        <a className="pl-4 flex items-center" href="/">
          <img src={gatherULogo} alt="GatherU Logo" className="h-5 w-auto" />
        </a>

        {/* Center: Links (hidden on mobile) */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex space-x-8">
          <a
            href="/discover"
            className={`text-sm transition-all duration-300 ease-out transform px-2 py-1 rounded-md
              ${
                clickedLink === "discover"
                  ? "text-blue-500 bg-blue-500/20 scale-110 shadow-lg"
                  : "text-[#F0EFEB] bg-transparent scale-100 hover:text-blue-500"
              }`}
            onClick={() => handleLinkClick("discover")}
          >
            DISCOVER
>>>>>>> a187e79 (updated the logo to a png)
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
<<<<<<< HEAD
            <button
              className="hidden md:block bg-[#FD4EB7] text-black font-normal text-sm px-4 py-2 rounded-md border-[1.5px] border-black hover:bg-pink-400"
=======
            <SearchBarTrigger
              onClick={handleSearchOpen}
              className="hidden md:block"
            />{" "}
            {/* Hide on mobile */}
            <button
              className={`whitespace-nowrap text-xs sm:text-sm transition-all duration-300 ease-out transform px-1.5 py-0.5 sm:px-2 sm:py-1 border border-white/50 rounded-md
                ${
                  signupClicked
                    ? "text-yellow-500 bg-yellow-500/20 scale-110 shadow-lg"
                    : "text-[#F0EFEB] bg-transparent scale-100"
                }`}
>>>>>>> a187e79 (updated the logo to a png)
              onClick={handleSignupClick}
            >
              Sign up
            </button>
            <button
<<<<<<< HEAD
              className="hidden md:block bg-[#4D9FFD] text-black font-normal text-sm px-4 py-2 rounded-md border-[1.5px] border-black hover:bg-blue-400"
=======
              className={`whitespace-nowrap text-xs sm:text-sm transition-all duration-300 ease-out transform px-1.5 py-0.5 sm:px-2 sm:py-1 border border-white/50 rounded-md
                ${
                  loginClicked
                    ? "text-blue-500 bg-blue-500/20 scale-110 shadow-lg"
                    : "text-[#F0EFEB] bg-transparent scale-100"
                }`}
>>>>>>> a187e79 (updated the logo to a png)
              onClick={handleLoginClick}
            >
              Log in
            </button>
          </div>

          {/* Profile icon dropdown button */}
          <div
            ref={dropdownRef}
            className="md:hidden w-10 h-10 bg-gray-300 border-[1.5px] border-black rounded-full overflow-hidden cursor-pointer flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
<<<<<<< HEAD
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path />
=======
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
>>>>>>> a187e79 (updated the logo to a png)
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
<<<<<<< HEAD
        <div className="absolute top-20 mt-1 right-4 w-48 bg-[#] p-3 border-[1.5px] border-black shadow-[2px_2px_0px_#000000] rounded-md bg-white">
          <div className="flex flex-col space-y-2">
            <button
              className="bg-[#FD4EB7] text-black font-normal text-sm px-4 py-2 rounded-md border-[1.5px] border-black hover:bg-pink-400"
              onClick={handleSignupClick}
=======
        <div className="md:hidden bg-black border-t border-white/10">
          <div className="flex flex-col items-center py-2 space-y-2">
            <a
              href="/discover"
              className={`text-sm text-[#F0EFEB] transition-all duration-300 ease-out px-2 py-1 rounded-md
                ${clickedLink === "discover" ? "bg-blue-500/20 text-blue-500" : "hover:text-blue-500 bg-transparent"}`}
              onClick={() => handleLinkClick("discover")}
>>>>>>> a187e79 (updated the logo to a png)
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
