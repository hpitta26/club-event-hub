import {useState} from "react";
import dummyEventCardCover from "../../assets/dummyEventCardCover.jpg";
import {MdOutlineFileUpload} from "react-icons/md";
import {GrLocation} from "react-icons/gr";
import {BsPerson} from "react-icons/bs";
import {format} from "date-fns";
import backend from "../../middleware/backend.jsx";
import {useNavigate} from "react-router-dom";
import ClubHeatmap from "./ClubHeatmap.jsx";
import {FiX} from "react-icons/fi";

function EditEventModal({ event, onClose }) {
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
        title: event.title,
        description: event.description,
        start_time: event.start_time,
        end_time: event.end_time,
        location: event.location,
        capacity: event.capacity,
        tags: event.tags,
    });

    const [errors, setErrors] = useState({})
    const [activeTab, setActiveTab] = useState('details');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm(formData);
        setErrors(formErrors)
        if(Object.keys(formErrors).length === 0) {
            const formattedData={
                ...formData,
                start_time:format(formData.start_time,"yyyy-MM-dd'T'HH:mm:ssXXX"),
                end_time:format(formData.end_time,"yyyy-MM-dd'T'HH:mm:ssXXX")
            }
            try {
                console.log("Creating event with data: ", formattedData);
                const response = await backend.patch(`/events/${event.id}/`, formattedData);
                console.log(response);
                window.location.reload()
            }
            catch (err){
                console.error("Error creating event ", err)
                }
            console.log(formData)
        }
    };

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
        if (data.tags.length === 0) {
            errors.tags = 'Please select at least one tag';
        }
        // console.log(errors)
        return errors;
    }

    const handleChange = (e) => {
        e.preventDefault();
        setFormData(prev=>({...prev,[e.target.name]:e.target.value}));
    }

    const handleTimeRangeSelect = ({ start_time, end_time }) => {
        setFormData((prev) => ({
            ...prev,
            start_time,
            end_time,
        }));
    };

    const handleTagToggle = (tag) => {
        setFormData((prev) => {
            const isSelected = prev.tags.includes(tag);
            if (isSelected) {
                return {
                    ...prev,
                    tags: prev.tags.filter((t) => t !== tag),
                };
            } else {
                return {
                    ...prev,
                    tags: [...prev.tags, tag],
                };
            }
        });
    };

      return (
          <div
              className="flex flex-col bg-[#FFFAFD] p-6 gap-5 w-8/12 max-w-6xl h-[90%] overflow-y-auto rounded-lg border-black border-2 shadow-[3px_3px_0px_#000000]">
              <section className="  flex flex-col items-center">
                  <div className="w-full max-w-[860px] space-y-2">
                      {/* Page Title */}
                      <div className="flex justify-between items-center">
                          <div className={"flex items-center gap-5 "}>
                              <FiX className="cursor-pointer text-3xl" onClick={onClose}/>
                              <h1 className="text-4xl font-semibold tracking-tight">Edit Event</h1>
                          </div>
                          <button
                              type="submit"
                              onClick={handleSubmit}
                              className="bg-[#FD4EB7] border-[1.5px] border-black rounded-[4px] py-2 px-3 text-black font-medium hover:bg-[#E93DA6] transition"
                          >
                              Edit Event
                          </button>
                      </div>

                      <div className="w-full">
                          {/* Tabs Navigation */}
                          <div className="border-b border-gray-200">
                              <ul className="flex -mb-px">
                                  <li className="w-1/2">
                                      <button
                                          onClick={() => setActiveTab('details')}
                                          className={`w-full py-3 text-center font-medium ${
                                              activeTab === 'details'
                                                  ? 'border-b-2 border-black font-extrabold'
                                                  : 'text-gray-500 hover:text-gray-700'
                                          }`}
                                      >
                                          Event Details
                                      </button>
                                  </li>
                                  <li className="w-1/2">
                                      <button
                                          onClick={() => setActiveTab('schedule')}
                                          className={`w-full py-3 text-center font-medium ${
                                              activeTab === 'schedule'
                                                  ? 'border-b-2 border-black font-extrabold'
                                                  : 'text-gray-500 hover:text-gray-700'
                                          }`}
                                      >
                                          Schedule
                                      </button>
                                  </li>
                              </ul>
                          </div>
                      </div>

                      {/* Event Details Tab */}
                      <div className={activeTab === 'details' ? 'block' : 'hidden'}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-2">
                              {/* Left Column: Banner */}
                              <div className="flex flex-col">
                                  <div
                                      className="w-full max-w-[416px] h-[220px] border-[2px] border-black shadow-[2px_2px_0px_#000000] rounded-lg relative">
                                      <img
                                          src={dummyEventCardCover}
                                          alt="Profile"
                                          className="w-full h-full object-cover rounded-lg"
                                      />
                                      <div
                                          className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                                          <MdOutlineFileUpload className="text-white w-6 h-6"/>
                                      </div>
                                  </div>
                              </div>

                              {/* Right Column: Form */}
                              <div className="flex flex-col gap-6">
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

                                  <div>
                                <textarea
                                    onChange={handleChange}
                                    name="description"
                                    value={formData.description}
                                    placeholder="Description"
                                    className="w-full h-[80px] bg-[#FFFAFD] border-[1px] border-black rounded-[4px] p-2 text-black"
                                ></textarea>
                                      {errors.description &&
                                          <p className="text-red-500 text-xs italic">{errors.description}</p>}
                                  </div>

                                  <div>
                                      <div className="relative flex items-center">
                                          <GrLocation className="absolute left-3 text-gray-500"/>
                                          <input
                                              onChange={handleChange}
                                              name="location"
                                              value={formData.location}
                                              placeholder="Location"
                                              className="w-full bg-[#FFFAFD] border-[1px] border-black rounded-[4px] p-2 pl-10 text-black"
                                          />
                                      </div>
                                      {errors.location &&
                                          <p className="text-red-500 text-xs italic">{errors.location}</p>}
                                  </div>


                                  <div className="flex flex-col gap-2">
                                      <label className="text-black text-sm font-medium">Tags</label>
                                      <div className="flex flex-wrap gap-2">
                                          {tags.map((tag) => (
                                              <span
                                                  key={tag}
                                                  onClick={() => handleTagToggle(tag)}
                                                  className={`px-3 py-1 text-sm border rounded-lg cursor-pointer ${
                                                      formData.tags.includes(tag)
                                                          ? "bg-[#FD4EB7] text-white border-[#E93DA6]"
                                                          : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                                                  }`}
                                              >
                                            {tag}
                                        </span>
                                          ))}
                                      </div>
                                      {errors.tags && <p className="text-red-500 text-xs italic">{errors.tags}</p>}
                                  </div>

                                  <div>
                                      <div className="relative flex items-center ">
                                          <BsPerson className="absolute left-3 text-gray-500"/>
                                          <input
                                              onChange={handleChange}
                                              name="capacity"
                                              value={formData.capacity}
                                              placeholder="Event Capacity"
                                              type="number"
                                              className="w-full bg-[#FFFAFD] border-[1px] border-black rounded-[4px] p-2 pl-10 text-black"
                                          />
                                      </div>
                                      {errors.capacity &&
                                          <p className="text-red-500 text-xs italic">{errors.capacity}</p>}
                                  </div>


                              </div>
                          </div>
                      </div>

                      {/* Schedule Tab */}
                      <div className={activeTab === 'schedule' ? 'block' : 'hidden'}>
                          <ClubHeatmap onTimeRangeSelect={handleTimeRangeSelect}/>
                      </div>
                  </div>
              </section>
          </div>
      );
}

export default EditEventModal