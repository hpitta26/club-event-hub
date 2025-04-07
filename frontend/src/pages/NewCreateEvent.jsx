import backend from "../components/backend.jsx";
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
import { GrLocation } from "react-icons/gr";
import { MdOutlineFileUpload } from "react-icons/md";
import dummyEventCardCover from "../assets/dummyEventCardCover.jpg";
import ClubHeatmap from "../components/ClubHeatmap"; // Import the heatmap component

// Will need to handle CSRF TOKENS in this component
function NewCreateEvent() {
    const navigate = useNavigate();

    const tags = [
        "Career",
        "Culture",
        "Fitness",
        "Medical",
        "Politics",
        "Social",
        "Technology",
        "Volunteer",
        "Wellness",
    ];

    const [formData, setFormData] = useState({
        // Club is set in the backend using --> request.session['id']
        title: '',
        description: '',
        start_time: null,
        end_time: null,
        location: '',
        capacity: '',
    });

    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm(formData);
        setErrors(formErrors)
        if(Object.keys(formErrors).length === 0) {
            // Formatting so that Django serializer can easily read this since it's in DateTime format already
            const formattedData={
                ...formData,
                start_time:format(formData.start_time,"yyyy-MM-dd'T'HH:mm:ssXXX"),
                end_time:format(formData.end_time,"yyyy-MM-dd'T'HH:mm:ssXXX")
            }
            try {
                const response = await backend.post("/events/", formattedData);
                console.log(response);
                setFormData({
                    title: '',
                    description: '',
                    start_time: null,
                    end_time: null,
                    location: '',
                    capacity: '',
                })
                navigate('/events')
            }
            catch (err){
                console.error("Error creating event ", err)
                }
            console.log(formData)
        }
    };

    //Currently the only form validation relates to leaving the fields empty, we can expand this when needed
    const validateForm = (data) => {
        const errors = {};
        if (!data.title.trim()){
            errors.title = 'Cannot Leave Title Blank';
        }
        if (!data.description.trim()){
            errors.description = 'Cannot Leave Description Blank';
        }
        if (!data.start_time){
            errors.start_time = 'Cannot Leave Start Time Blank';
        }
        if (!data.end_time){
            errors.end_time = 'Cannot Leave End Time Blank';
        }
        if (!data.location.trim()){
            errors.location = 'Cannot Leave Location Blank';
        }
        if (data.capacity<=0){
            errors.capacity = 'Capacity cannot be less than 1';
        }
        if(data.start_time && data.end_time && data.start_time>=data.end_time){
            alert("Start time must be before the end time");
        }

        return errors;
    }

    const handleChange = (e) => {
        e.preventDefault();
        setFormData(prev=>({...prev,[e.target.name]:e.target.value}));
    }

    const filterTime = (time) => {
        const hours = time.getHours();
        return hours >= 8 && hours <= 22;
    };

    return (
        <section className="min-h-screen bg-[#FFFAFD] flex flex-col items-center pb-20 pt-10">
            <div className="w-full max-w-[860px] space-y-8">
                {/* Page Title */}
                <h1 className="text-black text-4xl font-semibold text-center">Create Event</h1>

                {/* Content Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Banner */}
                    <div className="flex flex-col items-center">
                        <div className="w-full max-w-[416px] h-[242px] border-[2px] border-black shadow-[2px_2px_0px_#000000] rounded-lg relative">
                        <img
                            src={dummyEventCardCover}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <MdOutlineFileUpload className="text-white w-6 h-6" />
                        </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="flex flex-col gap-6">
                        {/* Title Input */}
                        <div>
                            <input
                                onChange={handleChange}
                                name="title"
                                value={formData.title}
                                placeholder="Event Title"
                                className="w-full bg-[#FFFAFD] border-[1px] border-black rounded-[4px] p-2 text-black"
                            />
                            {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
                        </div>

                        {/* Description Input */}
                        <div>
                            <textarea
                                onChange={handleChange}
                                name="description"
                                value={formData.description}
                                placeholder="Description"
                                className="w-full h-[80px] bg-[#FFFAFD] border-[1px] border-black rounded-[4px] p-2 text-black"
                            ></textarea>
                            {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
                        </div>

                        {/* Location Input */}
                        <div className="relative flex items-center">
                            <GrLocation className="absolute left-3 text-gray-500" /> {/* Icon */}
                            <input
                                onChange={handleChange}
                                name="location"
                                value={formData.location}
                                placeholder="Location"
                                className="w-full bg-[#FFFAFD] border-[1px] border-black rounded-[4px] p-2 pl-10 text-black" // Add padding-left for the icon
                            />
                            {errors.location && <p className="text-red-500 text-xs italic">{errors.location}</p>}
                        </div>

                        {/* Tags Section */}
                        <div className="flex flex-col gap-2">
                            <label className="text-black text-sm font-medium">Tags</label>
                            <div className="flex flex-wrap gap-2">
                                {tags.map(
                                (tag) => (
                                    <span
                                    key={tag}
                                    className="px-3 py-1 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
                                    >
                                    {tag}
                                    </span>
                                )
                                )}
                            </div>
                        </div>

                        {/* Capacity Input */}
                        <div>
                            <input
                                onChange={handleChange}
                                name="capacity"
                                value={formData.capacity}
                                placeholder="Event Capacity"
                                type="number"
                                className="w-full bg-[#FFFAFD] border-[1px] border-black rounded-[4px] p-2 text-black"
                            />
                            {errors.capacity && <p className="text-red-500 text-xs italic">{errors.capacity}</p>}
                        </div>
                    </div>
                </div>
                <ClubHeatmap />
                <div className="mt-10 flex justify-center">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-[#FD4EB7] border-[1px] border-black rounded-[4px] py-2 px-4 text-black font-medium hover:bg-[#E93DA6] transition"
                    >
                        Create Event
                    </button>
                </div>
            </div>
        </section>
    );
}

export default NewCreateEvent;
