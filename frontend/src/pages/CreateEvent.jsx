import backend from "../components/backend.jsx";
import { useState } from 'react';

//when the Club page that stores the button to create events is made, i would like to have the club automatically
// input as a parameter for the function below when the user clicks the button so that it can be easily posted to the backend

function CreatEvent(/*inputClub*/) {
    const [formData, setFormData] = useState({
        club: 1, //placeholder so that posting to the backend can be tested with a pk, we likely will transition to inputClub down the line
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        location: '',
        capacity: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            start_time: new Date(formData.start_time).toISOString().slice(0, 19),
            end_time: new Date(formData.end_time).toISOString().slice(0, 19),
        };
        backend.post("/events/", formattedData)
        console.log(formattedData)
    };

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
            </div>
            <div>
                <input
                    onChange={handleChange}
                    name='description'
                    value={formData.description}
                    placeholder='Description'
                    className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2 w-full max-w-md'
                />
            </div>
            <div>
                <input
                    onChange={handleChange}
                    name='location'
                    value={formData.location}
                    placeholder='Location'
                    className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2 w-full max-w-md'
                />
            </div>
            <div>
                <input
                    onChange={handleChange}
                    name='start_time'
                    value={formData.start_time}
                    type='datetime-local'
                    className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2 w-full max-w-md'
                />
            </div>
            <div>
                <input
                    onChange={handleChange}
                    name='end_time'
                    value={formData.end_time}
                    type='datetime-local'
                    className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2 w-full max-w-md'
                />
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

export default CreatEvent;