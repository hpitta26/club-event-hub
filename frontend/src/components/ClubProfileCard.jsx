import React from "react";
import dummyEventCardCover from "../assets/dummyEventCardCover.jpg";
import dummyInitLogo from "../assets/dummyInitLogo.png";
import { GrLocation } from "react-icons/gr"
import { truncate } from "../utils/truncate";
import { dateFormat } from "../utils/dates";

function ClubProfileCard({
  title = "Untitled Event",
  date = "TBD",
  host = "Unknown Host",
  location = "Location TBD",
  attendees = 79,
  capacity = "N/A",
  coverImage = dummyEventCardCover,
  hostLogo = dummyInitLogo,
}) {
  const spotsLeft = capacity === "N/A" ? "N/A" : capacity;
  let spotsLeftColor = "#35A25D"; // Default color for 30+ spots

  if (spotsLeft === 0) {
    spotsLeftColor = "#FD4D50"; // Color for 0 spots
  } else if (spotsLeft > 0 && spotsLeft <= 30) {
    spotsLeftColor = "#D0A711"; // Color for 1-30 spots
  }

  return (
    <div
      className="relative w-[200.5px] h-[250.75px] bg-white border-[1.5px] border-black shadow-[2px_2px_0px_#000000] rounded-xl
                    hover:shadow-[2px_2px_0px_#000000] transition-transform transform hover:scale-[1.02] p-2.5 flex flex-col cursor-pointer"
    >
      {/* Event Banner */}
      <div className="relative w-[177.5px] h-[123.75px] mb-2.5 border-[2.5px] border-black rounded-lg overflow-hidden">
        <p
          className="absolute top-1.5 left-1.5 bg-blue-500 text-white px-1.5 py-0.625 rounded-md text-[10px] font-medium
                  border shadow-[2px_2px_0px_#000000] border-black"
        >
          {dateFormat(date)}
        </p>
        <img
          src={coverImage}
          alt="Event Cover"
          className="w-full h-full object-cover rounded-sm"
        />
      </div>

      {/* Title */}
      <p className="absolute top-[137.5px] left-[15px] w-[207.5px] h-[23.75px] font-semibold text-[20px] leading-[23.75px]">
        {truncate(title, 30)}
      </p>

      {/* Host & Location */}
      <div className="absolute top-[166.75px] left-[15px] flex items-center gap-1.5 mb-1.25">
        <img
          src={hostLogo}
          alt="Host Logo"
          className="w-[18px] h-[18px] object-cover rounded-full"
        />
        <p className="text-[12.5px] text-[#8F8F8F]">{host}</p>
      </div>
      <div className="absolute top-[189.5px] left-[15px] flex items-center gap-1.5">
        <GrLocation className="text-[#4EA0FD] w-[18px] h-[18px]" />
        <p className="text-[12.5px] text-[#8F8F8F]">{location}</p>
      </div>

      {/* Profile Images and Going Count */}
      <div className="absolute bottom-[12.5px] left-[15px] flex items-center gap-1.5">
        {/* Avatars */}
        <div className="flex items-center">
          <img
            src={dummyInitLogo}
            alt="Attendee 1"
            className="w-[20px] h-[20px] object-cover rounded-full border border-white"
          />
          <img
            src={dummyInitLogo}
            alt="Attendee 2"
            className="w-[20px] h-[20px] object-cover rounded-full border border-white -ml-[6px]"
          />
          <img
            src={dummyInitLogo}
            alt="Attendee 3"
            className="w-[20px] h-[20px] object-cover rounded-full border border-white -ml-[6px]"
          />
        </div>

        {/* Number of People Going */}
        <p className="text-[10px] text-black">{attendees} GOING</p>
      </div>

      {/* Spots Left */}
      <div className="absolute bottom-[15px] right-[15px]">
        <p className="text-[10px]" style={{ color: spotsLeftColor }}>
          {spotsLeft} spots left
        </p>
      </div>
    </div>
  );
}

export default ClubProfileCard;
