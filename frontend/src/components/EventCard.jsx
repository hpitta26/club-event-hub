import React from "react";
import dummyEventCardCover from "../assets/dummyEventCardCover.jpg";
import dummyInitLogo from "../assets/dummyInitLogo.png";
import { FaLocationDot } from "react-icons/fa6";
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
    const maxLength = 30;
    return eventTitle.length > maxLength
      ? eventTitle.slice(0, maxLength) + "..."
      : eventTitle;
  }
  function formatDate(isoString) {
    if (!isoString || isoString === "TBD") return "TBD"; // Handle empty or "TBD" dates

    const dateObj = new Date(isoString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short", // Abbreviated month (e.g., "Mar")
      day: "numeric", // Day number (e.g., "8")
      hour: "numeric", // Hour (e.g., "7 PM")
      hour12: true, // Use 12-hour format
    }).format(dateObj);
  }

  const spotsLeft = capacity === "N/A" ? "N/A" : capacity;

  return (
    <div
      className="relative w-72 min-h-[350px] bg-white border-4 border-black rounded-xl shadow-sm 
                    hover:shadow-md transition-transform transform hover:scale-105 p-4 flex flex-col"
    >
      {/* Event Banner */}
      <div className="relative w-full h-40 mb-3 border-2 border-black rounded-lg overflow-hidden">
        <p
          className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-md text-sm font-medium 
                  border-2 border-black"
        >
          {formatDate(date)}
        </p>
        <img
          src={coverImage}
          alt="Event Cover"
          className="w-full h-full object-cover rounded-sm"
        />
      </div>

      {/* Title */}
      <p className="text-xl font-bold mb-1 leading-tight">
        {handleTitleLength(title)}
      </p>

      {/* Host & Location */}
      <div className="flex items-center gap-2 mb-1">
        <img
          src={hostLogo}
          alt="Host Logo"
          className="w-6 h-6 object-cover rounded-full border border-gray-300"
        />
        <p className="text-sm font-semibold">{host}</p>
      </div>
      <div className="flex items-center gap-2">
        <FaLocationDot className="text-gray-600" />
        <p className="text-sm text-gray-700">{location}</p>
      </div>

      <div className="mt-auto flex justify-between items-center pt-2 border-t border-gray-300">
        {/* Going */}
        <div className="flex items-center gap-1">
          <IoMdPerson className="text-gray-600" />
          <p className="text-sm font-semibold">{attendees} GOING</p>
        </div>

        {/* Spots Left */}
        <p className="text-sm font-semibold text-blue-600">
          {spotsLeft} spots left
        </p>
      </div>
    </div>
  );
}

export default EventCard;
