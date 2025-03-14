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
  let spotsLeftColor = "#35A25D"; // Default color for 30+ spots

  if (spotsLeft === 0) {
    spotsLeftColor = "#FD4D50"; // Color for 0 spots
  } else if (spotsLeft > 0 && spotsLeft <= 30) {
    spotsLeftColor = "#D0A711"; // Color for 1-30 spots
  }

  return (
    <div
      className="relative w-[237.5px] h-[268.75px] bg-[#F0EFEB] border-2 border-black rounded-xl shadow-sm 
                    hover:shadow-md transition-transform transform hover:scale-105 p-2.5 flex flex-col"
    >
      {/* Event Banner */}
      <div className="relative w-[212.5px] h-[123.75px] mb-2.5 border-2 border-black rounded-lg overflow-hidden">
        <p
          className="absolute top-1.5 left-1.5 bg-blue-500 text-white px-1.5 py-0.625 rounded-md text-[10px] font-medium 
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
      <p className="absolute top-[137.5px] left-[15px] w-[207.5px] h-[23.75px] font-semibold text-[20px] leading-[23.75px]">
        {handleTitleLength(title)}
      </p>

      {/* Host & Location */}
      <div className="absolute top-[168.75px] left-[15px] flex items-center gap-1.5 mb-1.25">
        <img
          src={hostLogo}
          alt="Host Logo"
          className="w-[15px] h-[15px] object-cover rounded-full border border-gray-300"
        />
        <p className="text-[12.5px] text-[#8F8F8F]">{host}</p>
      </div>
      <div className="absolute top-[187.5px] left-[15px] flex items-center gap-1.5">
        <FaLocationDot className="text-gray-600 w-[15px] h-[15px]" />
        <p className="text-[12.5px] text-[#8F8F8F]">{location}</p>
      </div>

      <div className="absolute bottom-[12.5px] left-[15px] flex justify-between items-center w-[207.5px]">
        {/* Going */}
        <div className="flex items-center gap-1.25">
          <IoMdPerson className="text-gray-600 w-[15px] h-[15px]" />
          <p className="text-[12.5px] text-[#000000]">{attendees} GOING</p>
        </div>

        {/* Spots Left */}
        <p className="text-[12.5px]" style={{ color: spotsLeftColor }}>
          {spotsLeft} spots left
        </p>
      </div>
    </div>
  );
}

export default EventCard;
