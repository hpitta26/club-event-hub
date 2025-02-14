import { useState } from 'react';
import backend from '../components/backend.jsx';

function Login () {
    const [formData, setFormData] = useState({
        school_email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        backend.post('/login', formData);
    };

    const handleChange = (e) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    return (
        <section className='min-h-screen bg-stone-900 flex justify-center items-center'>
            <div className='grid grid-rows-4 gap-4'>
                <div>
                    <h1 className='text-white text-4xl mb-4'>
                        Login
                    </h1>
                </div>
                <div>
                    <input onChange={handleChange} name='school_email' value={formData.school_email} placeholder='School Email' className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2' />
                </div>
                <div>
                    <input onChange={handleChange} name='password' value={formData.password} placeholder='Password' className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2' />
                </div>
                <div>
                    <button type='submit' onClick={handleSubmit} className='bg-blue-600 w-full py-2 text-white hover:bg-blue-500 rounded-md'>Login</button>
                </div>
            </div>
        </section>
    );
};

export default Login;