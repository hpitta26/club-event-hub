import React, { useState, useEffect } from "react";
import backend from "../components/backend.jsx";

function StudentTimes() {
    const [isLoading, setIsLoading] = useState(true);

    const [availability, setAvailability] = useState({
        Mon: [],
        Tues: [],
        Wed: [],
        Thurs: [],
        Fri: [],
    });

    const [isDragging, setIsDragging] = useState(false); // Track if the user is dragging
    const [dragDay, setDragDay] = useState(null); // Track the day being dragged

    // Generate time slots for 30-minute intervals, ending at 10:00 PM
    const timeSlots = Array.from({ length: 24 }, (_, i) => {
        const startHour = Math.floor(i / 2) + 10; // Start at 10am
        const startMinutes = i % 2 === 0 ? "00" : "30";

        // Calculate the end time
        const endHour = i % 2 === 0 ? startHour : startHour + 1; // Increment hour for the next slot
        const endMinutes = i % 2 === 0 ? "30" : "00";

        return `${startHour.toString().padStart(2, "0")}:${startMinutes}-${endHour.toString().padStart(2, "0")}:${endMinutes}`;
    });

    // Generate labels for the hour marks, ending at 9 PM
    const timeLabels = Array.from({ length: 12 }, (_, i) => {
        const hour = i + 10; // Start at 10am
        return `${hour > 12 ? hour - 12 : hour}${hour >= 12 ? "pm" : "am"}`;
    });

    // Fetch the logged-in student's availability
    useEffect(() => {
        async function fetchAvailability() {
            try {
                const response = await backend.get("student-schedule/");
                if (response.data && response.data.availability) {
                    // Map backend days to frontend days
                    const backendAvailability = response.data.availability;
                    setAvailability({
                        Mon: backendAvailability.Monday || [],
                        Tues: backendAvailability.Tuesday || [],
                        Wed: backendAvailability.Wednesday || [],
                        Thurs: backendAvailability.Thursday || [],
                        Fri: backendAvailability.Friday || [],
                    });
                }
            } catch (error) {
                console.error("Error fetching availability:", error);
            }
            setIsLoading(false);
        }

        fetchAvailability();
    }, []);

    const toggleTimeSlot = (day, timeSlot) => {
        setAvailability((prev) => {
            const dayAvailability = prev[day];
            const isSelected = dayAvailability.includes(timeSlot);

            if (isSelected) {
                // Remove the time slot if it's already selected
                return {
                    ...prev,
                    [day]: dayAvailability.filter((slot) => slot !== timeSlot),
                };
            } else {
                // Add the time slot if it's not selected
                return {
                    ...prev,
                    [day]: [...dayAvailability, timeSlot],
                };
            }
        });
    };

    const handleMouseDown = (day, timeSlot) => {
        setIsDragging(true);
        setDragDay(day); // Set the day being dragged
        toggleTimeSlot(day, timeSlot); // Toggle the initial cell
    };

    const handleMouseEnter = (day, timeSlot) => {
        if (isDragging && day === dragDay) {
            // Only allow dragging within the same day column
            toggleTimeSlot(day, timeSlot);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setDragDay(null); // Reset the drag day
    };

    const handleSave = async () => {
        try {
            const formattedDay = {
                Mon: "Monday",
                Tues: "Tuesday",
                Wed: "Wednesday",
                Thurs: "Thursday",
                Fri: "Friday",
            };

            // Construct the JSON object to send to the backend
            const formattedAvailability = {};
            Object.keys(availability).forEach((day) => {
                const backendDay = formattedDay[day]; 
                if (!formattedAvailability[backendDay]) {
                    formattedAvailability[backendDay] = []; // Initialize the array for the day
                }

                timeSlots.forEach((timeSlot) => {
                    if (availability[day].includes(timeSlot)) {
                        formattedAvailability[backendDay].push(timeSlot); // Add the time slot to the day
                    }
                });
            });
            const response = await backend.post("student-schedule/", { availability: formattedAvailability });
            console.log("Availability saved successfully:", response.data);
            alert("Availability saved successfully!");
        } catch (error) {
            console.error("Error saving availability:", error);
            alert("Error saving availability. Please try again.");
        }
    };


    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <section
            className="min-h-screen flex flex-col justify-center items-center pt-20"
            onMouseUp={handleMouseUp} // Stop dragging when the mouse is released
        >
            <div className="w-full space-y-5 p-6 max-w-[1200px] -ml-8">
                <h1 className="text-3xl text-black font-bold text-center mb-6">Your Availability</h1>
                <div className="overflow-x-auto">
                    <div className="grid grid-cols-[100px_repeat(5,_1fr)] gap-1">
                        {/* Time Labels */}
                        <div></div> {/* Empty top-left corner */}
                        {Object.keys(availability).map((day) => (
                            <div key={day} className="text-center font-bold text-lg" style={{ userSelect: "none" }}>
                                {day}
                            </div>
                        ))}

                        {/* Time Rows */}
                        {timeSlots.map((timeSlot, index) => (
                            <React.Fragment key={timeSlot}>
                                {/* Time Label */}
                                {index % 2 === 0 ? (
                                    <div className="text-right text-xs pr-2 font-medium" style={{ userSelect: "none" }}>
                                        {timeLabels[Math.floor(index / 2)]}
                                    </div>
                                ) : (
                                    <div style={{ userSelect: "none" }}></div>
                                )}

                                {/* Day Columns */}
                                {Object.keys(availability).map((day) => (
                                    <div
                                        key={`${day}-${timeSlot}`}
                                        className={`py-2 text-sm cursor-pointer text-center border ${
                                            availability[day].includes(timeSlot)
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-100 text-black"
                                        }`}
                                        onMouseDown={() => handleMouseDown(day, timeSlot)}
                                        onMouseEnter={() => handleMouseEnter(day, timeSlot)}
                                    >
                                        {/* Empty content for alignment */}
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <button
                        className="bg-[#FD4EB7] text-black px-4 py-2 rounded-md border-black border-[1.5px]"
                        onClick={handleSave}
                    >
                        Save Times
                    </button>
                </div>
            </div>
        </section>
    );
}

export default StudentTimes;
