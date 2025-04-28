import React from "react";
import dummyEventCardCover from "../../assets/dummyEventCardCover.jpg";
import { truncate } from "../../utils/truncate";
import { dateFormat } from "../../utils/dates";
import { GrLocation } from "react-icons/gr"
import { LuUsers } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";

function EventListCard({
  title = "Untitled Event",
  date = "TBD",
  capacity = "N/A",
  host = "Unknown Host",
  image = dummyEventCardCover,
}) {
  const spotsLeft = capacity === "N/A" ? "N/A" : capacity;
  let spotsLeftColor = "text-green-600";

  if (spotsLeft === 0) {
    spotsLeftColor = "text-red-500";
  } else if (spotsLeft > 0 && spotsLeft <= 30) {
    spotsLeftColor = "text-yellow-600";
  }

  return (
    <div className="border shadow-[3px_3px_0_#000] hover:shadow-[4px_4px_0_#000] transition-all duration-300 bg-white rounded-[12px] border-black flex max-w-[600px] w-full transform hover:-translate-y-1">
      <div className="w-[130px] min-w-[130px]">
        <img
          src={image || dummyEventCardCover}
          alt={title}
          className="w-full h-full object-cover border-r-2 border-black rounded-l-[12px]"
        />
      </div>
      <div className="flex flex-col flex-grow p-4 justify-between">
        <div>
          <div className={"flex justify-between items-center"}>
            <h3 className="text-lg font-bold line-clamp-1">{truncate(title, 60)}</h3>
            <FaEdit className="cursor-pointer text-xl" />
          </div>
          <p className="text-sm text-[#6b7280] mt-1 font-medium">Hosted by: {host}</p>
        </div>

        <div className="flex justify-between items-end mt-3">
          <div className="flex items-center gap-1 text-sm text-[#6b7280]">
            <GrLocation  className="h-4 w-4" />
            <span>{dateFormat(date)}</span>
          </div>

          <div className={`text-sm font-semibold ${spotsLeftColor} flex items-center gap-1`}>
            <LuUsers className="h-4 w-4 text-gray-500" />
            {spotsLeft} spots left
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventListCard;