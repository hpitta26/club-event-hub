import React from "react";

const Sidebar = () => {
    return (
        <aside className="w-72 md:w-1/4 lg:w-1/5 bg-black text-white min-h-screen p-6">
            {/* New Events Section */}
            <h2 className="font-semibold text-lg text-gray-300 mb-3 tracking-wide">New</h2>
            <div className="space-y-3">
                <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">Event 1</div>
                <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">Event 2</div>
                <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">Event 3</div>
            </div>

            {/* Featured Events Section */}
            <h2 className="font-semibold text-lg text-gray-300 mt-8 mb-3 tracking-wide">Featured</h2>
            <div className="space-y-3">
                <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">Featured 1</div>
                <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">Featured 2</div>
            </div>
        </aside>
    );
};

export default Sidebar;
