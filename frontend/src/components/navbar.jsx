import React from "react";
import SearchIcon from "../assets/icons/SearchIcon";
import PlusIcon from "../assets/icons/PlusIcon";
import InboxIcon from "../assets/icons/InboxIcon";
import UserIcon from "../assets/icons/UserIcon";
import pulseLogo from "../assets/icons/pulse_logo_1.png"; 

const Navbar = () => {
    return (
        <nav className="bg-[#1F1F1F] text-white p-4 flex items-center justify-between"> {}
            {/* Logo (Left) */}
            <div className="flex items-center">
                <img src={pulseLogo} alt="GatherU Logo" className="h-8 w-auto" /> {}
            </div>

            {/* Center Nav Links */}
            <ul className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
                <li><a href="#" className="hover:text-gray-400">Events</a></li>
                <li><a href="#" className="hover:text-gray-400">Followed</a></li>
                <li><a href="#" className="hover:text-gray-400">Discover</a></li>
            </ul>

            {/* Right Side Icons */}
            <div className="flex space-x-6">
                <a href="#" className="hover:text-gray-400">
                    <PlusIcon className="w-5 h-5 text-white" />
                </a>
                <a href="#" className="hover:text-gray-400">
                    <SearchIcon className="w-5 h-5 text-white" />
                </a>
                <a href="#" className="hover:text-gray-400">
                    <InboxIcon className="w-5 h-5 text-white" />
                </a>
                <a href="#" className="hover:text-gray-400">
                    <UserIcon className="w-5 h-5 text-white" />
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
