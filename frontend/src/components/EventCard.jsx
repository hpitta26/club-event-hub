import React, { useState, useRef, useEffect } from "react";
import dummyEventCardCover from "../assets/dummyEventCardCover.jpg";
import dummyInitLogo from "../assets/dummyInitLogo.png";
import { GrLocation } from "react-icons/gr";
import EventDetailsCard from "./EventDetailsCard";
import { dateFormat, formatDay, formatTimeRange } from '../utils/dates';
import { truncate } from "../utils/truncate";

function EventCard({
  id = 0,
  title = "Untitled Event",
  date = "TBD",
  host = "Unknown Host",
  location = "Location TBD",
  attendees = 79,
  capacity = "N/A",
  coverImage = dummyEventCardCover,
  hostLogo = dummyInitLogo,
  description= "No detailed description available.",
  universityName = "Florida International University",
  is_rsvped = false,
}) {
  const [showDetails, setShowDetails] = useState(false);
  const cardRef = useRef(null);
  const [numAttendees, setNumAttendees] = useState(attendees);
  const [numCapacity, setNumCapacity] = useState(capacity);
  const [isRSVP, setIsRSVP] = useState(is_rsvped);

  // Click outside to close the details card
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showDetails &&
        cardRef.current &&
        !cardRef.current.contains(event.target)
      ) {
        const detailsCard = document.querySelector(".event-details-card");
        if (!detailsCard || !detailsCard.contains(event.target)) {
          setShowDetails(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDetails]);

  const handleOnClick = () => {
    setShowDetails(true);
  };
  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const spotsLeft = numCapacity === "N/A" ? "N/A" : numCapacity;
  let spotsLeftColor = "#35A25D"; // Default color for 30+ spots

  if (spotsLeft === 0) {
    spotsLeftColor = "#FD4D50"; // Color for 0 spots
  } else if (spotsLeft > 0 && spotsLeft <= 30) {
    spotsLeftColor = "#D0A711"; // Color for 1-30 spots
  }

  return (
    <>
      <div
        ref={cardRef}
        className="relative w-full h-auto bg-white border-[1.5px] border-black shadow-[2px_2px_0px_#000000] rounded-xl 
                      hover:shadow-[2px_2px_0px_#000000] transition-transform transform hover:scale-[1.02] p-2 sm:p-2.5 flex flex-col cursor-pointer"
        onClick={handleOnClick}
      >
        {/* Event Banner */}
        <div className="relative w-full h-[80px] sm:h-[123.75px] mb-2 sm:mb-2.5 border-[2px] sm:border-[2.5px] border-black rounded-lg overflow-hidden">
          <p className="absolute top-1 left-1 sm:top-1.5 sm:left-1.5 bg-blue-500 text-white px-1 py-0.5 sm:px-1.5 sm:py-0.625 rounded-md text-[8px] sm:text-[10px] font-medium border shadow-[1px_1px_0px_#000000] sm:shadow-[2px_2px_0px_#000000] border-black">
            {dateFormat(date)}
          </p>
          <img
            src={coverImage}
            alt="Event Cover"
            className="w-full h-full object-cover rounded-sm"
          />
        </div>

        {/* Title */}
        <p className="font-semibold text-[14px] sm:text-[20px] leading-tight sm:leading-[23.75px] mb-1 sm:mb-2">
          {truncate(title, 25)}
        </p>

        {/* Host & Location */}
        <div className="flex items-center gap-1 sm:gap-1.5 mb-1">
          <img
            src={hostLogo}
            alt="Host Logo"
            className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] object-cover rounded-full"
          />
          <p className="text-[10px] sm:text-[12.5px] text-[#8F8F8F]">{truncate(host, 20)}</p>
        </div>
        <div className="flex items-center gap-1 sm:gap-1.5 mb-2 sm:mb-3">
          <GrLocation className="text-[#4EA0FD] w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" />
          <p className="text-[10px] sm:text-[12.5px] text-[#8F8F8F]">{truncate(location, 20)}</p>
        </div>

        {/* Bottom Row: Profile Images, Going Count, and Spots Left */}
        <div className="flex justify-between items-center mt-auto">
          {/* Avatars and Going Count */}
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              <img
                src={dummyInitLogo}
                alt="Attendee 1"
                className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] object-cover rounded-full border border-white"
              />
              <img
                src={dummyInitLogo}
                alt="Attendee 2"
                className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] object-cover rounded-full border border-white -ml-[4px] sm:-ml-[6px]"
              />
              <img
                src={dummyInitLogo}
                alt="Attendee 3"
                className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] object-cover rounded-full border border-white -ml-[4px] sm:-ml-[6px]"
              />
            </div>
            <p className="text-[8px] sm:text-[10px] text-black">{numAttendees} GOING</p>
          </div>

          {/* Spots Left */}
          <p className="text-[10px] sm:text-[12.5px]" style={{ color: spotsLeftColor }}>
            {spotsLeft} spots left
          </p>
        </div>
      </div>

      {/* Event Details Card */}
      {showDetails && (
        <EventDetailsCard
          event_id={id}
          isOpen={showDetails}
          onClose={handleCloseDetails}
          title={title}
          club={host}
          day={formatDay(date)}
          time={formatTimeRange(date)}
          description={description}
          universityName={universityName}
          roomLocation={location}
          attendees={numAttendees}
          setAttendees={setNumAttendees}
          capacity={numCapacity}
          setCapacity={setNumCapacity}
          image={coverImage}
          isRSVP={isRSVP}
          setIsRSVP={setIsRSVP}
        />
      )}
    </>
  );
}

export default EventCard;