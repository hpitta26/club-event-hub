import React from "react";
import dummyEventCardCover from "../assets/dummyEventCardCover.jpg";

function EventListCard({ 
  title = "Untitled Event", 
  date = "TBD", 
  capacity = "N/A",
  host = "Unknown Host", 
  image = dummyEventCardCover 
}) {
  
  function handleTitleLength(eventTitle) {
    const maxLength = 29;
    return eventTitle.length > maxLength ? eventTitle.slice(0, maxLength) + "..." : eventTitle;
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
    <div className="container flex gap-3 w-full px-4 py-4 bg-[#F0EFEB] rounded-lg hover:bg-[#E0DFDB] transition border-2 border-black">
      <img src={image} alt="Event" className="w-[104px] h-[104px] rounded-lg object-cover border-2 border-black" />
      <div className="ml-1 flex flex-col gap-3 justify-center">
        {/* Event Date */}
        <p className="text-black font-semibold text-xs">
          {formatDate(date)}
        </p>
        {/* Event Title */}
        <p className="text-black text-sm font-bold leading-none">
          {handleTitleLength(title)} 
        </p>
        {/* Event Host */}
        <p className="text-black font-semibold text-xs">
          Hosted by: {host}
        </p>
        {/* Spots Left */}
        <p className="text-[12.5px]" style={{ color: spotsLeftColor }}>
          {spotsLeft} spots left
        </p>
      </div>
    </div>
  );
}

export default EventListCard;
