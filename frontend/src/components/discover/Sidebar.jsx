import React, { useState } from "react";
import ClubCard from "./ClubCard";
import dummyEventCardCover from "../../assets/dummyEventCardCover.jpg";
import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Static event data (replace with API data later)
  const newEvents = [
    {
      id: 1,
      title: "Code Camp",
      date: "Aug 20 - 5:00 PM",
      host: "CodeHub",
      image: dummyEventCardCover,
    },
    {
      id: 2,
      title: "Yoga Session",
      date: "Aug 21 - 6:00 PM",
      host: "Wellness Club",
      image: dummyEventCardCover,
    },
    {
      id: 3,
      title: "Basketball League",
      date: "Aug 22 - 7:00 PM",
      host: "Sports Society",
      image: dummyEventCardCover,
    },
  ];

  const featuredEvents = [
    {
      id: 4,
      title: "AI Workshop",
      date: "Aug 23 - 4:00 PM",
      host: "Tech Innovators",
      image: dummyEventCardCover,
    },
    {
      id: 5,
      title: "Nutrition Talk",
      date: "Aug 24 - 5:30 PM",
      host: "Healthy Living",
      image: dummyEventCardCover,
    },
  ];

  return (
    <div>
      {/* Sidebar Toggle Button */}
      <button
        className={`fixed z-50 lg:hidden bg-gray-800 text-white p-3 rounded-lg shadow-lg transition-all duration-300 hover:bg-gray-700
        ${isOpen ? "top-8 left-56" : "top-10 left-0"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoMdArrowBack size={8} /> : <IoMdArrowForward size={8} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-6 left-4 w-64 bg-gray text-black p-6 transition-transform duration-300 z-40 mt-5
    ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } lg:translate-x-0 lg:fixed min-h-screen overflow-y-auto`}
      >
        {/* New Events Section */}
        <h2 className="font-semibold text-lg text-black-300 mb-3 tracking-wide">
          New
        </h2>
        <div className="space-y-3">
          {newEvents.map((event) => (
            <ClubCard />
          ))}
        </div>

        {/* Featured Events Section */}
        <h2 className="font-semibold text-lg text-black mt-8 mb-3 tracking-wide">
          Featured
        </h2>
        <div className="space-y-3">
          {featuredEvents.map((event) => (
            <ClubCard />
          ))}
        </div>
      </aside>

      {/* Overlay (for mobile when sidebar is open) */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
