import backend from "../components/backend.jsx";
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {format} from "date-fns";

//when the Club page that stores the button to create events is made, i would like to have the club automatically
// input as a parameter for the function below when the user clicks the button so that it can be easily posted to the backend

function CreateEvent(/*inputClub*/) {
    const [formData, setFormData] = useState({
        club: 1, //placeholder so that posting to the backend can be tested with a pk, we likely will transition to inputClub down the line
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        location: '',
        capacity: 0,
    });

    const[errors,setErrors]=useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm(formData);
        setErrors(formErrors)
        if(Object.keys(formErrors).length === 0) {
            //Formatting so that Django serializer can easily read this since it's in DateTime format already
            const formattedData={
                ...formData,
                start_time:format(formData.start_time,"yyyy-MM-dd'T'HH:mm:ssXXX"),
                end_time:format(formData.end_time,"yyyy-MM-dd'T'H:mm:ssXXX")
            }
            backend.post("/events/", formattedData)
            console.log(formData)
        }
    };

//Currently the only form validation relates to leaving the fields empty, we can expand this when needed
    const validateForm = (data)=>{
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
    const handleChange = (e) =>{
        e.preventDefault();
        setFormData(prev=>({...prev,[e.target.name]:e.target.value}));
    }

return (
    <section className='min-h-screen bg-stone-900 flex justify-center items-center'>
        <div className='grid grid-rows-8 gap-8'>
            <div>
                <h1 className='text-white text-4xl mb-4'>
                    Create Event
                </h1>
            </div>
            <div>
                <input
                    onChange={handleChange}
                    name='title'
                    value={formData.title}
                    placeholder='Event Title'
                    className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2 w-full max-w-md'
                />
                {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p> }
            </div>
            <div>
                <input
                    onChange={handleChange}
                    name='description'
                    value={formData.description}
                    placeholder='Description'
                    className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2 w-full max-w-md'
                />
                {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p> }
            </div>
            <div>
                <input
                    required={true}
                    onChange={handleChange}
                    name='location'
                    value={formData.location}
                    placeholder='Location'
                    className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2 w-full max-w-md'
                />
                {errors.location && <p className="text-red-500 text-xs italic">{errors.location}</p> }
            </div>
            <div>
                <DatePicker
                    selected={formData.start_time}
                    onChange={(date) => setFormData(prev => ({ ...prev, start_time: date }))}
                    showTimeSelect
                    dateFormat="yyyy-MM-dd HH:mm:ss"
                    minTime={new Date().setHours(8, 0, 0)}
                    maxTime={new Date().setHours(22, 0, 0)}
                    timeIntervals={15}
                    className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2 w-full max-w-md'
                    wrapperClassName="w-full"
                    placeholderText="Select Start Time"
                />
                {errors.start_time && <p className="text-red-500 text-xs italic">{errors.start_time}</p>}
            </div>
            <div>
                <DatePicker
                    selected={formData.end_time}
                    onChange={(date) => setFormData(prev => ({ ...prev, end_time: date }))}
                    showTimeSelect
                    dateFormat="yyyy-MM-dd HH:mm:ss"
                    minTime={new Date().setHours(8,0,0)}
                    maxTime={new Date().setHours(22,0,0)}
                    timeIntervals={15}
                    className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2 w-full max-w-md'
                    wrapperClassName="w-full"
                    placeholderText="Select End Time"
                />
                {errors.end_time && <p className="text-red-500 text-xs italic">{errors.end_time}</p> }
            </div>
            <div>
                <input
                    onChange={handleChange}
                    name='capacity'
                    value={formData.capacity}
                    placeholder='Event Capacity'
                    type='number'
                    className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2 w-full max-w-md'
                />
                {errors.capacity && <p className="text-red-500 text-xs italic">{errors.capacity}</p> }
            </div>
            <div>
                <button
                    type='submit'
                    onClick={handleSubmit}
                    className='bg-blue-600 w-full max-w-md py-2 text-white hover:bg-blue-500 rounded-md'
                >
                    Create Event
                </button>
            </div>
        </div>
    </section>
);
}

export default CreateEvent;

