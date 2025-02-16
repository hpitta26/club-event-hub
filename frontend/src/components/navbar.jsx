import React from "react";

const Navbar = () => {
    return(
        <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">GatherU</h1>
            <ul className="flex space-x-6">
                <li>
                    <a href="#" className="hover:text-gray-400">Events</a>
                </li>
                <li>
                    <a href="#" className = "hover:text-gray-400">Followed</a>
                </li>
                <li>
                    <a href="#" className="hover:text-gray-400">Discover</a>
                </li>
                <li>
                    <a href="#" className="hover:text-gray-400">+</a>
                </li>
                <li>
                    <a href="#" className="hover:text-gray-400">Search</a>
                </li>
                <li>
                    <a href="#" className="hover:text-gray-400">Notifcation</a>
                </li>
                <li>
                    <a href="#" className="hover:text-gray-400">User</a>
                </li>
            </ul>
        </nav> 
    );
};
export default Navbar;