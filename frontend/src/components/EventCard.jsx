import React from "react";
import dummyEventCardCover from "../assets/dummyEventCardCover.jpg";
import dummyInitLogo from "../assets/dummyInitLogo.png";
import { FaLocationDot } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";

function EventCard({
  title = "Untitled Event",
  date = "TBD",
  host = "Unknown Host",
  location = "Location TBD",
  attendees = 0,
  capacity = "N/A",
  coverImage = dummyEventCardCover,
  hostLogo = dummyInitLogo,
}) {
  function handleTitleLength(eventTitle) {
    const maxLength = 23;
    return eventTitle.length > maxLength ? eventTitle.slice(0, maxLength) + "..." : eventTitle;
  }

  return (
    <div className="flex flex-col bg-[#F5F5F5] w-full sm:w-80 min-h-[360px] p-4 rounded-3xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="flex flex-col justify-start gap-2 flex-grow">
        
        {/* Event Banner */}
        <div className="relative w-full h-48">
          <p className="absolute top-2 left-2 bg-gray-800 bg-opacity-75 text-white px-2 py-1 rounded-md text-xs">
            {date}
          </p>
          <img
            src={coverImage}
            alt="Event Cover"
            className="rounded-lg w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <p className="text-lg sm:text-xl font-extrabold">{handleTitleLength(title)}</p>

        {/* Host Club */}
        <div className="flex flex-row gap-2 items-center">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img src={hostLogo} alt="Host Logo" className="w-full h-full object-cover" />
          </div>
          <p className="text-sm text-gray-700">{host}</p>
        </div>

        {/* Location */}
        <div className="flex flex-row gap-2 items-center">
          <FaLocationDot className="text-orange-400" />
          <p className="text-sm font-semibold">{location}</p>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="flex flex-row gap-2 items-center mt-auto justify-between">
        {/* People Going */}
        <div className="flex -space-x-2 items-center">
          {[...Array(4)].map((_, index) => (
            <FaCircleUser key={index} className="text-gray-600 w-6 h-6 ring-2 bg-white ring-white rounded-full" />
          ))}
          <div className="w-8 h-6 px-4 bg-[#D0FDA0] text-black rounded-full ring-2 ring-white flex items-center justify-center text-center">
            <p className="text-[10px] font-bold text-center">
              <span className="font-black">+</span> {attendees}
            </p>
          </div>
        </div>

        {/* Capacity */}
        <div className="flex flex-row gap-2 items-center">
          <IoMdPerson className="text-xl" />
          <p className="text-sm font-bold">{capacity}</p>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
