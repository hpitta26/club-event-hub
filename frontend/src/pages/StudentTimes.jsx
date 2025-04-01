import React, { useState, useEffect } from "react";
import backend from "../components/backend.jsx";

function StudentTimes() {
    const [globalEmail, setGlobalEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [profileImage, setProfileImage] = useState(null);

    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        major: "",
        graduation_year: "",
    });

    const [availability, setAvailability] = useState({
        Mon: [],
        Tues: [],
        Wed: [],
        Thurs: [],
        Fri: [],
    });

    const [isDragging, setIsDragging] = useState(false); // Track if the user is dragging
    const [dragMode, setDragMode] = useState(null); // Track whether we're selecting or deselecting
    const [dragDay, setDragDay] = useState(null); // Track the day being dragged

    // Generate time slots for 30-minute intervals
    const timeSlots = Array.from({ length: 26 }, (_, i) => {
        const hour = Math.floor(i / 2) + 10; // Start at 10am
        const minutes = i % 2 === 0 ? "00" : "30";
        return `${hour.toString().padStart(2, "0")}:${minutes}-${hour.toString().padStart(2, "0")}:${minutes === "00" ? "30" : "00"}`;
    });

    // Generate labels for the hour marks only
    const timeLabels = Array.from({ length: 13 }, (_, i) => {
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
        }

        fetchAvailability();
    }, []);

    const toggleTimeSlot = (day, timeSlot, forceAdd = null) => {
        setAvailability((prev) => {
            const dayAvailability = prev[day];
            const isSelected = dayAvailability.includes(timeSlot);

            // Determine whether to add or remove based on drag mode or forceAdd
            const shouldAdd = forceAdd !== null ? forceAdd : !isSelected;

            if (shouldAdd) {
                return {
                    ...prev,
                    [day]: [...dayAvailability, timeSlot],
                };
            } else {
                return {
                    ...prev,
                    [day]: dayAvailability.filter((slot) => slot !== timeSlot),
                };
            }
        });
    };

    const handleMouseDown = (day, timeSlot) => {
        setIsDragging(true);
        setDragDay(day); // Set the day being dragged
        const isSelected = availability[day].includes(timeSlot);
        setDragMode(!isSelected); // Set drag mode to select or deselect
        toggleTimeSlot(day, timeSlot, !isSelected); // Toggle the initial cell
    };

    const handleMouseEnter = (day, timeSlot) => {
        if (isDragging && day === dragDay) {
            // Only allow dragging within the same day column
            toggleTimeSlot(day, timeSlot, dragMode);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setDragMode(null); // Reset drag mode
        setDragDay(null); // Reset the drag day
    };

    const handleSave = async () => {
        try {
            const response = await backend.post("student-schedule/", availability);
            console.log("Availability saved successfully:", response.data);
            alert("Availability saved successfully!");
        } catch (error) {
            console.error("Error saving availability:", error);
            alert("Failed to save availability. Please try again.");
        }
    };

    useEffect(() => {
        async function fetchUserDetails() {
            try {
                const response = await backend.get("students/");
                if (response.data) {
                    setGlobalEmail(response.data.user.email);
                    setFormData({
                        username: response.data.user.email.split("@")[0],
                        first_name: response.data.first_name,
                        last_name: response.data.last_name,
                        email: response.data.user.email,
                        major: response.data.major,
                        graduation_year: response.data.graduation_year,
                    });
                }
            } catch (error) {
                console.error("Error fetching user data: ", error);
            } finally {
                setIsLoading(false);
            }
        }
        async function fetchProfileImage() {
            try {
                const response = await backend.get("student-profile-image/");
                setProfileImage(response.data.image_url);
                console.log("Profile image URL:", response.data.image_url);
            } catch (error) {
                console.error("Error fetching profile image:", error);
                setProfileImage(null);
            }
        }

        fetchUserDetails();
        fetchProfileImage();
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validateErrors = (data) => {
        const errors = {};
        if (!data.first_name.trim()) {
            errors.first_name_blank = "Cannot Leave First Name Blank";
        }
        if (!data.last_name.trim()) {
            errors.last_name_blank = "Cannot Leave Last Name Blank";
        }
        if (!data.email.trim()) {
            errors.email_blank = "Cannot Leave Email Blank";
        }
        if (!data.email.endsWith("edu")) {
            errors.invalid_email = "Must be a .edu email";
        }
        if (!data.major.trim()) {
            errors.major_blank = "Cannot Leave Major Blank";
        }
        if (data.graduation_year < 2025) {
            errors.invalid_graduation_year = "Cannot Set Graduation Year before the current year";
        }

        return errors;
    };

    const emailHasChanged = formData.email !== globalEmail;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateErrors(formData);
        setErrors(formErrors);

        const requestData = {
            user: {
                ...(emailHasChanged && { email: formData.email }),
            },
            first_name: formData.first_name,
            last_name: formData.last_name,
            major: formData.major,
            graduation_year: formData.graduation_year,
        };

        console.log("Request Data:", requestData);

        if (Object.keys(formErrors).length === 0) {
            try {
                const response = await backend.patch('students/', requestData);
                console.log("Settings updated " + response.data.first_name);
            } catch (error) {
                console.error("Error updating user data: ", error);
            }
        }
        console.log("Profile Image:", profileImage);
        if (profileImage !== null) {
            try {
                const response = await backend.post("student-profile-image/", {
                    profile_image_url: profileImage, // Send the profile image URL as JSON
                });
                console.log("Profile image updated successfully:", response.data);
                window.location.reload();
            } catch (error) {
                console.error("Error uploading profile image:", error);
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <section
            className="min-h-screen flex flex-col justify-center items-center pt-20" // Add pt-20 to push content below the navbar
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
                                {index % 2 === 0 ? ( // Only display labels for hour marks
                                    <div className="text-right text-xs pr-2 font-medium" style={{ userSelect: "none" }}>
                                        {timeLabels[Math.floor(index / 2)]}
                                    </div>
                                ) : (
                                    <div style={{ userSelect: "none" }}></div> // Empty cell for 30-minute intervals
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
                    <button className="bg-[#FD4EB7] text-black px-4 py-2 rounded-md border-black border-[1.5px]" onClick={handleSave}>
                        Save Times
                    </button>
                </div>
            </div>
        </section>
    );
}

export default StudentTimes;
