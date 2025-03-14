import React from "react";
import dummyEventCardCover from "../assets/dummyEventCardCover.jpg";

function EventModalCard({ 
  title = "Untitled Event", 
  date = "TBD", 
  host = "Unknown Host", 
  image = dummyEventCardCover 
}) {
  
  function handleTitleLength(eventTitle) {
    const maxLength = 29;
    return eventTitle.length > maxLength ? eventTitle.slice(0, maxLength) + "..." : eventTitle;
  }

  return (
    <div className="container flex gap-3 w-full px-4 py-3 bg-gray-800 rounded-md hover:bg-gray-700 transition">
      <img src={image} alt="Event" className="w-16 h-16 rounded-lg object-cover" />
      <div className="flex flex-col gap-1 justify-between">
        {/* Event Date */}
        <p className="text-white text-xs">{date}</p>
        {/* Event Title */}
        <p className="text-white text-sm font-bold leading-none">
          {handleTitleLength(title)}
        </p>
        {/* Event Host */}
        <p className="text-gray-300 text-xs">Hosted by: {host}</p>
      </div>
    </div>
  );
}

export default EventModalCard;
