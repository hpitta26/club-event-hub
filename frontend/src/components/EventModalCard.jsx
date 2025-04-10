import React from "react";
import dummyEventCardCover from "../assets/dummyEventCardCover.jpg";
import { truncate } from "../utils/truncate";
import { dateFormat } from "../utils/dates";

function EventModalCard({ 
  title = "Untitled Event", 
  date = "TBD", 
  host = "Unknown Host", 
  image = dummyEventCardCover 
}) {
  return (
    <div className="container flex gap-3 w-full px-4 py-4 bg-[#F0EFEB] rounded-lg hover:bg-[#E0DFDB] transition border-2 border-black">
        <img src={image} alt="Event" className="w-[104px] h-[104px] rounded-lg object-cover border-2 border-black" />
        <div className="ml-1 flex flex-col gap-3 justify-center">
            {/* Event Date */}
            <p className="text-black font-semibold text-xs">
                {dateFormat(date)}
            </p>
            {/* Event Title */}
            <p className="text-black text-sm font-bold leading-none">
                {truncate(title, 29)} 
            </p>
            {/* Event Host */}
            <p className="text-black font-semibold text-xs">
                Hosted by: {host}
            </p>
        </div>
        <div className="flex items-center">
            <button className="bg-green-400 rounded-md py-2 px-3 hover:bg-green-500">
                Survey
            </button>
        </div>
    </div>
  );
};

export default EventModalCard;
