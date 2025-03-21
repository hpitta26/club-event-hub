import React from 'react';
import { FiChevronsRight } from "react-icons/fi";
import { FiCalendar, FiMapPin, FiUsers } from "react-icons/fi";

import dummyEventCardCover from "../assets/dummyEventCardCover.jpg";

function EventDetailsCard({
    title="Intro To LLMs", 
    club="INIT FIU", 
    day="Tuesday, March 19th", 
    time="6:00 PM - 8:00 PM EST",
    description="Join us for an introductory workshop on Large Language Models (LLMs). Learn about the fundamentals of LLMs, their applications, and get hands-on experience with popular models. Perfect for beginners and intermediate developers interested in AI.",
    universityName="Florida International University",
    roomLocation="PG 6 - 106",
    attendees=191,
    capacity="200-300",
    onClose = () => {},
}) {
  
  return (
    <div className="fixed top-0 right-0 z-50 h-screen flex items-start justify-end p-4">
      <div className="container flex flex-col items-start justify-start bg-neutral-200 p-6 gap-4 w-96 shadow-lg h-[calc(100vh-2rem)] overflow-y-auto">
        <div>
          {/* Icon Button */}
          <FiChevronsRight className="cursor-pointer text-lg" onClick={() => onClose()} />
        </div>
        
        {/* Event Image */}
        <img src={dummyEventCardCover} alt="" className='rounded-lg w-full h-64 object-cover' />

        {/* Event Title and RSVP Button */}
        <div className='flex flex-row justify-between items-center w-full mt-2'>
          <h1 className='text-2xl font-semibold'>{title}</h1>
          <button className='bg-black text-white py-1 px-4 rounded-md text-sm font-medium'>RSVP</button>
        </div>

        {/* Club Name */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center"></div>
          <span className="text-sm text-gray-500 uppercase">{club}</span>
        </div>

        {/* Date and Time */}
        <div className="flex items-center gap-2">
          <FiCalendar className="text-gray-500 text-xl" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{day}</span>
            <span className="text-xs text-gray-600">{time}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2">
          <FiMapPin className="text-gray-500 text-2xl" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{universityName}</span>
            <span className="text-xs text-gray-600">{roomLocation}</span>
          </div>
        </div>

        {/* About this event */}
        <div className="w-full">
          <h2 className="font-medium text-base mb-2">About this event</h2>
          <p className="text-sm text-gray-700">{description}</p>
        </div>
        
        {/* Adding space to push attendees to bottom */}
        <div className="flex-grow"></div>
        
        {/* Attendees */}
        <div className="w-full">
          <h2 className="font-medium text-base mb-3">Attendees</h2>
          <div className="flex justify-between items-center">
            <div className="flex">
              {/* Three identical gray circles */}
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gray-400 border-2 border-white -mr-2"
                  style={{ zIndex: i }}
                />
              ))}
              
              {/* Circle */}
              <div 
                className="w-10 h-10 rounded-full bg-gray-400 border-2 border-white flex items-center justify-center"
                style={{ zIndex: 4 }}
              >
                <span className="text-xs font-medium text-white">+{attendees}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <FiUsers className="text-gray-400" />
              <span className="text-sm text-gray-600">{capacity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsCard;