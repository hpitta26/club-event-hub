import React, { useState, useEffect } from "react";
import { FiClock } from "react-icons/fi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import backend from "../components/backend.jsx";

function ClubHeatmap({ onTimeRangeSelect }) {
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
  const [availabilityCounts, setAvailabilityCounts] = useState(
    Array(5).fill().map(() => Array(24).fill(0)) // 5 days, 24 time slots
  );
  
  const [isDragging, setIsDragging] = useState(false);
  const [selectionStartDay, setSelectionStartDay] = useState(null);
  const [selectionStartTime, setSelectionStartTime] = useState(null);
  const [selectedCells, setSelectedCells] = useState([]);

  const navigateWeek = (direction) => {
    setCurrentWeek((prev) => prev + direction);
  };

  const isCellInPast = (dayIndex) => {
    const today = new Date();
    const currentDay = today.getDay(); 
    const adjustedDayIndex = currentDay === 0 ? 6 : currentDay - 1; 
    if (currentWeek === 0 && dayIndex <= adjustedDayIndex) {
      return true;
    }
    if (currentWeek < 0) {
      return true;
    }
    return false;
  };

  const processAvailabilityData = (data) => {
    const newCounts = Array(5).fill().map(() => Array(24).fill(0));
    data.forEach(student => {
      if (student.availability) {
        Object.entries(student.availability).forEach(([day, slots]) => {
          const dayIndex = ["monday", "tuesday", "wednesday", "thursday", "friday"].indexOf(day.toLowerCase());
          if (dayIndex !== -1 && Array.isArray(slots)) {
            slots.forEach(slot => {
              const startTime = slot.split('-')[0];
              const timeIndex = timeSlots.indexOf(startTime);
              if (timeIndex !== -1) {
                newCounts[dayIndex][timeIndex]++;
              }
            });
          }
        });
      }
    });
    setAvailabilityCounts(newCounts);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await backend.get("all-student-schedules/");
        console.log(response.data.data);
        processAvailabilityData(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const getColorIntensity = (count, maxStudents) => {
    const maxIntensity = Math.max(1, maxStudents); // Avoid division by zero
    const intensity = count / maxIntensity;
    
    if (intensity === 0) return "bg-gray-50";
    if (intensity < 0.25) return "bg-blue-100";
    if (intensity < 0.5) return "bg-blue-200";
    if (intensity < 0.75) return "bg-blue-300";
    return "bg-blue-400";
  };

  const getSelectedColorIntensity = (count, maxStudents) => {
    const maxIntensity = Math.max(1, maxStudents); 
    const intensity = count / maxIntensity;
    
    if (intensity === 0) return "bg-gray-50";
    if (intensity < 0.25) return "bg-pink-100";
    if (intensity < 0.5) return "bg-pink-200";
    if (intensity < 0.75) return "bg-pink-300";
    return "bg-pink-400";
  };

  const maxStudents = Math.max(...availabilityCounts.flatMap(day => day));

  const getWeekDates = () => {
    const today = new Date();
    const dates = [];
    const startOfWeek = new Date(today);
    const dayOfWeek = startOfWeek.getDay();
    const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startOfWeek.setDate(startOfWeek.getDate() - daysFromMonday + (currentWeek * 7));

    for (let i = 0; i < 5; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };

  const formatTimeForDisplay = (timeSlot) => {
    const [hours, minutes] = timeSlot.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getSelectedTimeRangeText = () => {
    if (selectedCells.length === 0) {
      return "Select time slots to schedule your event";
    }

    const sortedCells = [...selectedCells].sort((a, b) => a.timeIndex - b.timeIndex);
    const firstCell = sortedCells[0];
    const lastCell = sortedCells[sortedCells.length - 1];
    const date = getWeekDates()[firstCell.dayIndex];
    const dayName = days[firstCell.dayIndex];
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const startTime = formatTimeForDisplay(timeSlots[firstCell.timeIndex]);
    const endTimeSlot = parseInt(timeSlots[lastCell.timeIndex].split(':')[0]);
    const endMinutes = timeSlots[lastCell.timeIndex].split(':')[1];
    let endHour = endTimeSlot;
    let endMinutes2 = endMinutes === "00" ? "30" : "00";
    if (endMinutes === "30") {
      endHour += 1;
    }
  
    const endTimeFormatted = `${endHour % 12 || 12}:${endMinutes2} ${endHour >= 12 ? 'PM' : 'AM'}`;
    
    return `${dayName}, ${formattedDate}: ${startTime} - ${endTimeFormatted}`;
  };

  const handleMouseDown = (dayIndex, timeIndex) => {
    if (isCellInPast(dayIndex)) return;
    
    setIsDragging(true);
    setSelectionStartDay(dayIndex);
    setSelectionStartTime(timeIndex);
    setSelectedCells([{ dayIndex, timeIndex }]);
  };

  const handleMouseEnter = (dayIndex, timeIndex) => {
    if (!isDragging || isCellInPast(dayIndex)) return;
    if (dayIndex !== selectionStartDay) return; // Only allow selection in the same day colum
    
    const minTimeIndex = Math.min(selectionStartTime, timeIndex);
    const maxTimeIndex = Math.max(selectionStartTime, timeIndex);
    
    const newSelectedCells = [];
    for (let t = minTimeIndex; t <= maxTimeIndex; t++) {
      newSelectedCells.push({ dayIndex, timeIndex: t });
    }
    
    setSelectedCells(newSelectedCells);
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    if (selectedCells.length > 0) {
      const sortedCells = [...selectedCells].sort((a, b) => a.timeIndex - b.timeIndex);
      const firstCell = sortedCells[0];
      const lastCell = sortedCells[sortedCells.length - 1];
      const date = getWeekDates()[firstCell.dayIndex];
      const startTime = timeSlots[firstCell.timeIndex];
      const endTimeSlot = parseInt(timeSlots[lastCell.timeIndex].split(':')[0]);
      const endMinutes = timeSlots[lastCell.timeIndex].split(':')[1];
      let endHour = endTimeSlot;
      let endMinutes2 = endMinutes === "00" ? "30" : "00";
      if (endMinutes === "30") {
        endHour += 1;
      }
      const endTime = `${endHour.toString().padStart(2, "0")}:${endMinutes2}`;

      onTimeRangeSelect({
        start_time: new Date(`${date.toISOString().split('T')[0]}T${startTime}`),
        end_time: new Date(`${date.toISOString().split('T')[0]}T${endTime}`),
      });
    }
  };

  const isCellSelected = (dayIndex, timeIndex) => {
    return selectedCells.some(cell => cell.dayIndex === dayIndex && cell.timeIndex === timeIndex);
  };

  const clearSelection = () => {
    setSelectedCells([]);
    onTimeRangeSelect('');
  };

  return (
    <section 
      className="flex flex-col items-center"
      onMouseUp={handleMouseUp} 
      onMouseLeave={handleMouseUp}
      style={{ userSelect: "none" }}
    >
      <div className="w-full max-w-[1200px] space-y-5 p-2">
        {/* Header with week navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateWeek(-1)}
            className={`px-3 py-2 rounded flex items-center ${
              currentWeek === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"
            }`}
            disabled={currentWeek === 0}
          >
            <IoChevronBack className="mr-2" />
            Prev Week
          </button>

          <div className="flex flex-col items-center">
            {selectedCells.length > 0 ? (
              <div className="flex items-center text-md bg-gray-100 px-3 py-2 rounded-md">
                <FiClock className="inline mr-2" />
                {getSelectedTimeRangeText()}
              </div>
            ) : (
              <div className="flex items-center text-md bg-gray-100 px-3 py-2 rounded-md">
                <FiClock className="inline mr-2" />
                Select times below
              </div>
            )}
          </div>

          <button
            onClick={() => navigateWeek(1)}
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center"
          >
            Next Week
            <IoChevronForward className="ml-2" />
          </button>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto pr-6">
          <div className="grid grid-cols-[60px_repeat(5,_1fr)] gap-1">
            <div></div> 
            {getWeekDates().map((date, index) => (
              <div key={index} className="text-center font-medium">
                <div className="text-md font-bold">{days[index]}</div>
                <div className="text-xs text-gray-600">
                  {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}

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
                    className={`py-2 border border-gray-300 rounded flex items-center justify-center text-xs 
                      ${isCellInPast(dayIndex) 
                        ? "bg-gray-200 cursor-not-allowed" 
                        : isCellSelected(dayIndex, index)
                          ? getSelectedColorIntensity(availabilityCounts[dayIndex][index], maxStudents)
                          : getColorIntensity(availabilityCounts[dayIndex][index], maxStudents)
                      }
                      ${!isCellInPast(dayIndex) ? "cursor-pointer" : ""}
                    `}
                    onMouseDown={() => handleMouseDown(dayIndex, index)}
                    onMouseEnter={() => handleMouseEnter(dayIndex, index)}
                  >
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Clear Selection button */}
        {selectedCells.length > 0 && (
          <div className="flex justify-end mt-2 pr-6">
            <button onClick={clearSelection} className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded">
              Clear
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ClubHeatmap;