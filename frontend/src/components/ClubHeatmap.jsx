import React, { useState, useEffect } from "react";
import { FiCalendar } from "react-icons/fi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import backend from "../components/backend.jsx";

function ClubHeatmap() {
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const startHour = Math.floor(i / 2) + 10; // Start at 10am
    const startMinutes = i % 2 === 0 ? "00" : "30";
    return `${startHour.toString().padStart(2, "0")}:${startMinutes}`;
  });
  const timeLabels = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 10; // Start at 10am
    return `${hour > 12 ? hour - 12 : hour}${hour >= 12 ? "pm" : "am"}`;
  });
  const days = ["Mon", "Tues", "Wed", "Thurs", "Fri"];
  const [currentWeek, setCurrentWeek] = useState(0);

  // Function to calculate the date range for the current week
  const getWeekDateRange = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + currentWeek * 7);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 4); // 5 days (Mon-Fri)

    const formatDate = (date) => {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };

    return `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;
  };

  // Function to handle week navigation
  const navigateWeek = (direction) => {
    setCurrentWeek((prev) => prev + direction);
  };

  // Function to check if a cell is in the past or today
  const isCellInPast = (dayIndex) => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const adjustedDayIndex = currentDay === 0 ? 6 : currentDay - 1; // Adjust to match Mon-Fri (0-4)

    // If it's the current week, gray out today and past days
    if (currentWeek === 0 && dayIndex <= adjustedDayIndex) {
      return true;
    }

    // If it's a previous week, all cells are in the past
    if (currentWeek < 0) {
      return true;
    }

    return false;
  };


  return (
    <section className="flex flex-col items-center pt-10">
      <div className="w-full max-w-[1200px] space-y-5 p-6">
        {/* Header with week navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateWeek(-1)}
            className={`px-4 py-2 rounded flex items-center ${
              currentWeek === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"
            }`}
            disabled={currentWeek === 0} // Disable button if it's the current week
          >
            <IoChevronBack className="mr-2" /> {/* Icon before text */}
            Previous Week
          </button>

          <h2 className="text-lg font-semibold flex items-center">
            <FiCalendar className="mr-2" /> {/* Icon */}
            {getWeekDateRange()}
          </h2>

          <button
            onClick={() => navigateWeek(1)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center"
          >
            Next Week
            <IoChevronForward className="ml-2" /> {/* Icon after text */}
          </button>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto">
          <div className="grid grid-cols-[60px_repeat(5,_1fr)] gap-1">
            {/* Days Header */}
            <div></div> {/* Empty top-left corner */}
            {days.map((day, index) => (
              <div key={day} className="text-center font-bold text-lg">
                {day}
              </div>
            ))}

            {/* Time Rows */}
            {timeSlots.map((timeSlot, index) => (
              <React.Fragment key={timeSlot}>
                {/* Time Label */}
                {index % 2 === 0 ? (
                  <div className="text-right text-xs pr-2 font-medium">{timeLabels[Math.floor(index / 2)]}</div>
                ) : (
                  <div></div>
                )}

                {/* Day Columns */}
                {days.map((day, dayIndex) => (
                  <div
                    key={`${day}-${timeSlot}`}
                    className={`py-2 border border-gray-300 rounded ${
                      isCellInPast(dayIndex) ? "bg-gray-200 cursor-not-allowed" : "bg-blue-200"
                    }`}
                  ></div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClubHeatmap;