import React, { useState, useRef, useEffect } from "react";
import dummyInitLogo from "../../assets/dummyInitLogo.png";
import { GrLocation } from "react-icons/gr";
import EventDetailsCard from "./EventDetailsCard";
import { dateFormat, formatDay, formatTimeRange } from '../../utils/dates';
import { truncate } from "../../utils/truncate";
import { LuAward } from "react-icons/lu";
import dummyEventCardCover from "../../assets/dummyEventCardCover.jpg";
import dummyAvatar0 from "../../assets/dummy-avatar0.png";
import dummyAvatar1 from "../../assets/dummy-avatar1.png";
import dummyAvatar2 from "../../assets/dummy-avatar2.png";


function EventCard({
  id = 0,
  title = "Untitled Event",
  date = "TBD",
  host = "Unknown Host",
  location = "Location TBD",
  attendees = 79,
  capacity = "N/A",
  tags=[],
  profilebanner = "",
  hostLogo = dummyInitLogo,
  description= "No detailed description available.",
  universityName = "Florida International University",
  is_rsvped = false,
  show_model= true,
  onRsvpUpdate=()=>{}
}) {
  const [showDetails, setShowDetails] = useState(false);
  const cardRef = useRef(null);
  const [numAttendees, setNumAttendees] = useState(attendees);
  const [numCapacity, setNumCapacity] = useState(capacity);
  const [isRSVP, setIsRSVP] = useState(is_rsvped);

  useEffect(() => {
    setIsRSVP(is_rsvped);
    setNumAttendees(attendees);
    setNumCapacity(capacity)
  }, [is_rsvped, attendees]);

  // Click outside  to close the details card
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

  // Handle RSVP updates locally before propagating up
  const handleLocalRsvpUpdate = (eventId, newRsvpState) => {
    setIsRSVP(newRsvpState);
    // Propagate change upward
    onRsvpUpdate(eventId, newRsvpState);
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
        className="relative w-[237.5px] h-[268.75px] bg-white border-[1.5px] border-black shadow-[2px_2px_0px_#000000] rounded-xl 
                      hover:shadow-[4px_4px_0_#000] duration-200 transition-all transform hover:-translate-y-1 flex flex-col cursor-pointer"
        onClick={handleOnClick}
      >
        {/* Event Banner */}
        <div className="relative w-full h-[142.75px] mb-2.5 border-black rounded-t-[10.5px] border-b-[1.5px] overflow-hidden">
          <p className="absolute top-2 left-2 bg-[#4D9FFD] text-black px-1.5 py-px rounded-[3px] text-[10px] border-solid border border-black">
            {dateFormat(date)}
          </p>
          <div className="absolute top-2 right-2 bg-yellow-100 text-black text-[10px] px-1.5 py-px rounded-[3px] border-solid border border-black flex items-center gap-1">
            <LuAward className="h-3 w-3" />
            20
          </div>
          <img
            src={profilebanner || dummyEventCardCover}
            alt="Event Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <h3 className="absolute font-bold top-[147.5px] left-[10px] w-[207.5px] h-[23.75px] leading-[23.75px]">
          {truncate(title, 20)}
        </h3>

        {/* Host & Location */}
        <div className="absolute top-[176.75px] left-[10px] flex items-center gap-1.5 mb-1.25">
          <img
            src={hostLogo}
            alt="Host Logo"
            className="w-4 h-4 object-cover rounded-full"
          />
          <p className="text-[12px] text-[#8F8F8F]">{host}</p>
        </div>
        <div className="absolute top-[199.5px] left-[10px] flex items-center gap-1">
          <GrLocation className="text-[#8F8F8F] w-4 h-4" />
          <p className="text-[12px] text-[#8F8F8F]">{location}</p>
        </div>

        {/* Divider */}
        <div className="absolute bottom-[40px] border-t border-t-gray-200 w-full" />

        {/* Profile Images and Going Count */}
        <div className="absolute bottom-[11.5px] left-[10px] flex items-center gap-1">
          {/* Avatars */}
          <div className="flex items-center">
            <img
              src={dummyAvatar0}
              alt="Attendee 1"
              className="w-5 h-5 object-cover rounded-full border border-white"
            />
            <img
              src={dummyAvatar1}
              alt="Attendee 2"
              className="w-5 h-5 object-cover rounded-full border border-white -ml-[6px]"
            />
            <img
              src={dummyAvatar2}
              alt="Attendee 3"
              className="w-5 h-5 object-cover rounded-full border border-white -ml-[6px]"
            />
          </div>

          {/* Number of People Going */}
          <p className="text-[10px] text-black">{numAttendees} GOING</p>
        </div>

        {/* Spots Left */}
        <div className="absolute bottom-[12.5px] right-[10px]">
          <p className="text-[12.5px]" style={{ color: spotsLeftColor }}>
            {spotsLeft} spots left
          </p>
        </div>
      </div>

      {/* Event Details Card */}
      {showDetails && show_model && (
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
          tags={tags}
          setCapacity={setNumCapacity}
          image={profilebanner}
          isRSVP={isRSVP}
          setIsRSVP={setIsRSVP}
          onRsvpUpdate={handleLocalRsvpUpdate}
        />
      )}
    </>
  );
}

export default EventCard;
