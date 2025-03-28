import React, { useState, useEffect } from 'react';
import gatherULogo from '../../assets/icons/GatherUIcon.svg';
import SearchBar from './navbarAssets/searchBar';
import SearchBarTrigger from './navbarAssets/SearchBarIcon';
import { useNavigate } from 'react-router-dom';
import StudentOrClubModal from '../StudentOrClubModal';

const LoggedOutNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clickedLink, setClickedLink] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [signupClicked, setSignupClicked] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    setClickedLink(link);
    setTimeout(() => setClickedLink(null), 300);
  };

  const handleSearchOpen = () => setSearchOpen(true);
  const handleSearchClose = () => setSearchOpen(false);

  const handleSignupClick = () => {
    setSignupClicked(true);
    setTimeout(() => setSignupClicked(false), 300);
    setIsOpen(true)
  };

  const handleLoginClick = () => {
    setLoginClicked(true);
    setTimeout(() => setLoginClicked(false), 300);
    navigate('/login');
  };

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
              ${clickedLink === 'discover'
                ? 'text-blue-500 bg-blue-500/20 scale-110 shadow-lg'
                : 'text-[#F0EFEB] bg-transparent scale-100 hover:text-blue-500'}`}
            onClick={() => handleLinkClick('discover')}
          >
            DISCOVER
          </a>
        </div>

        {/* Right: Signup + Login + Mobile Toggle */}
        <div className="pr-4 flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <SearchBarTrigger onClick={handleSearchOpen} className="hidden md:block" /> {/* Hide on mobile */}
            <button
              className={`whitespace-nowrap text-xs sm:text-sm transition-all duration-300 ease-out transform px-1.5 py-0.5 sm:px-2 sm:py-1 border border-white/50 rounded-md
                ${signupClicked
                  ? 'text-yellow-500 bg-yellow-500/20 scale-110 shadow-lg'
                  : 'text-[#F0EFEB] bg-transparent scale-100'}`}
              onClick={handleSignupClick}
            >
              Sign up
            </button>
            <button
              className={`whitespace-nowrap text-xs sm:text-sm transition-all duration-300 ease-out transform px-1.5 py-0.5 sm:px-2 sm:py-1 border border-white/50 rounded-md
                ${loginClicked
                  ? 'text-blue-500 bg-blue-500/20 scale-110 shadow-lg'
                  : 'text-[#F0EFEB] bg-transparent scale-100'}`}
              onClick={handleLoginClick}
            >
              Log in
            </button>
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
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
                ${clickedLink === 'discover' ? 'bg-blue-500/20 text-blue-500' : 'hover:text-blue-500 bg-transparent'}`}
              onClick={() => handleLinkClick('discover')}
            >
              Discover
            </a>
            <SearchBarTrigger onClick={handleSearchOpen} />
          </div>
        </div>
      )}

      <StudentOrClubModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </nav>
  );
};

export default LoggedOutNavbar;