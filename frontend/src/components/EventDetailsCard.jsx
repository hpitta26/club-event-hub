import React from "react";
import { FiChevronsRight } from "react-icons/fi";
import { FiCalendar, FiMapPin, FiUsers } from "react-icons/fi";
import dummyEventCardCover from "../assets/dummyEventCardCover.jpg";
import dummyInitLogo from "../assets/dummyInitLogo.png";

function EventDetailsCard({
  isOpen = false,
  title = "Intro To LLMs",
  club = "INIT FIU",
  day = "Tuesday, March 19th",
  time = "6:00 PM - 8:00 PM EST",
  description = "Join us for an introductory workshop on Large Language Models (LLMs). Learn about the fundamentals of LLMs, their applications, and get hands-on experience with popular models. Perfect for beginners and intermediate developers interested in AI.",
  universityName = "Florida International University",
  roomLocation = "PG 6 - 106",
  attendees = 191,
  capacity = "200-300",
  onClose = () => {},
  profilePicture = dummyInitLogo,
  image = dummyEventCardCover,
}) {
  if (!isOpen) return null;

  const handleCardClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed top-0 right-0 z-50 h-screen flex items-start justify-end p-4">
      {/* Dark overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div
        className="event-details-card container flex flex-col items-start justify-start bg-[#F0EFEB] p-6 gap-4 w-96 h-[calc(100vh-2rem)] overflow-y-auto z-50 rounded-lg border-black border-2 shadow-[3px_3px_0px_#000000]"
        onClick={handleCardClick}
      >
        <div>
          {/* Icon Button */}
          <FiChevronsRight
            className="cursor-pointer text-lg font-extrabold"
            onClick={onClose}
          />
        </div>

        {/* Event Image */}
        <img
          src={image}
          alt={title}
          className="rounded-lg w-full h-64 object-cover border-black border-2"
        />

        {/* Event Title and RSVP Button */}
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <button className="bg-[#FD4DB7] text-black py-1 px-4 rounded-md text-sm font-semibold border-black border-[1.5px]">
            RSVP
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {/* Club Name */}
          <div className="flex items-center gap-2">
            <img
              src={profilePicture}
              className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center"
            ></img>
            <span className="text-sm text-black uppercase">{club}</span>
          </div>
          {/* Date and Time */}
          <div className="flex items-center gap-2">
            <FiCalendar className="text-gray-500 w-6 h-6" />
            <div className="flex flex-col">
              <span className="text-sm">{day}</span>
              <span className="text-xs text-[#7D7D7D]">{time}</span>
            </div>
          </div>
          {/* Location */}
          <div className="flex items-center gap-2">
            <FiMapPin className="text-gray-500 w-6 h-6" />
            <div className="flex flex-col">
              <span className="text-sm">{universityName}</span>
              <span className="text-xs text-[#7D7D7D]">{roomLocation}</span>
            </div>
          </div>
        </div>

        {/* About this event */}
        <div className="w-full">
          <h2 className="font-semibold text-lg mb-1">About this event</h2>
          <p className="text-sm text-[#7D7D7D]">{description}</p>
        </div>

        <div className="flex-grow"></div>

        {/* Attendees */}
        <div className="w-full">
          <h2 className="font-medium text-base mb-3">Attendees</h2>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {[1, 2, 3].map((i) => (
                <img
                  src={dummyInitLogo}
                  alt={`Attendee ${i}`}
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white -mr-2 object-cover"
                  style={{ zIndex: i }}
                />
              ))}
              <p className="text-sm text-gray-500 ml-3">{attendees} GOING</p>
            </div>

            <div className="flex items-center gap-2">
              <FiUsers className="text-gray-500 w-6 h-6" />
              <span className="text-sm text-gray-500">{capacity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsCard;
