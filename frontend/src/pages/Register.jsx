import { useState } from 'react';
import backend from '../components/backend.jsx';

function Register () {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        school_email: '',
        password: '',
        confirm_password: ''
    });

    const handleSubmit = (e) => {
        console.log(formData);
        e.preventDefault();
        backend.post('/register', formData);

        //  {
        //     "user": {
        //       "username": "student1",
        //       "email": "student1@example.com",
        //       "first_name": "John",
        //       "last_name": "Doe",
        //       "password": "securepassword"
        //     },
        //     "major": "Computer Science",
        //     "graduation_year": 2025
        //  }
    };

    const handleChange = (e) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    
    return (
        <section className='min-h-screen bg-stone-900 flex justify-center items-center'>
            <div className='grid grid-rows-7 gap-4'>
                <div>
                    <h1 className='text-white text-4xl mb-4'>
                        Register
                    </h1>
                </div>
                <div>
                    <input onChange={handleChange} name='first_name' placeholder='First Name' className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2' />
                </div>
                <div>
                    <input onChange={handleChange} name='last_name' placeholder='Last Name' className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2' />
                </div>
                <div>
                    <input onChange={handleChange} name='school_email' placeholder='School Email' className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2' />
                </div>
                <div>
                    <input type='password' onChange={handleChange} name='password' placeholder='Password' className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2' />
                </div>
                <div>
                    <input type='password' onChange={handleChange} name='confirm_password' placeholder='Confirm Password' className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2' />
                </div>
                <div>
                    <button type='submit' onClick={handleSubmit} className='bg-blue-600 w-full py-2 text-white hover:bg-blue-500 rounded-md'>Submit</button>
                </div>
            </div>
        </section>
    )
};

export default Register;